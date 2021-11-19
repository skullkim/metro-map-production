import ValidateUserAccount from '../components/user/ValidateUserAccount';
import { authData } from '../lib/authenticateData';

const SignIn = () => {
  return <ValidateUserAccount authData={authData.signIn}/>
};

export default SignIn;
