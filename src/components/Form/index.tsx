import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { api } from '../../libs/api';
import { theme } from '../../theme';
import { FeedbackType, feedbackTypes } from '../../utils/feedbackTypes';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackReset: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackReset, onFeedbackSent }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleTakeScreenshot = () => {
    captureScreen({
      format: 'png',
      quality: 0.8,
    })
    .then(uri => setScreenshot(uri))
    .catch(error => console.error(error))
  }

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
  }

  const handleSentFeedback = async () => {
    if (isSubmitting) return

    setIsSubmitting(true);

    const screenshotBase64 = screenshot
      ? await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })
      : null;

    api
      .post('feedbacks', {
        comment,
        type: feedbackType,
        screenshot: screenshot ? `data:image/png;base64, ${screenshotBase64}` : undefined,
      })
      .then(() => {
        onFeedbackSent();
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackReset}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image style={styles.image} source={feedbackTypeInfo.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Describe your problem here"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleTakeScreenshot}
          onRemoveShot={handleRemoveScreenshot}
        />
        <Button
          isLoading={isSubmitting}
          onPress={handleSentFeedback}
          disabled={!comment}
        />
      </View>

    </View>
  );
}