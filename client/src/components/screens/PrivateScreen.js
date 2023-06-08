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
    playServerGame();
    if (!localStorage.getItem('authToken')) {
      history.push('/login');
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/private',
          config
        );
        setPrivateData(data);
      } catch (error) {
        localStorage.removeItem('authToken');
        setError('You are not authorized please login');
      }
    };
    // fetchPrivateData();
  }, [history]);

  const playGame = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      url: "http://localhost:8000/api/game?gameID=1598&token=123&opid=123"
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/private/playGame',
        config
      );
      console.log(res);
    } catch (error) {
      localStorage.removeItem('authToken');
      setError('You are not authorized please login');
    }
  }

  const playServerGame = async () => {
    try {
      const res = await axios.post("http://38.242.213.74:5000/api/private/playGame", {
        name: "GreatRhinoPM", id: "1598", opid: "6480d2c39f40ea34fcbef84f"
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      console.log("res====>", res);
      gameContent.current.src = res.data;
    } catch (error) {
      console.log(error);
      // localStorage.removeItem('authToken');
      // setError('You are not authorized please login');
    }
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <Box>
        <Typography fontSize={20}>{balance}</Typography>
        <iframe ref={gameContent} style={{ width: "100vw", height: "90vh" }}></iframe>
      </Box>
    </>
  );
};

export default PrivateScreen;
