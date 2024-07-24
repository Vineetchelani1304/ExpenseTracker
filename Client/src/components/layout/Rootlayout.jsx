import React from 'react'
import SideBar from '../SideBar'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const Rootlayout = () => {
  return (
    <div className="flex flex-row h-full w-full
    ">
      <div><SideBar/></div>
      <div className="flex flex-col h-full w-full">
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Rootlayout
