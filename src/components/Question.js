import {
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import QuestionAnswer from './QuestionAnswer';
import QuestionResult from './QuestionResult';

function Question() {
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);

  const { id } = useParams();
  const question = questions[id];

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);

  const questionAnswered = Object.keys(users[authedUser]?.answers).includes(
    question?.id
  );

  

  if (!question) {
    return <NoMatch />
  }

  return (
    <div className='question'>
      <NavBar />
      <Container component='main'>
        <Card sx={{ marginTop: 10 }}>
          <Typography
            variant='h4'
            component='h5'
            sx={{ textAlign: 'center', marginTop: 2 }}
          >
            Poll by {question.author}
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <img
              srcSet={users[question.author].avatarURL}
              src={users[question.author].avatarURL}
              alt={'Avatar of ' + users[question.author].name}
              loading='lazy'
              width={100}
              height={100}
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
            {questionAnswered ? (
              <QuestionResult
                question={question}
                author={users[question.author]}
                authedUser={authedUser}
              />
            ) : (
              <QuestionAnswer
                question={question}
                author={users[question.author]}
              />
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
export default Question;
