import React from 'react';
import './config/ReactronConfig';
import {StatusBar} from 'react-native';
import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c5" />
      <Routes />
    </>
  );
};

export default App;
