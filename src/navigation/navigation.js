import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import Welcome from "../screens/Welcome";


const Root = createNativeStackNavigator()

function AppNavigation(){
    return (
        <NavigationContainer >
            <Root.Navigator initialRouteName="Home" screenOptions={{
                headerShown:false
            }}>
                <Root.Screen name="Home" component={HomeScreen}/>
                <Root.Screen name="Welcome" component={Welcome}/>
            </Root.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;