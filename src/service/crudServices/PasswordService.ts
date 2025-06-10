import axios from 'axios';
import type { Password } from '../../models/Password';

const API_URL = import.meta.env.VITE_API_URL + "/passwords";

class PasswordService {
    async getAllPasswords() {
        const response = await axios.get<Password[]>(API_URL);
        return response;
    }

    async getPassword(id: number) {
        const response = await axios.get<Password>(`${API_URL}/${id}`);
        return response;
    }

    async createPassword(Password: Password) {
        const response = await axios.post<Password>(API_URL, Password);
        return response;
    }

    async updatePassword(id: number, Password: Password) {
        const response = await axios.put<Password>(`${API_URL}/${id}`, Password);
        return response;
    }

    async deletePassword(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new PasswordService();