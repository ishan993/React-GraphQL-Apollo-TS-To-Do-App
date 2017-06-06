import * as React from "react";
import glamorous from "glamorous";
import { Link } from "react-router-dom";

const Nav = glamorous.nav({
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 800,
    padding: "15px",
    background: "white",
    borderBottom: ".3pt solid lightgrey" 
});

const NavBarLink = glamorous(Link)({
    textDecoration: "none",
    color: "PaleVioletRed"
});

const NavBar = () => (
    <Nav>
        <NavBarLink to={"/"}>
            Ishan's Todo App
        </NavBarLink>
    </Nav>
);
export default NavBar;