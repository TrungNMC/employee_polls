import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { handleInitialData } from '../actions/shared';

import Home from './Home';
import Leaderboard from './Leaderboard';
import Login from './Login';
import AddQuestion from './AddQuestion';
import Question from './Question';
import NoMatch from './NoMatch';

function App() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const authedUser = useSelector((state) => state.authedUser);

  function RequireAuth({ children }) {
  
    return authedUser === true ? (
      children
    ) : (
      <Login />
    );
  }
  

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {questions !== null && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/add' element={<RequireAuth><AddQuestion /></RequireAuth>} />
            <Route path='/leaderboard' element={<RequireAuth><Leaderboard /></RequireAuth>} />
            <Route path='/questions/:id' element={<RequireAuth><Question /></RequireAuth>} />
            <Route path='*' element={<NoMatch />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
