import { StyleSheet, Text, View } from 'react-native';

export default function OfflineFirstTodoEntry() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offline-first todo</Text>
      <Text style={styles.description}>Your todo workspace starts here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: '#4b5563',
    fontSize: 16,
    marginTop: 12,
  },
});
