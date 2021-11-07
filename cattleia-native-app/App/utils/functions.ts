import {Product} from '../types';
import {icons} from './icons';

export const getIcon = (name: string, focused: boolean): string => {
  let iconName;
  if (name === 'More') {
    iconName = focused ? icons.more.filled : icons.more.outline;
  } else if (name === 'Profile') {
    iconName = focused ? icons.profile.filled : icons.profile.outline;
  } else if (name == 'Home')
    iconName = focused ? icons.home.filled : icons.home.outline;
  else if (name == 'ShopView')
    iconName = focused ? icons.shop.filled : icons.shop.outline;
  else if (name == 'Information')
    iconName = focused ? icons.information.filled : icons.information.outline;
  return iconName as string;
};

function sort<T extends object>(key: keyof T, r: boolean = false) {
  return (a: T, b: T) => {
    if (a[key] > b[key]) return r ? -1 : 1;
    if (a[key] < b[key]) return r ? 1 : -1;
    return 0;
  };
}

export const getProductFilter = (
  filter: keyof Product,
  products: Product[],
  type: '1' | '2' | '0',
) => {
  switch (type) {
    case '1':
      return products.slice().sort(sort(filter));
    case '2':
      return products.slice().sort(sort(filter, true));
    default:
      return products.slice().sort(sort('id'));
  }
};
