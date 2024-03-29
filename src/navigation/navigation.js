import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import Welcome from "../screens/Welcome";
import DetailsScreen from "../screens/DetailsScreen";


const Root = createNativeStackNavigator()

function AppNavigation(){
    return (
        <NavigationContainer >
            <Root.Navigator initialRouteName="Welcome" screenOptions={{
                headerShown:false
            }}>
                <Root.Screen name="Home" component={HomeScreen}/>
                <Root.Screen name="Welcome" component={Welcome}/>
                <Root.Screen name="Details" component={DetailsScreen}/>
            </Root.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;