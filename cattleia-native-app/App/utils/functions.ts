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
  address = address.replace(/[^\w\s]/gi, '');

  // console.log(address.length);

  if (address.length > 42) {
    address = address.substring(0, 43);
  }

  address = address.startsWith('0x')
    ? address.slice(2, address.length)
    : address;

  if (address.length < 40) {
    for (let i = address.length; i < 40; i++) {
      address += '0';
    }
  }

  return (
    '0x' +
    address.slice(0, lon) +
    '...' +
    address.slice(address.length - lon, address.length)
  );
};

export const newArray = <T>(length: number, init: T): T[] => {
  const k = Array<T>(length);
  for (let i = 0; i < k.length; i++) {
    k[i] = init;
  }
  return k;
};

export const newObject = (
  keys: number,
  init: string,
  base: string,
  values?: string[],
): {[k: string]: string} => {
  const k = newArray(keys, init);
  const obj = k.reduce(
    (a, v, i) => ({
      ...a,
      [base + i]: values?.length === keys ? values[i] : v,
    }),
    {},
  );

  return obj;
};

export const numberFormat = (value: string): string => {
  let u = value.replace(/(-|,| )/g, '').replace(/[a-zA-Z]/g, '');
  const i = u.indexOf('.', 3);
  if (i >= 3) {
    const l = u.substring(0, i);
    const r = u.substring(i + 1, u.length);
    u = l + r;
  }
  if (u.startsWith('00')) {
    u = u.replace(/00/, '0');
  }
  if (u.startsWith('.')) {
    u = u.replace(/./, '');
  }
  if (u.includes('..')) {
    u = u.replace(/..$/, '.');
  }
  if (u.charAt(0) === '0' && u.charCodeAt(1) > 46) {
    u = u.substring(1, u.length);
  }

  return u;
  // const res = parseFloat(u).toString();
  // return res === 'NaN' ? '' : res;
};
