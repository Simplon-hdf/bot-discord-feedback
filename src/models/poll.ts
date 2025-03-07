import { Question } from './question';

export interface Poll {
	title: string;
	uuidAuthor: string;
	uuidMessage: string;
	isAnonymous: boolean;
	duration: number;
	questions: Question[];
	selectedQuestions: number[];
} 