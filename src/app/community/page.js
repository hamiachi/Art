import React from 'react'
import Navbar from '@/components/Home/Navbar'

const page = () => {
  return (
    <div>
      <Navbar/>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', flexDirection:'column'}}>
        <img src='/commu/gear.gif' width={'200px'} height={'200px'}/>
          <h1>Our team is actively working on building this community website.</h1>
      </div>
    </div>
  )
}

export default page