import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import User from "./Pacientes";
import Atendimentos from "./Atendimentos";
import HomePaciente from "./HomePaciente";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Atendimentos: undefined;
  Pacientes: undefined;
  User: undefined;
  HomePaciente: { id: number };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator screenOptions={{ headerShown: false }}>

      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="User" component={User} />
      <Drawer.Screen name="Atendimentos" component={Atendimentos} />
      <Drawer.Screen name="HomePaciente" component={HomePaciente} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;