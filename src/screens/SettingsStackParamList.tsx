import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type SettingsStackParamList = {
    Settings: undefined,
    Info: undefined,
    EditFavourites: undefined
}

export type SettingsNavProps<T extends keyof SettingsStackParamList> = {
    navigation: StackNavigationProp<SettingsStackParamList, T>;
    route: RouteProp<SettingsStackParamList, T>
}