import { StyleSheet, Dimensions } from 'react-native';
// const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    //LoginScreen,RegisterScreen
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "rgb(32,53,78)",
        justifyContent: "center",
        minHeight: 720,
    },
    header: {
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        width: 50,
        height: 50,
        marginTop: 100
    },
    loginInfo: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    loginInfoSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    inputImage: {
        position: "absolute",
        top: 0,
        left: 10,
        height: 35,
        width: 25,
        resizeMode: "stretch",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        textAlign: "center",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#000",
        height: 40,
        width: 250,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginBottom: 20,
        paddingHorizontal: 10
    },
    btnLogin: {
        backgroundColor: "green",
        paddingVertical: 15,
        width: 250,
        marginTop: 5
    },
    textButton: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: "rgb(32,53,70)"
    },
    signup: {
        position: "absolute",
        bottom: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    btnRegister: {
        backgroundColor: "green",
        paddingVertical: 15,
        width: 250
    },
    signin: {
        position: "absolute",
        bottom: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    btnEye: {
        opacity: 0.5,
        position: 'absolute',
        top: 6,
        right: 5
    },
    //Common
    error: {
        borderWidth: 3,
        borderColor: 'red',
    },
    //UserHeader
    userHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    button: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 20,
        height: 20,
    },
    //UserContentItem
    user_item: {
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 10,
    },
    //ListPostScreen
    listpost_container: {
        flex: 1,
        flexDirection: 'column',
    },
    listpost_btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    listpost_btn: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'blue',
        height: 35,
        backgroundColor: '#00bfff',
    },
    //PostScreen
    post_container: {
        flex: 1,
    },
    //ListPostItem
    post_item: {
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: '#d9e3f0',
        height: 90,
        justifyContent: 'center',
    },
    edit_post_container: {
        height: 250,
    },
    //Camera
    container_camera: {
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    circle_image: {
        borderRadius: 80,
        width: 80,
        height: 80,
        borderWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});