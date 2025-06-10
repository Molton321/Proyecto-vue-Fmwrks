import axios from 'axios';
import type { rolePermission } from '../../models/rolePermission';

const API_URL = import.meta.env.VITE_API_URL + "/role-permissions";

class RolePermissionService {
    async getAllRolePermissions() {
        const response = await axios.get<rolePermission[]>(API_URL);
        return response;
    }

    async getRolePermission(id: number) {
        const response = await axios.get<rolePermission>(`${API_URL}/${id}`);
        return response;
    }

    async createRolePermission(RolePermission: rolePermission) {
        const response = await axios.post<rolePermission>(API_URL, RolePermission);
        return response;
    }

    async updateRolePermission(id: number, RolePermission: rolePermission) {
        const response = await axios.put<rolePermission>(`${API_URL}/${id}`, RolePermission);
        return response;
    }

    async deleteRolePermission(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new RolePermissionService();