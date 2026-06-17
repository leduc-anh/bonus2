import { useState, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getContactById, deleteContact } from '../database/db';

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text variant="labelSmall" style={styles.label}>{label}</Text>
      <Text variant="bodyLarge">{value}</Text>
    </View>
  );
}

export default function ContactDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [contact, setContact] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getContactById(id).then(setContact);
    }, [id])
  );

  const handleDelete = () => {
    Alert.alert('Xác nhận xóa', `Bạn có chắc muốn xóa "${contact?.name}"?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          await deleteContact(id);
          navigation.goBack();
        },
      },
    ]);
  };

  if (!contact) return null;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.name}>{contact.name}</Text>
          <Divider style={styles.divider} />
          <InfoRow label="Số điện thoại" value={contact.phone} />
          <InfoRow label="Email" value={contact.email} />
          <InfoRow label="Địa chỉ" value={contact.address} />
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="pencil"
          onPress={() => navigation.navigate('ContactForm', { id, contact })}
          style={styles.btn}
        >
          Chỉnh sửa
        </Button>
        <Button
          mode="outlined"
          icon="delete"
          onPress={handleDelete}
          style={styles.btn}
          textColor="red"
        >
          Xóa
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { margin: 16 },
  name: { fontWeight: 'bold', marginBottom: 8 },
  divider: { marginVertical: 8 },
  row: { marginVertical: 6 },
  label: { color: '#888', marginBottom: 2 },
  actions: { flexDirection: 'row', gap: 12, marginHorizontal: 16 },
  btn: { flex: 1 },
});
