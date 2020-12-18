import React, { SetStateAction, useState } from "react";
import { ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavProps, HomeStackParamList } from "./HomeStackParamList";
import quotes from "../db/quotes.json";
import {
  Searchbar,
  Provider,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import axios from "axios";
import { useEffect } from "react";
interface HomeStackProps {}
let db = quotes;

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

  return (
    <ScrollView>
      <Provider>
        <Searchbar
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholder="Search for weather in your city"
          onSubmitEditing={submitQuery}
        />
        <Card>
          <Card.Content>
            <Title>
              Temperature for {response ? response.name : ""}{" "}
              {response ? response.sys.country : ""}:
            </Title>
            <Title style={{ textAlign: "center" }}>
              {" "}
              {response ? Math.round(response.main.temp - 273.15) : "-"} °C
            </Title>
            {weather && (
              <Paragraph>
                {response ? weather.map((el, i) => `${el.main}`) : ""},{" "}
                {response ? weather.map((el, i) => `${el.description}`) : ""}
              </Paragraph>
            )}
          </Card.Content>
        </Card>
        <Paragraph> </Paragraph>
        <Card>
          <Card.Content>
            <Title>☀Zen Quote of the day☀</Title>
            <Paragraph>{quote}</Paragraph>
          </Card.Content>
        </Card>
        <Paragraph> </Paragraph>
        <Card>
          <Card.Content>
            <Paragraph>
              Feels like:{" "}
              {response ? Math.round(response.main.feels_like - 273.15) : "-"}{" "}
              °C
            </Paragraph>
            <Paragraph>
              Humidity: {response ? response.main.humidity : "-"} %{" "}
            </Paragraph>
            <Paragraph>
              Pressure: {response ? response.main.pressure : "-"} mBar{" "}
            </Paragraph>
            <Paragraph>
              Minimum Temperature:{" "}
              {response ? Math.round(response.main.temp_min - 273.15) : "-"} °C{" "}
            </Paragraph>
            <Paragraph>
              Maximum Temperature:{" "}
              {response ? Math.round(response.main.temp_max - 273.15) : "-"} °C{" "}
            </Paragraph>
            <Paragraph>
              🌞Sunrise: {response ? response.sys.sunrise : "-"}{" "}
            </Paragraph>
            <Paragraph>
              🌚Sunset: {response ? response.sys.sunrise : "-"}{" "}
            </Paragraph>
          </Card.Content>
        </Card>
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
