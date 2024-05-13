import React from "react";
import { NavLink } from "react-router-dom";

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLAnchorElement>; // Correct event type
}

const Button: React.FC<ButtonProps> = ({ to, children, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isPending ? "button" : isActive ? "button active" : "button"
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};

export default Button;
