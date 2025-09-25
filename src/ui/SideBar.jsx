import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  grid-column: 1;
  display: grid;
  grid-template-columns: min-content;
  align-content: start;
  row-gap: 3.2rem;
`;
export default function SideBar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
    </StyledSideBar>
  );
}
