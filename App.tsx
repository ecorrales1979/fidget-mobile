import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Widget } from './src/components/Widget';
import { theme } from './src/theme';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Widget />
      <Text style={{ color: theme.colors.text_primary}}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
