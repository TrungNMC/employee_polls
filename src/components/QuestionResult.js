import { Typography, Container, LinearProgress, Stack } from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QuestionResult({ question, author, authedUser }) {
  const navigate = useNavigate();
  const { optionOne, optionTwo } = question;
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const selected = optionOne.votes.includes(authedUser);

  const calculatePercentage = (votes) =>
    Number(((votes / totalVotes) * 100).toFixed(0));

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);
  return (
    <div className='question-result'>
      <Container component='main' maxWidth='xs'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
        >
          <Typography variant='subtitle2'>
            {calculatePercentage(optionOne.votes.length)}%
          </Typography>
          {selected ? (
            <Typography variant='subtitle2' color={green[500]}>
              --- your answer ---
            </Typography>
          ) : null}
          <Typography variant='subtitle2' color='text.secondary'>
            {optionOne.votes.length} out of {totalVotes} votes
          </Typography>
        </Stack>
        <LinearProgress
          variant='determinate'
          value={calculatePercentage(optionOne.votes.length)}
        />
        <Typography variant='subtitle1'>{optionOne.text}</Typography>
        <br/>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
        >
          <Typography variant='subtitle2'>
            {calculatePercentage(optionTwo.votes.length)}%
          </Typography>
          {!selected ? (
            <Typography variant='subtitle2' color={green[500]}>
              --- your answer ---
            </Typography>
          ) : null}
          <Typography variant='subtitle2' color='text.secondary'>
            {optionTwo.votes.length} out of {totalVotes} votes
          </Typography>
        </Stack>
        <LinearProgress
          variant='determinate'
          value={calculatePercentage(optionTwo.votes.length)}
        />
        <Typography variant='subtitle1'>{optionTwo.text}</Typography>
      </Container>
    </div>
  );
}
export default QuestionResult;
