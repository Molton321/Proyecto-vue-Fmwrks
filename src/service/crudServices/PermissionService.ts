import axios from 'axios';
import type { Permission } from '../../models/Permission';

const API_URL = import.meta.env.VITE_API_URL + "/permissions";

class PermissionService {
    async getAllPermissions() {
        const response = await axios.get<Permission[]>(API_URL);
        return response;
    }

    async getPermission(permissionId: number) {
        const response = await axios.get<Permission>(`${API_URL}/${permissionId}`);
        return response;
    }

    async createPermission(permission: Omit<Permission, 'id'>) {
        const response = await axios.post<Permission>(API_URL, permission);
        return response;
    }

    async updatePermission(permissionId: number, permission: Partial<Permission>) {
        const response = await axios.put<Permission>(`${API_URL}/${permissionId}`, permission);
        return response;
    }

    async deletePermission(permissionId: number) {
        const response = await axios.delete(`${API_URL}/${permissionId}`);
        return response;
    }

    async getPermissionsGroupedByRole(roleId: number) {
        // Assuming the response structure is a custom one, adjust <any> if a specific model exists
        const response = await axios.get<any>(`${API_URL}/grouped/role/${roleId}`);
        return response;
    }
}

export default new PermissionService();