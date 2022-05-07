import { useFocusEffect, useNavigation, useRoute, } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Button, FlatList, View, Text, Image, Pressable, StyleSheet, TextInput } from "react-native";
import AddScreen from "./AddScreen";
import HomeScreen from "./HomeScreen";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";

const API = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [listArtist, setlistArtist] = useState([]);
    const [listTrack, setlistTrack] = useState([]);
    const [type, setType] = useState();
    const navigation = useNavigation();
    const baseUrl = "https://itunes.apple.com/search?term=";


    const fetchItune = async (name, type) => {
        try {
            let entity = `&entity=${type}&limit=20`;
            let res = await fetch(baseUrl + name + entity);
            let json = await res.json();
            return json
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <View>
            <TextInput
                value={name}
                placeholder="Titre"
                onChangeText={setName}
                style={{
                    height: 56,
                    borderRadius: 4,
                    position: "relative",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderColor: "#D3D3D3",
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
            />
            <Button
                title="Rechercher par artiste"
                onPress={() => {
                    let id = uuid()
                    setType("artist");
                    fetchItune(name, "allArtist").then((json) => {
                        for (let i = 0; i < json.results.length; i++) {
                            setlistArtist((current) => [...current, {
                                id: current.length,
                                name: json.results[i].artistName,
                                genre: json.results[i].primaryGenreName,
                                type: json.results[i].artistType,
                                link: json.results[i].artistLinkUrl,
                                rating: 0
                            }])
                        }
                    })


                }}></Button>
            <Button
                title="Rechercher par Track"
                onPress={() => {
                    setType("track");
                    fetchItune(name, "allTrack").then((json) => {
                        console.log(json.results[0].trackName)
                        for (let i = 0; i < json.results.length; i++) {
                            setlistTrack((current) => [...current, {
                                id: current.length,
                                title: json.results[i].trackName,
                                artiste: json.results[i].artistName,
                                resume: json.results[i].shortDescription,
                                genre: json.results[i].primaryGenreName,
                                image: json.results[i].artworkUrl100,
                                price: json.results[i].trackPrice,
                            }])
                        }


                    })

                }}></Button>
            <View>
                {type === "artist" ? <FlatList
                    data={listArtist}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => {
                                navigation.navigate("Détails", { name: item.name, genre: item.genre, type: item.type, link: item.link, add: true });
                            }}>
                                <Text style={styles.title}>{item.name}</Text>
                                {item.name != "" && item.name != null && item.name != undefined ? <Image style={styles.image} resizeMode="contain" source={require("../assets/tunes.png")}></Image> : null}
                            </Pressable>
                        </View>
                    )}
                /> : <FlatList
                    data={listTrack}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => {
                                navigation.navigate("Détails", { name: item.title, genre: item.genre, price: item.price, image: item.image, resume: item.resume, artiste: item.artiste, add: true });
                            }}>
                                <Text style={styles.title}>{item.title}</Text>
                                {<Image style={styles.image} resizeMode="contain" source={item.image != null && item.image != undefined ? { uri: item.image } : require("../assets/tunes.png")}></Image>}
                            </Pressable>
                        </View>
                    )}
                />}
            </View>
        </View >
    )
}

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

export default API;