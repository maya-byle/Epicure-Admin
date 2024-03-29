import * as React from 'react';
import './sidebar.scss';
import * as constants from '../../resources/constants.ts';
import resources from '../../resources/resources.ts';
import { useNavigate } from 'react-router-dom'; 
import { FiLogOut } from 'react-icons/fi';

function Sidebar() {
    const links = constants.LINKS_RESOURCES;
    const currentPath = window.location.pathname;
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("userToken");
        navigate(constants.ROUTES.LOGIN_PAGE)
    }

    return ( 
        <div className='sidebar'>
            <div className='search-container'>
            </div>
            <header className='sidebar_title'>{resources.SIDEBAR_TITLE}</header>
            <ul className='links'>
                {links.map((link) => (
                    <a className={`link ${link.herf === currentPath ? 'current' : ''}`}
                        key={link.name}
                        href={link.herf}>
                        {link.name}
                    </a>
                ))}
            </ul>
            <div className='logout-btn' onClick={logout}>
                <FiLogOut color='white' size={20} />    Logout</div>
        </div>
     );
}

export default Sidebar;