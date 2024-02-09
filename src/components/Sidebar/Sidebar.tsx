import * as React from 'react';
import './sidebar.scss';
import * as constants from '../../resources/constants.ts';
import resources from '../../resources/resources.ts';

function Sidebar() {
    const links = constants.LINKS_RESOURCES;
    const currentPath = window.location.pathname;

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
        </div>
     );
}

export default Sidebar;