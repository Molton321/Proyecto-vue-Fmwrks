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
                    component: () => import('@/views/Dashboard.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/address/create',
                    name: 'address create',
                    component: () => import('@/views/pages/CRUD/address/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/address/update/:id',
                    name: 'address update',
                    component: () => import('@/views/pages/CRUD/address/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/address/view/:id',
                    name: 'address view',
                    component: () => import('@/views/pages/CRUD/address/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/profile/create',
                    name: 'profile create',
                    component: () => import('@/views/pages/CRUD/profile/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/profile/update/:id',
                    name: 'profile update',
                    component: () => import('@/views/pages/CRUD/profile/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/profile/view/:id',
                    name: 'profile view',
                    component: () => import('@/views/pages/CRUD/profile/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/digital-signature/create',
                    name: 'digital signature create',
                    component: () => import('@/views/pages/CRUD/digitalSignature/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/digital-signature/update/:id',
                    name: 'digital signature update',
                    component: () => import('@/views/pages/CRUD/digitalSignature/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/digital-signature/view/:id',
                    name: 'digital signature view',
                    component: () => import('@/views/pages/CRUD/digitalSignature/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/answer/create',
                    name: 'answer create',
                    component: () => import('@/views/pages/CRUD/answer/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/answer/update/:id',
                    name: 'answer update',
                    component: () => import('@/views/pages/CRUD/answer/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/answer/view/:id',
                    name: 'answer view',
                    component: () => import('@/views/pages/CRUD/answer/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/security-question/create',
                    name: 'security question create',
                    component: () => import('@/views/pages/CRUD/securityQuestion/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/security-question/update/:id',
                    name: 'security question update',
                    component: () => import('@/views/pages/CRUD/securityQuestion/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/security-question/view/:id',
                    name: 'security question view',
                    component: () => import('@/views/pages/CRUD/securityQuestion/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/device/create',
                    name: 'device create',
                    component: () => import('@/views/pages/CRUD/device/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/device/update/:id',
                    name: 'device update',
                    component: () => import('@/views/pages/CRUD/device/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/device/view/:id',
                    name: 'device view',
                    component: () => import('@/views/pages/CRUD/device/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/user/:id/passwords',
                    name: 'password list',
                    component: () => import('@/views/pages/CRUD/password/list.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user/:id/passwords/create',
                    name: 'password create',
                    component: () => import('@/views/pages/CRUD/password/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user/:id/passwords/update/:id',
                    name: 'password update',
                    component: () => import('@/views/pages/CRUD/password/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user/:id/passwords/view/:id',
                    name: 'password view',
                    component: () => import('@/views/pages/CRUD/password/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/session/create',
                    name: 'session create',
                    component: () => import('@/views/pages/CRUD/session/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/session/update/:id',
                    name: 'session update',
                    component: () => import('@/views/pages/CRUD/session/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/session/view/:id',
                    name: 'session view',
                    component: () => import('@/views/pages/CRUD/session/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/role',
                    name: 'role',
                    component: () => import('@/views/pages/CRUD/role/list.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/role/create',
                    name: 'role create',
                    component: () => import('@/views/pages/CRUD/role/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/role/update/:id',
                    name: 'role update',
                    component: () => import('@/views/pages/CRUD/role/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/role/view/:id',
                    name: 'role view',
                    component: () => import('@/views/pages/CRUD/role/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/user-role/create/:id',
                    name: 'user role create',
                    component: () => import('@/views/pages/CRUD/userRole/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user-role/view/:id',
                    name: 'user role view',
                    component: () => import('@/views/pages/CRUD/userRole/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/user',
                    name: 'user',
                    component: () => import('@/views/pages/CRUD/users/list.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user/create',
                    name: 'user create',
                    component: () => import('@/views/pages/CRUD/users/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user/update/:id',
                    name: 'user update',
                    component: () => import('@/views/pages/CRUD/users/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user/view/:id',
                    name: 'user view',
                    component: () => import('@/views/pages/CRUD/users/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/permission',
                    name: 'permission',
                    component: () => import('@/views/pages/CRUD/permission/list.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/permission/create',
                    name: 'permission create',
                    component: () => import('@/views/pages/CRUD/permission/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/permission/update/:id',
                    name: 'permission update',
                    component: () => import('@/views/pages/CRUD/permission/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/permission/view/:id',
                    name: 'permission view',
                    component: () => import('@/views/pages/CRUD/permission/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/role-permission/create',
                    name: 'role permission create',
                    component: () => import('@/views/pages/CRUD/rolePermission/create.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/role-permission/update/:id',
                    name: 'role permission update',
                    component: () => import('@/views/pages/CRUD/rolePermission/update.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/role-permission/view/:id',
                    name: 'role permission view',
                    component: () => import('@/views/pages/CRUD/rolePermission/view.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/TableDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/ListDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/TreeDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/OverlayDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/MiscDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
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
    const authStore = useAuthStore(); // Obtener el estado de autenticación desde Pinia
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está logueado, redirigir al login
        next({ path: '/auth/login' });
    } else {
        if (to.name === 'login' && authStore.isAuthenticated) {
            // Si el usuario ya está logueado y trata de acceder a la página de login, redirigir al dashboard
            next({ path: '/' });
        }
        next();
    }
});

export default router;
