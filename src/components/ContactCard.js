import { List, Avatar } from 'react-native-paper';

export default function ContactCard({ contact, onPress }) {
  const initials = contact.name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <List.Item
      title={contact.name}
      description={contact.phone || contact.email || 'Không có thông tin'}
      left={() => (
        <Avatar.Text
          size={44}
          label={initials || '?'}
          style={{ alignSelf: 'center', marginLeft: 8 }}
        />
      )}
      onPress={onPress}
      style={{
        backgroundColor: 'white',
        marginHorizontal: 12,
        marginVertical: 4,
        borderRadius: 8,
      }}
    />
  );
}
