import React from 'react';
import '../style/style.css';

export default class Header extends React.Component{
    render(){
        return(
            <div className="header">
                <img src="logo.png" alt="logo" className="logo"></img>
            </div>
        )
    }
} 