import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	StatusBar,
	KeyboardAvoidingView,
} from "react-native";
import { auth } from "../firebase";

function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signIn = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error));
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Image
				style={styles.image}
				source={require("../assets/images/prakt-logo.png")}
			/>

			<StatusBar style="auto" />
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="Email"
					placeholderTextColor="#003f5c"
					secureTextEntry={false}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
			</View>

			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="Password"
					placeholderTextColor="#003f5c"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>

			<TouchableOpacity>
				<Text style={styles.forgot_button}>Forgot Password?</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.loginBtn} onPress={() => signIn}>
				<Text style={styles.loginText}>LOGIN</Text>
			</TouchableOpacity>
			<Text style={{ color: "#757575" }}>-- OR --</Text>
			<TouchableOpacity
				style={styles.signupBtn}
				onPress={() => navigation.navigate("signUp")}
			>
				<Text style={styles.loginText}>SIGN UP</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	image: {
		marginTop: 40,
		marginBottom: 40,
	},

	inputView: {
		borderWidth: 1,
		backgroundColor: "#f0efeb",
		borderRadius: 30,
		width: "70%",
		height: 45,
		marginBottom: 20,
	},

	TextInput: {
		height: 50,
		flex: 1,
		paddingHorizontal: 20,
	},

	forgot_button: {
		height: 30,
		marginBottom: 5,
	},

	loginBtn: {
		width: "80%",
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 10,
		backgroundColor: "#7CB8EA",
	},

	signupBtn: {
		width: "80%",
		borderRadius: 25,
		height: 50,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#7CB8EA",
	},
});
