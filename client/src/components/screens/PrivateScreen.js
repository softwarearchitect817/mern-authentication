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
    getGameLaunch();
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

  const playGame = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        url: "http://localhost:8000/api/game?gameID=1598&token=123&opid=123"
      },
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

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <Box>
        {/* https://vegasbets.site/api/GreatRhinoPM?gameID=1598&opid=6480d2c39f40ea34fcbef84f&api=BopzRkUUsX5j0wkN1f7RLM9Zj */}
        <iframe id='gameContent' style={{ width: "100vw", height: "90vh" }}></iframe>
      </Box>
    </>
  );
};

export default PrivateScreen;
