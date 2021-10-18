import React from "react";
import "./Header.css"
import Logo from "../../img/temperatura.jpg" 

export function Header(){
    return (
        <header id="header-top">
            <img className="img-top" src={Logo} alt="Logo" />
        </header>
    )
}
