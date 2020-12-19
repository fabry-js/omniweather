import React, { SetStateAction, useState, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
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
import { Entypo, Feather, FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
let db = quotes;

interface HomeStackProps {}

const Stack = createStackNavigator<HomeStackParamList>();

function Home({ navigation }: HomeNavProps<"Home">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [weather, setWeather] = useState([]);
  const [quote, setQuote] = useState("");
  const [sunrise, setSunrise] = useState("")
  const [sunSet, setSunSet] = useState("")

  const onChangeSearch = (query: SetStateAction<string>) =>
    setSearchQuery(query);

  useEffect(() => {}, [searchQuery]);


  const convertDate = (baseTimestamp: number, sunrise: boolean) =>{
      let normalized = new Date(baseTimestamp * 1000)
      let hours = normalized.getHours().toString()
      let minutes = normalized.getMinutes().toString()
      if (minutes.length <= 1) {
        minutes = "0" + minutes
      }
      let final = hours + ":" + minutes
      if (sunrise == true) {
        setSunrise(final)
      } else {
        setSunSet(final)
      }
  }

  const submitQuery = () => {
    const BASE = `http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=7a6e0713247c280ffdeeee7b61dc003b`;
    axios.get(BASE).then((res) => {
      setWeather(res.data.weather);
      setResponse(res.data);
      setQuote(db[Math.floor(Math.random() * db.length)]);
      convertDate(res.data.sys.sunrise, true)
      convertDate(res.data.sys.sunset, false)
    }).catch((err)=>{
      return(
        Alert.alert(
          "❌404!❌",
          "Attention: City not found or your connection is not working correctly! Please retry.",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "OK",
            }
          ],
          {
            cancelable: false,
          }
        )
      )
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
                <Fontisto name="smiley" size={16} color="white" /> Feels like:{" "}
                {response ? Math.round(response.main.feels_like - 273.15) : "-"}{" "}
                °C
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                <Entypo name="drop" size={16} color="white" /> Humidity: {response ? response.main.humidity : "-"} %{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                <Entypo name="air" size={16} color="white" /> Pressure: {response ? response.main.pressure : "-"} mBar{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                <FontAwesome5 name="temperature-low" size={16} color="white" /> Minimum Temperature:{" "}
                {response ? Math.round(response.main.temp_min - 273.15) : "-"}{" "}
                °C{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                <FontAwesome5 name="temperature-high" size={16} color="white" /> Maximum Temperature:{" "}
                {response ? Math.round(response.main.temp_max - 273.15) : "-"}{" "}
                °C{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                <Feather name="sun" size={16} color="white" /> Sunrise: {response ? sunrise : "-"}{" "}
              </Paragraph>
              <Paragraph style={styles.textGeneric}>
                <FontAwesome name="moon-o" size={16} color="white" /> Sunset: {response ? sunSet : "-"}{" "}
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
              <Title style={styles.textGeneric}> <FontAwesome5 name="brain" size={24} color="white" /> Zen Quote of the day <FontAwesome5 name="brain" size={24} color="white" /></Title>
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
