import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    teacherList: {
        marginTop: -40
    },

    searchForm: {
        marginBottom: 24
    },

    label: {
        color: "#D4C2FF",
        fontFamily: "Poppins-Regular"
    },

    pickerContainer: {
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#FFF",
        height: 54,
        marginTop: 4,
        marginBottom: 16,
        paddingHorizontal: 5
    },

    picker: {
        color: "#C1BCCC",
        fontSize: 15
    },

    time: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    inputGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    inputBlock: {
        width: "48%"
    },

    submitButton: {
        backgroundColor: "#04D361",
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },

    submitText: {
        color: "#FFF",
        fontFamily: "Archivo-Bold",
        fontSize: 16
    }
});

export default styles;