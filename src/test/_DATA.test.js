import { _saveQuestion, _saveQuestionAnswer, _getUsers, _getQuestions } from '../utils/_DATA';
import * as yourFunctions from '../utils/_DATA';


test('_saveQuestion saves a question with correct data', async () => {
  const correctData = {
    optionOneText: 'Text for option one',
    optionTwoText: 'Text for option two',
    author: 'sarahedo',
  };

  const savedQuestion = await _saveQuestion(correctData);

  expect(savedQuestion).toHaveProperty('id');
  expect(savedQuestion).toHaveProperty('timestamp');
  expect(savedQuestion.author).toBe(correctData.author);
  expect(savedQuestion.optionOne).toHaveProperty('votes');
  expect(savedQuestion.optionOne.votes).toEqual([]);
  expect(savedQuestion.optionTwo).toHaveProperty('votes');
  expect(savedQuestion.optionTwo.votes).toEqual([]);
});

test('_saveQuestion returns an error when incorrect data is passed', async () => {
  const incorrectData = {
    optionOneText: 'Text for option one', // Missing optionTwoText and author
  };

  try {
    await _saveQuestion(incorrectData);
    fail('Expected an error to be thrown');
  } catch (error) {
    expect(error).toBe(
      'Please provide optionOneText, optionTwoText, and author'
    );
  }
});



// test('async _saveQuestionAnswer throws error for missing data', async () => {
//     // Missing authedUser
//     await expect(
//       _saveQuestionAnswer({ qid: '8xf0y6ziyjabvozdd253nd', answer: 'optionTwo' })
//     ).rejects.toThrow('Please provide authedUser, qid, and answer');
  
//     // Missing qid
//     await expect(
//       _saveQuestionAnswer({ authedUser: 'sarahedo', answer: 'optionTwo' })
//     ).rejects.toThrow('Please provide authedUser, qid, and answer');
  
//     // Missing answer
//     await expect(
//       _saveQuestionAnswer({
//         authedUser: 'sarahedo',
//         qid: '8xf0y6ziyjabvozdd253nd',
//       })
//     ).rejects.toThrow('Please provide authedUser, qid, and answer');
//   });
  
  test('async _saveQuestionAnswer updates data correctly', async () => {
    const users = await _getUsers();
    const questions = await _getQuestions();
    const authedUser = 'sarahedo';
    const qid = '8xf0y6ziyjabvozdd253nd';
    const answer = 'optionOne';
  
    const response = await _saveQuestionAnswer({ authedUser, qid, answer });
  
    expect(response).toBe(true);
  
    // Additional assertions to check updated user and question data
    expect(users[authedUser].answers[qid]).toBe(answer);
    expect(questions[qid].optionOne.votes).toContain(authedUser);
  });