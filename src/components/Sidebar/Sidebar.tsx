import * as React from 'react';
import './sidebar.scss';

function Sidebar() {
    const links = [
        {herf: '/chefs', name: 'Chefs'},
        {herf: '/dishes', name: 'Dishes'},
        {herf: '/restaurants', name: 'Restaurants'}
    ] //TODO: move to constants file

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