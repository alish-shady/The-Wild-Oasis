import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { MainContext } from "./AppLayout";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul.withConfig({
  shouldForwardProp: (prop) => !["position"].includes(prop),
})`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenuContext = createContext();

export default function Menus({ children }) {
  const [activeId, setActiveId] = useState("");
  const [position, setPosition] = useState(null);
  const activate = setActiveId;
  const deactivate = () => setActiveId("");
  return (
    <MenuContext.Provider
      value={{ deactivate, activate, activeId, position, setPosition }}
    >
      <div>{children}</div>
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { activate, deactivate, activeId, setPosition } =
    useContext(MenuContext);
  function handleClick(e) {
    e.stopPropagation();
    if (!id) return;
    if (id === activeId) {
      deactivate();
      return;
    }
    const rect = e.target.closest("button").getBoundingClientRect();
    const distanceFromTop = e.target.closest("button").offsetTop;
    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: distanceFromTop + rect.height + 8,
    });
    activate(id);
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { activeId, position, deactivate } = useContext(MenuContext);
  const ref = useOutsideClick(deactivate, id);
  const { mainRef } = useContext(MainContext);
  if (id !== activeId) return null;
  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    mainRef.current
  );
}

function Item({ children, handleDuplicate, onClick, icon }) {
  const { deactivate } = useContext(MenuContext);
  function handleClick(e) {
    handleDuplicate === undefined ? onClick(e) : handleDuplicate();
    deactivate();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Item = Item;
