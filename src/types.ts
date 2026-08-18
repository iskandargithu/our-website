export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
}

export type Language = 'en' | 'es' | 'zh';

export type Tab = 'home' | 'menu' | 'chefs' | 'discounts';

export interface Translation {
  navHome: string;
  navMenu: string;
  navChefs: string;
  navDiscounts: string;
  searchPlaceholder: string;
  search: string;
  settings: string;
  language: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreMenu: string;
  reserveTable: string;
  menuTitle: string;
  menuSubtitle: string;
  noResults: string;
  couponTitle: string;
  couponSubtitle: string;
  couponPlaceholder: string;
  couponApply: string;
  couponValid: string;
  couponInvalid: string;
  discountApplied: string;
  originalTotal: string;
  youSave: string;
  finalPrice: string;
  chefsTitle: string;
  chefsSubtitle: string;
  discountsTitle: string;
  discountsSubtitle: string;
  adminTitle: string;
  adminSubtitle: string;
  adminDiscountCode: string;
  adminDiscountPct: string;
  adminSave: string;
  adminSaved: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    navHome: 'Home',
    navMenu: 'Our Menu',
    navChefs: 'Our Team',
    navDiscounts: 'Special Discounts',
    searchPlaceholder: 'Search menu items...',
    search: 'Search',
    settings: 'Settings',
    language: 'Language',
    heroTitle: 'Sip, Savor, and Stay Awhile. Experience Artisanal Perfection.',
    heroSubtitle: 'Single-origin espresso, hand-crafted pastries, and a warm atmosphere designed for slow mornings and great conversations.',
    exploreMenu: 'Explore Menu',
    reserveTable: 'Reserve a Table',
    menuTitle: 'Our Menu',
    menuSubtitle: 'Every item is crafted with locally sourced ingredients and a whole lot of love.',
    noResults: 'No items match your search.',
    couponTitle: 'Have a Coupon Code?',
    couponSubtitle: 'Enter your code below to see your savings update live.',
    couponPlaceholder: 'Enter coupon code',
    couponApply: 'Apply',
    couponValid: 'Coupon applied! Enjoy your discount.',
    couponInvalid: 'Invalid coupon code. Try COFFEE10.',
    discountApplied: 'Discount Applied',
    originalTotal: 'Original Total',
    youSave: 'You Save',
    finalPrice: 'Final Price',
    chefsTitle: 'Our Team',
    chefsSubtitle: 'The passionate hands behind every cup and plate.',
    discountsTitle: 'Special Discounts',
    discountsSubtitle: 'Daily deals and seasonal offers to make your visit even sweeter.',
    adminTitle: 'Admin Dashboard',
    adminSubtitle: 'Update menu prices and discount settings.',
    adminDiscountCode: 'Discount Code',
    adminDiscountPct: 'Discount Percentage',
    adminSave: 'Save Changes',
    adminSaved: 'Changes saved successfully.',
  },
  es: {
    navHome: 'Inicio',
    navMenu: 'Nuestro Menú',
    navChefs: 'Nuestro Equipo',
    navDiscounts: 'Descuentos Especiales',
    searchPlaceholder: 'Buscar en el menú...',
    search: 'Buscar',
    settings: 'Configuración',
    language: 'Idioma',
    heroTitle: 'Saborea, Disfruta y Quédate. Experimenta la Perfección Artesanal.',
    heroSubtitle: 'Espresso de origen único, postres hechos a mano y un ambiente cálido diseñado para mañanas tranquilas y buenas conversaciones.',
    exploreMenu: 'Explorar Menú',
    reserveTable: 'Reservar Mesa',
    menuTitle: 'Nuestro Menú',
    menuSubtitle: 'Cada artículo está elaborado con ingredientes de origen local y mucho amor.',
    noResults: 'No hay artículos que coincidan con tu búsqueda.',
    couponTitle: '¿Tienes un Código de Cupón?',
    couponSubtitle: 'Ingresa tu código a continuación para ver tus ahorros actualizarse en vivo.',
    couponPlaceholder: 'Ingresa el código del cupón',
    couponApply: 'Aplicar',
    couponValid: '¡Cupón aplicado! Disfruta tu descuento.',
    couponInvalid: 'Código de cupón inválido. Prueba COFFEE10.',
    discountApplied: 'Descuento Aplicado',
    originalTotal: 'Total Original',
    youSave: 'Ahorras',
    finalPrice: 'Precio Final',
    chefsTitle: 'Nuestro Equipo',
    chefsSubtitle: 'Las manos apasionadas detrás de cada taza y plato.',
    discountsTitle: 'Descuentos Especiales',
    discountsSubtitle: 'Ofertas diarias y promociones estacionales para endulzar tu visita.',
    adminTitle: 'Panel de Administración',
    adminSubtitle: 'Actualiza los precios del menú y la configuración de descuentos.',
    adminDiscountCode: 'Código de Descuento',
    adminDiscountPct: 'Porcentaje de Descuento',
    adminSave: 'Guardar Cambios',
    adminSaved: 'Cambios guardados con éxito.',
  },
  zh: {
    navHome: '首页',
    navMenu: '我们的菜单',
    navChefs: '我们的团队',
    navDiscounts: '特别优惠',
    searchPlaceholder: '搜索菜单...',
    search: '搜索',
    settings: '设置',
    language: '语言',
    heroTitle: '品味，享受，停留。体验匠心完美。',
    heroSubtitle: '单一产地浓缩咖啡、手工糕点和温馨的氛围，为悠闲的早晨和美好的对话而生。',
    exploreMenu: '浏览菜单',
    reserveTable: '预订座位',
    menuTitle: '我们的菜单',
    menuSubtitle: '每道菜品都采用本地食材，满载爱心精心制作。',
    noResults: '没有找到匹配的项目。',
    couponTitle: '有优惠券码吗？',
    couponSubtitle: '在下方输入您的优惠码，实时查看您的折扣。',
    couponPlaceholder: '输入优惠码',
    couponApply: '应用',
    couponValid: '优惠券已应用！享受您的折扣。',
    couponInvalid: '无效的优惠券码。试试 COFFEE10。',
    discountApplied: '已应用折扣',
    originalTotal: '原价',
    youSave: '您节省了',
    finalPrice: '折后价',
    chefsTitle: '我们的团队',
    chefsSubtitle: '每杯咖啡和每道菜背后的热情之手。',
    discountsTitle: '特别优惠',
    discountsSubtitle: '每日特价和季节性优惠，让您的光临更加甜蜜。',
    adminTitle: '管理面板',
    adminSubtitle: '更新菜单价格和折扣设置。',
    adminDiscountCode: '折扣码',
    adminDiscountPct: '折扣百分比',
    adminSave: '保存更改',
    adminSaved: '更改已成功保存。',
  },
};
