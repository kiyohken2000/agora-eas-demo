import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StatusBar, useColorScheme, Button } from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'
import AgoraUIKit from 'agora-rn-uikit'

export default function Stream(props) {
  const userData = props.extraData
  const scheme = useColorScheme()
  const [videoCall, setVideoCall] = useState(false);
  const rtcProps = {
    appId: '707e40fed82c4aaf923d4784f46b56b1',
    channel: 'easdemo',
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, width: '100%' }}>
        {
          videoCall ?
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
            :
            <Button title={'Start Call'} onPress={()=>setVideoCall(true)} />
        }
      </View>
    </View>
  )
}