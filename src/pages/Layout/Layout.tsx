import './layout.scss';
import React from "react";
import { Outlet } from "react-router";
import Sidebar from '../../components/Sidebar/Sidebar.tsx'
function Layout() {
    return (
      <>
        <Sidebar />
        <div className='content_container'>
            <Outlet />
        </div>
      </>
    );
  };

  export default Layout;