import React, { useState } from "react";
import { Screen } from "../../components/layout/Screen";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { auth } from "../../../firebase";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("FormFillIn", {
          userid: user.uid,
        });
        console.log("uid: ", user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Icon size={150} type="material" name="restaurant" />
        </View>
        <Text style={styles.header}>Register</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            style={[styles.alternateLogin, { backgroundColor: "#4267B2" }]}
          >
            <Icon
              iconStyle={{ color: "white" }}
              type="ionicon"
              name="logo-facebook"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.alternateLogin, { backgroundColor: "#DB4437" }]}
          >
            <Icon
              iconStyle={{ color: "white" }}
              type="ionicon"
              name="logo-google"
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: 30,
          }}
        >
          Or, register with...
        </Text>
        <View style={styles.textInput}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  // return (
  //   <Screen>
  //       <View style={styles.content}>
  //       <View style = {styles.inputView}>
  //           <TextInput
  //               style = {styles.TextInput}
  //               placeholder="Enter Your Email"
  //               placeholderTextColor = "003f5c"
  //               value = {email}
  //               onChangeText={text => setEmail(text)}
  //           />
  //       </View>
  //       <View style = {styles.inputView}>
  //           <TextInput
  //               style = {styles.TextInput}
  //               placeholder="Enter Your Password"
  //               placeholderTextColor = "003f5c"
  //               value = {password}
  //               onChangeText={text => setPassword(text)}
  //               secureTextEntry
  //           />
  //       </View>
  //       <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
  //           <Text style={styles.loginText}>Sign Up</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </Screen>
  // )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  textInput: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  loginBtn: {
    backgroundColor: "#AD40AF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  loginText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "white",
  },
  alternateLogin: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
