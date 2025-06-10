<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Components',
        items: [
            { label: 'Address', icon: 'pi pi-fw pi-map-marker', to: '/address' },
    { label: 'Answer', icon: 'pi pi-fw pi-question-circle', to: '/answer' },
    { label: 'Device', icon: 'pi pi-fw pi-mobile', to: '/device' },
    { label: 'Digital Signature', icon: 'pi pi-fw pi-pencil', to: '/digital-signature' },
    { label: 'Password', icon: 'pi pi-fw pi-lock', to: '/password' },
    { label: 'Permission', icon: 'pi pi-fw pi-key', to: '/permission' },
    { label: 'Profile', icon: 'pi pi-fw pi-user', to: '/profile' },
    { label: 'Role', icon: 'pi pi-fw pi-users', to: '/role' },
    { label: 'Role permission', icon: 'pi pi-fw pi-shield', to: '/role-permission' },
    { label: 'Security question', icon: 'pi pi-fw pi-info-circle', to: '/security-question' },
    { label: 'Session', icon: 'pi pi-fw pi-clock', to: '/session' },
    { label: 'User', icon: 'pi pi-fw pi-user-edit', to: '/user' },
    { label: 'User role', icon: 'pi pi-fw pi-user-plus', to: '/user-role' }
        ]
    },
    {
        label: 'Authentication',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            
                    {
                        label: 'Sing Up',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/login2'
                    }
                
            
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
