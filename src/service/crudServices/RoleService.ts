import axios from 'axios';
import type { Role } from '../../models/Role';

const API_URL = import.meta.env.VITE_API_URL + "/roles";

class RoleService {
    async getAllRoles() {
        const response = await axios.get<Role[]>(API_URL);
        return response;
    }

    async getRole(roleId: number) {
        const response = await axios.get<Role>(`${API_URL}/${roleId}`);
        return response;
    }

    async createRole(role: Omit<Role, 'id'>) {
        const response = await axios.post<Role>(API_URL, role);
        return response;
    }

    async updateRole(roleId: number, role: Partial<Role>) {
        const response = await axios.put<Role>(`${API_URL}/${roleId}`, role);
        return response;
    }

    async deleteRole(roleId: number) {
        const response = await axios.delete(`${API_URL}/${roleId}`);
        return response;
    }
}

export default new RoleService();