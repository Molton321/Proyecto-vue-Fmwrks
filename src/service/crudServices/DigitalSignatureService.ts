import axios from 'axios';
import type { digitalSignature } from '../../models/digitalSignature';

const API_URL = import.meta.env.VITE_API_URL + "/digital-signature";

class DigitalSignatureService {
    async getAllDigitalSignatures() {
        const response = await axios.get<digitalSignature[]>(API_URL);
        return response;
    }

    async getDigitalSignature(id: number) {
        const response = await axios.get<digitalSignature>(`${API_URL}/${id}`);
        return response;
    }

    async createDigitalSignature(DigitalSignature: digitalSignature) {
        const response = await axios.post<digitalSignature>(API_URL, DigitalSignature);
        return response;
    }

    async updateDigitalSignature(id: number, DigitalSignature: digitalSignature) {
        const response = await axios.put<digitalSignature>(`${API_URL}/${id}`, DigitalSignature);
        return response;
    }

    async deleteDigitalSignature(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new DigitalSignatureService();