import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import NavBar from './NavBar';
import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';
import { useNavigate } from 'react-router-dom';

function AddQuestion() {
  const [redirect, setRedirect] = useState(false);
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (optionOne.trim() === '' || optionTwo.trim() === '') {
      return;
    }
    dispatch(handleAddQuestion(optionOne, optionTwo));
    setRedirect(true);
  };

  useEffect(() => {
    if (redirect) {
      navigate('/');
    }
    if (!authedUser) {
      navigate('/login');
    }
  }, [redirect, navigate, authedUser]);
  return (
    <div className='add-question'>
      <NavBar />
      <Container component='main'>
        <Card sx={{ marginTop: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <img
              srcSet={logo}
              src={logo}
              alt={'logo'}
              loading='lazy'
              width={80}
              height={80}
            />
          </div>
          <CardContent className='text-center'>
            <Typography
              variant='h4'
              component='h5'
              className='mb-3 text-center'
              sx={{ textAlign: 'center' }}
            >
              Would you rather ?
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label='Option one'
                value={optionOne}
                onChange={(e) => setOptionOne(e.target.value)}
                fullWidth
                margin='normal'
                required
                inputProps={{ "data-testid": "input-option-one" }}
              />
              <Typography
                variant='body2'
                component='p'
                className='bg-blue-lightest font-weight-bold text-center p-2 mt-5'
              >
                or
              </Typography>
              <TextField
                label='Option two'
                value={optionTwo}
                onChange={(e) => setOptionTwo(e.target.value)}
                fullWidth
                margin='normal'
                required
                inputProps={{ "data-testid": "input-option-two" }}
              />
              <Button
                variant='contained'
                color='primary'
                size='large'
                type='submit'
                fullWidth
                data-testid="submit-button-ask"
                disabled={!optionOne || !optionTwo}
              >
                Ask Question
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default AddQuestion;
