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
            <Route path='/add' element={authedUser !== null ? <AddQuestion /> : <Login />} />
            <Route path='/leaderboard' element={authedUser !== null ? <Leaderboard /> : <Login />} />
            <Route path='/questions/:id' element={authedUser !== null ? <Question /> : <Login />} />
            <Route path='*' element={<NoMatch />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
