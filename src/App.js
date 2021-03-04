import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Loading} from './components';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {loading && <Loading />}
    </Provider>
  );
};

export default App;
