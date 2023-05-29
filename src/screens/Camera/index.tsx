import { Camera, CameraCapturedPicture, CameraType, FaceDetectionResult } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, Image, View, Alert } from 'react-native';
import { ComponentButtonInterface, ComponentButtonTakePicture } from '../../components';
import { styles } from './styles'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as FaceDetector from 'expo-face-detector';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
  const ref = useRef<Camera>(null);
  const [takePhoto, setTakePhoto] = useState(false);
  const [verPhoto, setVerPhoto] = useState(1);
  const [ permissionQrCode, requestPermissionQrCode] = BarCodeScanner.usePermissions();
  const [ scanned, setScanned] = useState(false);
  const [ face, setFace] = useState<FaceDetector.FaceFeature>()

  if (!permissionCamera || !permissionMedia || !permissionQrCode ) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionCamera.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermissionCamera} title="grant permission" />
      </View>
    );
  }

  if (!permissionMedia) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionMedia.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermissionMedia} title="grant permission" />
      </View>
    );
  }
   
  if (!permissionQrCode) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionQrCode.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to open the QRCode</Text>
        <Button onPress={requestPermissionCamera} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (ref.current) {
      const picture = await ref.current.takePictureAsync()
      setPhoto(picture)
      setVerPhoto(2)
    }
  }
  async function savePhoto() {
    const asset = await MediaLibrary.createAssetAsync(photo!.uri)
    MediaLibrary.createAlbumAsync("Images", asset, false)
    Alert.alert("Imagem salva com sucesso!")
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.canceled) {
      setPhoto(result.assets[0])
    }
  }
  
  const handleBarCodeScanned = ({ type, data}: BarCodeScannerResult ) => {
    setScanned(true);
    alert(data);
  };

  const handleFacesDetected = ({ faces }: FaceDetectionResult): void => {
    if (faces.length > 0) {
      const faceDetect = faces[0] as FaceDetector.FaceFeature
      setFace(faceDetect)
      // console.log(faceDetect)
    } else {
      setFace(undefined)
    }
    
};

  return (
    <View style={styles.container}>
      {verPhoto == 1 ?(
        <>
        <Camera style={styles.camera} type={type} ref={ref}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,

          }}
          >
          <View  style={styles.botao}>
            <TouchableOpacity onPress={toggleCameraType} >
              <MaterialIcons name="flip-camera-ios" size={50} color={colors.secondary} />
            </TouchableOpacity>
              <ComponentButtonTakePicture onPress={takePicture} />
          </View>
        </Camera>
        <View>
          {face && face.smilingProbability && face.smilingProbability> 0.5 ?(
            <Text>Sorrindo</Text>
          ) : (
            <Text>Não</Text>
          )}
        </View>
        {scanned &&(
            <ComponentButtonInterface title='Scanear Novamente' type='secondary' onPressI={() => setScanned(false)}/>
          )}
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setVerPhoto(1)}>
            <AntDesign name="arrowleft" size={30} color={colors.primary} />
          </TouchableOpacity>
          {photo && photo.uri &&(
            <Image source={{ uri:photo.uri}} style={styles.img} />
          )}
          <ComponentButtonInterface title='Salvar imagem' type='secondary' onPressI={savePhoto} />
          <ComponentButtonInterface title='Abrir imagem' type='secondary' onPressI={pickImage} />
        </>
      )}
    </View>
  );
}
