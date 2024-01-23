import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {Input, Button} from '@rneui/base';
import {Icon} from '@rneui/base';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';

const Login = ({navigation}) => {
  const {width: SCREEN_WIDTH} = Dimensions.get('window');

  const {setIsUserLoggedIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePass, setSeePass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        // await AsyncStorage.setItem('user', JSON.stringify(true));
        await AsyncStorage.setItem('userDetail', JSON.stringify(res));
        setIsUserLoggedIn(true);
        setLoading(false);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', error.code);
          setLoading(false);
        } else {
          Alert.alert('Error', 'Invalid Credentials');
          setLoading(false);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text
          style={{
            fontSize: 24,
            color: '#92bc2a',
            textAlign: 'center',
            fontWeight: '600',
            marginBottom: '20%',
          }}>
          Welcome to Login
        </Text>
        <Input
          placeholder="Enter Email"
          style={styles.inputEmail}
          leftIcon={<Icon name="person" color={'#92bc2a'} />}
          selectionColor={'#92bc2a'}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: '#92bc2a',
            paddingHorizontal: 5,
            borderRadius: 8,
          }}
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <Input
          placeholder="Enter Password"
          selectionColor={'#92bc2a'}
          style={styles.inputEmail}
          leftIcon={<Icon name="lock" color={'#92bc2a'} />}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: '#92bc2a',
            paddingHorizontal: 5,
            borderRadius: 8,
          }}
          value={password}
          onChangeText={pass => setPassword(pass)}
          secureTextEntry={seePass ? false : true}
          rightIcon={
            <Icon
              name={seePass ? 'visibility-off' : 'visibility'}
              onPress={() => setSeePass(!seePass)}
            />
          }
        />
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={handleLogin}
            title={'Login'}
            type="solid"
            containerStyle={{
              width: SCREEN_WIDTH - 60,
              borderRadius: 8,
              marginTop: 22,
            }}
            buttonStyle={{backgroundColor: '#92bc2a', paddingVertical: 13}}
            titleStyle={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              letterSpacing: 1,
              fontSize: 16,
              marginRight: 10,
            }}
            loading={loading}
            loadingProps={{animating: true, color: '#ffffff'}}
            disabled={email && password ? false : true}
            disabledStyle={{
              borderWidth: 1,
              borderColor: '#92bc2a',
              borderRadius: 8,
            }}
            disabledTitleStyle={{color: '#000000'}}
          />
        </View>
        <View
          style={{
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 13, color: '#000000'}}>
            Don't have an Account?{' '}
            <Text
              onPress={() => {
                navigation.navigate('register');
                setEmail('');
                setPassword('');
                setSeePass(false);
              }}
              style={{fontSize: 14, color: '#92bc2a', fontWeight: '600'}}>
              Register Now
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  innerContainer: {
    paddingVertical: 60,
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 10,
  },
  inputEmail: {
    fontSize: 16,
    borderRadius: 5,
    borderBottomColor: '#0361cc',
  },
  inputPassword: {
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
    marginTop: 25,
    borderColor: '#0361cc',
  },
});

export default Login;
