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
                    path: '/users',
                    name: 'users',
                    component: () => import('@/views/pages/users/UserListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/users/create',
                    name: 'users create',
                    component: () => import('@/views/pages/users/UserCreate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/users/update/:id',
                    name: 'users update',
                    component: () => import('@/views/pages/users/UserUpdate.vue'),
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
            component: () => import('@/views/pages/Landing.vue'),
            meta: {
                requiresAuth: true // Esta ruta requiere autenticación
            }
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue'),
            meta: {
                requiresAuth: true // Esta ruta requiere autenticación
            }
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
        // Si no requiere autenticación o el usuario está logueado, continuar con la ruta
        if (to.name === 'login' && authStore.isAuthenticated) {
            // Si el usuario ya está logueado y trata de acceder a la página de login, redirigir al dashboard
            next({ path: '/' });
        } else {
            next(); // Continuar con la navegación
        }
    }
});

export default router;
