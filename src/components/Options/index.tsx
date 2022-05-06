import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { FeedbackType, feedbackTypes } from '../../utils/feedbackTypes';

interface Props {
  onFeedbackTypeChange: (type: FeedbackType | null) => void;
}

export function Options({ onFeedbackTypeChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Give your feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            image={value.image}
            title={value.title}
            onPress={() => onFeedbackTypeChange(key as FeedbackType)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}