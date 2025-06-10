import axios from 'axios';
import type { UserRole } from '../../models/userRole';

const API_URL = import.meta.env.VITE_API_URL + "/user-Role";

class UserRoleService {
    async getAllUserRoles() {
        const response = await axios.get<UserRole[]>(API_URL);
        return response;
    }

    async getUserRole(id: number) {
        const response = await axios.get<UserRole>(`${API_URL}/${id}`);
        return response;
    }

    async createUserRole(UserRole: UserRole) {
        const response = await axios.post<UserRole>(API_URL, UserRole);
        return response;
    }

    async updateUserRole(id: number, UserRole: UserRole) {
        const response = await axios.put<UserRole>(`${API_URL}/${id}`, UserRole);
        return response;
    }

    async deleteUserRole(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new UserRoleService();