import axios from 'axios';
import type { SecurityQuestion } from '../../models/securityQuestion';

const API_URL = import.meta.env.VITE_API_URL + "/security-questions";

class SecurityQuestionService {
    async getAllSecurityQuestions() {
        const response = await axios.get<SecurityQuestion[]>(API_URL);
        return response;
    }

    async getSecurityQuestion(questionId: number) {
        const response = await axios.get<SecurityQuestion>(`${API_URL}/${questionId}`);
        return response;
    }

    async createSecurityQuestion(question: Omit<SecurityQuestion, 'id'>) {
        const response = await axios.post<SecurityQuestion>(API_URL, question);
        return response;
    }

    async updateSecurityQuestion(questionId: number, question: Partial<SecurityQuestion>) {
        const response = await axios.put<SecurityQuestion>(`${API_URL}/${questionId}`, question);
        return response;
    }

    async deleteSecurityQuestion(questionId: number) {
        const response = await axios.delete(`${API_URL}/${questionId}`);
        return response;
    }
}

export default new SecurityQuestionService();