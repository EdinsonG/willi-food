const Menu = [
  {
    header: 'Resumen'
  },
  {
    text: 'Estadísticas',
    to: '/estadisticas',
    icon: 'dashboard',
  },
  {
    text: 'Mi perfil',
    group: 'mi-perfil',
    to: '/mi-perfil',
    disabled: 'disabled',
    icon: 'person',
    children: [
      {
        //to: '/mi-perfil/mis-datos',
        text: 'Mis datos',
        disabled: ['disabled']
      },
      {
        //to: '/mi-perfil/informacion-adicional',
        text: 'Información adicional',
        badge: 'new',
        disabled: 'disabled'
      },
      {
        to: '/mi-perfil/cuentas-bancarias',
        text: 'Cuentas bancarias',
        badge: 'new',
        props: ['disabled']
      },
      {
        //to: '/mi-perfil/direcciones',
        text: 'Direcciones',
        badge: 'new',
        disabled: 'disabled'
      },
      {
        //to: '/mi-perfil/mi-ubicacion',
        text: 'Mi ubicación',
        disabled: 'disabled'
      },
    ],
  },

  {
    text: 'Tiendas',
    group: 'mis-tiendas',
    to: '/tiendas',
    icon: 'shop',
    children: [{
        to: '/tiendas/mis-tiendas',
        text: 'Mis tiendas'
      },
      {
        //to: '/tiendas/departamentos',
        text: 'Mis departamentos',
        badge: 'new',
        disabled: 'disabled'
      },
    ],
  },

  {
    text: 'Sucursales',
    group: 'sucursales',
    to: '/sucursales',
    disabled: 'disabled',
    icon: 'local_convenience_store',
    children: [{
        to: '/sucursales/mis-sucursales',
        text: 'Mis sucursales',
      },
      {
        //to: '/sucursales/usuarios',
        text: 'Usuarios',
        badge: 'new',
        disabled: 'disabled'
      },
      {
        //to: '/sucursales/cuentas',
        text: 'Cuentas',
        badge: 'new',
        disabled: 'disabled'
      },
      {
        //to: '/sucursales/formas-de-pago',
        text: 'Formas de Pago',
        badge: 'new',
        disabled: 'disabled'
      },
      {
        //to: '/sucursales/direccion-de-facturación',
        text: 'Dirección de facturación',
        disabled: 'disabled'
      },
    ],
  },

  {
    text: 'Productos',
    group: 'productos',
    to: '/productos',
    icon: 'storage',
    disabled: 'disabled',
    children: [{
        to: '/productos/mis-productos',
        text: 'Mis productos'
      },
      {
        //to: '/productos/inventario',
        text: 'Inventario',
        badge: 'new',
        disabled: 'disabled'
      },
      {
        //to: '/productos/actualizacion-de-precios-masivo',
        text: 'Actualización de Precios Masivo',
        disabled: 'disabled'
      },
      {
        //to: '/productos/actualización-de-inventario-masivo',
        text: 'Actualización de Inventario Masivo',
        disabled: 'disabled'
      },
      {
        //to: '/productos/comentarios ',
        text: 'Comentarios',
        disabled: 'disabled'
      },
    ],
  },

  {
    text: 'Contrataciones',
    group: 'contrataciones',
    to: '/contrataciones',
    icon: 'widgets',
    disabled: 'disabled',
    children: [{
        to: '/contrataciones/servicios-contratados',
        text: 'Servicios contratados'
      },
      {
        //to: '/contrataciones/publicidades-propia',
        text: 'Publicidades propia',
        disabled: 'disabled',
        badge: 'new'
      },
      {
        //to: '/contrataciones/publicidades',
        text: 'Publicidades',
        disabled: 'disabled'
      },
      {
        //to: '/contrataciones/facturacion-servicios',
        text: 'Facturación servicios',
        disabled: 'disabled'
      },
      {
        to: '/contrataciones/pagos-realizados',
        text: 'Pagos realizados'
      },
    ],
  },

  {
    text: 'Gestión de ventas',
    group: 'gestion-de-ventas',
    to: '/gestion-de-ventas',
    icon: 'assignment',
    disabled: 'disabled',
    children: [{
        to: '/gestion-de-ventas/ordenes-compras',
        text: 'Órdenes de compras'
      },
      {
        //to: '/gestion-de-ventas/valoración-de-compra',
        text: ' Valoración de compra',
        disabled: 'disabled',
        badge: 'new'
      },
      {
        //to: '/gestion-de-ventas/comentarios-de-compras',
        text: 'Comentarios de compras',
        disabled: 'disabled'
      },
      {
        //to: '/gestion-de-ventas/conversaciones ',
        text: 'Conversaciones',
        disabled: 'disabled'
      },
      {
        to: '/gestion-de-ventas/pagos-por-plataforma',
        text: 'Pagos por plataforma'
      },
      {
        //to: '/gestion-de-ventas/repartidores',
        disabled: true,
        text: 'Repartidores'
      },
    ],
  },

  {
    text: 'Repartidores',
    //to: '/repartidores',
    icon: 'supervisor_account',
    disabled: 'disabled',
  },
  // {
  //   text: 'Cuentas',
  //   to: '/cuentas',
  //   icon: 'perm_media',
  // },
  // {
  //   text: 'Chat',
  //   icon: 'chat_bubble',
  //   target: '_blank',
  //   to: '/chat',
  // },
  // {
  //   text: 'Inbox',
  //   to: '/mail',
  //   target: '_blank',
  //   icon: 'email',
  // },
  // {
  //   text: 'Media',
  //   to: '/media',
  //   icon: 'perm_media',
  // },
  // {
  //   text: 'Widgets',
  //   group: 'widgets',
  //   to: '/widgets',
  //   icon: 'widgets',
  //   children: [
  //     { to: '/widgets/social', text: 'Social' },
  //     { to: '/widgets/statistic', text: 'Statistic', badge: 'new' },
  //     { to: '/widgets/chart', text: 'Chart' },
  //     { to: '/widgets/list', text: 'List' },
  //   ],
  // },
  // { header: 'CMS' },
  // {
  //   text: 'List & Query',
  //   group: 'layout',
  //   to: 'cms',
  //   icon: 'view_compact',
  //   children: [{ to: '/cms/table', text: 'Basic Table' }],
  // },
]

export default Menu