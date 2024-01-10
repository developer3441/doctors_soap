import React, {createContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../component/CustomLoader';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     const isUser = await AsyncStorage.getItem('user');
  //     if (isUser) {
  //       setIsUserLoggedIn(true);
  //       setIsLoading(false);
  //     } else {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [isUserLoggedIn]);

  // if (loading) {
  //   return (
  //     <View style={{flex: 1}}>
  //       <CustomLoader />
  //     </View>
  //   );
  // }

  return (
    <AuthContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
