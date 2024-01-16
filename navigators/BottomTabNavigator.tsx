import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/private/HomeScreen";
import {ROUTES} from "../constants";

const Tab = createBottomTabNavigator();


export default function HomeTabNavigator(){
  return(
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
    </Tab.Navigator>
  )
}