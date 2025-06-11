<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import PasswordService from '@/service/crudServices/PasswordService';

const route = useRoute();
const router = useRouter();
const userId = Number(route.params.id);
const passwords = ref<any[]>([]);
const isLoading = ref(true);

const goToCreate = () => {
    router.push(`/user/${route.params.id}/passwords/create`);
};

const goTo = (id: number, where: string) => {
    console.log(`/role/${where}/${id}`);
    router.push(`/role/${where}/${id}`);
};

const goToView = (id: number) => {
    router.push(`/user-role/view/${id}`);
};

const deletePassword = async (id: number) => {
    try {
        await PasswordService.deletePassword(id);
        // Refresh the list after deletion
        await fetchPasswords();
    } catch (error) {
        console.error('Error deleting password:', error);
    }
};

const fetchPasswords = async () => {
    try {
        const response = await PasswordService.getPasswordsByUserId(userId);
        passwords.value = Array.isArray(response.data) ? response.data : [response.data];

        console.log('Fetched passwords:', passwords.value);
    } catch (error) {
        console.error('Error fetching passwords:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchPasswords);
</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Passwords from user #{{userId}}</h1>
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Add Password
      </button>
    </div>
        <table class="min-w-full bg-white shadow rounded">
            <thead>
                <tr class="bg-gray-100">
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">Start at</th>
                    <th class="px-4 py-2">End at</th>
                    <th class="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="password in passwords" :key="password.id">
                    <td class="px-4 py-2">{{ password.id }}</td>
                    <td class="px-4 py-2">
                        <span>
                            {{ password.content.length > 10 ? password.content.slice(0, 10) + '...' : password.content }}
                            <template v-if="password.content.length > 10">
                                <button class="ml-2 text-blue-500 underline" @click="password.showFull = !password.showFull" type="button">Ver</button>
                                <span v-if="password.showFull" class="ml-2 bg-gray-100 px-2 py-1 rounded border">
                                    {{ password.content }}
                                </span>
                            </template>
                        </span>
                    </td>
                    <td class="px-4 py-2">{{ password.startAt }}</td>
                    <td class="px-4 py-2">{{ password.endAt }}</td>
                    <td class="px-4 py-2 space-x-2">
                        <button @click="goToView(password.id!)" class="text-green-500 hover:underline">View</button>
                        <button @click="goTo(password.id!, 'update')" class="text-blue-500 hover:underline">Update</button>
                        <button @click="deletePassword(password.id!)" class="text-red-500 hover:underline">Delete</button>
                    </td>
                </tr>
                <tr v-if="!isLoading && passwords.length === 0">
                    <td colspan="4" class="text-center py-4 text-gray-500">No passwords found for this user.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
