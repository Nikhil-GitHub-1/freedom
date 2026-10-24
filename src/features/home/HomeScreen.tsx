import { Button, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  BottomTabParamList,
  RootStackParamList,
} from '../../navigation/types';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList, 'Main'>
>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20,
        }}>
        Home Screen
      </Text>

      <Button title="Go to Todo" onPress={() => navigation.navigate('Todo')} />
    </View>
  );
};
