import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyResolver } from './faculty.resolver';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InqueryResolver } from '../inquery/inquery.resolver';
import { InqueryService } from '../inquery/inquery.service';
import { SemesterResolver } from './semester.resolver';
import { SemesterService } from './semester.service';
import { OfficeService } from './office.service';
import { OfficeResolver } from './office.resolver';
import { OfficeMemberService } from './office-member.service';
import { OfficeMemberResolver } from './office-member.resolver';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';
import { FileDirectoryResolver } from './file-directory.resolver';
import { FileDirectoryService } from './file-directory.service';
import { AdmissionResultResolver } from './admission-result.resolver';
import { AdmissionResultService } from './admission-result.service';
import { OfficeDocumentResolver } from './office-document.resolver';
import { OfficeDocumentService } from './office-document.service';

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
    FacultyResolver,
    FacultyService,
    InqueryResolver,
    InqueryService,
    SemesterResolver,
    SemesterService,
    OfficeResolver,
    OfficeService,
    OfficeDocumentService,
    OfficeDocumentResolver,
    OfficeMemberResolver,
    OfficeMemberService,
    ScheduleResolver,
    ScheduleService,
    FileDirectoryResolver,
    FileDirectoryService,
    AdmissionResultResolver,
    AdmissionResultService,
    JwtService,
    ConfigService,
  ],
})
export class OrganizationModule {}
