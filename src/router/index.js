import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/store/Auth';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                
                
                {
                    path: '/address',
                    name: 'address',
                    component: () => import('@/views/pages/CRUD/address/list.vue')
                },
                {
                    path: '/address/create',
                    name: 'address create',
                    component: () => import('@/views/pages/CRUD/address/create.vue')
                },
                {
                    path: '/address/update/:id',
                    name: 'address update',
                    component: () => import('@/views/pages/CRUD/address/update.vue')
                },
                {
                    path: '/address/view/:id',
                    name: 'address view',
                    component: () => import('@/views/pages/CRUD/address/view.vue')
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('@/views/pages/CRUD/profile/list.vue')
                },
                {
                    path: '/profile/create',
                    name: 'profile create',
                    component: () => import('@/views/pages/CRUD/profile/create.vue')
                },
                {
                    path: '/profile/update/:id',
                    name: 'profile update',
                    component: () => import('@/views/pages/CRUD/profile/update.vue')
                },
                {
                    path: '/profile/view/:id',
                    name: 'profile view',
                    component: () => import('@/views/pages/CRUD/profile/view.vue')
                },
                {
                    path: '/digital-signature',
                    name: 'digital signature',
                    component: () => import('@/views/pages/CRUD/digitalSignature/list.vue')
                },
                {
                    path: '/digital-signature/create',
                    name: 'digital signature create',
                    component: () => import('@/views/pages/CRUD/digitalSignature/create.vue')
                },
                {
                    path: '/digital-signature/update/:id',
                    name: 'digital signature update',
                    component: () => import('@/views/pages/CRUD/digitalSignature/update.vue')
                },
                {
                    path: '/digital-signature/view/:id',
                    name: 'digital signature view',
                    component: () => import('@/views/pages/CRUD/digitalSignature/view.vue')
                },

                {
                    path: '/answer',
                    name: 'answer',
                    component: () => import('@/views/pages/CRUD/answer/list.vue')
                },
                {
                    path: '/answer/create',
                    name: 'answer create',
                    component: () => import('@/views/pages/CRUD/answer/create.vue')
                },
                {
                    path: '/answer/update/:id',
                    name: 'answer update',
                    component: () => import('@/views/pages/CRUD/answer/update.vue')
                },
                {
                    path: '/answer/view/:id',
                    name: 'answer view',
                    component: () => import('@/views/pages/CRUD/answer/view.vue')
                },

                {
                    path: '/security-question',
                    name: 'security question',
                    component: () => import('@/views/pages/CRUD/securityQuestion/list.vue')
                },
                {
                    path: '/security-question/create',
                    name: 'security question create',
                    component: () => import('@/views/pages/CRUD/securityQuestion/create.vue')
                },
                {
                    path: '/security-question/update/:id',
                    name: 'security question update',
                    component: () => import('@/views/pages/CRUD/securityQuestion/update.vue')
                },
                {
                    path: '/security-question/view/:id',
                    name: 'security question view',
                    component: () => import('@/views/pages/CRUD/securityQuestion/view.vue')
                },

                {
                    path: '/device',
                    name: 'device',
                    component: () => import('@/views/pages/CRUD/device/list.vue')
                },
                {
                    path: '/device/create',
                    name: 'device create',
                    component: () => import('@/views/pages/CRUD/device/create.vue')
                },
                {
                    path: '/device/update/:id',
                    name: 'device update',
                    component: () => import('@/views/pages/CRUD/device/update.vue')
                },
                {
                    path: '/device/view/:id',
                    name: 'device view',
                    component: () => import('@/views/pages/CRUD/device/view.vue')
                },

                {
                    path: '/password',
                    name: 'password',
                    component: () => import('@/views/pages/CRUD/password/list.vue')
                },
                {
                    path: '/password/create',
                    name: 'password create',
                    component: () => import('@/views/pages/CRUD/password/create.vue')
                },
                {
                    path: '/password/update/:id',
                    name: 'password update',
                    component: () => import('@/views/pages/CRUD/password/update.vue')
                },
                {
                    path: '/password/view/:id',
                    name: 'password view',
                    component: () => import('@/views/pages/CRUD/password/view.vue')
                },

                {
                    path: '/session',
                    name: 'session',
                    component: () => import('@/views/pages/CRUD/session/list.vue')
                },
                {
                    path: '/session/create',
                    name: 'session create',
                    component: () => import('@/views/pages/CRUD/session/create.vue')
                },
                {
                    path: '/session/update/:id',
                    name: 'session update',
                    component: () => import('@/views/pages/CRUD/session/update.vue')
                },
                {
                    path: '/session/view/:id',
                    name: 'session view',
                    component: () => import('@/views/pages/CRUD/session/view.vue')
                },

                {
                    path: '/role',
                    name: 'role',
                    component: () => import('@/views/pages/CRUD/role/list.vue')
                },
                {
                    path: '/role/create',
                    name: 'role create',
                    component: () => import('@/views/pages/CRUD/role/create.vue')
                },
                {
                    path: '/role/update/:id',
                    name: 'role update',
                    component: () => import('@/views/pages/CRUD/role/update.vue')
                },
                {
                    path: '/role/view/:id',
                    name: 'role view',
                    component: () => import('@/views/pages/CRUD/role/view.vue')
                },

                {
                    path: '/user-role',
                    name: 'user role',
                    component: () => import('@/views/pages/CRUD/userRole/list.vue')
                },
                {
                    path: '/user-role/create',
                    name: 'user role create',
                    component: () => import('@/views/pages/CRUD/userRole/create.vue')
                },
                {
                    path: '/user-role/update/:id',
                    name: 'user role update',
                    component: () => import('@/views/pages/CRUD/userRole/update.vue')
                },
                {
                    path: '/user-role/view/:id',
                    name: 'user role view',
                    component: () => import('@/views/pages/CRUD/userRole/view.vue')
                },

                {
                    path: '/permission',
                    name: 'permission',
                    component: () => import('@/views/pages/CRUD/permission/list.vue')
                },
                {
                    path: '/permission/create',
                    name: 'permission create',
                    component: () => import('@/views/pages/CRUD/permission/create.vue')
                },
                {
                    path: '/permission/update/:id',
                    name: 'permission update',
                    component: () => import('@/views/pages/CRUD/permission/update.vue')
                },
                {
                    path: '/permission/view/:id',
                    name: 'permission view',
                    component: () => import('@/views/pages/CRUD/permission/view.vue')
                },

                {
                    path: '/role-permission',
                    name: 'role permission',
                    component: () => import('@/views/pages/CRUD/rolePermission/list.vue')
                },
                {
                    path: '/role-permission/create',
                    name: 'role permission create',
                    component: () => import('@/views/pages/CRUD/rolePermission/create.vue')
                },
                {
                    path: '/role-permission/update/:id',
                    name: 'role permission update',
                    component: () => import('@/views/pages/CRUD/rolePermission/update.vue')
                },
                {
                    path: '/role-permission/view/:id',
                    name: 'role permission view',
                    component: () => import('@/views/pages/CRUD/rolePermission/view.vue')
                },
                {
                    path: '/login2',
                    name: 'login2',
                    component: () => import('@/views/pages/auth/Login2.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/TableDoc.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/ListDoc.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/TreeDoc.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/OverlayDoc.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue')
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/MiscDoc.vue')
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

// Configurar el guardián de ruta
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();  // Obtener el estado de autenticación desde Pinia
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está logueado, redirigir al login
        next({ path: '/login2' });
    } else {
        // Si no requiere autenticación o el usuario está logueado, continuar con la ruta
        next();
    }
});


export default router;
