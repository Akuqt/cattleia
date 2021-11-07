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

export const moneyFormat = (prop: number): string => {
  let neg = false;

  if (prop < 0) {
    neg = true;
    prop = -prop;
  }

  let money = prop.toString();

  let b: string[] = [];

  while (money.length >= 4) {
    b.push(',' + money.slice(money.length - 3, money.length));
    money = money.slice(0, money.length - 3);
  }

  let k = b.reverse().join().replace(/,,/g, ',');

  return (neg ? '- ' + money : '' + money) + k + '.00 COP';
};

export const formatAddress = (address: string, lon: number): string => {
  if (address.startsWith('0x')) {
    address = address.slice(2, address.length);
  } else {
    return address;
  }
  return (
    '0x' +
    address.slice(0, lon) +
    '...' +
    address.slice(address.length - lon, address.length)
  );
};
