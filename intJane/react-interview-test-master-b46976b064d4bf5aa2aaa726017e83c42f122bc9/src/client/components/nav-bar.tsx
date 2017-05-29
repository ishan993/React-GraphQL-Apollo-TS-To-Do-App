import * as React from "react";
import glamorous from "glamorous";

const Nav = glamorous.nav({
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 800,
    padding: "15px",
    borderBottom: ".3pt solid lightgrey" 
});

const NavBar = () => (
    <Nav>
        Imagine that I'm the NavBar
    </Nav>
);
export default NavBar;