import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetFacultyPersonRequest,
  GetFacultyPersonResponse,
  CreateFacultyPersonRequest,
  FacultyPerson,
  UpdateFacultyPersonRequest,
  RemoveFacultyPersonRequest,
} from "./facultyPerson.service.type";

export const facultyPersonService = {
  getFacultyPersons: async (
    getFacultyPersonRequest: GetFacultyPersonRequest
  ): Promise<Response<GetFacultyPersonResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FacultyPersons ( $page: Int!, $limit:Int! ) {
          facultyPersons ( page: $page, limit: $limit ) {
            id,
            slug,
            facultyId,
            departmentId,
            courseId,
            jobType,
            designation,
            dateOfJoining,
            isDean,
            isChairperson,
            isCoordinator,
            isAdjunct,
            isProctor,
            isAssProctor,
            isBoT,
            isAdvisor,
            onLeaveText,
            onLeave,
            name,
            roomNo,
            photo,
            signatureUrl,
            cvUrl,
            message,
            biography,
            eduDetails,
            publications,
            onGoingResearch,
            researchInterest,
            teachingMaterials,
            affiliation,
            achievements,
            participations,
            profDev,
            others,
            telephone,
            email,
            ext,
            gsLink,
            orcidLink,
            researchGateLink,
            scopusLink,
            liLink,
            fbLink,
            instaLink,
            xLink,
            order,
            isPublished,
          }
        }`,
        variables: {
          page: getFacultyPersonRequest.page,
          limit: getFacultyPersonRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createFacultyPerson: async (
    createFacultyPersonRequest: CreateFacultyPersonRequest
  ): Promise<Response<FacultyPerson>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateFacultyPersonRquest (
          $slug: String!,
          $facultyId: Int!,
          $departmentId: Int!,
          ${createFacultyPersonRequest.courseId ? " $courseId: Int," : ""}
          $jobType: String,
          $designation: String!,
          $dateOfJoining: DateTime!,
          $isDean: YesOrNo!,
          $isChairperson: YesOrNo!,
          $isCoordinator: YesOrNo!,
          $isAdjunct: YesOrNo!,
          $isProctor: YesOrNo!,
          $isAssProctor: YesOrNo!,
          $isBoT: YesOrNo!,
          $isAdvisor: YesOrNo!,
          $onLeaveText: String,
          $onLeave: YesOrNo!,
          $name: String!,
          $roomNo: String,
          $photo: Upload,
          $signatureUrl: Upload,
          $cvUrl: Upload,
          $message: String,
          $biography: String,
          $eduDetails: String,
          $publications: String,
          $onGoingResearch: String,
          $researchInterest: String,
          $teachingMaterials: String,
          $affiliation: String,
          $achievements: String,
          $participations: String,
          $profDev: String,
          $others: String,
          $telephone: String,
          $email: String,
          $ext: String,
          $gsLink: String,
          $orcidLink: String,
          $researchGateLink: String,
          $scopusLink: String,
          $liLink: String,
          $fbLink: String,
          $instaLink: String,
          $xLink: String,
          $order: Int!,
          $isPublished: YesOrNo!
        ) {
          createFacultyPersonRquest (
            createFacultyPersonRquestInput: {
              slug: $slug,
              facultyId: $facultyId,
              departmentId: $departmentId,
              ${
                createFacultyPersonRequest.courseId
                  ? " courseId: $courseId,"
                  : ""
              }
              jobType: $jobType,
              designation: $designation,
              dateOfJoining: $dateOfJoining,
              isDean: $isDean,
              isChairperson: $isChairperson,
              isCoordinator: $isCoordinator,
              isAdjunct: $isAdjunct,
              isProctor: $isProctor,
              isAssProctor: $isAssProctor,
              isBoT: $isBoT,
              isAdvisor: $isAdvisor,
              onLeaveText: $onLeaveText,
              onLeave: $onLeave,
              name: $name,
              roomNo: $roomNo,
              photo: $photo,
              signatureUrl: $signatureUrl,
              cvUrl: $cvUrl,
              message: $message,
              biography: $biography,
              eduDetails: $eduDetails,
              publications: $publications,
              onGoingResearch: $onGoingResearch,
              researchInterest: $researchInterest,
              teachingMaterials: $teachingMaterials,
              affiliation: $affiliation,
              achievements: $achievements,
              participations: $participations,
              profDev: $profDev,
              others: $others,
              telephone: $telephone,
              email: $email,
              ext: $ext,
              gsLink: $gsLink,
              orcidLink: $orcidLink,
              researchGateLink: $researchGateLink,
              scopusLink: $scopusLink,
              liLink: $liLink,
              fbLink: $fbLink,
              instaLink: $instaLink,
              xLink: $xLink,
              order: $order,
              isPublished: $isPublished,
            }
          ) {
            id,
            slug,
            facultyId,
            departmentId,
            courseId,
            jobType,
            designation,
            dateOfJoining,
            isDean,
            isChairperson,
            isCoordinator,
            isAdjunct,
            isProctor,
            isAssProctor,
            isBoT,
            isAdvisor,
            onLeaveText,
            onLeave,
            name,
            roomNo,
            photo,
            signatureUrl,
            cvUrl,
            message,
            biography,
            eduDetails,
            publications,
            onGoingResearch,
            researchInterest,
            teachingMaterials,
            affiliation,
            achievements,
            participations,
            profDev,
            others,
            telephone,
            email,
            ext,
            gsLink,
            orcidLink,
            researchGateLink,
            scopusLink,
            liLink,
            fbLink,
            instaLink,
            xLink,
            order,
            isPublished,
          }
        }`,
        variables: {
          slug: createFacultyPersonRequest.slug,
          facultyId: parseInt(createFacultyPersonRequest.facultyId.toString()),
          departmentId: parseInt(
            createFacultyPersonRequest.departmentId.toString()
          ),
          courseId:
            createFacultyPersonRequest.courseId &&
            parseInt(createFacultyPersonRequest.courseId.toString()),
          jobType: createFacultyPersonRequest.jobType,
          designation: createFacultyPersonRequest.designation,
          dateOfJoining: createFacultyPersonRequest.dateOfJoining,
          isDean: createFacultyPersonRequest.isDean,
          isChairperson: createFacultyPersonRequest.isChairperson,
          isCoordinator: createFacultyPersonRequest.isCoordinator,
          isAdjunct: createFacultyPersonRequest.isAdjunct,
          isProctor: createFacultyPersonRequest.isProctor,
          isAssProctor: createFacultyPersonRequest.isAssProctor,
          isBoT: createFacultyPersonRequest.isBoT,
          isAdvisor: createFacultyPersonRequest.isAdvisor,
          onLeaveText: createFacultyPersonRequest.onLeaveText,
          onLeave: createFacultyPersonRequest.onLeave,
          name: createFacultyPersonRequest.name,
          roomNo: createFacultyPersonRequest.roomNo,
          message: createFacultyPersonRequest.message,
          biography: createFacultyPersonRequest.biography,
          eduDetails: createFacultyPersonRequest.eduDetails,
          publications: createFacultyPersonRequest.publications,
          onGoingResearch: createFacultyPersonRequest.onGoingResearch,
          researchInterest: createFacultyPersonRequest.researchInterest,
          teachingMaterials: createFacultyPersonRequest.teachingMaterials,
          affiliation: createFacultyPersonRequest.affiliation,
          achievements: createFacultyPersonRequest.achievements,
          participations: createFacultyPersonRequest.participations,
          profDev: createFacultyPersonRequest.profDev,
          others: createFacultyPersonRequest.others,
          telephone: createFacultyPersonRequest.telephone,
          email: createFacultyPersonRequest.email,
          ext: createFacultyPersonRequest.ext,
          gsLink: createFacultyPersonRequest.gsLink,
          orcidLink: createFacultyPersonRequest.orcidLink,
          researchGateLink: createFacultyPersonRequest.researchGateLink,
          scopusLink: createFacultyPersonRequest.scopusLink,
          liLink: createFacultyPersonRequest.liLink,
          fbLink: createFacultyPersonRequest.fbLink,
          instaLink: createFacultyPersonRequest.instaLink,
          xLink: createFacultyPersonRequest.xLink,
          order: createFacultyPersonRequest.order,
          isPublished: createFacultyPersonRequest.isPublished,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      if (createFacultyPersonRequest.photo) {
        fileMap[`${fileIndex}`] = ["variables.photo"];
        fileIndex++;
      }

      if (createFacultyPersonRequest.signatureUrl) {
        fileMap[`${fileIndex}`] = ["variables.signatureUrl"];
        fileIndex++;
      }

      if (createFacultyPersonRequest.cvUrl) {
        fileMap[`${fileIndex}`] = ["variables.cvUrl"];
        fileIndex++;
      }

      formData.append("map", JSON.stringify(fileMap));

      fileIndex = 0;

      if (createFacultyPersonRequest.photo) {
        formData.append(`${fileIndex}`, createFacultyPersonRequest.photo);
        fileIndex++;
      }

      if (createFacultyPersonRequest.signatureUrl) {
        formData.append(
          `${fileIndex}`,
          createFacultyPersonRequest.signatureUrl
        );
        fileIndex++;
      }

      if (createFacultyPersonRequest.cvUrl) {
        formData.append(`${fileIndex}`, createFacultyPersonRequest.cvUrl);
        fileIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateFacultyPerson: async (
    updateFacultyPersonRequest: UpdateFacultyPersonRequest
  ): Promise<Response<FacultyPerson>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation UpdateFacultyPerson (
          $id: Int!,
          $slug: String!,
          $facultyId: Int!,
          $departmentId: Int!,
          ${updateFacultyPersonRequest.courseId ? " $courseId: Int!," : ""}
          $jobType: String,
          $designation: String!,
          $dateOfJoining: DateTime!,
          $isDean: YesOrNo!,
          $isChairperson: YesOrNo!,
          $isCoordinator: YesOrNo!,
          $isAdjunct: YesOrNo!,
          $isProctor: YesOrNo!,
          $isAssProctor: YesOrNo!,
          $isBoT: YesOrNo!,
          $isAdvisor: YesOrNo!,
          $onLeaveText: String,
          $onLeave: YesOrNo!,
          $name: String!,
          $roomNo: String,
          $photo: Upload,
          $signatureUrl: Upload,
          $cvUrl: Upload,
          $message: String,
          $biography: String,
          $eduDetails: String,
          $publications: String,
          $onGoingResearch: String,
          $researchInterest: String,
          $teachingMaterials: String,
          $affiliation: String,
          $achievements: String,
          $participations: String,
          $profDev: String,
          $others: String,
          $telephone: String,
          $email: String,
          $ext: String,
          $gsLink: String,
          $orcidLink: String,
          $researchGateLink: String,
          $scopusLink: String,
          $liLink: String,
          $fbLink: String,
          $instaLink: String,
          $xLink: String,
          $order: Int!,
          $isPublished: YesOrNo!
        ) {
          updateFacultyPerson (
            updateFacultypersonInput: {
              id: $id,
              slug: $slug,
              facultyId: $facultyId,
              departmentId: $departmentId,
              ${
                updateFacultyPersonRequest.courseId
                  ? "courseId: $courseId,"
                  : ""
              }
              jobType: $jobType,
              designation: $designation,
              dateOfJoining: $dateOfJoining,
              isDean: $isDean,
              isChairperson: $isChairperson,
              isCoordinator: $isCoordinator,
              isAdjunct: $isAdjunct,
              isProctor: $isProctor,
              isAssProctor: $isAssProctor,
              isBoT: $isBoT,
              isAdvisor: $isAdvisor,
              onLeaveText: $onLeaveText,
              onLeave: $onLeave,
              name: $name,
              roomNo: $roomNo,
              photo: $photo,
              signatureUrl: $signatureUrl,
              cvUrl: $cvUrl,
              message: $message,
              biography: $biography,
              eduDetails: $eduDetails,
              publications: $publications,
              onGoingResearch: $onGoingResearch,
              researchInterest: $researchInterest,
              teachingMaterials: $teachingMaterials,
              affiliation: $affiliation,
              achievements: $achievements,
              participations: $participations,
              profDev: $profDev,
              others: $others,
              telephone: $telephone,
              email: $email,
              ext: $ext,
              gsLink: $gsLink,
              orcidLink: $orcidLink,
              researchGateLink: $researchGateLink,
              scopusLink: $scopusLink,
              liLink: $liLink,
              fbLink: $fbLink,
              instaLink: $instaLink,
              xLink: $xLink,
              order: $order,
              isPublished: $isPublished,
            }
          ) {
            id,
            slug,
            facultyId,
            departmentId,
            courseId,
            jobType,
            designation,
            dateOfJoining,
            isDean,
            isChairperson,
            isCoordinator,
            isAdjunct,
            isProctor,
            isAssProctor,
            isBoT,
            isAdvisor,
            onLeaveText,
            onLeave,
            name,
            roomNo,
            photo,
            signatureUrl,
            cvUrl,
            message,
            biography,
            eduDetails,
            publications,
            onGoingResearch,
            researchInterest,
            teachingMaterials,
            affiliation,
            achievements,
            participations,
            profDev,
            others,
            telephone,
            email,
            ext,
            gsLink,
            orcidLink,
            researchGateLink,
            scopusLink,
            liLink,
            fbLink,
            instaLink,
            xLink,
            order,
            isPublished,
          }
        }`,
        variables: {
          id: parseInt(updateFacultyPersonRequest.id.toString()),
          slug: updateFacultyPersonRequest.slug,
          facultyId: parseInt(updateFacultyPersonRequest.facultyId.toString()),
          departmentId: parseInt(
            updateFacultyPersonRequest.departmentId.toString()
          ),
          courseId:
            updateFacultyPersonRequest.courseId &&
            parseInt(updateFacultyPersonRequest.courseId.toString()),
          jobType: updateFacultyPersonRequest.jobType,
          designation: updateFacultyPersonRequest.designation,
          dateOfJoining: updateFacultyPersonRequest.dateOfJoining,
          isDean: updateFacultyPersonRequest.isDean,
          isChairperson: updateFacultyPersonRequest.isChairperson,
          isCoordinator: updateFacultyPersonRequest.isCoordinator,
          isAdjunct: updateFacultyPersonRequest.isAdjunct,
          isProctor: updateFacultyPersonRequest.isProctor,
          isAssProctor: updateFacultyPersonRequest.isAssProctor,
          isBoT: updateFacultyPersonRequest.isBoT,
          isAdvisor: updateFacultyPersonRequest.isAdvisor,
          onLeave: updateFacultyPersonRequest.onLeave,
          onLeaveText: updateFacultyPersonRequest.onLeaveText,
          name: updateFacultyPersonRequest.name,
          roomNo: updateFacultyPersonRequest.roomNo,
          message: updateFacultyPersonRequest.message,
          biography: updateFacultyPersonRequest.biography,
          eduDetails: updateFacultyPersonRequest.eduDetails,
          publications: updateFacultyPersonRequest.publications,
          onGoingResearch: updateFacultyPersonRequest.onGoingResearch,
          researchInterest: updateFacultyPersonRequest.researchInterest,
          teachingMaterials: updateFacultyPersonRequest.teachingMaterials,
          affiliation: updateFacultyPersonRequest.affiliation,
          achievements: updateFacultyPersonRequest.achievements,
          participations: updateFacultyPersonRequest.participations,
          profDev: updateFacultyPersonRequest.profDev,
          others: updateFacultyPersonRequest.others,
          telephone: updateFacultyPersonRequest.telephone,
          email: updateFacultyPersonRequest.email,
          ext: updateFacultyPersonRequest.ext,
          gsLink: updateFacultyPersonRequest.gsLink,
          orcidLink: updateFacultyPersonRequest.orcidLink,
          researchGateLink: updateFacultyPersonRequest.researchGateLink,
          scopusLink: updateFacultyPersonRequest.scopusLink,
          liLink: updateFacultyPersonRequest.liLink,
          fbLink: updateFacultyPersonRequest.fbLink,
          instaLink: updateFacultyPersonRequest.instaLink,
          xLink: updateFacultyPersonRequest.xLink,
          order: updateFacultyPersonRequest.order,
          isPublished: updateFacultyPersonRequest.isPublished,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      if (updateFacultyPersonRequest.photo) {
        fileMap[`${fileIndex}`] = ["variables.photo"];
        fileIndex++;
      }

      if (updateFacultyPersonRequest.signatureUrl) {
        fileMap[`${fileIndex}`] = ["variables.signatureUrl"];
        fileIndex++;
      }

      if (updateFacultyPersonRequest.cvUrl) {
        fileMap[`${fileIndex}`] = ["variables.cvUrl"];
        fileIndex++;
      }

      formData.append("map", JSON.stringify(fileMap));

      fileIndex = 0;

      if (updateFacultyPersonRequest.photo) {
        formData.append(`${fileIndex}`, updateFacultyPersonRequest.photo);
        fileIndex++;
      }

      if (updateFacultyPersonRequest.signatureUrl) {
        formData.append(
          `${fileIndex}`,
          updateFacultyPersonRequest.signatureUrl
        );
        fileIndex++;
      }

      if (updateFacultyPersonRequest.cvUrl) {
        formData.append(`${fileIndex}`, updateFacultyPersonRequest.cvUrl);
        fileIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeFacultyPerson: async (
    removeFacultyPersonRequest: RemoveFacultyPersonRequest
  ): Promise<Response<FacultyPerson>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation RemoveFacultyPerson ( $id: Int! ) {
          removeFacultyPerson ( id: $id ) {
            id,
            slug,
            facultyId,
            departmentId,
            courseId,
            jobType,
            designation,
            dateOfJoining,
            isDean,
            isChairperson,
            isCoordinator,
            isAdjunct,
            isProctor,
            isAssProctor,
            onLeave,
            name,
            roomNo,
            photo,
            message,
            biography,
            eduDetails,
            publications,
            onGoingResearch,
            researchInterest,
            teachingMaterials,
            affiliation,
            achievements,
            participations,
            profDev,
            others,
            telephone,
            email,
            ext,
            gsLink,
            orcidLink,
            researchGateLink,
            scopusLink,
            liLink,
            fbLink,
            instaLink,
            xLink,
            order,
            isPublished,
          }
        }`,
        variables: {
          id: removeFacultyPersonRequest.id,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
