import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';
import { theme } from '../../theme';
import { FeedbackType } from '../../utils/feedbackTypes';

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpen = () => {
    bottomSheetRef?.current?.expand();
  }

  const handleFeedbackTypeChange = (type: FeedbackType | null) => {
    setFeedbackType(type);
    setFeedbackSent(false);
  }

  const handleFeedbackReset = () => {
    setFeedbackType(null)
  }

  const handleFeedbackSent = () => {
    setFeedbackSent(true)
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent 
          ? <Success />
          : (
            <>
              {!!feedbackType
                ? (
                  <Form
                    feedbackType={feedbackType}
                    onFeedbackReset={handleFeedbackReset}
                    onFeedbackSent={handleFeedbackSent}
                  />
                ) : <Options onFeedbackTypeChange={handleFeedbackTypeChange}/>
              }
            </>
          )
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
