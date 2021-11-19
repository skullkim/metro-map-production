import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HeaderNav from './components/header/HeaderNav';
import GlobalStyle from './components/styles/GlobalStyle';
import { ClientPath } from "./lib/dataPath";
import Bookmark from './pages/Bookmark';
import EmailVerification from "./pages/EamilVerification";
import EmailReauthorization from "./pages/EmailReauthorization";
import FindPathPage from './pages/FindPathPage';
import LostAndFound from './pages/LostAndFound';
import MyPage from './pages/MyPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import StoreBox from './pages/StoreBox';
import UserComplain from './pages/userComplain';

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <HeaderNav />
        <Switch>
          <Route exact path={ClientPath.FindPath} component={FindPathPage} />
          <Route exact path={ClientPath.SignUp} component={SignUp} />
          <Route
            exact
            path={ClientPath.EmailVerification}
            component={EmailVerification}
          />
          <Route
            exact
            path={ClientPath.EmailReauthorization}
            component={EmailReauthorization}
          />
          <Route path={ClientPath.SignIn} component={SignIn}/>
          <Route path={ClientPath.Bookmark} component={Bookmark} />
          <Route path={ClientPath.LostAndFound} component={LostAndFound} />
          <Route path={ClientPath.StoreBox} component={StoreBox} />
          <Route path={ClientPath.UserComplain} component={UserComplain} />
          <Route path={ClientPath.MyPage} component={MyPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
