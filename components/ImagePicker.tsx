import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import * as GalleryOpener from 'expo-image-picker';
import { launchCameraAsync, MediaTypeOptions, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { useState } from 'react';
import CustomButton from './Button';

type ImagePickerProps = {
  onTakenImage: (imageUri: string) => void,
  label: string,
}

export default function ImagePicker(props: ImagePickerProps) {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();
      return permissionRes.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app');
      return false;
    }

    return true;
  }

  async function openCameraHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const { assets, canceled } = await launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.1,
      mediaTypes: MediaTypeOptions.Images

    });

    if (canceled) {
      return;
    }

    const selectedAsset = assets.length > 0 ? assets[0] : null;

    if (selectedAsset) {
      setImageSrc(selectedAsset.uri);
      props.onTakenImage(selectedAsset.uri)
    }
  }

  const pickImage = async () => {
    let result = await GalleryOpener.launchImageLibraryAsync({
      mediaTypes: GalleryOpener.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });


    if (!result.canceled) {
      setImageSrc(result.assets[0].uri);
      props.onTakenImage(result.assets[0].uri)
    }
  };

  return (
    <View>
      <Text>{props.label}</Text>
      <View style={styles.imagePreviewStyle}>
        {imageSrc ? <Image style={styles.image} source={{ uri: imageSrc }}/> :
          <Text>Herhangi bir fotograf seçilmemiştir</Text>}
      </View>
      <View style={{ flexDirection: 'column', gap: 10 }}>
        <CustomButton onPress={openCameraHandler}>Fotograf Çek</CustomButton>
        <CustomButton onPress={pickImage}>Fotograf Seç</CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreviewStyle: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
    // borderRadius: 4
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
