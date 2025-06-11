import axios from 'axios';
import type { Session } from '../../models/Session';

const API_URL = import.meta.env.VITE_API_URL + "/sessions";

class SessionService {
    async getAllSessions() {
        const response = await axios.get<Session[]>(API_URL);
        return response;
    }

    async getSession(sessionId: string) {
        const response = await axios.get<Session>(`${API_URL}/${sessionId}`);
        return response;
    }

    async getSessionsByUserId(userId: number) {
        const response = await axios.get<Session[]>(`${API_URL}/user/${userId}`);
        return response;
    }

    async createSession(userId: number, session: Omit<Session, 'id' | 'userId'>) { 
        const response = await axios.post<Session>(`${API_URL}/user/${userId}`, session);
        return response;
    }

    async updateSession(sessionId: string, session: Partial<Session>) {
        const response = await axios.put<Session>(`${API_URL}/${sessionId}`, session);
        return response;
    }

    async deleteSession(sessionId: string) {
        const response = await axios.delete(`${API_URL}/${sessionId}`);
        return response;
    }
}

export default new SessionService();