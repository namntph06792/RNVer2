import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function Capture(props) {

    camera = null;

    const [capture,setCapture] = useState([]);
    const [capturing, setCapturing] = useState(null);
    const [hasCameraPermission, setPermission] = useState(null);
    const [cameraType, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlash] = useState(Camera.Constants.FlashMode.off);

    setFlashMode = (flashMode) => setFlash({flashMode});
    setCameraType = (cameraType) => setType({cameraType});
    handleCaptureIn = () => setCapturing(true);

    handleCaptureOut = () => {
        if (capturing) { camera.stopRecording() }
    };

    handleShortCapture = async () => {
        const photoData = await camera.takePictureAsync();
        setCapturing(false);
        setCapture([photoData,...capture])
    };

    handleLongCapture = async () => {
        const videoData = await camera.recordAsync();
        setCapturing(false);
        setCapture([videoData, ...capture])
    };

    useEffect(() => {
        (async function(){
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setPermission(status === 'granted')
        })();
    }, [hasCameraPermission])


    if (hasCameraPermission === null) {
        return <View/>;
    } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    } else {
        return (
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }}
                        type={cameraType}
                        flashMode={flashMode}
                        ref={camera => this.camera = camera}>
                        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                            <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20 }} onPress={() => { props.navigation.goBack(null) }}>
                                <Image source={require('../assets/cancel.png')} style={{ width: 22, height: 22 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
                                underlayColor="#ccc"
                                onPress={() => {
                                    cameraType === Camera.Constants.Type.back
                                        ? setType(Camera.Constants.Type.front)
                                        : setType(Camera.Constants.Type.back)
                                    }
                                }>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>{' '}Flip{' '}</Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            </React.Fragment>
        );
    }
}

