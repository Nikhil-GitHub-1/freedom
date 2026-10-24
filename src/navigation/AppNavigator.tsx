import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OfflineFirstTodoEntry } from '../features/offline-first-todo-app';
import { BottomTabs } from './BottomTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="Todo" component={OfflineFirstTodoEntry} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
