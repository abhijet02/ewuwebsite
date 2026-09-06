import { combineReducers } from "@reduxjs/toolkit";
import { themeReducer } from "./slices/theme/theme.slice";
import { latestNewsReducer } from "./slices/latestNews/latestNews.slice";
import { sliderReducer } from "./slices/slider/slider.slice";
import { departmentReducer } from "./slices/department/department.slice";
import { noticeReducer } from "./slices/notice/notice.slice";
import { facultyReducer } from "./slices/faculty/faculty.slice";
import { quoteReducer } from "./slices/quote/quote.slice";
import { quickLinkReducer } from "./slices/quickLink/quickLink.slice";
import { courseReducer } from "./slices/course/course.slice";
import { contactInfoReducer } from "./slices/contactInfo/contactInfo.slice";
import { facultyPersonReducer } from "./slices/facultyPerson/facultyPerson.slice";
import { designationReducer } from "./slices/designation/designation.slice";
import { menuReducer } from "./slices/menu/menu.slice";
import { pageReducer } from "./slices/page/page.slice";
import { sectionReducer } from "./slices/builder/section.slice";
import { builderReducer } from "./slices/builder/builder.slice";
import { componentReducer } from "./slices/component_/component.slice";
import { faqReducer } from "./slices/faq/faq.slice";
import { faqKeywordReducer } from "./slices/faqKeyword/faqKeyword.slice";
import { semesterCalenderReducer } from "./slices/calender/semesterCalender.slice";
import { programCalenderReducer } from "./slices/calender/programCalender.slice";
import { calenderDateReducer } from "./slices/calender/calenderDate.slice";
import { partnershipReducer } from "./slices/partnership/partnership.slice";
import { newsReducer } from "./slices/news/news.slice";
import { programCategoryReducer } from "./slices/programCategory/programCategory.slice";
import { programReducer } from "./slices/program/program.slice";
import { studentsSayReducer } from "./slices/studentsSay/studentsSay.slice";
import { eventReducer } from "./slices/event/event.slice";
import { categoryReducer } from "./slices/category/category.slice";
import { achievementReducer } from "./slices/achievement/achievement.slice";
import { clubReducer } from "./slices/club/club.slice";
import { clubActivityRankingReducer } from "./slices/club/clubActivityRanking.slice";
import { headerReducer } from "./slices/header/header.slice";
import { footerReducer } from "./slices/footer/footer.slice";
import { inqueryReducer } from "./slices/inquery/inquery.slice";
import { helpDeskReducer } from "./slices/helpDesk/helpDesk.slice";
import { officeReducer } from "./slices/office/office.slice";
import { semesterReducer } from "./slices/semester/semester.slice";
import { skillReducer } from "./slices/skill/skill.slice";
import { clubMemberReducer } from "./slices/clubMember/clubMember.slice";
import { officeMemberReducer } from "./slices/officeMember/officeMember.slice";
import { descriptionReducer } from "./slices/description/description.slice";
import { yearlyViewReducer } from "./slices/yearlyView/yearlyView.slice";
import { jobApplicationReducer } from "./slices/jobApplication/jobApplication.slice";
import { jobReducer } from "./slices/job/job.slice";
import { scheduleReducer } from "./slices/schedule/schedule.slice";
import { accordionReducer } from "./slices/accordion/accordion.slice";
import { galleryReducer } from "./slices/gallery/gallery.slice";
import { campusLifeReducer } from "./slices/campusLife/campusLife.slice";
import { publicationReducer } from "./slices/publication/publication.slice";
import { staticReducer } from "./slices/static/static.slice";
import { alumniReducer } from "./slices/alumni/alumni.slice";
import { whyChooseReducer } from "./slices/whyChoose/whyChoose.slice";
import { procurementReducer } from "./slices/procurement/procurement.slice";
import { facultyMemberDocumentReducer } from "./slices/facultyMemberDocument/facultyMemberDocument.slice";
import { poeReducer } from "./slices/poe/poe.slice";
import { officeMemberDocumentReducer } from "./slices/officeMemberDocument/officeMemberDocument.slice";
import { newsMediaReducer } from "./slices/newsMedia/newsMedia.slice";
import { newsMediaOrgReducer } from "./slices/newsMediaOrg/newsMediaOrg.slice";
import { aboutOrgReducer } from "./slices/aboutOrg/aboutOrg.slice";
import { followUsReducer } from "./slices/followUs/FollowUs.slice";
import { hotlineReducer } from "./slices/hotline/Hotline.slice";
import { searchCourseCardReducer } from "./slices/searchCourseCard/searchCourseCard.slice";
import { programCardReducer } from "./slices/programCard/programCard.slice";
import { successCardReducer } from "./slices/successCard/successCard.slice";
import { admissionResultReducer } from "./slices/admissionResult/admissionResult.slice";
import { userReducer } from "./slices/user/user.slice";
import { liveSessionReducer } from "./slices/liveSession/liveSession.slice";
import { officeDocumentReducer } from "./slices/OfficeDocument/officeDocument.slice";
import { accessibilityReducer } from "./slices/accessibility/accessibility.slice";
import { viewAllReducer } from "./slices/viewAll/viewAll.slice";

const rootReducer = combineReducers({
  accessibility: accessibilityReducer,
  user: userReducer,
  latestNews: latestNewsReducer,
  department: departmentReducer,
  poe: poeReducer,
  slider: sliderReducer,
  notice: noticeReducer,
  faculty: facultyReducer,
  quote: quoteReducer,
  quickLink: quickLinkReducer,
  programCategory: programCategoryReducer,
  program: programReducer,
  course: courseReducer,
  contactInfo: contactInfoReducer,
  facultyPerson: facultyPersonReducer,
  facultyMemberDocument: facultyMemberDocumentReducer,
  publication: publicationReducer,
  procurement: procurementReducer,
  designation: designationReducer,
  event: eventReducer,
  menu: menuReducer,
  page: pageReducer,
  component: componentReducer,
  section: sectionReducer,
  builder: builderReducer,
  header: headerReducer,
  footer: footerReducer,
  faq: faqReducer,
  faqKeyword: faqKeywordReducer,
  semesterCalender: semesterCalenderReducer,
  programCalender: programCalenderReducer,
  calenderDate: calenderDateReducer,
  partnership: partnershipReducer,
  news: newsReducer,
  studentsSay: studentsSayReducer,
  category: categoryReducer,
  achievement: achievementReducer,
  club: clubReducer,
  clubActivityRanking: clubActivityRankingReducer,
  semester: semesterReducer,
  skill: skillReducer,
  clubMember: clubMemberReducer,
  helpDesk: helpDeskReducer,
  inquery: inqueryReducer,
  office: officeReducer,
  officeMember: officeMemberReducer,
  officeMemberDocument: officeMemberDocumentReducer,
  description: descriptionReducer,
  yearlyView: yearlyViewReducer,
  job: jobReducer,
  jobApplication: jobApplicationReducer,
  schedule: scheduleReducer,
  accordion: accordionReducer,
  gallery: galleryReducer,
  campusLife: campusLifeReducer,
  alumni: alumniReducer,
  whyChoose: whyChooseReducer,
  newsMedia: newsMediaReducer,
  newsMediaOrg: newsMediaOrgReducer,
  aboutOrg: aboutOrgReducer,
  followUs: followUsReducer,
  hotline: hotlineReducer,
  searchCourseCard: searchCourseCardReducer,
  programCard: programCardReducer,
  successCard: successCardReducer,
  admissionResult: admissionResultReducer,
  liveSession: liveSessionReducer,
  officeDocuments: officeDocumentReducer,
  viewAll: viewAllReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
