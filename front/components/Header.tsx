import React from 'react';
import type { ComponentProps } from 'react';
import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';
import { AppBar, IconButton, ListItem, Surface, Text } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../pages/DrawerNavigator';

type DrawerRoute = keyof DrawerParamList;

type IconName = ComponentProps<typeof Icon>['name'];

type MenuItem = {
  route: DrawerRoute;
  icon: IconName;
  label: string;
};

const DRAWER_WIDTH = 280;

const MENU_ITEMS: ReadonlyArray<MenuItem> = [
  { route: 'Home', icon: 'home-outline', label: 'Início' },
  { route: 'Profile', icon: 'account-circle-outline', label: 'Perfil' },
  { route: 'Atendimentos', icon: 'calendar-check-outline', label: 'Atendimentos' },
  { route: 'Pacientes', icon: 'account-group-outline', label: 'Pacientes' },
];

const Header: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const animation = React.useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = React.useState(false);

  const openDrawer = React.useCallback(() => {
    setVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const closeDrawer = React.useCallback(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setVisible(false);
      }
    });
  }, [animation]);

  const handleNavigate = React.useCallback(
    (route: DrawerRoute) => {
      const state = navigation.getState();
      if (state.routeNames.includes(route)) {
        navigation.navigate(route);
      }
      closeDrawer();
    },
    [closeDrawer, navigation],
  );

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  const backdropOpacity = animation;

  const availableRouteNames = navigation.getState().routeNames as DrawerRoute[];
  const drawerItems = MENU_ITEMS.filter((item) => availableRouteNames.includes(item.route));

  return (
    <>
      <AppBar
        title="FisioClin"
        leading={(props) => (
          <IconButton
            {...props}
            onPress={openDrawer}
            icon={(iconProps) => <Icon name="menu" {...iconProps} />}
          />
        )}
        style={{ backgroundColor: '#4093ba' }}
      />

      <Modal transparent visible={visible} onRequestClose={closeDrawer} animationType="none">
        <View style={styles.modalRoot}>
          <Pressable style={styles.scrimPressable} onPress={closeDrawer}>
            <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
          </Pressable>

          <Animated.View style={[styles.drawerContainer, { transform: [{ translateX }] }]}> 
            <Surface elevation={4} style={styles.drawerSurface}>
              <View style={styles.drawerHeader}>
                <Icon name="account-circle" size={40} color="#4093ba" />
                <View style={styles.drawerHeaderText}>
                  <Text variant="subtitle1">FisioClin</Text>
                </View>
              </View>

              {drawerItems.map((item) => (
                <ListItem
                  key={item.route}
                  title={item.label}
                  leading={<Icon name={item.icon} size={24} color="#424242" />}
                  onPress={() => handleNavigate(item.route)}
                />
              ))}
            </Surface>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  scrimPressable: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000088',
  },
  drawerContainer: {
    height: '100%',
    width: '80%',
    zIndex: 2,
  },
  drawerSurface: {
    flex: 1,
    paddingTop: 48,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  drawerHeaderText: {
    marginLeft: 16,
  },
  drawerCaption: {
    marginTop: 4,
    color: '#757575',
  },
});

export default Header;