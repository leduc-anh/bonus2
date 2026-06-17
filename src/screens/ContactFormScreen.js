import { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { insertContact, updateContact } from '../database/db';

export default function ContactFormScreen({ route, navigation }) {
  const existing = route.params?.contact;
  const id = route.params?.id;
  const isEdit = !!id;

  const [name, setName] = useState(existing?.name || '');
  const [phone, setPhone] = useState(existing?.phone || '');
  const [email, setEmail] = useState(existing?.email || '');
  const [address, setAddress] = useState(existing?.address || '');
  const [nameError, setNameError] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? 'Chỉnh sửa liên hệ' : 'Thêm liên hệ' });
  }, [navigation, isEdit]);

  const handleSave = async () => {
    if (!name.trim()) {
      setNameError('Tên không được để trống');
      return;
    }
    setNameError('');

    if (isEdit) {
      await updateContact(id, { name: name.trim(), phone, email, address });
    } else {
      await insertContact({ name: name.trim(), phone, email, address });
    }
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Tên *"
        value={name}
        onChangeText={(t) => { setName(t); setNameError(''); }}
        mode="outlined"
        style={styles.input}
        error={!!nameError}
      />
      <HelperText type="error" visible={!!nameError}>{nameError}</HelperText>

      <TextInput
        label="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Địa chỉ"
        value={address}
        onChangeText={setAddress}
        mode="outlined"
        style={styles.input}
        multiline
        numberOfLines={3}
      />

      <Button mode="contained" onPress={handleSave} style={styles.btn} contentStyle={styles.btnContent}>
        {isEdit ? 'Cập nhật' : 'Thêm liên hệ'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 4 },
  btn: { marginTop: 12 },
  btnContent: { paddingVertical: 6 },
});
