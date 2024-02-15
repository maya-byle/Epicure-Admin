import './homepage.scss';
import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from '../../components/Sidebar/Sidebar.tsx'
import useAuth from '../../hooks/useAuth.tsx';
import { useNavigate } from 'react-router';

function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

    return (
      <div className='layout_container'>
        <Sidebar />
        <Outlet />
      </div>
    );
  };

  export default Layout;