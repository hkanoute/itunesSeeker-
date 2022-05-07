import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
const AddScreen = () => {
  const [titleValue, setTitleValue] = useState();
  const [resumeValue, setResumeValue] = useState();
  const [commentValue, setCommentValue] = useState();
  const [ratingValue, setRatingValue] = useState();
  const [valid, setValid] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    if (titleValue && resumeValue && commentValue && ratingValue) {
      if (isNaN(ratingValue) || ratingValue > 20) {
        setRatingValue(0);
      } else {
        setValid(true)
      }
    } else {
      setValid(false);
    }
  })



  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 30 }}> Veuillez remplir tous les champs ! </Text>
      <TextInput
        value={titleValue}
        placeholder="Titre du film"
        onChangeText={setTitleValue}
        style={styles.field}
      />
      <TextInput
        value={resumeValue}
        placeholder="Resumé"
        onChangeText={setResumeValue}
        style={styles.field}
      />
      <TextInput
        value={commentValue}
        placeholder="Commentaire"
        onChangeText={setCommentValue}
        style={styles.field}
      />
      <TextInput
        keyboardType="number-pad"
        value={ratingValue}
        placeholder="Note sur 20 "
        onChangeText={setRatingValue}
        style={styles.field}
      />
      <Button
        title="Ajouter le film !"
        disabled={valid ? false : true}
        onPress={() => {
          navigation.navigate("Home", { addFilm: { title: titleValue, resume: resumeValue, comment: commentValue, rating: ratingValue } })

        }}
      />
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

export default AddScreen