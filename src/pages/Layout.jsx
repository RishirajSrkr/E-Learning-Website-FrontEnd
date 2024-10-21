import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NavbarV2 from '../components/NavbarV2'
import Footer from '../components/Footer'

function Layout() {
    return (
        <div>
            {/* <Navbar /> */}
            <NavbarV2 />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout