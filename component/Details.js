import { useRoute } from "@react-navigation/native";
import { Text, View, Image, ScrollView, StyleSheet, Pressable, Linking, Button } from "react-native";
import { apiReducer, setlistArtist } from "./ApiSlice";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
const Details = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  if (route.params) {
    const data = {
      name: route.params.name,
      genre: route.params.genre,
      type: route.params.type,
      link: route.params.link,
      title: route.params.title,
      image: route.params.image,
      resume: route.params.resume,
      artiste: route.params.artiste,
      price: route.params.price,
      add: route.params.add,
    }
    return (
      <View>
        <ScrollView style={styles.bgDark}>
          <View>
            <View>
              <Text style={styles.detailsBody}>  {data.name ? "Name : " + data.name : ""}</Text>
            </View>
            <View>
              <Pressable onPress={() => {
                if (data.link) Linking.openURL(data.link);
              }}>
                <Image style={styles.image} resizeMode="contain" source={data.image ? { uri: data.image } : require("../assets/tunes.png")}></Image>
              </Pressable>
            </View>
            <View>
              <Text style={styles.detailsBody}>  {data.genre ? "Genre : " + data.genre : ""}</Text>
            </View>
            <View>
              <Text style={styles.detailsBody}>  {data.type ? "Type :" + data.type : ""}</Text>
            </View>
          </View>
          {data.add ? <Button title="Ajouter dans ma liste" onPress={() => {
            dispatch(setlistArtist(data));
          }}></Button> : null}
        </ScrollView>
      </View>


    );
  } else {
    return (
      <View>
        <Text style={styles.title}>Veuillez sélection un artiste ou track dans la liste</Text>
      </View>
    )
  }

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


export default Details