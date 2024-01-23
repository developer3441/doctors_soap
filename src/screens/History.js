import {Icon} from '@rneui/base';
import {React, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import CustomLoader from '../component/CustomLoader';

const History = ({navigation}) => {
  const {height: SCREEN_HEIGHT} = Dimensions.get('screen');
  const {user, recordUpdated, setRecordUpdated} = useContext(AuthContext);

  const [histortData, setHistoryData] = useState({});
  const [loading, setLoading] = useState(false);

  const getHistory = async () => {
    setLoading(true);
    const data = await firestore()
      .collection('History')
      .doc(user?.user?.uid)
      .get();
    setHistoryData(data?.data());
    setLoading(false);
    setRecordUpdated(false);
  };

  useEffect(() => {
    getHistory();
  }, [recordUpdated]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <CustomLoader />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 27,
          color: '#92bc2a',
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 15,
          fontWeight: '500',
        }}>
        History
      </Text>
      {histortData?.history?.length > 0 ? (
        histortData?.history?.map((item, index) => (
          <View
            key={index}
            style={{
              marginVertical: 10,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 2,
              marginHorizontal: 10,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('historydetail', {
                  history: item,
                })
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#92bc2a',
                    fontWeight: '700',
                    marginBottom: 5,
                  }}>
                  {item?.title}
                </Text>
                <Text style={{fontSize: 12, color: 'gray'}}>
                  {item?.timeStamp}
                </Text>
              </View>
              <Icon name="arrow-forward" color={'#92bc2a'} size={25} />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '70%'
          }}>
          <Text style={{fontSize: 18, color: '#000000'}}>
            No history found...
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
});

export default History;
