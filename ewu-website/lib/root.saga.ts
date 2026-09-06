import { all } from "redux-saga/effects";
import { getLatestNewsWatcherSaga } from "@/lib/slices/latestNews/getLatestNews.saga";
import { getDepartmentsWatcherSaga } from "@/lib/slices/department/getDepartments.saga";
import { getSlidersWatcherSaga } from "@/lib/slices/slider/getSliders.saga";
import { getNoticesWatcherSaga } from "@/lib/slices/notice/getNotices.saga";
import { getFacultysWatcherSaga } from "@/lib/slices/faculty/getFacultys.saga";
import { getQuotesWatcherSaga } from "@/lib/slices/quote/getQuotes.saga";
import { getQuickLinkWatcherSaga } from "@/lib/slices/quickLink/getQuickLink.saga";
import { getCoursesWatcherSaga } from "@/lib/slices/course/getCourses.saga";
import { getContactInfoWatcherSaga } from "@/lib/slices/contactInfo/getContactInfo.saga";
import { getDesignationsWatcherSaga } from "@/lib/slices/designation/getDesignation.saga";
import { getFacultyPersonWatcherSaga } from "@/lib/slices/facultyPerson/getFacultyPersons.saga";
import { getMenusWatcherSaga } from "@/lib/slices/menu/getMenus.saga";
import { getPagesWatcherSaga } from "@/lib/slices/page/getPages.saga";
import { getSectionsWatcherSaga } from "@/lib/slices/builder/getSection.saga";
import { getBuildersWatcherSaga } from "@/lib/slices/builder/getBuilder.saga";
import { getComponentWatcherSaga } from "@/lib/slices/component_/getComponent.saga";
import { getFaqKeywordWatcherSaga } from "@/lib/slices/faqKeyword/getFaqKeyword.saga";
import { getFaqWatcherSaga } from "@/lib/slices/faq/getFaq.saga";
import { getSemesterCalendersWatcherSaga } from "@/lib/slices/calender/semesterCalender.saga";
import { getProgramCalendersWatcherSaga } from "@/lib/slices/calender/programCalender.saga";
import { getCalenderDatesWatcherSaga } from "@/lib/slices/calender/calenderDate.saga";
import { getPartnershipsWatcherSaga } from "@/lib/slices/partnership/getPartnerships.saga";
import { getNewsWatcherSaga } from "@/lib/slices/news/getNews.saga";
import { getProgramsWatcherSaga } from "@/lib/slices/program/getPrograms.saga";
import { getProgramCategoriesWatcherSaga } from "@/lib/slices/programCategory/getProgramCategory.saga";
import { getStudentsSaysWatcherSaga } from "@/lib/slices/studentsSay/getStudentsSays.saga";
import { getEventsWatcherSaga } from "@/lib/slices/event/getEvents.saga";
import { getCategoriesWatcherSaga } from "@/lib/slices/category/getCategory.saga";
import { getAchievementsWatcherSaga } from "@/lib/slices/achievement/getAchievements.saga";
import { getClubsWatcherSaga } from "@/lib/slices/club/getClubs.saga";
import { getClubActivityRankingsWatcherSaga } from "@/lib/slices/club/getClubActivityRankings.saga";
import { getHeadersWatcherSaga } from "@/lib/slices/header/getHeaders.saga";
import { getFootersWatcherSaga } from "@/lib/slices/footer/getFooters.saga";
import { getInquerysWatcherSaga } from "@/lib/slices/inquery/getInquery.saga";
import { createInqueryWatcherSaga } from "@/lib/slices/inquery/createInquery.saga";
import { updateInqueryWatcherSaga } from "@/lib/slices/inquery/updateInquery.saga";
import { removeInqueryWatcherSaga } from "@/lib/slices/inquery/removeInquery.saga";
import { getHelpDesksWatcherSaga } from "@/lib/slices/helpDesk/getHelpDesks.saga";
import { getOfficesWatcherSaga } from "@/lib/slices/office/getOffices.saga";
import { getOfficeMembersWatcherSaga } from "@/lib/slices/officeMember/getOfficeMembers.saga";
import { getSemestersWatcherSaga } from "@/lib/slices/semester/semester.saga";
import { getSkillsWatcherSaga } from "@/lib/slices/skill/getSkills.saga";
import { createClubMemberWatcherSaga } from "@/lib/slices/clubMember/createClubMember.saga";
import { getClubMembersWatcherSaga } from "@/lib/slices/clubMember/getClubMembers.saga";
import { removeClubMemberWatcherSaga } from "@/lib/slices/clubMember/removeClubMember.saga";
import { updateClubMemberWatcherSaga } from "@/lib/slices/clubMember/updateClubMember.saga";
import { getDescriptionWatcherSaga } from "@/lib/slices/description/getDescription.saga";
import { getYearlyViewsWatcherSaga } from "@/lib/slices/yearlyView/getYearlyViews.saga";
import { getJobApplicationsWatcherSaga } from "@/lib/slices/jobApplication/getJobApplication.saga";
import { createJobApplicationWatcherSaga } from "@/lib/slices/jobApplication/createJobApplication.saga";
import { updateJobApplicationWatcherSaga } from "@/lib/slices/jobApplication/updateJobApplication.saga";
import { getJobsWatcherSaga } from "@/lib/slices/job/getJob.saga";
import { getSchedulesWatcherSaga } from "@/lib/slices/schedule/getSchedule.saga";
import { getAccordionsWatcherSaga } from "@/lib/slices/accordion/getAccordions.saga";
import { getGallerysWatcherSaga } from "@/lib/slices/gallery/getGallerys.saga";
import { getMenusWithPageIdZeroWatcherSaga } from "./slices/menu/getMenuWithPageIdZero.saga";
import { getCampusLifesWatcherSaga } from "./slices/campusLife/getCampusLifes.saga";
import { getPublicationsWatcherSaga } from "./slices/publication/getPublications.saga";
import { getAlumniWatcherSaga } from "./slices/alumni/getAlumni.saga";
import { getWhyChoosesWatcherSaga } from "./slices/whyChoose/getWhyChooses.saga";
import { getProcurementsWatcherSaga } from "./slices/procurement/getProcurements.saga";
import { getFacultyMemberDocumentsWatcherSaga } from "./slices/facultyMemberDocument/getFacultyMemberDocument.saga";
import { getPoesWatcherSaga } from "./slices/poe/getPoes.saga";
import { getOfficeMemberDocumentsWatcherSaga } from "./slices/officeMemberDocument/getOfficeMemberDocument.saga";
import { getNewsMediaWatcherSaga } from "./slices/newsMedia/getNewsMedia.saga";
import { getNewsMediaOrgWatcherSaga } from "./slices/newsMediaOrg/getNewsMediaOrg.saga";
import { getAboutOrgsWatcherSaga } from "./slices/aboutOrg/getAboutOrgs.saga";
import { getFollowUsWatcherSaga } from "./slices/followUs/getFollowUs.saga";
import { getHotlineWatcherSaga } from "./slices/hotline/getHotline.saga";
import { getSearchCourseCardWatcherSaga } from "./slices/searchCourseCard/getSearchCourseCard.saga";
import { getProgramCardWatcherSaga } from "./slices/programCard/getProgramCard.saga";
import { getSuccessCardWatcherSaga } from "./slices/successCard/getSuccessCard.saga";
import { getAdmissionResultsWatcherSaga } from "./slices/admissionResult/getAdmissionResults.saga";
import { createFacultyPersonWatcherSaga } from "./slices/facultyPerson/createFacultyPerson.saga";
import { removeFacultyPersonWatcherSaga } from "./slices/facultyPerson/removeFacultyPerson.saga";
import { updateFacultyPersonWatcherSaga } from "./slices/facultyPerson/updateFacultyPerson.saga";
import { createOfficeMemberWatcherSaga } from "./slices/officeMember/createOfficeMember.saga";
import { removeOfficeMemberWatcherSaga } from "./slices/officeMember/removeOfficeMember.saga";
import { updateOfficeMemberWatcherSaga } from "./slices/officeMember/updateOfficeMember.saga";
import { createUserWatcherSaga } from "./slices/user/createUser.saga";
import { getUsersWatcherSaga } from "./slices/user/getUsers.saga";
import { removeUserWatcherSaga } from "./slices/user/removeUser.saga";
import { updateUserWatcherSaga } from "./slices/user/updateUser.saga";
import { getLiveSessionsWatcherSaga } from "./slices/liveSession/getLiveSessions.saga";
import { getOfficeDocumentsWatcherSaga } from "./slices/OfficeDocument/getOfficeDocuments.saga";
import { getViewAllsWatcherSaga } from "./slices/viewAll/getViewAlls.saga";

export function* rootSaga() {
  yield all([
    getUsersWatcherSaga(),
    createUserWatcherSaga(),
    updateUserWatcherSaga(),
    removeUserWatcherSaga(),
    getLatestNewsWatcherSaga(),
    getDepartmentsWatcherSaga(),
    getPoesWatcherSaga(),
    getSlidersWatcherSaga(),
    getNoticesWatcherSaga(),
    getFacultysWatcherSaga(),
    getQuotesWatcherSaga(),
    getQuickLinkWatcherSaga(),
    getProgramCategoriesWatcherSaga(),
    getProgramsWatcherSaga(),
    getCoursesWatcherSaga(),
    getContactInfoWatcherSaga(),
    getDesignationsWatcherSaga(),
    getFacultyPersonWatcherSaga(),
    createFacultyPersonWatcherSaga(),
    updateFacultyPersonWatcherSaga(),
    removeFacultyPersonWatcherSaga(),
    getFacultyMemberDocumentsWatcherSaga(),
    getPublicationsWatcherSaga(),
    getProcurementsWatcherSaga(),
    getEventsWatcherSaga(),
    getMenusWatcherSaga(),
    getMenusWithPageIdZeroWatcherSaga(),
    getComponentWatcherSaga(),
    getPagesWatcherSaga(),
    getSectionsWatcherSaga(),
    getBuildersWatcherSaga(),
    getHeadersWatcherSaga(),
    getFootersWatcherSaga(),
    getFaqWatcherSaga(),
    getFaqKeywordWatcherSaga(),
    getSemesterCalendersWatcherSaga(),
    getProgramCalendersWatcherSaga(),
    getCalenderDatesWatcherSaga(),
    getPartnershipsWatcherSaga(),
    getNewsWatcherSaga(),
    getStudentsSaysWatcherSaga(),
    getCategoriesWatcherSaga(),
    getAchievementsWatcherSaga(),
    getClubsWatcherSaga(),
    getClubActivityRankingsWatcherSaga(),
    getSemestersWatcherSaga(),
    getSkillsWatcherSaga(),
    getHelpDesksWatcherSaga(),
    getOfficesWatcherSaga(),
    getOfficeMembersWatcherSaga(),
    createOfficeMemberWatcherSaga(),
    updateOfficeMemberWatcherSaga(),
    removeOfficeMemberWatcherSaga(),
    getOfficeMemberDocumentsWatcherSaga(),
    getDescriptionWatcherSaga(),
    getYearlyViewsWatcherSaga(),
    getJobsWatcherSaga(),
    getSchedulesWatcherSaga(),
    getAccordionsWatcherSaga(),
    getGallerysWatcherSaga(),
    getCampusLifesWatcherSaga(),
    getAlumniWatcherSaga(),
    getWhyChoosesWatcherSaga(),

    getClubMembersWatcherSaga(),
    createClubMemberWatcherSaga(),
    updateClubMemberWatcherSaga(),
    removeClubMemberWatcherSaga(),

    getInquerysWatcherSaga(),
    createInqueryWatcherSaga(),
    updateInqueryWatcherSaga(),
    removeInqueryWatcherSaga(),

    getJobApplicationsWatcherSaga(),
    createJobApplicationWatcherSaga(),
    updateJobApplicationWatcherSaga(),

    getNewsMediaWatcherSaga(),
    getNewsMediaOrgWatcherSaga(),
    getAboutOrgsWatcherSaga(),
    getFollowUsWatcherSaga(),
    getHotlineWatcherSaga(),
    getSearchCourseCardWatcherSaga(),
    getProgramCardWatcherSaga(),
    getSuccessCardWatcherSaga(),
    getAdmissionResultsWatcherSaga(),
    getLiveSessionsWatcherSaga(),
    getOfficeDocumentsWatcherSaga(),
    getViewAllsWatcherSaga(),
  ]);
}
