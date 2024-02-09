import * as React from 'react';
import Table from '../components/Table/Table.tsx';
import Modal from '../components/UI/Modal/Modal.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

function Dashboard() {
    const modal = useSelector((state: RootState) => state.states.currentModal);

    return ( 
        <div>
            <Table/>
            {modal && <Modal/>}
        </div>
     );
}

export default Dashboard;