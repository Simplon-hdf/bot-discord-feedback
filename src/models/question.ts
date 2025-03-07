import { Answer } from './answer';

export interface Question {
  content: string;
  isMultipleAnswer: boolean;
  answers: Answer[];
} 