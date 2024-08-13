"use client"

import React from 'react'
import ImageGeneratorAdvanced from '@/components/Generator/GenerAd/ImageGeneratorAdvanced'
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const page = () => {
  return (
    <Provider store={store}>
        <ImageGeneratorAdvanced/>
    </Provider>
  )
}

export default page