import './dashboard.scss';
import * as React from 'react';
import Table from '../../components/Table/Table.tsx';
import Header from '../../components/Header/Header.tsx';
import { Fade } from 'react-awesome-reveal';
import useAuth from '../../hooks/useAuth.tsx';
import { useNavigate } from 'react-router';

function Dashboard() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
        navigate("/login");
    }

    return ( 
        <div className='content_container'>
            <div className='dashboard_container'>
                <Fade cascade duration={300}>
                    <Header />
                    <Table />
                </Fade>
            </div>
        </div>
     );
}

export default Dashboard;