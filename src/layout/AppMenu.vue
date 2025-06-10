<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Address', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Answer', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Device', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Digital Signature', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'Password', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Permission', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Profile', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Role', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Role permission', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Security question', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            { label: 'Session', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'User', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'User role', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
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
                        to: '/auth/login'
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
