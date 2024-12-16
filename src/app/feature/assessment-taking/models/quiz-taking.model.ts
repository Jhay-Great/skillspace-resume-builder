export interface AvailableQuiz {
  quizId: number;
  quizName: string;
  publishedDate: string;
  requiredPassMark: number;
  totalMark: number;
  createdBy: string;
}

export interface AllQuizzes {
  id: number;
  requiredQuizId: number;
  quizName: string;
  companyName: string;
  badgeName: string;
  score: number;
  badgeStatus: string;
  lastModified: string;
  nextRetry: string;
  totalRetries: number;
}

export interface Company {
  email: string;
  companyName: string;
  contact: string;
  website: string;
  logo: string;
  certificate: string;
}

export interface DropdownItem {
  name: string;
  code: string;
}

export interface Options {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  description: string;
  imageUrl?: string | ArrayBuffer | null;
  options: Options[];
}

export interface QuizToTake {
  id: number;
  name: string;
  duration: number;
  questions: Question[];
}
