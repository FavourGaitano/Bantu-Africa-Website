import React from 'react';
import './Menu.scss';
import { useGetRestaurantMenuQuery } from '../../features/restaurant/restaurantApi';
import Navbar from '../shared/Navbar';

const Menu = () => {
    const { data: response, isLoading, error } = useGetRestaurantMenuQuery();

    if (isLoading) return <p>Loading menu...</p>;
    if (error) return <p>An error occurred: {error.toString()}</p>;

    
    const menuUrl = response?.restaurant?.[0]?.MenuUrl;

    return (
        <div className="mainMenu">
        <Navbar />
        <div className="menu">
            
            <h1></h1>
            <p></p>
            {menuUrl ? (
                
                menuUrl.startsWith('http') ? (
                    <img src={menuUrl} alt="Menu" style={{ maxWidth: '100%', height: 'auto' }} />
                ) : (
                    <p>Menu link is not valid: {menuUrl}</p>
                )
            ) : (
                <p>Menu PDF is not available at the moment.</p>
            )}
            
        </div>
        </div>
    );
};

export default Menu;
