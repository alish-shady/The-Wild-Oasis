import styled from "styled-components";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";

const StyledTodayList = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;
export default function TodayList({ render }) {
  const { todayActivity, isLoading } = useTodayActivity();
  return (
    <>
      {!isLoading ? (
        todayActivity?.length > 0 ? (
          <StyledTodayList>{todayActivity.map(render)}</StyledTodayList>
        ) : (
          <NoActivity>No activity for today.</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
}
