import React, { useState, useRef, useEffect } from "react";
import data from "../assets/data/data";
import personal_data from "../assets/data/personal_data";
import Swiper from "react-native-deck-swiper";
import { View, StyleSheet, Image, Text, Animated } from "react-native";
import TrippleToggleSwitch from "../../node_modules/react-native-triple-state-switch/index.js";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import CardInfo from "../components/CardInfo/CardInfo";
import ShowPersonalCard1 from "../components/ShowPersonalCard1.js/ShowPersonalCard1";
import Card1 from "../components/Card1/Card1";
import PersonalCardInfo from "../components/PersonalCardInfo/PersonalCardInfo";
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function MainScreen() {
	const [mode, setMode] = useState(false);
	{
		/*useEffect(() => {
		const unsubscribe = db.collection("cards_personal").onSnapshot((snapshot) =>
			setFcards(
				snapshot.docs.map((doc) => ({
					fdata: doc.data(),
				}))
			)
		);
		return unsubscribe;
	}, []); */
	}

	const [isModalVisible, setModalVisible] = useState(false);
	const [isPersonalModalVisible, setPersonalModalVisible] = useState(false);

	const togglePersonalModal = () => {
		setModalVisible(!isModalVisible);
	};
	const toggleModal = () => {
		setPersonalModalVisible(!isPersonalModalVisible);
	};

	const image1 = useRef(new Animated.Value(1)).current;
	const image2 = useRef(new Animated.Value(0)).current;
	const opc = useRef(new Animated.Value(0)).current;
	const [index, setIndex] = React.useState(0);
	const [aindex, setAindex] = React.useState(0);
	const [bindex, setBindex] = React.useState(1);
	const [swap, setSwap] = React.useState(false);
	const [curi, setCuri] = React.useState(data);
	const onSwiped = () => {
		setIndex(index + 1);
		Animated.timing(opc, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
		{
			swap == false ? fswap() : tswap();
		}
	};

	function fswap() {
		Animated.timing(image1, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
		Animated.timing(image2, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start(() => [setAindex(aindex + 2), setSwap(true)]);
	}
	function tswap() {
		Animated.timing(image1, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
		Animated.timing(image2, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start(() => [setBindex(bindex + 2), setSwap(false)]);
	}
	function opacityReset() {
		Animated.timing(opc, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.backgroundContainer, { opacity: image1 }]}>
				<Image
					source={{ uri: curi[aindex].image }}
					blurRadius={3}
					style={[styles.backgroundImage]}
					resizeMode="cover"
				/>
			</Animated.View>
			<Animated.View style={[styles.backgroundContainer, { opacity: image2 }]}>
				<Image
					source={{ uri: curi[bindex].image }}
					blurRadius={3}
					style={[styles.backgroundImage]}
					resizeMode="cover"
				/>
			</Animated.View>
			<Animated.View
				style={[
					styles.backgroundContainer,
					{
						opacity: opc.interpolate({
							inputRange: [-300, 0],
							outputRange: [0.5, 0],
						}),
					},
				]}
			>
				<Image
					source={{ uri: curi[index].image }}
					blurRadius={3}
					style={[styles.backgroundImage, { tintColor: "red" }]}
					resizeMode="cover"
				/>
			</Animated.View>
			<Animated.View
				style={[
					styles.backgroundContainer,
					{
						opacity: opc.interpolate({
							inputRange: [0, 300],
							outputRange: [0, 0.5],
						}),
					},
				]}
			>
				<Image
					source={{ uri: curi[index].image }}
					blurRadius={3}
					style={[styles.backgroundImage, { tintColor: "green" }]}
					resizeMode="cover"
				/>
			</Animated.View>
			<View
				style={{
					flex: 1,
					marginTop: 300,
					marginHorizontal: 0,
					paddingHorizontal: 0,
				}}
			>
				<Modal
					isVisible={isModalVisible}
					useNativeDriver={true}
					useNativeDriverForBackdrop={true}
					style={{ margin: 0 }}
					onBackdropPress={() => setModalVisible(false)}
				>
					<CardInfo index={index} editable={false} />
				</Modal>
			</View>
			<View
				style={{
					flex: 1,
					marginTop: 300,
					marginHorizontal: 0,
					paddingHorizontal: 0,
				}}
			>
				<Modal
					isVisible={isPersonalModalVisible}
					useNativeDriver={true}
					useNativeDriverForBackdrop={true}
					style={{ margin: 0 }}
					onBackdropPress={() => setPersonalModalVisible(false)}
				>
					<PersonalCardInfo index={index} editable={false} />
				</Modal>
			</View>
			{mode == true ? (
				<Swiper
					onTapCard={() => toggleModal()}
					onSwiping={(cardIndex) => opc.setValue(cardIndex)}
					onSwiped={() => [onSwiped(), opacityReset()]}
					onSwipedAborted={() => opacityReset()}
					cardVerticalMargin={140}
					backgroundColor="transparent"
					cards={personal_data}
					cardIndex={index}
					renderCard={(card) => <ShowPersonalCard1 card={card} />}
					stackSize={2}
					stackScale={50}
					stackSeparation={0}
					disableTopSwipe
					disableBottomSwipe
					animateCardOpacity={true}
				/>
			) : (
				<Swiper
					onTapCard={() => togglePersonalModal()}
					onSwiping={(cardIndex) => opc.setValue(cardIndex)}
					onSwiped={() => [onSwiped(), opacityReset()]}
					onSwipedAborted={() => opacityReset()}
					cardVerticalMargin={140}
					backgroundColor="transparent"
					cards={data}
					cardIndex={index}
					renderCard={(card) => <Card1 card={card} />}
					stackSize={2}
					stackScale={50}
					stackSeparation={0}
					disableTopSwipe
					disableBottomSwipe
					animateCardOpacity={true}
				/>
			)}
			<View style={styles.selectbuttoncontainer}>
				<Text style={{ color: "lightgray" }}> Perm job</Text>
				<TrippleToggleSwitch
					AnimatedIcon={AnimatedIcon}
					middleStateIconName={"code-outline"}
					leftStateIconName={"briefcase-outline"}
					rightStateIconName={"hammer-outline"}
					onLeftState={() => [setMode(false), setCuri(data)]}
					onRightState={() => [setMode(true), setCuri(personal_data)]}
				/>
				<Text style={{ color: "lightgray" }}>Freelance</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	backgroundContainer: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: "center",
		flex: 1,
	},
	backgroundImage: {
		alignSelf: "center",
		width: 1000,
		flex: 1,
	},
	selectbuttoncontainer: {
		alignItems: "center",
		flex: 1,
		marginTop: 40,
		position: "absolute",
		alignSelf: "center",
		flexDirection: "row",
	},
});
