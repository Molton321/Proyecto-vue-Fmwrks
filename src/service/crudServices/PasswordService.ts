import axios from 'axios';
import type { Password } from '../../models/Password';

const API_URL = import.meta.env.VITE_API_URL + "/passwords";

class PasswordService {
    async getAllPasswords() {
        const response = await axios.get<Password[]>(API_URL);
        return response;
    }

    async getPassword(passwordId: number) {
        const response = await axios.get<Password>(`${API_URL}/${passwordId}`);
        return response;
    }

    async getPasswordsByUserId(userId: number) {
        const response = await axios.get<Password[]>(`${API_URL}/user/${userId}`);
        return response;
    }

    async getCurrentPasswordByUserId(userId: number) {
        const response = await axios.get<Password>(`${API_URL}/user/${userId}/current`);
        return response;
    }

    async createPassword(userId: number, password: Omit<Password, 'id' | 'userId'>) { // Assuming password data doesn't include id or userId in payload
        const response = await axios.post<Password>(`${API_URL}/user/${userId}`, password);
        return response;
    }

    async updatePassword(passwordId: number, password: Partial<Password>) {
        const response = await axios.put<Password>(`${API_URL}/${passwordId}`, password);
        return response;
    }

    async deletePassword(passwordId: number) {
        const response = await axios.delete(`${API_URL}/${passwordId}`);
        return response;
    }
}

export default new PasswordService();