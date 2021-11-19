import ValidateUserAccount from '../components/user/ValidateUserAccount';
import { authData } from '../lib/authenticateData';

const EmailReauthorization = () => {
  return (
    <ValidateUserAccount authData={authData.emailReauthorization}/>
  )
}

export default EmailReauthorization;