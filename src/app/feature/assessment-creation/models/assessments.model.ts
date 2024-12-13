export interface Quiz {
  id: number;
  name: string;
  location: string;
  duration: string;
  passMark: string;
  dateCreated: string;
}

export interface createQuizOptions {
  description: string;
  isCorrect: boolean;
}

export interface createQuizQuestion {
  description: string;
  points: string;
  imageFile?: string;
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

export interface getAllQuizzesResponse {
  data: {
    content: Quiz[]; // Replace 'Quiz' with the appropriate interface/type for your quiz objects
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: any[]; // Replace 'any[]' with the appropriate type if the sort structure is defined
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    size: number;
    sort: any[]; // Replace 'any[]' with the appropriate type
    totalElements: number;
    totalPages: number;
  };
  message: string;
  statusCode: number;
  success: boolean;
}
