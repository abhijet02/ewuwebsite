import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaUserService } from '../../../../prisma/prisma-user.service';
import * as bcrypt from 'bcrypt';
import {
  GCodeData,
  GoogleLoginInput,
  LoginInput,
  UpdatePasswordDate,
} from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { sendMail } from '../utils/email.util';
import { MailerService } from '@nestjs-modules/mailer';
import { ChangePasswordInput } from './dto/change-password.input';
import { RoleMenuPermission } from '../roles/entities/role-menu-permission.entity';
import { PrismaPageBuilderService } from '../../../../prisma/prisma-page-builder.service';
import { componentList, SignUp, UserCreate } from '../utils/component-lis';
import { EwuEmail } from 'apps/master-data/src/email-configuration/entities/ewu-email.entity';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import { join } from 'path';
import {
  deleteFileAndDirectory,
  uploadFileStream,
} from 'utils/file-upload.util';
import { FacultyPerson } from 'apps/master-data/src/faculty/entities/faculty-person.entity';
import { OfficeMember } from 'apps/master-data/src/organization/entities/office-member.entity';
import { Department } from 'apps/master-data/src/faculty/entities/department.entity';
import { Office } from 'apps/master-data/src/organization/entities/office.entity';
@Injectable()
export class UserService {
  private uploadDir = join(process.env.UPLOAD_DIR, `user`, 'files');

  constructor(
    @Inject(PrismaUserService) private prismaService: PrismaUserService,
    @Inject(PrismaPageBuilderService)
    private prismaPageBuilder: PrismaPageBuilderService,
    @Inject(PrismaMasterDataService)
    private prismaMasterData: PrismaMasterDataService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly mailService: MailerService,
  ) {}

  async sendEmailForSignUpRequest(createdUser, emailAttachments?) {
    try {
      const component = await this.prismaPageBuilder.component.findMany({
        where: {
          label: componentList.SignUp,
        },
      });
      if (component) {
        const emailContent: EwuEmail[] =
          await this.prismaMasterData.ewuEmail.findMany({
            where: {
              componentId: component[0].id,
            },
          });
        let facultyPersons: FacultyPerson[] = [];
        if (
          createdUser?.facultyPersonId &&
          createdUser?.facultyPersonId?.length >= 1
        ) {
          facultyPersons = await this.prismaMasterData.facultyPerson.findMany({
            where: {
              id: {
                in: createdUser.facultyPersonId, // Array of IDs
              },
            },
          });
        }

        let departments: Department[] = [];
        if (
          createdUser?.departmentId &&
          createdUser?.departmentId?.length >= 1
        ) {
          departments = await this.prismaMasterData.department.findMany({
            where: {
              id: {
                in: createdUser.departmentId, // Array of IDs
              },
            },
          });
        }
        let officeMembers: OfficeMember[] = [];
        if (
          createdUser?.officeMemberId &&
          createdUser?.officeMemberId?.length >= 1
        ) {
          officeMembers = await this.prismaMasterData.officeMember.findMany({
            where: {
              id: {
                in: createdUser.officeMemberId, // Array of IDs
              },
            },
          });
        }
        let offices: Office[] = [];
        if (createdUser?.officeId && createdUser?.officeId?.length > 1) {
          offices = await this.prismaMasterData.office.findMany({
            where: {
              id: {
                in: createdUser.officeId, // Array of IDs
              },
            },
          });
        }
        if (emailContent) {
          let htmlString = `${emailContent[0]?.emailBody}`;
          const applicantName =
            createdUser?.firstName + ' ' + createdUser?.lastName;
          const applicantEmail = createdUser?.email;
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.JobType}\\s*}}`, 'g'),
            facultyPersons[0]?.jobType || officeMembers[0]?.jobType || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.DoB}\\s*}}`, 'g'),
            facultyPersons[0]?.dateOfJoining.toISOString() ||
              officeMembers[0]?.dateOfJoining.toISOString() ||
              '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.Designation}\\s*}}`, 'g'),
            facultyPersons?.map((f) => f.designation).join(', ') ||
              officeMembers?.map((f) => f.designation).join(', ') ||
              '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.UserMobile}\\s*}}`, 'g'),
            createdUser?.mobileNo || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.BloodGroup}\\s*}}`, 'g'),
            createdUser?.bloodGroup || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.DepartmentName}\\s*}}`, 'g'),
            departments?.map((f) => f.name).join(', ') || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.OfficeName}\\s*}}`, 'g'),
            offices?.map((f) => f.title).join(', ') || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.RoomNo}\\s*}}`, 'g'),
            facultyPersons[0]?.roomNo || officeMembers[0]?.location || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.ExtNo}\\s*}}`, 'g'),
            facultyPersons[0]?.ext || officeMembers[0]?.ext || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.AcademicDetails}\\s*}}`, 'g'),
            facultyPersons[0]?.eduDetails ||
              officeMembers[0]?.educationDescription ||
              '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.UserEmail}\\s*}}`, 'g'),
            applicantEmail || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${SignUp.UserName}\\s*}}`, 'g'),
            applicantName || '',
          );
          sendMail(
            emailContent[0]?.email,
            emailContent[0]?.emailSubject,
            htmlString,
            this.mailService,
            [createdUser?.email],
            emailAttachments,
          );
        } else {
          throw new HttpException(
            'Email content not found',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (e) {
      throw new HttpException(
        `Error Sending Sign Up Request Email : ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createUserInput: CreateUserInput) {
    const { email, password } = createUserInput;
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    let profilePhotoUrl = null;
    let signatureUrl = null;
    if (createUserInput?.profilePhotoUrl) {
      const imageFile: any = await createUserInput.profilePhotoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      profilePhotoUrl = await filePath;
    }
    if (createUserInput?.signatureUrl) {
      const imageFile: any = await createUserInput.signatureUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      signatureUrl = await filePath;
    }
    const createdUser = await this.prismaService.users.create({
      data: {
        ...createUserInput,
        signatureUrl,
        profilePhotoUrl,
        password: hashedPassword,
        rememberToken: '',
        emailVarifiedAt: '',
      },
    });
    if (createdUser?.activateStatus == false) {
      const emailAttachments = [];
      if (signatureUrl) {
        emailAttachments.push({
          filename: signatureUrl.split('/').pop() || 'signature',
          path: signatureUrl,
        });
      }
      if (profilePhotoUrl) {
        emailAttachments.push({
          filename: profilePhotoUrl.split('/').pop() || 'profile photo',
          path: profilePhotoUrl,
        });
      }
      await this.sendEmailForSignUpRequest(createdUser, emailAttachments);
    }
    if (createdUser?.activateStatus == true) {
      const component = await this.prismaPageBuilder.component.findMany({
        where: {
          label: componentList.UserCreate,
        },
      });
      if (component) {
        const emailContent: EwuEmail[] =
          await this.prismaMasterData.ewuEmail.findMany({
            where: {
              componentId: component[0].id,
            },
          });
        if (emailContent) {
          let htmlString = `${emailContent[0]?.emailBody}`;
          const userEmail = email;
          const userPassword = password;
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${UserCreate.UserEmail}\\s*}}`, 'g'),
            userEmail || '',
          );
          htmlString = htmlString.replace(
            new RegExp(`{{\\s*${UserCreate.UserPassword}\\s*}}`, 'g'),
            userPassword || '',
          );
          sendMail(
            [email],
            emailContent[0].emailSubject,
            htmlString,
            this.mailService,
            emailContent[0]?.email,
          );
        }
      }
    }
    return createdUser;
  }

  async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    return await this.prismaService.users.findMany({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const isUserExist: User = await this.findOne(id);
      if (isUserExist) {
        const userInput = {
          ...updateUserInput,
          signatureUrl: isUserExist?.signatureUrl,
          profilePhotoUrl: isUserExist?.profilePhotoUrl,
        };
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(
          updateUserInput.password,
          salt,
        );
        userInput.password = hashedPassword;

        if (updateUserInput?.profilePhotoUrl) {
          if (isUserExist?.profilePhotoUrl) {
            const prevfilePath = isUserExist?.profilePhotoUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevfilePath);
          }
          const imageFile: any = await updateUserInput.profilePhotoUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          userInput.profilePhotoUrl = await filePath;
        }
        if (updateUserInput?.signatureUrl) {
          if (isUserExist?.signatureUrl) {
            const prevfilePath = isUserExist?.signatureUrl.replace(
              `${process.env.BASE_URL}/`,
              '',
            );
            deleteFileAndDirectory(prevfilePath);
          }
          const imageFile: any = await updateUserInput.signatureUrl;
          const fileName = `${Date.now()}_${imageFile.filename}`;
          const filePath = await uploadFileStream(
            imageFile.createReadStream,
            this.uploadDir,
            fileName,
          );
          userInput.signatureUrl = await filePath;
        }
        const updatedUserData: User = await this.prismaService.users.update({
          data: {
            ...userInput,
            passwordLastUpdated: new Date(),
          },
          where: {
            id,
          },
        });
        const isFirstUpdate =
          isUserExist?.createdAt?.toISOString() ===
          isUserExist?.updateAt?.toISOString();
        if (updatedUserData?.activateStatus == true && isFirstUpdate) {
          const component = await this.prismaPageBuilder.component.findMany({
            where: {
              label: componentList.UserCreate,
            },
          });
          if (component) {
            const emailContent: EwuEmail[] =
              await this.prismaMasterData.ewuEmail.findMany({
                where: {
                  componentId: component[0].id,
                },
              });
            if (emailContent) {
              let htmlString = `${emailContent[0]?.emailBody}`;
              const userEmail = isUserExist?.email;
              const userPassword = updateUserInput?.password;
              htmlString = htmlString.replace(
                new RegExp(`{{\\s*${UserCreate.UserEmail}\\s*}}`, 'g'),
                userEmail || '',
              );
              htmlString = htmlString.replace(
                new RegExp(`{{\\s*${UserCreate.UserPassword}\\s*}}`, 'g'),
                userPassword || '',
              );
              sendMail(
                [isUserExist?.email],
                emailContent[0].emailSubject,
                htmlString,
                this.mailService,
                emailContent[0]?.email,
              );
            }
          }
        }
        return updatedUserData;
      } else {
        throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Updating User : ${e}`, 500);
    }
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput,
  ): Promise<User> {
    try {
      const isUserExist: User = await this.prismaService.users.findUnique({
        where: {
          email: changePasswordInput.email,
        },
      });
      if (isUserExist) {
        const isTokenValid = await bcrypt.compare(
          changePasswordInput.rememberToken,
          isUserExist.rememberToken,
        );
        if (!isTokenValid) {
          throw new UnauthorizedException('Invalid Code!');
        }
        const emailVarifiedAt = new Date().toISOString();
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(
          changePasswordInput.password,
          salt,
        );
        const updatedUserData: User = await this.prismaService.users.update({
          data: {
            password: hashedPassword,
            emailVarifiedAt,
            waringStatus: false,
            passwordLastUpdated: new Date(),
          },
          where: {
            id: isUserExist.id,
          },
        });
        const subject =
          'East West university Website: Password has Changed Successfully';
        const body = 'Your password has been changed successfully.';
        sendMail([isUserExist.email], subject, body, this.mailService);
        return updatedUserData;
      } else {
        throw new HttpException(
          'Change Password: User Email not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Change Password  Request : ${e}`, 500);
    }
  }

  async forgotPassword(email: string): Promise<User> {
    try {
      const isUserExist: User = await this.prismaService.users.findUnique({
        where: {
          email,
        },
      });
      if (isUserExist) {
        const code = Math.floor(Math.random() * 10000);
        const rememberToken = `EWU-${code}`;
        const salt = await bcrypt.genSalt(12);
        const hashedToken = await bcrypt.hash(rememberToken, salt);
        const updatedUserData: User = await this.prismaService.users.update({
          data: {
            rememberToken: hashedToken,
          },
          where: {
            id: isUserExist.id,
          },
        });

        const subject = 'East West University Website: Forgot Password';
        const body = `Hello! ${isUserExist.firstName} ${isUserExist.lastName}\n\nTo change password use the following code\n\n ${rememberToken}`;
        sendMail([isUserExist.email], subject, body, this.mailService);
        return updatedUserData;
      } else {
        throw new HttpException(
          'Forgot Password: User Email not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(`Error Forgot Password  Request : ${e}`, 500);
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const isUserExist = await this.findOne(id);
      if (isUserExist) {
        await this.prismaService.users.delete({
          where: {
            id,
          },
        });
        if (isUserExist?.profilePhotoUrl) {
          const prevfilePath = isUserExist?.profilePhotoUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        if (isUserExist?.signatureUrl) {
          const prevfilePath = isUserExist?.signatureUrl.replace(
            `${process.env.BASE_URL}/`,
            '',
          );
          deleteFileAndDirectory(prevfilePath);
        }
        return isUserExist;
      } else {
        throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Error Deleting User  : ${e}`, 500);
    }
  }

  async getRolePermissionByUserId(roleId: number) {
    try {
      const roleMenuPermission: RoleMenuPermission[] =
        await this.prismaService.roleMenuPermission.findMany({
          where: { roleId },
          include: { menu: true },
        });
      return roleMenuPermission;
    } catch (e) {
      throw new HttpException(
        `Error getting role permission for User  : ${e}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(data: LoginInput) {
    const { email, password } = data;
    const isEmailValid: User = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!isEmailValid) {
      throw new UnauthorizedException('Invalid username/password');
    }

    if (isEmailValid.activateStatus === false) {
      throw new UnauthorizedException('Account is Blocked.');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isEmailValid.password,
    );

    if (!isPasswordValid) {
      const responseUser = await this.loginAttempt(email);

      return {
        id: isEmailValid.id,
        name: isEmailValid.firstName + '' + isEmailValid.lastName,
        token: '',
        userType: isEmailValid.userType,
        loginAttempt: responseUser,
      };
    }

    const resetStatus = await this.resetAfter90Days(email);

    if (resetStatus) {
      throw new UnauthorizedException('Password expired.');
    }

    const payLoad: JwtPayload = {
      id: isEmailValid.id,
      userType: isEmailValid.userType,
    };
    const accessToken = await this.jwtService.sign(payLoad, {
      secret: this.configService.get('JWT_SECRET'),
    });

    // send mail to verify the user
    // Step 1: Generate a random verification code
    const code = Math.floor(Math.random() * 10000);
    const verificationCode = `EWU-${code}`; // Random code generated for verification

    // Step 2: Email content
    const subject = 'East West University Website: Login Verification Code';
    const body = `Hello! <strong>${isEmailValid.firstName} ${isEmailValid.lastName},</strong>
                  <br><br>
                  To verify your login, please use the following code:
                  <br><br>
                  Verify with code : <h3>${verificationCode}</h3>
                  <br><br>
                  If you did not attempt this login, please contact with support team immediately.
                  <br><br>
                  Best Regards,<br>
                  ICS EWU.`;

    // Step 3: Send the email
    sendMail([isEmailValid.email], subject, body, this.mailService);

    // Encrypt the verification code
    const saltRounds = 10;
    const hashedCode = await bcrypt.hash(verificationCode, saltRounds);

    await this.prismaService.users.update({
      data: { gmail2StepCode: hashedCode },
      where: { email },
    });

    const userPermission = await this.getRolePermissionByUserId(
      isEmailValid.roleId,
    );

    return {
      id: isEmailValid.id,
      name: isEmailValid.firstName + '' + isEmailValid.lastName + '',
      token: accessToken,
      userType: isEmailValid.userType,
      userPermission,
    };
  }

  async validateGoogleUser(googleUser: CreateUserInput) {
    const { email } = googleUser;
    const user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    if (user) return user;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(googleUser.password, salt);
    let profilePhotoUrl = null;
    let signatureUrl = null;
    if (googleUser?.profilePhotoUrl) {
      const imageFile: any = await googleUser.profilePhotoUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      profilePhotoUrl = await filePath;
    }
    if (googleUser?.signatureUrl) {
      const imageFile: any = await googleUser.signatureUrl;
      const fileName = `${Date.now()}_${imageFile.filename}`;
      const filePath = await uploadFileStream(
        imageFile.createReadStream,
        this.uploadDir,
        fileName,
      );
      signatureUrl = await filePath;
    }
    return await this.prismaService.users.create({
      data: {
        ...googleUser,
        profilePhotoUrl,
        signatureUrl,
        password: hashedPassword,
        rememberToken: '',
        emailVarifiedAt: '',
        activateStatus: user.activateStatus,
      },
    });
  }

  async googleLogin(googleLoginInput: GoogleLoginInput) {
    const { email } = googleLoginInput;
    const isEmailValid: User = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!isEmailValid) {
      throw new UnauthorizedException('Invalid email..');
    }

    if (isEmailValid.activateStatus === false) {
      throw new UnauthorizedException('Account is Blocked.');
    }

    const payLoad: JwtPayload = {
      id: isEmailValid.id,
      userType: isEmailValid.userType,
    };
    const accessToken = await this.jwtService.sign(payLoad, {
      secret: this.configService.get('JWT_SECRET'),
    });

    const userPermission = await this.getRolePermissionByUserId(
      isEmailValid.roleId,
    );

    return {
      id: isEmailValid.id,
      name: isEmailValid.firstName + '' + isEmailValid.lastName + '',
      token: accessToken,
      userType: isEmailValid.userType,
      userPermission,
    };
  }
  async loginAttempt(email: string) {
    const user = await this.prismaService.loginAttempt.findUnique({
      where: { email },
    });

    if (user) {
      const currentAttempts = parseInt(user.tryToAttemptTime || '0', 10);
      const currentLockedTime = parseInt(user.lockedTime || '0', 10);

      if (currentAttempts >= 3) {
        // Lock user if attempts exceed 3
        await this.prismaService.users.update({
          data: { activateStatus: false },
          where: { email },
        });

        return {
          email: user.email,
          tryToAttemptTime: user.tryToAttemptTime,
          lockedTime: user.lockedTime,
        };
      }

      // Otherwise, increment attempt count and lock time
      const updatedUser = await this.prismaService.loginAttempt.update({
        data: {
          tryToAttemptTime: (currentAttempts + 1).toString(),
          lockedTime: (currentLockedTime + 10).toString(),
        },
        where: { email },
      });

      return {
        email: updatedUser.email,
        tryToAttemptTime: updatedUser.tryToAttemptTime,
        lockedTime: updatedUser.lockedTime,
      };
    } else {
      // Create a new user if not found
      const newUser = await this.prismaService.loginAttempt.create({
        data: {
          email,
          tryToAttemptTime: '1',
          lockedTime: '10',
        },
      });

      return {
        email: newUser.email,
        tryToAttemptTime: newUser.tryToAttemptTime,
        lockedTime: newUser.lockedTime,
      };
    }
  }

  async resetAfter90Days(email: string) {
    const now = new Date();
    const ninetyDaysAgo = new Date(now);
    ninetyDaysAgo.setDate(now.getDate() - 90);

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    // Fetch user details
    const user = await this.prismaService.users.findUnique({
      where: { email },
      select: {
        passwordLastUpdated: true,
        waringStatus: true,
      },
    });

    if (!user?.passwordLastUpdated) {
      console.log('User not found or password last updated date is missing.');
      return false;
    }

    const passwordLastUpdated = user.passwordLastUpdated;

    // If password is older than 90 days, force reset
    if (passwordLastUpdated < ninetyDaysAgo) {
      console.log('Password expired (not updated for more than 90 days).');
      // Perform the password reset logic here
      return true;
    }

    // If exactly 7 days have passed since the last update & no warning sent yet
    if (passwordLastUpdated <= sevenDaysAgo && !user.waringStatus) {
      console.log('Sending password expiry warning email...');
      await this.sendReminderEmail(email);

      // Update warningStatus in the database to prevent duplicate emails
      await this.prismaService.users.update({
        where: { email },
        data: { waringStatus: true },
      });
    }

    return false;
  }

  async sendReminderEmail(email: string) {
    const subject = 'East West University Website: Password Expiry Warning';
    const body = `
  Dear User,
  
  This is a reminder that your password for your East West University account was last updated **7 days ago**.  
  
  For security reasons, your password will expire soon, and after **90 days**, you will no longer be able to access your account unless you update your password.
  
  Please update your password as soon as possible to ensure uninterrupted.
  
  If you did not request this change or have any questions, please contact our IT support team immediately.
  
  Best regards,  
  **IT Support Team**  
  **East West University**
    `;

    sendMail([email], subject, body, this.mailService);
  }

  // set passwordLastUpdated for testing

  async updatePasswordLastUpdated(updatePasswordDate: UpdatePasswordDate) {
    const { email, date } = updatePasswordDate;
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.prismaService.users.update({
      where: { email },
      data: { passwordLastUpdated: date },
    });

    return updatedUser;
  }

  async checkGmailCode(gCodeData: GCodeData) {
    const { code, email } = gCodeData;

    const user = await this.prismaService.users.findUnique({
      where: { email },
      select: { gmail2StepCode: true }, // Only fetch the relevant field
    });

    if (!user) {
      throw new Error('User not found.');
    }
    const isCodeValid = await bcrypt.compare(code, user.gmail2StepCode);

    if (isCodeValid) {
      // Code is correct, proceed with login or other actions
      return { success: true, message: 'Code is valid.' };
    } else {
      // Code is incorrect
      return { success: false, message: 'Invalid code.' };
    }
  }
}
