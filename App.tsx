import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { theme } from './src/theme';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text_primary}}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
