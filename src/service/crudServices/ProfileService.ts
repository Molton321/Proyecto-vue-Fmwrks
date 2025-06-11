import axios from 'axios';
import type { Profile } from '../../models/Profile';

const API_URL = import.meta.env.VITE_API_URL + "/profiles";

class ProfileService {
    async getAllProfiles() {
        const response = await axios.get<Profile[]>(API_URL);
        return response;
    }

    async getProfile(profileId: number) {
        const response = await axios.get<Profile>(`${API_URL}/${profileId}`);
        return response;
    }

    async getProfileByUserId(userId: number) {
        const response = await axios.get<Profile>(`${API_URL}/user/${userId}`);
        return response;
    }

    async createProfile(userId: number, data: Omit<Profile, 'id' | 'userId' | 'photo'>, photo?: File) {
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, (data as any)[key]));
        if (photo) {
            formData.append('photo', photo);
        }
        const response = await axios.post<Profile>(`${API_URL}/user/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }

    async updateProfile(profileId: number, data: Partial<Profile>, photo?: File) {
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, (data as any)[key]));
        if (photo) {
            formData.append('photo', photo);
        }
        const response = await axios.put<Profile>(`${API_URL}/${profileId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }

    async deleteProfile(profileId: number) {
        const response = await axios.delete(`${API_URL}/${profileId}`);
        return response;
    }

    async getProfileImage(filename: string) {
        const response = await axios.get(`${API_URL}/${filename}`, { responseType: 'blob' });
        return response;
    }
}

export default new ProfileService();