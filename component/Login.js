import { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [valid, setValid] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    username && password ? setValid(true) : setValid(false);
  })


  return (
    <View>
      <TextInput style={styles.field} onChangeText={setUsername} placeholder="username"></TextInput>
      <TextInput style={styles.field} onChangeText={setPassword} placeholder="password"></TextInput>
      <Button disabled={valid ? false : true} title="Login" onPress={() => {
        navigation.navigate("Home"), { isLogged: true }
      }}>
      </Button>

    </View>
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

export default Login;