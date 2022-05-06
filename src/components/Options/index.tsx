import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { feedbackTypes } from '../../utils/feedbackTypes';

export function Options() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Give your feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option key={key} image={value.image} title={value.title} />
        ))}
      </View>

      <Copyright />
    </View>
  );
}