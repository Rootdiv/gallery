import Header from './components/Header';
import Main from './components/Main';

import { getToken } from 'api/token';
import { useDispatch } from 'react-redux';
import { updateToken } from 'store/tokenReducer';

const App = () => {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
