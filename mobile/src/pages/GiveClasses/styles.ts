import {StyleSheet} from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8257E5",
        justifyContent: "center",
        padding: 40
    },

    content: {
        flex: 1,
        justifyContent: "center"
    },

    title: {
        fontFamily: "Archivo-Bold",
        color: "#FFF",
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 180
    },

    description: {
        marginTop: 24,
        color: "#D4C2FF",
        fontSize: 16,
        lineHeight: 26,
        fontFamily: "Poppins-Regular",
        maxWidth: 240
    },

    button: {
        marginVertical: 40,
        backgroundColor: "#04D361",
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Archivo-Bold"
    }
});

export default style;