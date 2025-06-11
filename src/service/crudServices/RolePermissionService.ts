import axios from 'axios';
import type { rolePermission } from '../../models/rolePermission';
import type { Permission } from '../../models/Permission';
import type { Role } from '../../models/Role';

const API_URL = import.meta.env.VITE_API_URL + "/role-permissions";

class RolePermissionService {
    async getAllRolePermissions() {
        const response = await axios.get<rolePermission[]>(API_URL);
        return response;
    }

    async getRolePermission(id: string) { // Changed id to string
        const response = await axios.get<rolePermission>(`${API_URL}/${id}`);
        return response;
    }

    async getPermissionsByRoleId(roleId: number) {
        const response = await axios.get<Permission[]>(`${API_URL}/role/${roleId}`);
        return response;
    }

    async getRolesByPermissionId(permissionId: number) {
        const response = await axios.get<Role[]>(`${API_URL}/permission/${permissionId}`);
        return response;
    }

    async createRolePermission(roleId: number, permissionId: number) {
  const response = await axios.post<rolePermission>(
    `${API_URL}/role/${roleId}/permission/${permissionId}`,
    {}, // ✅ Body obligatorio aunque sea vacío
    {
      headers: {
        'Content-Type': 'application/json', // ✅ Esto previene el 415
      },
    }
  );
  return response;
}


    async updateRolePermission(id: string, data: Partial<rolePermission>) { // Changed id to string, data to Partial
        const response = await axios.put<rolePermission>(`${API_URL}/${id}`, data);
        return response;
    }

    async deleteRolePermission(roleId: number, permissionId: number) { // Added specific delete
        const response = await axios.delete(`${API_URL}/role/${roleId}/permission/${permissionId}`);
        return response;
    }

    async deleteRolePermissionById(id: string) { // Renamed and changed id to string
        const response = await axios.delete(`${API_URL}/${id}`);
        return response;
    }
}

export default new RolePermissionService();