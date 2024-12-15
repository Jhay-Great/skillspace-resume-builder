export interface Quiz {
  id: number;
  name: string;
  location: string;
  duration: string;
  passMark: string;
  dateCreated: string;
}

// export interface createQuiz {

// }

export interface AssessmentCreationQuiz {
  id: number;
  name: string;
  badge: string;
  duration: number;
  passMark: number;
  isGlobal: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  retakeOption: number;
  totalScore: number;
  questions: createQuizQuestion[];
}

export interface createQuizOptions {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface createQuizQuestion {
  id: number;
  description: string;
  points: number;
  options: createQuizOptions[];
}

export interface CreateQuizData {
  saveToGlobal: boolean;
  name: string;
  duration: string;
  passMark: string;
  retakeOption: string;
  badgeName: string;
  questions: createQuizQuestion[];
  // image?: string;
}

export interface getQuizBylocationParams {
  location: string;
  page: number;
  size: number;
}

export interface AssessmentCreationResponse {
  message: string;
  statusCode: number;
  success: boolean;
}
export interface ResponseData {
  content: AssessmentCreationQuiz[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: number[];
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  sort: number[];
  totalElements: number;
  totalPages: number;
};

export interface getQuizByIdResponse extends AssessmentCreationResponse {
  data: AssessmentCreationQuiz;
}

export interface getQuizzesByLocationResponse extends AssessmentCreationResponse {
  data: ResponseData
}

export interface deleteQuizResponse extends AssessmentCreationResponse {
  data: null
}

export interface getAllQuizzesResponse extends AssessmentCreationResponse {
  data: ResponseData
}

export interface AssessmentsTab {
  label: string;
  data: any;
}
