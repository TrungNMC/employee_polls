import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import NavBar from './NavBar';

function Home() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const authedUser = useSelector((state) => state.authedUser);
  let answered, unanswered;
  const sort = (a, b) => {
    return (
      new Date(questions[b].timestamp).getTime() -
      new Date(questions[a].timestamp).getTime()
    );
  };

  if (authedUser) {
    answered = Object.keys(users[authedUser].answers).sort(sort);
    unanswered = Object.keys(Object.assign({}, questions)).sort(sort);
    unanswered = unanswered.filter(
      (unanswered) => !answered.includes(unanswered)
    );
  }

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);

  return (
    <div className='home'>
      <NavBar />
      <Container
        component='main'
        sx={{
          marginTop: 8,
        }}
      >
        <Card>
          <CardHeader
            title={
              <Typography variant='h4' gutterBottom>
                New Questions
              </Typography>
            }
            sx={{ textAlign: 'center' }}
          />
          <CardContent>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {unanswered?.map((unanswer, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card>
                    <CardHeader
                      className='question-card-header'
                      title={
                        <Typography variant='subtitle1' gutterBottom>
                          {users[questions[unanswer].author].name}
                        </Typography>
                      }
                      subheader={
                        <>
                          <Typography
                            variant='subtitle1'
                            color='text.secondary'
                          >
                            {formatDate(questions[unanswer].timestamp)}
                          </Typography>
                          <Typography
                            variant='subtitle2'
                            color='text.secondary'
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            ...{questions[unanswer].optionOne.text}...
                          </Typography>
                        </>
                      }
                      sx={{ textAlign: 'center' }}
                    />
                    <CardContent>
                      <Link
                        to={{
                          pathname: `/questions/${questions[unanswer].id}`,
                          state: {
                            type: 'poll',
                          },
                        }}
                      >
                        <Button
                          variant='contained'
                          color='primary'
                          size='large'
                          fullWidth
                        >
                          Show
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <Container
        component='main'
        sx={{
          marginTop: 8,
        }}
      >
        <Card>
          <CardHeader
            title={
              <Typography variant='h4' gutterBottom>
                Answered Questions
              </Typography>
            }
            sx={{ textAlign: 'center' }}
          />
          <CardContent>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {answered?.map((answer, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card>
                    <CardHeader
                      className='question-card-header'
                      title={
                        <Typography variant='subtitle1' gutterBottom>
                          {users[questions[answer].author].name}
                        </Typography>
                      }
                      subheader={
                        <>
                          <Typography
                            variant='subtitle1'
                            color='text.secondary'
                          >
                            {formatDate(questions[answer].timestamp)}
                          </Typography>
                          <Typography
                            variant='subtitle2'
                            color='text.secondary'
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            ...{questions[answer].optionOne.text}...
                          </Typography>
                        </>
                      }
                      sx={{ textAlign: 'center' }}
                    />
                    <CardContent>
                      <Link
                        to={{
                          pathname: `/question/${questions[answer].id}`,
                          state: {
                            type: 'results',
                          },
                        }}
                      >
                        <Button
                          variant='contained'
                          color='primary'
                          size='large'
                          fullWidth
                        >
                          Show
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
