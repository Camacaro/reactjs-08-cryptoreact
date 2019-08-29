import React from 'react';

const Header = (props) => {
    return (
        <div>
            <header>
                <h1 className="text-center"> {props.titulo} </h1>
            </header>
        </div>
    );
};

export default Header;