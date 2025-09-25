import { Outlet } from "react-router";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";
import { createContext, useRef } from "react";
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  position: relative;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
export const MainContext = createContext();
export default function AppLayout() {
  const mainRef = useRef();
  return (
    <MainContext.Provider value={{ mainRef }}>
      <StyledAppLayout>
        <Header />
        <SideBar />
        <Main ref={mainRef}>
          <Container>
            <Outlet main={mainRef} />
          </Container>
        </Main>
      </StyledAppLayout>
    </MainContext.Provider>
  );
}
