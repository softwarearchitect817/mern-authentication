import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  ImageList,
  ImageListItem,
  Box,
  IconButton, ImageListItemBar, getPopoverUtilityClass
} from '@mui/material';

import { APP_URL } from '../../config';

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState([]);
  const [balance, setBalance] = useState(0);
  const gameContent = useRef();

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    history.push('/login');
  };

  useEffect(() => {
    setInterval(function () {
      getBalance();
    }, 1000)

    getGameLaunch();
    if (!localStorage.getItem('authToken')) {
      history.push('/login');
    }
  }, [history]);

  const getBalance = async () => {
    try {
      const { data } = await axios.post(
        `${APP_URL}/api/private/getBalance`,
        {
          user: "6480ba4b98676eb7dce43aa2"
        }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setBalance(data.balance);
    } catch (error) {
      setError('You are not authorized please login');
    }
  };

  const getGameLaunch = async () => {
    const res = await axios.post(`${APP_URL}/api/private/getGameLaunch`, {
      id: "1598",
      user: "6480ba4b98676eb7dce43aa2"
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    document.getElementById('gameContent').src = res.data;
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <Box>
        <h1>{balance}</h1>
        <br />
        <iframe id='gameContent' style={{ width: "100vw", height: "90vh" }}></iframe>
      </Box>
    </>
  );
};

export default PrivateScreen;
