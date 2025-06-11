import axios from 'axios';
import type { UserRole } from '../../models/userRole';
import type { Role } from '../../models/Role';
import type { User } from '../../models/User';

const API_URL = import.meta.env.VITE_API_URL + "/user-roles";

class UserRoleService {
    async getAllUserRoles() {
        const response = await axios.get<UserRole[]>(API_URL);
        return response;
    }

    async getUserRole(userRoleId: string) {
        const response = await axios.get<UserRole>(`${API_URL}/${userRoleId}`);
        return response;
    }

    async getRolesByUserId(userId: number) {
        const response = await axios.get<Role[]>(`${API_URL}/user/${userId}`);
        return response;
    }

    async getUsersByRoleId(roleId: number) {
        const response = await axios.get<User[]>(`${API_URL}/role/${roleId}`);
        return response;
    }

    async createUserRole(userId: number, roleId: number, data?: any) { // data is optional as per routes
        const response = await axios.post<UserRole>(`${API_URL}/user/${userId}/role/${roleId}`, data ?? {});
        return response;
    }

    async updateUserRole(userRoleId: string, data: Partial<UserRole>) {
        const response = await axios.put<UserRole>(`${API_URL}/${userRoleId}`, data);
        return response;
    }

    async deleteUserRole(userRoleId: string) {
        const response = await axios.delete(`${API_URL}/${userRoleId}`);
        return response;
    }
}

export default new UserRoleService();