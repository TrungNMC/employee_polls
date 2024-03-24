import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Container,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => Object.values(state.users));
  const authedUser = useSelector((state) => state.authedUser);

    const sortedUsers = users.sort((user1, user2) => {
      const user1Count = Object.keys(user1.questions).length + Object.keys(user1.answers).length;
      const user2Count = Object.keys(user2.questions).length + Object.keys(user2.answers).length;
      return user2Count - user1Count;
    });



  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser, navigate]);

  return (
    <div className='leader-board'>
      <NavBar/>
      <Container
        component='main'
        sx={{
          marginTop: 8,
        }}
      >
        <Card>
          <CardHeader title='Leaderboard' />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell align='center'>Answered Questions</TableCell>
                    <TableCell align='center'>Created Questions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar alt='Profile Picture' src={user.avatarURL} />
                          </ListItemAvatar>
                          <ListItemText primary={user.name} secondary={user.id} />
                        </ListItemButton>
                      </TableCell>
                      <TableCell align='center'>
                        {Object.keys(user.answers).length}
                      </TableCell>
                      <TableCell align='center'>
                        {user.questions.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Leaderboard;
