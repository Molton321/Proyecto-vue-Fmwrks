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

    async createAddress(Address: Address) {
        const response = await axios.post<Address>(API_URL, Address);
        return response;
    }

    async updateAddress(id: number, Address: Address) {
        const response = await axios.put<Address>(`${API_URL}/${id}`, Address);
        return response;
    }

    async deleteAddress(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new AddressService();