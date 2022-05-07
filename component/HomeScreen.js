import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button, FlatList, Text, View, Image, Pressable, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { selectListArtist, setlistArtist, getlistArtist, filteredArtistSelector } from "./ApiSlice";
import { useDispatch, useSelector } from "react-redux";


const HomeScreen = () => {
  const [filtred, setFiltred] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const list = useSelector(selectListArtist);
  const listArtist = useSelector(filteredArtistSelector);
  return (
    <View>
      <Button title="Afficher que les track artiste" onPress={() => { setFiltred(!filtred) }}></Button>
      {list.length > 0 ? <FlatList
        data={filtred ? listArtist : list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={() => {
              navigation.navigate("Détails", { name: item.data.artiste, genre: item.data.genre, price: item.data.price, image: item.data.image, resume: item.data.resume, artiste: item.data.artiste, add: false });
            }}>
              <Text style={styles.title}>{item.data.name}</Text>
              {<Image style={styles.image} resizeMode="contain" source={item.data.image != null && item.data.image != undefined ? { uri: item.data.image } : require("../assets/tunes.png")}></Image>}
            </Pressable>
          </View>
        )}
      /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    height: 56,
    borderRadius: 4,
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderColor: "#D3D3D3",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20

  },
  image: {
    width: 400,
    height: 200,
    borderRadius: 30,
    margin: 5,
    alignContent: "center"
  },
  detailsBody: {
    textAlign: "center", fontSize: 30, padding: 20
  },
  bgDark: {
    backgroundColor: "#D3D3D3",
  },

});


export default HomeScreen;