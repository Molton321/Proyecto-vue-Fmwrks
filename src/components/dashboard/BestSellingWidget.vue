<script setup>
import { ref } from 'vue';

const menu = ref(null);

const items = ref([
    { label: 'Add Role', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove Role', icon: 'pi pi-fw pi-trash' }
]);
</script>

<template>
    <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Most Assigned Roles</div>
            <div>
                <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu.toggle($event)" />
                <Menu ref="menu" popup :model="items" class="!min-w-40" />
            </div>
        </div>

        <ul class="list-none p-0 m-0">
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Administrator</span>
                    <div class="mt-1 text-muted-color">Full access to system modules</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-orange-500 h-full" style="width: 80%"></div>
                    </div>
                    <span class="text-orange-500 ml-4 font-medium">80%</span>
                </div>
            </li>

            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Security Analyst</span>
                    <div class="mt-1 text-muted-color">Monitors user sessions and logs</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-teal-500 h-full" style="width: 65%"></div>
                    </div>
                    <span class="text-teal-500 ml-4 font-medium">65%</span>
                </div>
            </li>

            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Auditor</span>
                    <div class="mt-1 text-muted-color">Read-only access to all logs</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-purple-500 h-full" style="width: 45%"></div>
                    </div>
                    <span class="text-purple-500 ml-4 font-medium">45%</span>
                </div>
            </li>

            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Support Agent</span>
                    <div class="mt-1 text-muted-color">Manages user sessions and devices</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-cyan-500 h-full" style="width: 30%"></div>
                    </div>
                    <span class="text-cyan-500 ml-4 font-medium">30%</span>
                </div>
            </li>

            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Viewer</span>
                    <div class="mt-1 text-muted-color">Can only see dashboards</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-pink-500 h-full" style="width: 20%"></div>
                    </div>
                    <span class="text-pink-500 ml-4 font-medium">20%</span>
                </div>
            </li>
        </ul>
    </div>
</template>
