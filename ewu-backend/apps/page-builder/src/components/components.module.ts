import { Module } from '@nestjs/common';
import { LatestNewsService } from './marquee-text/latest-news.service';
import { LatestNewsResolver } from './marquee-text/latest-news.resolver';
import { QuoteService } from './quotes/quote.service';
import { QuoteResolver } from './quotes/quote.resolver';
import { LatestNoticeService } from './notice/latest-notice.service';
import { LatestNoticeResolver } from './notice/latest-notice.resolver';
import { EventResolver } from './event/event.resolver';
import { EventService } from './event/event.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryService } from './category/category.service';
import { CategoryResolver } from './category/category.resolver';
import { QuickLinksResolver } from './header/quick-links.resolver';
import { QuickLinksService } from './header/quick-links.service';
import { ContactInfoResolver } from './whyChooseYou/contact-info.resolver';
import { ContactInfoService } from './whyChooseYou/contact-info.service';
import { SliderService } from './slider/slider.service';
import { SliderResolver } from './slider/slider.resolver';
import { ComponentService } from './component/component.service';
import { ComponentResolver } from './component/component.resolver';
import { ProgramCalenderResolver } from './academic-calender/program-calender.resolver';
import { ProgramCalenderService } from './academic-calender/program-calender.service';
import { SemesterCalenderResolver } from './academic-calender/semester-calender.resolver';
import { SemesterCalenderService } from './academic-calender/semester-calender.service';
import { CalenderResolver } from './academic-calender/calender.resolver';
import { CalenderService } from './academic-calender/calender.service';
import { PatnershipService } from './patnership/patnership.service';
import { PatnershipResolver } from './patnership/patnership.resolver';
import { NewsResolver } from './news/news.resolver';
import { NewsService } from './news/news.service';
import { AccordionResolver } from './accordion/accordion.resolver';
import { AccordionService } from './accordion/accordion.service';
import { AchievementResolver } from './achievement/achievement.resolver';
import { AchievementService } from './achievement/achievement.service';
import { FeedbackOfStudentService } from './feedback-of-student/feedback-of-student.service';
import { FeedbackOfStudentResolver } from './feedback-of-student/feedback-of-student.resolver';
import { HeaderResolver } from './header/header.resolver';
import { HeaderService } from './header/header.service';
import { FooterService } from './footer/footer.service';
import { FooterResolver } from './footer/footer.reslover';
import { DescriptionsResolver } from './description/description.resolver';
import { DescriptionsService } from './description/description.service';
import { YearlyViewComponentResolver } from './yearly-view-component/yearly-view-component.resolver';
import { YearlyViewComponentService } from './yearly-view-component/yearly-view-component.service';
import { JobApplicationResolver } from './job/job-application.resolver';
import { JobApplicationService } from './job/job-application.service';
import { JobResolver } from './job/job.resolver';
import { JobService } from './job/job.service';
import { GalleryResolver } from './gallery/gallery.resolver';
import { GalleryService } from './gallery/gallery.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { CampusLifeService } from './campus-life/campus-life.service';
import { CampusLifeResolver } from './campus-life/campus-life.resolver';
import { NewsMediaOrgResolver } from './news-media/news-media-org.resolver';
import { NewsMediaOrgService } from './news-media/news-media-org.service';
import { NewsMediaResolver } from './news-media/news-media.resolver';
import { NewsMediaService } from './news-media/news-media.service';
import { AboutOrgResolver } from './about-org/about-org.resolver';
import { AboutOrgService } from './about-org/about-org.service';
import { SuccessCardResolver } from './successCard/sucess-card.resolver';
import { SuccessCardService } from './successCard/success-card.service';
import { ProgramCardResolver } from './program-card/program-card.resolver';
import { ProgramCardService } from './program-card/program-card.service';
import { SearchCourseCardService } from './search-course-card/search-course-card.service';
import { SearchCourseCardResolver } from './search-course-card/search-course-card.resolver';
import { HotlineResolver } from './hotline/hotline.resolver';
import { HotlineService } from './hotline/hotline.service';
import { FollowUsResolver } from './follow-us/follow-us.resolver';
import { FollowUsService } from './follow-us/follow-us.service';
import { LiveSessionResolver } from './live-session/live-session.resolver';
import { LiveSessionService } from './live-session/live-session.service';
import { ViewAllResolver } from './view-all/view-all.resolver';
import { ViewAllService } from './view-all/view-all.service';

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
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          auth: {
            user: configService.get('EMAIL_USERNAME'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [
    LatestNewsResolver,
    LatestNewsService,
    QuoteService,
    QuoteResolver,
    JwtService,
    ConfigService,
    LatestNoticeService,
    LatestNoticeResolver,
    CategoryService,
    CategoryResolver,
    QuickLinksResolver,
    QuickLinksService,
    EventService,
    EventResolver,
    ContactInfoResolver,
    ContactInfoService,
    SliderService,
    SliderResolver,
    PatnershipService,
    PatnershipResolver,
    NewsResolver,
    NewsService,
    ComponentService,
    ComponentResolver,
    ProgramCalenderResolver,
    ProgramCalenderService,
    SemesterCalenderResolver,
    SemesterCalenderService,
    CalenderResolver,
    CalenderService,
    AccordionResolver,
    AccordionService,
    AchievementResolver,
    AchievementService,
    FeedbackOfStudentResolver,
    FeedbackOfStudentService,
    HeaderResolver,
    HeaderService,
    FooterResolver,
    FooterService,
    DescriptionsResolver,
    DescriptionsService,
    YearlyViewComponentResolver,
    YearlyViewComponentService,
    JobResolver,
    JobService,
    JobApplicationResolver,
    JobApplicationService,
    GalleryResolver,
    GalleryService,
    CampusLifeResolver,
    CampusLifeService,
    NewsMediaOrgResolver,
    NewsMediaOrgService,
    NewsMediaResolver,
    NewsMediaService,
    AboutOrgResolver,
    AboutOrgService,
    SuccessCardResolver,
    SuccessCardService,
    ProgramCardResolver,
    ProgramCardService,
    SearchCourseCardService,
    SearchCourseCardResolver,
    HotlineResolver,
    HotlineService,
    FollowUsResolver,
    FollowUsService,
    LiveSessionResolver,
    LiveSessionService,
    ViewAllResolver,
    ViewAllService
  ],
})
export class ComponentsModule {}
