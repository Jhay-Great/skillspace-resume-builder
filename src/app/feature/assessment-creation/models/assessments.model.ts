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
  image?: string;
}
