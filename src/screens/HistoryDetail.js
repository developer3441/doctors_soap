import {Button, Icon, Image} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';

const HistoryDetail = ({route, navigation}) => {
  const {history} = route?.params || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [tone, setTone] = useState();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('history');
          setIsPlaying(false);
        }}
        style={{alignItems: 'flex-start', marginLeft: 10, marginTop: 10}}>
        <Icon name="arrow-back" size={25} color={'#92bc2a'} />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <Button
            title={'Sync with EMR'}
            titleStyle={{paddingVertical: 5}}
            containerStyle={{marginBottom: 40}}
            buttonStyle={{
              borderRadius: 5,
              paddingHorizontal: 20,
              backgroundColor: '#92bc2a',
            }}
            icon={
              <Icon name="sync" color={'#ffffff'} style={{marginLeft: 10}} />
            }
            iconRight
          />
          <Button
            onPress={() => {
              Clipboard.setString(history?.detail);
              Snackbar.show({
                text: 'Text copied in clipboard',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#92bc2a',
                textColor: '#ffffff',
              });
            }}
            title={'Copy Text'}
            titleStyle={{paddingVertical: 5}}
            containerStyle={{marginBottom: 40}}
            buttonStyle={{
              borderRadius: 5,
              paddingHorizontal: 20,
              backgroundColor: 'green',
            }}
            icon={
              <Icon
                name="content-copy"
                color={'#ffffff'}
                style={{marginLeft: 10}}
              />
            }
            iconRight
          />
        </View>
        <Text style={styles.headingText}>
          {history?.recording && JSON.parse(history?.recording)}
        </Text>
        {history?.detail && (
          <>
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontWeight: 'bold',
                marginBottom: 7,
              }}>
              Subjective:
            </Text>
            <Text style={{fontSize: 15, color: '#000000'}}>
              {history?.detail?.Subjective}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontWeight: 'bold',
                marginTop: 15,
                marginBottom: 7,
              }}>
              Objective:
            </Text>
            <Text style={{fontSize: 15, color: '#000000'}}>
              {history?.detail?.Objective}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontWeight: 'bold',
                marginTop: 15,
                marginBottom: 7,
              }}>
              Assessment:
            </Text>
            <Text style={{fontSize: 15, color: '#000000'}}>
              {history?.detail?.Assessment}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontWeight: 'bold',
                marginTop: 15,
                marginBottom: 7,
              }}>
              Plan:
            </Text>
            <Text style={{fontSize: 15, color: '#000000'}}>
              {history?.detail?.Plan}
            </Text>
          </>
        )}
        {/* <Text style={styles.text}>{history?.detail}</Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
  },
  headingText: {
    fontSize: 16,
    color: '#0361cc',
    marginVertical: 0,
  },
});

export default HistoryDetail;
