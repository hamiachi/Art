import React from 'react'
import { SessionProvider } from 'next-auth/react';
import Generator from '@/components/Generator/Generator';

const page = () => {
  return (
    <div>
        <Generator/>
    </div>
  )
}

export default page