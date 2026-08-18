import { MenuItem } from '@/types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Artisanal Cappuccino',
    description: 'Rich single-origin espresso topped with velvety microfoam, crafted by hand.',
    price: 5.5,
    image_url:
      'https://images.pexels.com/photos/11385490/pexels-photo-11385490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'coffee',
    created_at: '2026-08-14T05:38:32Z',
  },
  {
    id: '2',
    name: 'Avocado Toast',
    description: 'Sourdough toast with smashed avocado, chili flakes, and a poached egg.',
    price: 9.0,
    image_url:
      'https://images.pexels.com/photos/7936680/pexels-photo-7936680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'food',
    created_at: '2026-08-14T05:38:32Z',
  },
  {
    id: '3',
    name: 'Butter Croissant',
    description: 'Flaky, golden French-style croissant baked fresh every morning.',
    price: 4.25,
    image_url:
      'https://images.pexels.com/photos/20002837/pexels-photo-20002837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'pastry',
    created_at: '2026-08-14T05:38:32Z',
  },
];

export const CAFE_SETTINGS = {
  discountCode: 'COFFEE10',
  discountPercentage: 10,
};
