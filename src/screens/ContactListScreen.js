import { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, FAB, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getAllContacts } from '../database/db';
import ContactCard from '../components/ContactCard';

export default function ContactListScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  const loadContacts = useCallback(async (query = '') => {
    const data = await getAllContacts(query);
    setContacts(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadContacts(search);
    }, [search, loadContacts])
  );

  const handleSearch = (text) => {
    setSearch(text);
    loadContacts(text);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm theo tên hoặc SĐT..."
        value={search}
        onChangeText={handleSearch}
        style={styles.search}
      />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContactCard
            contact={item}
            onPress={() => navigation.navigate('ContactDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {search ? 'Không tìm thấy kết quả' : 'Chưa có liên hệ nào. Nhấn + để thêm.'}
          </Text>
        }
        contentContainerStyle={contacts.length === 0 && styles.emptyContainer}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('ContactForm', {})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  search: { margin: 12 },
  empty: { textAlign: 'center', color: '#aaa', fontSize: 15 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});
