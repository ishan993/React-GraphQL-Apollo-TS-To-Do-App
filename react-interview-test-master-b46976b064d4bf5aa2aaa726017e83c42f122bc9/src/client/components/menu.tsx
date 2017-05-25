import * as React from "react";
import glamorous from "glamorous";
import { NavLink, NavLinkProps } from "react-router-dom";

const MenuContainer = glamorous.nav({
  display: "flex",
  flexFlow: "row nowrap",
  borderBottom: "1px solid lightgrey"
});

const MenuItem = glamorous(({ children, ...props }: NavLinkProps) => (
  <NavLink {...props}>
    {children}
  </NavLink>
))({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  height: 40,
  margin: "0 24px 0 0",
  padding: "20px 0 0",
  color: "#666",
  ":visited": { color: "#666" },
  ":hover": { color: "#000" },
  ":last-child": { margin: 0 },
  "&.active": { borderBottom: "2px solid lightgrey" }
});

const Menu = () => (
  <MenuContainer>
    <MenuItem to="/" exact={true}>Items</MenuItem>
    <MenuItem to="/add-item">Add Item</MenuItem>
  </MenuContainer>
);

export default Menu;