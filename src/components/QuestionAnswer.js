import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSaveQuestionAnswer } from '../actions/shared';

function QuestionAnswer({ question, author }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser);
  const [value, setValue] = useState('');
  const [helperText, setHelperText] = useState();

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) {
      setHelperText('Please select an option.');
    } else {
      dispatch(handleSaveQuestionAnswer(question.id, value));
    }
  };
  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth variant='standard'>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='quiz'
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value='optionOne'
            control={<Radio />}
            label={question.optionOne.text}
          />
          <FormControlLabel
            value='optionTwo'
            control={<Radio />}
            label={question.optionTwo.text}
          />
        </RadioGroup>
        <Typography sx={{ color: 'red' }} variant='subtitle1'>
          {helperText}
        </Typography>
        <Button type='submit' variant='outlined' fullWidth>
          Submit answer
        </Button>
      </FormControl>
    </form>
  );
}
export default QuestionAnswer;
