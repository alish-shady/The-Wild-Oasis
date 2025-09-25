import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";

const FullPageWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);
  if (isLoading)
    return (
      <FullPageWrapper>
        <Spinner />
      </FullPageWrapper>
    );
  if (isAuthenticated) return children;
}
