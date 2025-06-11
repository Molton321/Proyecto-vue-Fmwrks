<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Components',
        items: [
    { label: 'Permission', icon: 'pi pi-fw pi-key', to: '/permission' },
    { label: 'Role', icon: 'pi pi-fw pi-users', to: '/role' },
    { label: 'User', icon: 'pi pi-fw pi-user-edit', to: '/user' }
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
