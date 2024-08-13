import React from 'react'
import Navbar from "@/components/Home/Navbar";
import Banner from "@/components/Home/Banner";
import Services from "@/components/Home/Services";
import Description from "@/components/Home/Description";
import Community from "@/components/Home/Community";
import Feature from "@/components/Home/Feature";
import Tools from "@/components/Home/Tools";
import Footer from "@/components/Home/Footer";
import { SessionProvider } from 'next-auth/react';

const Homepage = () => {
  return (
    <SessionProvider>
        <Navbar/>
        <Banner/>
        <Services/>
        <Feature/>
        <Community/>
        <Description/>
        <Tools/>
        <Footer/>
    </SessionProvider>
  )
}

export default Homepage