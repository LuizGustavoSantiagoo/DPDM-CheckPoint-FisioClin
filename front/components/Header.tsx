import { Appbar } from 'react-native-paper';

const Header = () => {

  const title = 'Fisio-Clin';

  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => {}} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;