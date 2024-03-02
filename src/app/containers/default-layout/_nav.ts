import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Whatsapp configurations',
    url: '/whatsapp-config',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Chats',
    url: '/chats',
    iconComponent: { name: 'cil-paper-plane' }
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Update Profile',
        url: '/profile/settings'
      },
      {
        name: 'Change Password',
        url: '/profile/password'
      }
    ]
  }
];
