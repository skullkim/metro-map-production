import ValidateUserAccount from '../components/user/ValidateUserAccount';
import { authData } from '../lib/authenticateData';

const SignUp = () => {
  return <ValidateUserAccount authData={authData.signUp} />
};

export default SignUp;
