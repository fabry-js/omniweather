import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./AppTabs";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {

        return(
                <NavigationContainer>
                        <AppTabs />
                </NavigationContainer>
        );
};
