import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {Input, Button, CheckBox} from '@rneui/base';
import {Icon} from '@rneui/base';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';

const Register = ({navigation}) => {
  const {width: SCREEN_WIDTH} = Dimensions.get('window');

  const {setIsUserLoggedIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [seePass, setSeePass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        firestore()
          .collection('Users')
          .doc(res?.user.uid)
          .set({
            email: email,
            name: name,
            companyName: companyName ? companyName : '',
            phoneNo: phoneNo,
          })
          .then(async () => {
            // await AsyncStorage.setItem('user', JSON.stringify(true));
            setIsUserLoggedIn(true);
            setLoading(false);
          })
          .catch(err => {
            Alert.alert('Error', err);
            setLoading(false);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
          setLoading(false);
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
          setLoading(false);
        }
        setLoading(false);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text
            style={{
              fontSize: 24,
              color: '#0361cc',
              textAlign: 'center',
              fontWeight: '600',
              marginBottom: '20%',
            }}>
            Register Your Account
          </Text>
          <Input
            placeholder="Enter Email"
            style={styles.inputEmail}
            leftIcon={<Icon name="person" color={'#0361cc'} />}
            selectionColor={'#0361cc'}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#0361cc',
              paddingHorizontal: 5,
              borderRadius: 8,
            }}
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <Input
            placeholder="Enter Your Name"
            style={styles.inputEmail}
            leftIcon={<Icon name="badge" color={'#0361cc'} />}
            selectionColor={'#0361cc'}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#0361cc',
              paddingHorizontal: 5,
              borderRadius: 8,
            }}
            value={name}
            onChangeText={name => setName(name)}
          />
          <Input
            placeholder="Your Company Name (optional)"
            style={styles.inputEmail}
            leftIcon={<Icon name="apartment" color={'#0361cc'} />}
            selectionColor={'#0361cc'}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#0361cc',
              paddingHorizontal: 5,
              borderRadius: 8,
            }}
            value={companyName}
            onChangeText={comp => setCompanyName(comp)}
          />
          <Input
            placeholder="Enter Phone#"
            style={styles.inputEmail}
            leftIcon={<Icon name="phone" color={'#0361cc'} />}
            selectionColor={'#0361cc'}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#0361cc',
              paddingHorizontal: 5,
              borderRadius: 8,
            }}
            value={phoneNo}
            onChangeText={ph => setPhoneNo(ph)}
          />
          <Input
            placeholder="Enter Password"
            selectionColor={'#0361cc'}
            style={styles.inputEmail}
            leftIcon={<Icon name="lock" color={'#0361cc'} />}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#0361cc',
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '70%',
            }}>
            <CheckBox
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
            <Text style={{fontSize: 14, color: '#000000', marginLeft: -10}}>
              I agree to the terms and conditions and privacy policy
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={handleLogin}
              title={'Register'}
              type="solid"
              containerStyle={{
                width: SCREEN_WIDTH - 60,
                borderRadius: 8,
                marginTop: 22,
              }}
              buttonStyle={{backgroundColor: '#0361cc', paddingVertical: 13}}
              titleStyle={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: 1,
                fontSize: 16,
                marginRight: 10,
              }}
              loading={loading}
              loadingProps={{animating: true, color: '#ffffff'}}
              disabled={
                email && password && name && phoneNo && isChecked ? false : true
              }
            />
          </View>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 13, color: '#000000'}}>
              Already have an Account?{' '}
              <Text
                onPress={() => {
                  navigation.navigate('login');
                  setEmail('');
                  setPassword('');
                  setSeePass(false);
                  setName('');
                  setCompanyName('');
                  setPhoneNo('');
                }}
                style={{fontSize: 14, color: '#0361cc', fontWeight: '600'}}>
                Login Now
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    paddingVertical: 60,
    backgroundColor: '#ffffff',
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

export default Register;
