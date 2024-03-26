import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import NoMatch from '../components/NoMatch';
import React from 'react';
import { createStore } from 'redux';
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

describe('NoMatch', () => {
  it('matches the snapshot', () => {
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NoMatch />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
