import axios from 'axios';
import type { Answer } from '../../models/Answer';

const API_URL = import.meta.env.VITE_API_URL + "/answers";

class AnswerService {
    async getAllAnswers() {
        const response = await axios.get<Answer[]>(API_URL);
        return response;
    }

    async getAnswer(answerId: number) {
        const response = await axios.get<Answer>(`${API_URL}/${answerId}`);
        return response;
    }

    async getAnswersByUserId(userId: number) {
        const response = await axios.get<Answer[]>(`${API_URL}/user/${userId}`);
        return response;
    }

    async getAnswersByQuestionId(questionId: number) {
        const response = await axios.get<Answer[]>(`${API_URL}/question/${questionId}`);
        return response;
    }

    async getUserAnswerForQuestion(userId: number, questionId: number) {
        const response = await axios.get<Answer>(`${API_URL}/user/${userId}/question/${questionId}`);
        return response;
    }

    async createAnswer(userId: number, questionId: number, answer: Omit<Answer, 'id'>) {
        const response = await axios.post<Answer>(`${API_URL}/user/${userId}/question/${questionId}`, answer);
        return response;
    }

    async updateAnswer(answerId: number, answer: Partial<Answer>) {
        const response = await axios.put<Answer>(`${API_URL}/${answerId}`, answer);
        return response;
    }

    async deleteAnswer(answerId: number) {
        const response = await axios.delete(`${API_URL}/${answerId}`);
        return response;
    }
}

export default new AnswerService();