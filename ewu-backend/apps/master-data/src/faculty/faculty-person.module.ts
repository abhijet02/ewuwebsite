import { Module } from '@nestjs/common';
import { FacultypersonService } from './faculty-person.service';
import { FacultypersonResolver } from './faculty-person.resolver';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DesignationResolver } from './designation.resolver';
import { DesignationService } from './designation.service';
import { ProgramCategoryResolver } from './program-category.resolver';
import { ProgramCategoryService } from './program-category.service';
import { ProgramResolver } from './program.resolver';
import { ProgramService } from './program.service';
import { PublicationResolver } from './publication.resolver';
import { PublicationService } from './publication.service';
import { NoteableAlumniResolver } from './noteable-alumni.resolver';
import { NoteableAlumniService } from './noteable-alumni.service';
import { ProcurementResolver } from './procuremet.resolver';
import { ProcurementService } from './procurement.service';
import { WhyChooseDepartmentResolver } from './why-choose-department.resolver';
import { WhyChooseDepartmentService } from './why-choose-department.service';
import { PoeResolver } from './poe.resolver';
import { PoeService } from './poe.service';
import { FacultyMemberDocumentService } from './faculty-member-document.service';
import { FacultyMemberDocumentResolver } from './faculty-member-document.resolver';
import { OfficeMemberDocumentService } from './office-member-document.service';
import { OfficeMemberDocumentResolver } from './office-member-document.resolver';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  providers: [
    DepartmentService,
    DepartmentResolver,
    DesignationResolver,
    DesignationService,
    CourseResolver,
    CourseService,
    FacultypersonService,
    FacultypersonResolver,
    ProgramCategoryResolver,
    ProgramCategoryService,
    ProgramResolver,
    ProgramService,
    PublicationResolver,
    PublicationService,
    NoteableAlumniResolver,
    NoteableAlumniService,
    ProcurementResolver,
    ProcurementService,
    WhyChooseDepartmentResolver,
    WhyChooseDepartmentService,
    PoeResolver,
    PoeService,
    FacultyMemberDocumentResolver,
    FacultyMemberDocumentService,
    OfficeMemberDocumentResolver,
    OfficeMemberDocumentService,
    JwtService,
    ConfigService,
  ],
})
export class FacultyPersonModule {}
