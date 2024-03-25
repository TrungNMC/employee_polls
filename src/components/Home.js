import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Tab,
  Typography,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import NavBar from './NavBar';

function Home() {
  const [value, setValue] = useState('unanswered');

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);

  return (
    <div className='home'>
      <NavBar />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='New Questions' value='unanswered' />
              <Tab label='Answered Questions' value='answered' />
            </TabList>
          </Box>
          <TabPanel value='unanswered'>
            {' '}
            <Container
              component='main'
              sx={{
                marginTop: 8,
              }}
            >
              <Card>
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
          </TabPanel>
          <TabPanel value='answered'>
            <Container
              component='main'
              sx={{
                marginTop: 8,
              }}
            >
              <Card>
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
                                pathname: `/questions/${questions[answer].id}`,
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
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Home;
