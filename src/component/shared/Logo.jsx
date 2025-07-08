import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div>
                <span className="font-bold text-xl text-amber-700">FoodFairy</span>
            </div>
        </Link>
    );
};

export default Logo;