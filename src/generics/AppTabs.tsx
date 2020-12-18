import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { AntDesign } from '@expo/vector-icons';
import { HomeStack } from "../screens/HomeStack";
import { SettingsStack } from "../screens/SettingsStack";

interface AppTabsProps {

}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) =>{
        return (
            <Tabs.Navigator
                screenOptions={({route}) =>({
                    tabBarIcon: () =>{
                        if (route.name === 'Home') {
                            return <AntDesign name="home" size={24} color="white" />
                        } else if (route.name === 'Settings') {
                            return <AntDesign name="setting" size={24} color="white" />
                        }
                    }
                })}
                tabBarOptions={{
                    activeTintColor: "white",
                    inactiveTintColor: "grey"
                }}
            >
                <Tabs.Screen name="Home" component={HomeStack}/>
                <Tabs.Screen name="Settings" component={SettingsStack}/>
            </Tabs.Navigator>
        );
}