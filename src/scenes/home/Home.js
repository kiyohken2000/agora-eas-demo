import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StatusBar, useColorScheme, Button } from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native'

export default function Home(props) {
  const userData = props.extraData
  const [token, setToken] = useState('')
  const scheme = useColorScheme()
  const navigation = useNavigation()

  useEffect(() => {
    firebase.firestore()
      .collection('tokens')
      .doc(userData.id)
      .get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            const data = doc.data()
            setToken(data)
        } else {
            console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, width: '100%' }}>
        <ScrollView style={styles.main}>
          <Text style={scheme === 'dark' ? styles.darkfield : styles.field}>Mail:</Text>
          <Text style={scheme === 'dark' ? styles.darktitle : styles.title}>{userData.email}</Text>
          <Text style={scheme === 'dark' ? styles.darkfield : styles.field}>Expo push token:</Text>
          <Text style={scheme === 'dark' ? styles.darktitle : styles.title}>{token.token}</Text>
          <Button title={'Go Stream'} onPress={() => {
            navigation.navigate('Stream')
          }} />
        </ScrollView>
      </View>
    </View>
  )
}