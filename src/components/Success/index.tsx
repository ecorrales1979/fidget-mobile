import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Copyright } from '../Copyright';
import successImg from '../../assets/success.png';

export function Success() {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>We appreciate your feedback!</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>Send another feedback</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}