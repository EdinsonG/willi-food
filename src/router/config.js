import { AuthLayout, DefaultLayout } from '@/components/layouts'

export const publicRoute = [
  {
    path: '*',
    component: () => import(/* webpackChunkName: "errors-404" */ '@/views/error/NotFound.vue'),
  },
  {
    path: '/login',
    component: AuthLayout,
    meta: {
      title: 'Login',
    },
    redirect: '/login',
    hidden: true,
    children: [
      {
        path: '/login',
        name: 'login',
        meta: {
          title: 'Login',
        },
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
      },
    ],
  },

  {
    path: '/404',
    name: '404',
    meta: {
      title: 'Not Found',
    },
    component: () => import(/* webpackChunkName: "errors-404" */ '@/views/error/NotFound.vue'),
  },

  {
    path: '/500',
    name: '500',
    meta: {
      title: 'Server Error',
    },
    component: () => import(/* webpackChunkName: "errors-500" */ '@/views/error/Error.vue'),
  },
]

export const protectedRoute = [
  {
    path: '/',
    component: DefaultLayout,
    meta: {
      title: 'Home',
      group: 'apps',
      icon: '',
    },
    redirect: '/estadisticas',
    children: [
      {
        path: '/estadisticas',
        name: 'Dashboard',
        meta: {
          title: 'Home',
          group: 'apps',
          icon: 'dashboard',
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/ordenes-de-compra',
        meta: {
          title: 'Órdenes de Compra',
          group: 'apps',
          icon: 'assignment',
          requiresAuth: true,
        },
        name: 'PurchaseOrders',
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "cuentas" */ '@/views/PurchaseOrders.vue'),
      },
      {
        path: '/pagos',
        meta: {
          title: 'Pagos',
          group: 'apps',
          icon: 'account_balance_wallet',
          requiresAuth: true,
        },
        name: 'Payments',
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "cuentas" */ '@/views/Payments.vue'),
      },
    
      // {
      //   path: '/media',
      //   meta: {
      //     title: 'Media',
      //     group: 'apps',
      //     icon: 'media',
      //     requiresAuth: true,
      //   },
      //   name: 'Media',
      //   props: (route) => ({
      //     type: route.query.type,
      //   }),
      //   component: () => import(/* webpackChunkName: "media" */ '@/views/Media.vue'),
      // },

      // {
      //   path: '/task',
      //   meta: {
      //     title: 'Task',
      //     group: 'apps',
      //     icon: 'media',
      //     requiresAuth: true,
      //   },
      //   name: 'Task',
      //   props: (route) => ({
      //     type: route.query.type,
      //   }),
      //   component: () => import(/* webpackChunkName: "task" */ '@/views/Calendar.vue'),
      // },
      {
        path: '/403',
        name: 'Forbidden',
        meta: {
          title: 'Access Denied',
          hiddenInMenu: true,
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "error-403" */ '@/views/error/Deny.vue'),
      },
    ],
  },

  {
    path: '/mi-perfil',
    component: DefaultLayout,
    meta: {
      title: 'Mi perfil',
      icon: 'person',
      group: 'advance',
    },
    redirect: '/mi-perfil/cuentas-bancarias',
    children: [
      {
        path: '/mi-perfil/cuentas-bancarias',
        name: 'Profile',
        meta: {
          title: 'Cuentas Bancarias',
        },
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "mi-perfil" */ '@/views/BankAccounts.vue'),
      },
    ],
  },
  
  {
    path: '/tiendas',
    component: DefaultLayout,
    meta: {
      title: 'tiendas',
      icon: 'shop',
      group: 'advance',
    },
    redirect: '/tiendas/mis-tiendas',
    children: [
      {
        path: '/tiendas/mis-tiendas',
        name: 'Branches',
        meta: {
          title: 'Mis tiendas',
        },
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "my-branches" */ '@/views/MyShop.vue'),
      },
    ],
  },

  //list
  {
    path: '/sucursales',
    component: DefaultLayout,
    meta: {
      title: 'sucursales',
      icon: 'local_convenience_store',
      group: 'advance',
    },
    redirect: '/sucursales/mis-sucursales',
    children: [
      {
        path: '/sucursales/mis-sucursales',
        name: 'Branches',
        meta: {
          title: 'Mis sucursales',
        },
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "my-branches" */ '@/views/MyBranches.vue'),
      },
    ],
  },

  {
    path: '/productos',
    component: DefaultLayout,
    meta: {
      title: 'productos',
      icon: 'local_convenience_store',
      group: 'advance',
    },
    redirect: '/productos/mis-productos',
    children: [
      {
        path: '/productos/mis-productos',
        name: 'Products',
        meta: {
          title: 'Mis productos',
        },
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "general-products" */ '@/views/products/GeneralProducts.vue'),
      },
    ],
  },

  {
    path: '/contrataciones',
    component: DefaultLayout,
    meta: {
      title: 'Contrataciones',
      icon: 'widgets',
      group: 'advance',
    },
    redirect: '/contrataciones/servicios-contratados',
    children: [
      {
        path: '/contrataciones/servicios-contratados',
        name: 'Services',
        meta: {
          title: 'Servicios contratados',
        },
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "services" */ '@/views/Services.vue'),
      },
      {
        path: '/contrataciones/pagos-realizados',
        name: 'Payments',
        meta: {
          title: 'Pagos realizados',
        },
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "services" */ '@/views/Payments.vue'),
      },
    ],
  },

  {
    path: '/gestion-de-ventas',
    component: DefaultLayout,
    meta: {
      title: 'Gestión de ventas',
      icon: 'assignment',
      group: 'advance',
    },
    redirect: '/gestion-de-ventas/ordenes-compras',
    children: [
      {
        path: '/gestion-de-ventas/ordenes-compras',
        name: 'PurchaseOrders',
        meta: {
          title: 'Órdenes de compras',
        },
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "PurchaseOrders" */ '@/views/PurchaseOrders.vue'),
      },
      {
        path: '/gestion-de-ventas/pagos-por-plataforma',
        name: 'PaymentsPlatform',
        meta: {
          title: 'Pagos por plataforma',
        },
        props: (route) => ({
          type: route.query.type,
        }),
        component: () => import(/* webpackChunkName: "PaymentsPlatform" */ '@/views/PaymentsPlatform.vue'),
      },
    ],
  },


  // {
  //   path: '/cms',
  //   component: DefaultLayout,
  //   redirect: '/cms/table',
  //   meta: {
  //     title: 'CMS',
  //     icon: 'view_compact',
  //     group: 'cms',
  //     requiresAuth: true,
  //   },
  //   children: [
  //     {
  //       path: '/cms/table',
  //       name: 'ListTable',
  //       meta: {
  //         title: 'CMS Table',
  //       },
  //       component: () => import(/* webpackChunkName: "table" */ '@/views/list/Table.vue'),
  //     },
  //   ],
  // },

  //widgets
  // {
  //   path: '/widgets',
  //   component: DefaultLayout,
  //   meta: {
  //     title: 'Widget',
  //     icon: 'widgets',
  //     group: 'advance',
  //   },
  //   redirect: '/widgets/chart',
  //   children: [
  //     {
  //       path: '/widgets/chart',
  //       name: 'ChartWidget',
  //       meta: {
  //         title: 'Chart Widget',
  //       },
  //       component: () => import(/* webpackChunkName: "chart-widget" */ '@/views/widgets/Chart.vue'),
  //     },
  //     {
  //       path: '/widgets/list',
  //       name: 'ListWidget',
  //       meta: {
  //         title: 'List Widget',
  //       },
  //       component: () => import(/* webpackChunkName: "list-widget" */ '@/views/widgets/List.vue'),
  //     },
  //     {
  //       path: '/widgets/social',
  //       name: 'SocialWidget',
  //       meta: {
  //         title: 'Social Widget',
  //       },
  //       component: () => import(/* webpackChunkName: "social-widget" */ '@/views/widgets/Social.vue'),
  //     },
  //     {
  //       path: '/widgets/statistic',
  //       name: 'StatisticWidget',
  //       meta: {
  //         title: 'Statistic Widget',
  //       },
  //       component: () => import(/* webpackChunkName: "statistic-widget" */ '@/views/widgets/Statistic.vue'),
  //     },
  //   ],
  // },

  //media

  // chat app
  // {
  //   path: '/chat',
  //   name: 'Chat',
  //   component: ChatLayout,
  //   redirect: {
  //     path: '/chat/messaging',
  //   },
  //   meta: {
  //     title: 'Chat',
  //     group: 'apps',
  //     icon: 'chat_bubble',
  //   },
  //   children: [
  //     {
  //       path: '/chat/messaging/:uuid?',
  //       name: 'ChatMessaging',
  //       props: true,
  //       component: () => import(/* webpackChunkName: "chat-messaging" */ '@/views/chat/ChatMessaging.vue'),
  //     },
  //     {
  //       path: '/chat/contact/:uuid?',
  //       meta: {
  //         public: true,
  //       },
  //       name: 'ChatContact',
  //       component: () => import(/* webpackChunkName: "chat-contact" */ '@/views/chat/ChatContact.vue'),
  //     },
  //   ],
  // },

  //mail app
  // {
  //   path: '/mail',
  //   name: 'Mail',
  //   component: () => import(/* webpackChunkName: "mail-layout" */ '@/components/email/Layout.vue'),
  //   redirect: {
  //     path: '/mail/all',
  //   },
  //   children: [
  //     {
  //       path: '/mail/:mailType',
  //       name: 'MailIndex',
  //       component: () => import(/* webpackChunkName: "mail-list" */ '@/components/email/List.vue'),
  //     },
  //     {
  //       path: '/mail/0/:uuid',
  //       name: 'MailDetail',
  //       component: () => import(/* webpackChunkName: "mail-reply" */ '@/components/email/Reply.vue'),
  //     },
  //   ],
  // },
]
