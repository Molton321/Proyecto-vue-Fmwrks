import axios from 'axios';
import type { User } from '../../models/User';

const API_URL = import.meta.env.VITE_API_URL + "/users";

class UserService {
    async getAllUsers() {
        const response = await axios.get<User[]>(API_URL);
        return response;
    }

    async getUser(userId: number) {
        const response = await axios.get<User>(`${API_URL}/${userId}`);
        return response;
    }

    async createUser(user: Omit<User, 'id'>) {
        const response = await axios.post<User>(API_URL, user);
        return response;
    }

    async updateUser(userId: number, user: Partial<User>) {
        const response = await axios.put<User>(`${API_URL}/${userId}`, user);
        return response;
    }

    async deleteUser(userId: number) {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response;
    }
}

export default new UserService();
