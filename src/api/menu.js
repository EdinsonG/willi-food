const Menu = [
  { header: 'Consolidado' },
  {
    text: 'Estadísticas',
    to: '/estadisticas',
    icon: 'dashboard',
  },

  { header: 'Mi Perfil' },
  {
    text: 'Mis Datos',
    to: '/mis-datos',
    icon: 'person',
    disabled: 'disabled',
  },
  {
    text: 'Cuentas Bancarias',
    to: '/cuentas-bancarias',
    icon: 'account_balance',
  },


  { header: 'Gestión de Venta' },
  {
    text: 'Órdenes de Compra',
    to: '/ordenes-de-compra',
    icon: 'assignment',
  },
  {
    text: 'Pagos',
    to: '/pagos',
    icon: 'account_balance_wallet',
  },

  { header: 'Tienda' },
  {
    text: 'Mis tiendas',
    to: '/mis-tiendas',
    icon: 'shop',
  },
  {
    text: 'Departamentos',
    to: '/departamentos',
    icon: 'group_work',
    disabled: 'disabled',
  },
  {
      text: 'Sucursales',
      group: 'sucursales',
      to: '/sucursales',
      disabled: 'disabled',
      icon: 'local_convenience_store',
      children: [
        { to: '/sucursales/mis-sucursales', text: 'Mis Sucursales',disabled: true },
        { to: '/sucursales/usuarios', text: 'Usuarios', badge: 'new', disabled: 'disabled' },
        { to: '/sucursales/direcciones-de-facturación', text: 'Direcciones de Facturación', disabled: 'disabled' },
      ],
    },

    {
      text: 'Productos',
      group: 'productos',
      to: '/productos',
      icon: 'storage',
      disabled: 'disabled',
      children: [
        { to: '/productos/general', text: 'General' },
        { to: '/productos/productos-en-sucursales', text: 'Productos en sucursales', badge: 'new' },
        { to: '/productos/actualización-de-precios', text: 'Actualización de precios' },
        { to: '/productos/actualización-de-inventario', text: 'Actualización de inventario' },
      ],
    },
  
  { header: 'Contrataciones' },
  {
    text: 'Servicios',
    to: '/servicios',
    icon: 'widgets',
    disabled: 'disabled',
  },
  {
    text: 'Publicidades',
    to: '/publicidades',
    icon: 'live_tv',
    disabled: 'disabled',
  },
  {
    text: 'Facturación',
    to: '/facturacion',
    icon: 'receipt',
    disabled: 'disabled',
  },
  {
    text: 'Pagos',
    to: '/pagos',
    icon: 'account_balance_wallet',
    disabled: 'disabled',
  },

  { header: 'Delivery' },
  {
    text: 'Repartidores',
    to: '/repartidores',
    icon: 'supervisor_account',
    disabled: 'disabled',
  },
  {
    text: 'Ejecución de Repartidores',
    to: '/ejecución-de-repartidores',
    icon: 'transfer_within_a_station',
    disabled: 'disabled',
  },

  { header: 'Reporte' },
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
