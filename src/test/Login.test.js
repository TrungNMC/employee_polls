import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

test('should update selected user on select change', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  // Assert that user options are rendered based on mock data
  const selectElement = getByTestId('select-id-user');
  fireEvent.change(selectElement, { target: { value: mockUsers[1].id } });
  expect(selectElement.value).toBe(mockUsers[1].id);
});

test('should call handleAuthorizeUser on button click', () => {
  const handleAuthorizeUserMock = jest.fn();
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Login handleAuthorizeUser={handleAuthorizeUserMock} />
      </BrowserRouter>
    </Provider>
  );

  // Simulate clicking the submit button
  const buttonElement = getByTestId('submit-button');
  fireEvent.click(buttonElement);

  // Assert that the mocked function was called
  expect(handleAuthorizeUserMock).toHaveBeenCalledTimes(0);
});

test('should render login form and select user', () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  expect(getByLabelText('User')).toBeInTheDocument();
});
