<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PasswordsForm from '@/components/form/PasswordsForm.vue';
import PasswordService from '@/service/crudServices/PasswordService';
import { DateTime } from 'luxon';

const router = useRouter();
const route = useRoute();
const userId = Number(route.params.id);
const passwordId = Number(route.params.id_password);

const initialValues = ref({
    content: '',
    startAt: '',
    endAt: ''
});

onMounted(async () => {
    try {
        console.log('Loading password with ID:', passwordId);
        const response = await PasswordService.getPassword(passwordId);
        const pwd = response.data;
        console.log('Loaded password:', pwd);
        initialValues.value = {
            content: pwd.content ?? '',
            startAt: pwd.startAt ? (typeof pwd.startAt === 'string' ? DateTime.fromHTTP(pwd.startAt).toFormat("yyyy-MM-dd'T'HH:mm") : pwd.startAt.toFormat("yyyy-MM-dd'T'HH:mm")) : '',
            endAt: pwd.endAt ? (typeof pwd.endAt === 'string' ? DateTime.fromHTTP(pwd.endAt).toFormat("yyyy-MM-dd'T'HH:mm") : pwd.endAt.toFormat("yyyy-MM-dd'T'HH:mm")) : ''
        };

        console.log('Initial values set:', initialValues.value);
    } catch (err) {
        alert('Error loading password');
    }
});

const handleSubmit = async (values: any) => {
    try {
        await PasswordService.updatePassword(passwordId, {
            // No se actualiza content
            startAt: values.startAt,
            endAt: values.endAt
        });
        router.push(`/user/${userId}/passwords`);
    } catch (err) {
        alert('Failed to update password.');
    }
};
</script>

<template>
    <PasswordsForm :initial-values="toRaw(initialValues)" @submit="handleSubmit" :read-only="false" />
</template>
