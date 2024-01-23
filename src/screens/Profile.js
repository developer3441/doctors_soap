import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {Icon, Image} from '@rneui/base';
import Logo from '../images/logo_new.webp';
import CustomLoader from '../component/CustomLoader';

const Profile = () => {
  const {user} = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    firestore()
      .collection('Users')
      .doc(user?.user?.uid)
      .get()
      .then(res => {
        if (res) {
          setProfileData(res?.data());
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('Error in Getting Record =>', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const profileArr = [
    {
      icon: 'person',
      name: profileData?.email,
    },
    {
      icon: 'badge',
      name: profileData?.name,
    },
    {
      icon: 'apartment',
      name:
        profileData?.companyName !== ''
          ? profileData?.companyName
          : 'Not Provided',
    },
    {
      icon: 'phone',
      name: profileData?.phoneNo,
    },
  ];

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CustomLoader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Profile</Text>
      <View style={styles.innerContainer}>
        {profileArr?.map((item, index) => (
          <View key={index} style={styles.tileView}>
            <Icon name={item?.icon} color={'#92bc2a'} size={25} />
            <Text style={styles.text}>{item?.name}</Text>
          </View>
        ))}
        <View style={{marginTop: '30%', alignItems: 'center'}}>
          <Image source={Logo} style={{height: 50, width: 220}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 27,
    color: '#92bc2a',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  tileView: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Profile;
