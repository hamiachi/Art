"use client";

import React from 'react'
import Edits from '@/components/Edits/Edits';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '@/store/store';

const page = () => {

  return (
    <Provider store={store}>
      <SessionProvider>
        <Edits/>
      </SessionProvider>
    </Provider>
  )
}

export default page