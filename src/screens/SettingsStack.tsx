import { createStackNavigator } from "@react-navigation/stack";
import React, { SetStateAction, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  DefaultTheme,
  Searchbar,
  Provider,
  Button,
  Card,
  Title,
} from "react-native-paper";
import { styles } from "../generics/styles";
import {
  SettingsStackParamList,
  SettingsNavProps,
} from "./SettingsStackParamList";

interface SettingsStackProps {}

const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      surface: "#000000",
    },
  };

function Settings({navigation}: SettingsNavProps<"Settings">) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: SetStateAction<string>) =>
    setSearchQuery(query);

  useEffect(() => {}, [searchQuery]);

  return (
    <ScrollView>
      <Provider theme={theme}>
        <Searchbar
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholder="Search in settings"
          onSubmitEditing={() => console.log("press")}
          inputStyle={styles.textGeneric}
          iconColor="white"
        />

        <Button mode="outlined" color="white" onPress={() => navigation.navigate('Info')}>
          Info
        </Button>
        
        <Button mode="outlined" color="white" onPress={() => navigation.navigate('EditFavourites')}>
          Favourites Settings
        </Button>

      </Provider>
    </ScrollView>
  );
}

function Info ({navigation, route}: SettingsNavProps<'Info'>) {
    return(
        <ScrollView>
            <Provider theme={theme}>
                <Card>
                    <Card.Content>
                        <Title style={styles.textGeneric}>Info</Title>
                    </Card.Content>
                </Card>
            </Provider>
        </ScrollView>
    )
}

function EditFavourites ({navigation, route}: SettingsNavProps<'EditFavourites'>) {
    return(
        <ScrollView>
            <Provider theme={theme}>
                <Card>
                    <Card.Content>
                        <Title style={styles.textGeneric}>Work In Progress!</Title>
                    </Card.Content>
                </Card>
            </Provider>
        </ScrollView>
    )
}


const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsStack: React.FC<SettingsStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Info' component={Info} />
      <Stack.Screen name='EditFavourites' options={{headerTitle: 'Edit Favourites'}} component={EditFavourites} />
    </Stack.Navigator>
  );
};
