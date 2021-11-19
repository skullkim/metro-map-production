import styled from 'styled-components';

import ResetButton from "./ResetButton";
import SearchButton from "./SearchButton";

const BtnBox = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = () => {
  return (
    <BtnBox>
      <SearchButton />
      <ResetButton />
    </BtnBox>
  );
};

export default SubmitButton;
