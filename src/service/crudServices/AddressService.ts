import axios from 'axios';
import type { Address } from '../../models/Address';

const API_URL = import.meta.env.VITE_API_URL + "/addresses";

class AddressService {
    async getAllAddress() {
        const response = await axios.get<Address[]>(API_URL);
        return response;
    }

    async getAddress(id: number) {
        const response = await axios.get<Address>(`${API_URL}/${id}`);
        return response;
    }

    async getAddressByUserId(userId: number) {
        const response = await axios.get<Address>(`${API_URL}/user/${userId}`); // Asumiendo que devuelve una sola dirección o la primera encontrada. Ajustar el tipo de respuesta si puede devolver Address[]
        return response;
    }

    async createAddress(userId: number, address: Address) {
        const response = await axios.post<Address>(`${API_URL}/user/${userId}`, address);
        return response;
    }

    async updateAddress(id: number, address: Address) {
        const response = await axios.put<Address>(`${API_URL}/${id}`, address);
        return response;
    }

    async deleteAddress(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new AddressService();