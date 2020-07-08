import React, { useState, useRef } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Fullscreen from 'react-full-screen';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  background: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },

  face: {
    display: 'flex',
    height: '5rem',
    justifyContent: 'center',
    padding: '20vh 0 20vh 0',
  },

  eye: {
    overflow: 'visible',
  },

  eyeBox: {
    height: '2.5rem',
    width: '2.5rem',
  },

  mouth: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 1rem 0 1rem',
    width: '10rem',
  },

  shock: {
    background: '#333',
    clipPath: 'circle(50px at 50% 100%)',
    height: '3rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease-in-out',
    width: '5rem',
  },

  sad: {
    borderColor: '#333 transparent transparent transparent',
    borderStyle: 'solid',
    borderWidth: '15px',
    borderRadius: '100%',
    height: '3rem',
    marginTop: '2rem',
    transition: 'border-width 0.3s ease-in-out',
    width: '5rem',
  },

  flat: {
    borderBottom: 'solid 15px #333',
    marginBottom: '1rem',
    transition: 'all 0.3s ease-in-out',
    width: '3.5rem',
  },

  smile: {
    borderColor: 'transparent transparent #333 transparent',
    borderStyle: 'solid',
    borderWidth: '15px',
    borderRadius: '100%',
    height: '3rem',
    marginTop: '-0.5rem',
    transition: 'border-width 0.3s ease-in-out',
    width: '10rem',
  },

  happy: {
    background: '#333',
    clipPath: 'circle(50px at 50% 0)',
    height: '3rem',
    marginTop: '2rem',
    transition: 'all 0.3s ease-in-out',
    width: '5rem',
  },
}));

const App = () => {
  const classes = useStyles();
  const [useHeart, setUseHeart] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const faceRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);

  const handleMouseMove = (event) => {
    const rect = faceRef.current.getBoundingClientRect();
    setX(event.clientX - rect.left);
    setY(event.clientY - rect.top);
  };

  const heart = (
    <svg className="heart" viewBox="0 0 32 29.6">
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </svg>
  );

  const renderEye = (cx, cy) => {
    let ecx = cx;
    if (x >= 0 && x <= 200) {
      ecx = cx + x / 10;
    } else if (x >= 200) {
      ecx = cx + 20;
    }

    return (
      <div className={classes.eyeBox}>
        <svg className={classes.eye}>
          <circle cx={ecx} cy={Math.min(cy + y / 10, 25)} r={25} fill="#333" />
        </svg>
      </div>
    );
  };

  const face = (
    <div
      className={classes.face}
      onClick={() => {
        setUseHeart(!useHeart);
      }}
      ref={faceRef}
    >
      {useHeart ? heart : renderEye(0, 0)}
      <div className={classes.mouth}>
        <div className={classes.happy} />
      </div>
      {useHeart ? heart : renderEye(25, 0)}
    </div>
  );

  return (
    <Fullscreen enabled={false}>
      <div
        className={classes.background}
        onClick={() => {
          setFullscreen(!fullscreen);
        }}
        onMouseMove={handleMouseMove}
      >
        {face}
      </div>
    </Fullscreen>
  );
};

App.propTypes = {
  transcript: PropTypes.string.isRequired,
  interimTranscript: PropTypes.string.isRequired,
  resetTranscript: PropTypes.func.isRequired,
};

export default App;
