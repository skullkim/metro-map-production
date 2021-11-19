import {useFormik} from 'formik';
import {useState} from 'react';
import styled from 'styled-components';
import * as yup from 'yup';

import { Wrapper } from '../components/styles/Authorization';
import {PageTitle, PageBox} from '../components/styles/CommonPageStyle';
import { Success, Warning } from '../components/styles/ResultMessage';
import { FormInputStyle, InputBox, SubmitButton } from '../components/styles/UserComplainMyPageInput';
import { Api } from '../lib/customAxios';
import { ServerPath } from '../lib/dataPath';
import { UserComplainName, complainContextMaxLen, complainSentSuccessfully } from '../lib/formDataInfo';
import { maxComplainContextLen, maxLen, minLen, RegExp, WarningMessage } from '../lib/validateUserInfo';

const SelectSubwayLine = styled.select`
  width: 482px;
  ${FormInputStyle}
`;

const ComplainContext = styled.textarea`
  height: 232px;
  width: 473px;
  border: 3px solid #2867B2;
  border-radius: 10px;
  margin-top: 15px;
`;

const ComplainContextLength = styled.p`
  align-self: flex-end;
`;

const UserComplain = () => {
  const [complainContextLen, setComplainContextLen] = useState(0);
  const [currentFocused, setCurrentFocused] = useState('');
  const [complainContextError, setComplainContextError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      subwayLine: '',
      complainContext: '',
    },
    validationSchema: yup.object({
      email: yup.string()
        .required(`${WarningMessage.EmptyEmail}`)
        .matches(RegExp.Email, {message: `${WarningMessage.InvalidEmail}`})
        .max(maxLen, `${WarningMessage.MaxLen}`),

      subwayLine: yup.string()
        .required(`${WarningMessage.EmptySubwayLine}`)
        .matches(RegExp.SubwayLine, {message: `${WarningMessage.InvalidSubwayLine}`}),

      complainContext: yup.string()
        .required(`${WarningMessage.EmptyComplainContext}`)
        .min(minLen, {message: `${WarningMessage.ComplainContextIsTooShort}`})
        .max(maxComplainContextLen, {message: `${WarningMessage.ComplainContextIsTooLong}`})
    }),
    onSubmit: ({email, subwayLine, complainContext: userComplainContext}) => {
      if(userComplainContext.length <= 10) {
        setComplainContextError(WarningMessage.ComplainContextIsTooShort);
      }
      Api({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_ORIGIN}${ServerPath.SendUserComplain}`,
        data: {
          email,
          subwayLine,
          userComplainContext,
        }
      })
        .then(() => {
          setSuccessMessage(`${complainSentSuccessfully}`);
          setFailMessage('');
        })
        .catch(err => {
          if(err.response.status === 400) {
            setFailMessage(err.response.data.errors.message);
          }
          return err;
        })
    }
  })

  const handleChange = (event) => {
    const {target: {name, value}} = event;
    if(name === UserComplainName.ComplainContext) {
      if(value.length >= 301) return;
      setComplainContextLen(value.length);
    }

    formik.handleChange(event);
  }

  const handleClick = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  }

  const handleBlur = (event) => {
    const {target: {name}} = event;
    setCurrentFocused(name);
    formik.handleBlur(event);
  }

  return (
    <Wrapper>
      <PageBox>
        <PageTitle>소중한 의견을 남겨주세요</PageTitle>
        <InputBox
          type='text'
          name={UserComplainName.Email}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder='이메일을 입력해 주세요'
        />
        {formik.touched.email &&
          formik.errors.email &&
          currentFocused === UserComplainName.Email ?
          <Warning>{formik.errors.email}</Warning> :
          null
        }
        <SelectSubwayLine
          name={UserComplainName.SubwayLine}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value=''>지하철 라인을 선택해 주세요</option>
          <option value='1'>1호선</option>
          <option value='2'>2호선</option>
          <option value='3'>3호선</option>
          <option value='4'>4호선</option>
          <option value='5'>5호선</option>
          <option value='6'>6호선</option>
          <option value='7'>7호선</option>
          <option value='8'>8호선</option>
          <option value='9'>9호선</option>
        </SelectSubwayLine>
        {formik.touched.subwayLine &&
          formik.errors.subwayLine &&
          !formik.values.subwayLine &&
          currentFocused === UserComplainName.SubwayLine ?
          <Warning>{formik.errors.subwayLine}</Warning> :
          null
        }
        <ComplainContext
          name={UserComplainName.ComplainContext}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength= {complainContextMaxLen}
        />
        <ComplainContextLength>{complainContextLen}/300</ComplainContextLength>
        {formik.touched.complainContext &&
          formik.errors.subwayLine &&
          currentFocused === UserComplainName.ComplainContext ?
          <Warning>{complainContextError}</Warning> :
          null
        }
        <SubmitButton
          type='submit'
          onClick={handleClick}
        >
          민원 접수하기
        </SubmitButton>
        {successMessage ? <Success>{successMessage}</Success> : null}
        {failMessage ? <Warning>{failMessage}</Warning> : null}
      </PageBox>
    </Wrapper>
  );
}

export default UserComplain;