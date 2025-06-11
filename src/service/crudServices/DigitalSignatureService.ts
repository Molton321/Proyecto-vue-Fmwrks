import axios from 'axios';
import type { digitalSignature } from '../../models/digitalSignature'; // Corrected import name

const API_URL = import.meta.env.VITE_API_URL + "/digital-signatures"; // Adjusted endpoint

class DigitalSignatureService {
    async getAllSignatures() {
        const response = await axios.get<digitalSignature[]>(API_URL);
        return response;
    }

    async getSignature(signatureId: number) {
        const response = await axios.get<digitalSignature>(`${API_URL}/${signatureId}`);
        return response;
    }

    async getSignatureByUserId(userId: number) {
        const response = await axios.get<digitalSignature>(`${API_URL}/user/${userId}`);
        return response;
    }

    async createSignature(userId: number, photo: File) {
        const formData = new FormData();
        formData.append('photo', photo);
        const response = await axios.post<digitalSignature>(`${API_URL}/user/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }

    async updateSignature(signatureId: number, photo: File) {
        const formData = new FormData();
        formData.append('photo', photo);
        const response = await axios.put<digitalSignature>(`${API_URL}/${signatureId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }

    async deleteSignature(signatureId: number) {
        const response = await axios.delete(`${API_URL}/${signatureId}`);
        return response;
    }

    async getImage(filename: string) {
        // This typically returns a blob or arraybuffer, or a direct URL for an <img> tag
        // Adjust based on how you want to handle the image in the frontend
        const response = await axios.get(`${API_URL}/${filename}`, { responseType: 'blob' });
        return response;
    }
}

export default new DigitalSignatureService();