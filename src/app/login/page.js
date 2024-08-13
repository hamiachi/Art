"use client";

import React from 'react'
import Login from '@/components/Login/Login'
import { SessionProvider } from 'next-auth/react';

const page = () => {
  return (
    <SessionProvider>
      <Login/>
    </SessionProvider>
  )
}

export default page