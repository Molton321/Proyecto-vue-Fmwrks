import axios from 'axios';
import type { Device } from '../../models/Device';

const API_URL = import.meta.env.VITE_API_URL + "/devices";

class DeviceService {
    async getAllDevices() {
        const response = await axios.get<Device[]>(API_URL);
        return response;
    }

    async getDevice(deviceId: number) {
        const response = await axios.get<Device>(`${API_URL}/${deviceId}`);
        return response;
    }

    async getDevicesByUserId(userId: number) {
        const response = await axios.get<Device[]>(`${API_URL}/user/${userId}`);
        return response;
    }

    async createDevice(userId: number, device: Omit<Device, 'id'>) {
        const response = await axios.post<Device>(`${API_URL}/user/${userId}`, device);
        return response;
    }

    async updateDevice(deviceId: number, device: Partial<Device>) {
        const response = await axios.put<Device>(`${API_URL}/${deviceId}`, device);
        return response;
    }

    async deleteDevice(deviceId: number) {
        const response = await axios.delete(`${API_URL}/${deviceId}`);
        return response;
    }
}

export default new DeviceService();