import './dashboard.scss';
import * as React from 'react';
import Table from '../components/Table/Table.tsx';
import Modal from '../components/UI/Modal/Modal.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import Header from '../components/Header/Header.tsx';
import { Fade } from 'react-awesome-reveal';

function Dashboard() {
    const modal = useSelector((state: RootState) => state.collection.currentModal);

    return ( 
        <div className='dashboard_container'>
            <Fade cascade duration={300}>
                <Header />
                <Table />
                {modal && <Modal/>}
            </Fade>
        </div>
     );
}

export default Dashboard;