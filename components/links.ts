




export type Pages = | 'Home' | 'Public' | 'Protected' | 'User Info' | 'Settings';
export type Urls = | '/' | '/profile' | '/messages' | '/auth/userinfo' | '/auth/settings';

export const links = [
  { page: 'Home', url: '/' },
  { page: 'Public', url: '/public' },
  { page: 'Protected', url: '/protected' },
  { page: 'User Info', url: '/auth/userinfo' },
  { page: 'Settings', url: '/auth/settings' },
] as const
