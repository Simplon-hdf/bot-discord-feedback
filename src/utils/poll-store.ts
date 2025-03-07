import { Poll } from "../models/poll";

const pollMap = new Map<string, Poll>();

export function createPollObject(userId: string, title: string): Poll {
    const poll: Poll = {
        title: title,
        uuidMessage: "",
        uuidAuthor: userId,
        isAnonymous: false,
        duration: 1,
        questions: [],
        selectedQuestions: []
    };

    pollMap.set(userId, poll);
    return poll;
}

export function getPollObject(userId: string): Poll | undefined {
    return pollMap.get(userId);
}

export function deletePollObject(userId: string): void {
    pollMap.delete(userId);
}

export function addPollQuestion(poll: Poll, question: string) {
    poll.questions.push({
        content: question,
        isMultipleAnswer: false,
        answers: []
    });
}

export function removePollQuestion(poll: Poll) {
    poll.selectedQuestions.sort((a, b) => b - a);
    poll.selectedQuestions.forEach(index => {
        poll.questions.splice(index, 1);
    });
    poll.selectedQuestions = [];
}
