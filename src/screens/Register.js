import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  Modal,
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
  const [showStrong, setShowStrong] = useState('');
  const [termsModal, setTermsModal] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  function handleLogin(password) {
    let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (password.match(check)) {
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
            .then(async res => {
              // await AsyncStorage.setItem('user', JSON.stringify(true));
              await AsyncStorage.setItem('userDetail', JSON.stringify(res));
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
    } else {
      setShowStrong(
        'Password must be 8 characters long and have Uppercase, Numeric and Special Characters',
      );
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            Register Your Account
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
            placeholder="Enter Your Name"
            style={styles.inputEmail}
            leftIcon={<Icon name="badge" color={'#92bc2a'} />}
            selectionColor={'#92bc2a'}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#92bc2a',
              paddingHorizontal: 5,
              borderRadius: 8,
            }}
            value={name}
            onChangeText={name => setName(name)}
          />
          <Input
            placeholder="Your Company Name (optional)"
            style={styles.inputEmail}
            leftIcon={<Icon name="apartment" color={'#92bc2a'} />}
            selectionColor={'#92bc2a'}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#92bc2a',
              paddingHorizontal: 5,
              borderRadius: 8,
            }}
            value={companyName}
            onChangeText={comp => setCompanyName(comp)}
          />
          <Input
            placeholder="Enter Phone#"
            style={styles.inputEmail}
            leftIcon={<Icon name="phone" color={'#92bc2a'} />}
            selectionColor={'#92bc2a'}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#92bc2a',
              paddingHorizontal: 5,
              borderRadius: 8,
            }}
            value={phoneNo}
            onChangeText={ph => setPhoneNo(ph)}
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
            errorMessage={showStrong}
            errorStyle={{fontSize: 12, color: 'red', marginVertical: 6}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '70%',
            }}>
            <CheckBox
              checked={isChecked}
              onPress={() => {
                setIsChecked(true);
                setTermsModal(true);
              }}
              containerStyle={{backgroundColor: '#e6e6e6'}}
            />
            <Text style={{fontSize: 14, color: '#000000', marginLeft: -10}}>
              Read our Terms of Service
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={() => handleLogin(password)}
              title={'Register'}
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
              disabled={
                email && password && name && phoneNo && isAgree ? false : true
              }
              disabledStyle={{borderWidth: 1, borderColor: '#92bc2a', borderRadius: 8}}
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
                  setIsChecked(false);
                }}
                style={{fontSize: 14, color: '#92bc2a', fontWeight: '600'}}>
                Login Now
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <Modal visible={termsModal} animationType="slide">
        <View style={{flex: 1, backgroundColor: '#e6e6e6'}}>
          <ScrollView>
            <View style={{paddingHorizontal: 20, marginVertical: 20}}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000000',
                  marginBottom: 10,
                  fontWeight: '700',
                }}>
                Terms of Services
              </Text>
              <Text style={{fontSize: 15, color: '#000000'}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    marginTop: 10,
                  }}>
                  Conditions of use &nbsp;
                </Text>
                {'\n'}
                By using this website, you certify that you have read and
                reviewed this Agreement and that you agree to comply with its
                terms. If you do not want to be bound by the terms of this
                Agreement, you are advised to leave the website accordingly.
                HelloProvider only grants use and access of this website, its
                products, and its services to those who have accepted its terms.
                {'\n'}{' '}
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: '700',
                  }}>
                  Privacy Policy &nbsp;
                </Text>
                {'\n'}
                Before you continue using our website, we advise you to read our
                privacy policy regarding our user data collection. It will help
                you better understand our practices. {'\n'}{' '}
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: '700',
                  }}>
                  Age Restriction
                </Text>
                {'\n'}
                You must be at least 18 (eighteen) years of age before you can
                use this website. By using this website, you warrant that you
                are at least 18 years of age and you may legally adhere to this
                Agreement. HelloProvider assumes no responsibility for
                liabilities related to age misrepresentation. Intellectual
                property You agree that all materials, products, and services
                provided on this website are the property of HelloProvider, its
                affiliates, directors, officers, employees, agents, suppliers,
                or licensors including all copyrights, trade secrets,
                trademarks, patents, and other intellectual property. You also
                agree that you will not reproduce or redistribute the
                HelloProvider's intellectual property in any way, including
                electronic, digital, or new trademark registrations. You grant
                HelloProvider a royalty-free and non-exclusive license to
                display, use, copy, transmit, and broadcast the content you
                upload and publish. For issues regarding intellectual property
                claims, you should contact the company in order to come to an
                agreement. {'\n'}
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: '700',
                  }}>
                  User Account
                </Text>
                {'\n'} As a user of this website, you may be asked to register
                with us and provide private information. You are responsible for
                ensuring the accuracy of this information, and you are
                responsible for maintaining the safety and security of your
                identifying information. You are also responsible for all
                activities that occur under your account or password. If you
                think there are any possible issues regarding the security of
                your account on the website, inform us immediately so we may
                address it accordingly. We reserve all rights to terminate
                accounts, edit or remove content and cancel orders in their sole
                discretion. {'\n'}
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: '700',
                  }}>
                  Applicable Law
                </Text>
                {'\n'} By visiting this website, you agree that the laws of the
                [location], without regard to principles of conflict laws, will
                govern these terms and conditions, or any dispute of any sort
                that might come between HelloProvider and you, or its business
                partners and associates. {'\n'}
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: '700',
                  }}>
                  Disputes
                </Text>
                {'\n'}
                Any dispute related in any way to your visit to this website or
                to products you purchase from us shall be arbitrated by state or
                federal court [location] and you consent to exclusive
                jurisdiction and venue of such courts. {'\n'}
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: '700',
                  }}>
                  Idemnification
                </Text>
                {'\n'}
                You agree to indemnify HelloProvider and its affiliates and hold
                HelloProvider harmless against legal claims and demands that may
                arise from your use or misuse of our services. We reserve the
                right to select our own legal counsel. {'\n'}
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: '700',
                  }}>
                  Limitation on liability
                </Text>
                {'\n'}
                HelloProvider is not liable for any damages that may occur to
                you as a result of your misuse of our website. HelloProvider
                reserves the right to edit, modify, and change this Agreement
                any time. We shall let our users know of these changes through
                electronic mail. This Agreement is an understanding between
                HelloProvider and the user, and this supersedes and replaces all
                prior agreements regarding the use of this website.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '70%',
                }}>
                <CheckBox
                  checked={isAgree}
                  onPress={() => {
                    setIsAgree(!isAgree);
                  }}
                  containerStyle={{backgroundColor: '#e6e6e6'}}
                />
                <Text style={{fontSize: 14, color: '#000000', marginLeft: -10}}>
                  I agree to the terms and conditions and privacy policy
                </Text>
              </View>
              <Button
                onPress={() => setTermsModal(false)}
                title={'Agree'}
                buttonStyle={{
                  width: '50%',
                  borderRadius: 5,
                  backgroundColor: '#92bc2a',
                  marginVertical: 10,
                }}
                containerStyle={{alignItems: 'center'}}
                disabled={!isAgree}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
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
    borderBottomColor: '#92bc2a',
  },
  inputPassword: {
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
    marginTop: 25,
    borderColor: '#92bc2a',
  },
});

export default Register;
