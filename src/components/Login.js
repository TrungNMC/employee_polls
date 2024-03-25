import {
  Box,
  Container,
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

function Login() {
  const [selectUser, setSelectUser] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const handleChangeUser = (event) => {
    setSelectUser(event.target.value);
  };

  const handleAuthorizeUser = () => {
    dispatch(setAuthedUser(selectUser));

    const prevRouterPath = navigate.state?.previous?.pathname || '/';
    navigate(prevRouterPath);
  };

  return (
    <div className='Login'>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            srcSet={logo}
            src={logo}
            alt={'logo'}
            loading='lazy'
            width={100}
            height={100}
          />
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id='demo-simple-select-label'>User</InputLabel>
            <Select
              labelId='user-select-label'
              aria-label={'User'}
              value={selectUser}
              label='User'
              onChange={handleChangeUser}
              inputProps={{ "data-testid": "select-id-user" }}
            >
              {Object.values(users).map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAuthorizeUser}
              data-testid="submit-button"
            >
              Sign In
            </Button>
          </FormControl>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
