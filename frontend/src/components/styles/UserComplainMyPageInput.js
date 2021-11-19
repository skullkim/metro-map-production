import styled, {css} from 'styled-components';

import { SubmitBtn } from './Authorization';

export const FormInputStyle = css`
  height: 58px;
  border: 3px solid #2867B2;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 20px
`;

export const InputBox = styled.input`
  width: 473px;
  ${FormInputStyle}
`;

export const SubmitButton = styled(SubmitBtn)`
  width: 482px;
  font-size: 20px;
  margin-top: 30px;
`;