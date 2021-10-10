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
