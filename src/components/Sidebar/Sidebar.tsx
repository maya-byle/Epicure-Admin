import * as React from 'react';
import './sidebar.scss';
import * as constants from '../../resources/constants.ts'

function Sidebar() {
    const links = constants.LINKS_RESOURCES

    return ( 
        <div className='sidebar'>
            <div className='search-container'>

            </div>
            <header>Collections:</header>
            <ul className='links'>
                {links.map((link) => (
                    <a className='link' key={link.name} href={link.herf}>
                        {link.name}
                    </a>
                ))}
            </ul>
        </div>
     );
}

export default Sidebar;