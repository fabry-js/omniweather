import React, { SetStateAction, useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavProps, HomeStackParamList } from "./HomeStackParamList";
import quotes from "../db/quotes.json";
import {
  Searchbar,
  Provider,
  Card,
  Title,
  Paragraph,
  DefaultTheme,
} from "react-native-paper";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../generics/styles";
import { DarkTheme } from "@react-navigation/native";
let db = quotes;

interface HomeStackProps {}

const Stack = createStackNavigator<HomeStackParamList>();

function Home({ navigation }: HomeNavProps<"Home">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [weather, setWeather] = useState([]);
  const [quote, setQuote] = useState("");

  const onChangeSearch = (query: SetStateAction<string>) =>
    setSearchQuery(query);

  useEffect(() => {}, [searchQuery]);

  const submitQuery = () => {
    const BASE = `http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=7a6e0713247c280ffdeeee7b61dc003b`;
    axios.get(BASE).then((res) => {
      setWeather(res.data.weather);
      setResponse(res.data);
      setQuote(db[Math.floor(Math.random() * db.length)]);
    });
  };

  const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      surface: "#000000",
    },
  };
  

  return (
    <ScrollView>
      <Provider theme={theme}>
        <Searchbar
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholder="Search for weather in your city"
          onSubmitEditing={submitQuery}
          inputStyle={styles.textGeneric}
          iconColor="white"
        />

        <View
          style={styles.weatherWidgetRight}
        >
          <Card>
            <Card.Content>
              <Title style={styles.mainWeatherWidgetText}>
                Temperature for {response ? response.name : ""}{" "}
                {response ? response.sys.country : ""}:
              </Title>
              <Title
                style={styles.wWidgetTempText}
              >
                {" "}
                {response ? Math.round(response.main.temp - 273.15) : "-"} °C
              </Title>
              {weather && (
                <Paragraph style={styles.mainWeatherWidgetText}>
                  {response ? weather.map((el, i) => `${el.main}`) : ""},{" "}
                  {response ? weather.map((el, i) => `${el.description}`) : ""}
                </Paragraph>
              )}
            </Card.Content>
          </Card>
        </View>

        <Paragraph> </Paragraph>

        <View
          style={styles.additionalInfoLeft}
        >
          <Card>
            <Card.Content>
              <Paragraph style={styles.textGeneric}>
                Feels like:{" "}
                {response ? Math.round(response.main.feels_like - 273.15) : "-"}{" "}
                °C
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                Humidity: {response ? response.main.humidity : "-"} %{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                Pressure: {response ? response.main.pressure : "-"} mBar{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                Minimum Temperature:{" "}
                {response ? Math.round(response.main.temp_min - 273.15) : "-"}{" "}
                °C{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                Maximum Temperature:{" "}
                {response ? Math.round(response.main.temp_max - 273.15) : "-"}{" "}
                °C{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                🌞Sunrise: {response ? response.sys.sunrise : "-"}{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                🌚Sunset: {response ? response.sys.sunrise : "-"}{" "}
              </Paragraph>
            </Card.Content>
          </Card>
        </View>

        <Paragraph> </Paragraph>

        <View
          style={styles.zenQuoteHeader}
        >
          <Card>
            <Card.Content>
              <Title style={styles.textGeneric}>☀Zen Quote of the day☀</Title>
              <Paragraph style={styles.textGeneric}>{quote}</Paragraph>
            </Card.Content>
          </Card>
        </View> 
      </Provider>
    </ScrollView>
  );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
