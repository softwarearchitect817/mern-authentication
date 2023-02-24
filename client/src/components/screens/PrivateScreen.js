import { useEffect, useState } from 'react';
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

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    history.push('/login');
  };

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      history.push('/login');
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
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

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <Box>
        {/* {
          privateData.map((item, ind) => {
            if (ind < 10)
              return (
                <ImageListItem key={ind} className='image-item-list'>
                  <Box className="image-item">
                    <img
                      src={`http://localhost:8000/frontend/Default/ico/${item.name}.jpg`}
                      srcSet={`http://localhost:8000/frontend/Default/ico/${item.name}.jpg`}
                      alt={item.text}
                      loading="lazy"
                      className="image"
                    />
                    <Stack direction="row" className="btn-casino-action">
                      <Button onClick={playGame}>Play</Button>
                      
                    </Stack>
                  </Box>
                  <Box>
                    <Typography className="textCenter" sx={{ color: "#ccc", fontSize: "0.7rem" }}>{item.title}</Typography>
                  </Box>
                </ImageListItem>
              );
            else if (ind === 4)
              return (<br />)
          })
        } */}
        <Typography fontSize={20}>{balance}</Typography>
        <iframe style={{ width: "100vw", height: "90vh" }} src='http://45.85.249.190/api/GreatRhinoPM?token=1&&gameID=1598&&opid=1'></iframe>
        {/* <iframe style={{ width: "100vw", height: "100vh" }} src='http://192.168.114.61/api/ActionMoneyEGT?token=1&&gameID=1654&&opid=1'></iframe> */}
      </Box>
      {/* <button onClick={logoutHandler}>Logout</button> */}
    </>
  );
};

export default PrivateScreen;
