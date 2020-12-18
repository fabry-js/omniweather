import React, { useState } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { AppTabs } from "./AppTabs";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {

        return(
                <NavigationContainer theme={DarkTheme}>
                        <AppTabs />
                </NavigationContainer>
        );
};
