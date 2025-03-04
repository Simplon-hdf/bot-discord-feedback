import { Question } from './question';

export interface Poll {
  title: string;
  uuidMessage: string;
  isAnonymous: boolean;
  isClosed: boolean;
  duration: number;
  questions: Question[];
} 