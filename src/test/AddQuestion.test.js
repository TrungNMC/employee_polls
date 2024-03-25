import { render, fireEvent } from '@testing-library/react';
import AddQuestion from '../components/AddQuestion';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { users } from '../utils/_DATA'; // Import your mock users data
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockUsers = [
  {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL:
      'https://www.svgrepo.com/show/384671/account-avatar-profile-user-14.svg',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo',
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
  },
  {
    id: 'tylermcginnis',
    password: 'abc321',
    name: 'Tyler McGinnis',
    avatarURL:
      'https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  {
    id: 'mtsamis',
    password: 'xyz123',
    name: 'Mike Tsamis',
    avatarURL:
      'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  {
    id: 'zoshikanlu',
    password: 'pass246',
    name: 'Zenobia Oshikanlu',
    avatarURL:
      'https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
    },
    questions: [],
  },
];
const store = createStore((state = { users: mockUsers }, action) => state, {
  users: mockUsers,
});

describe('AddQuestion component', () => {
  it('should render the component and disable submit button initially', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddQuestion />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Would you rather ?')).toBeInTheDocument();
    expect(getByTestId('submit-button-ask')).toBeDisabled();
  });

  it('should enable submit button when both options are filled', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddQuestion />
        </BrowserRouter>
      </Provider>
    );

    const optionOneInput = getByTestId('input-option-one');
    const optionTwoInput = getByTestId('input-option-two');
    const submitButton = getByTestId('submit-button-ask');

    fireEvent.change(optionOneInput, { target: { value: 'Option 1' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option 2' } });

    expect(submitButton).toBeEnabled();
  });

  it('should not submit form when option is empty', () => {
    const mockDispatch = jest.fn();
    const navigate = jest.fn();

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddQuestion dispatch={mockDispatch} navigate={navigate} />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = getByTestId('submit-button-ask');

    fireEvent.click(submitButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
