import './layout.scss';
import React from "react";
import { Outlet } from "react-router";
import Sidebar from '../../components/Sidebar/Sidebar.tsx'

function Layout() {

    return (
      <div className='layout_container'>
        <Sidebar />
        <Outlet />
      </div>
    );
  };

  export default Layout;