import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Atendimentos: undefined;
  Pacientes: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator>

      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;