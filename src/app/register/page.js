"use client";

import React from 'react'
import Register from '@/components/Login/Register'
import { SessionProvider } from 'next-auth/react';

const page = () => {
  return (
    <SessionProvider>
      <Register/>
    </SessionProvider>
  )
}

export default page