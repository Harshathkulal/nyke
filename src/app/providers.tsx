'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import { CartHydrator } from '@/components/cart-hydrator';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartHydrator />
      {children}
    </Provider>
  );
}
