import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import ContactListScreen from './src/screens/ContactListScreen';
import ContactDetailScreen from './src/screens/ContactDetailScreen';
import ContactFormScreen from './src/screens/ContactFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ContactList"
          screenOptions={{
            headerStyle: { backgroundColor: '#6200ee' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="ContactList"
            component={ContactListScreen}
            options={{ title: 'Danh Bạ' }}
          />
          <Stack.Screen
            name="ContactDetail"
            component={ContactDetailScreen}
            options={{ title: 'Chi Tiết Liên Hệ' }}
          />
          <Stack.Screen
            name="ContactForm"
            component={ContactFormScreen}
            options={{ title: 'Thêm Liên Hệ' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
