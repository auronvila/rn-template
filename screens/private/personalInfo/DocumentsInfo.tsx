import { View, ScrollView, ActivityIndicator, StyleSheet, Alert, Text } from 'react-native';
import ImagePicker from '../../../components/ImagePicker';
import PdfPicker from '../../../components/PdfPicker';
import CustomButton from '../../../components/Button';
import { UserService } from '../../../services/user.service';
import { UserDocumentsResDto } from '../../../services/dto/UserDto';
import { AuthContext } from '../../../store/auth';
import React, { useContext, useEffect, useState } from 'react';
import AlertDialog from '../../../components/AlertDialog';
import { ROUTES } from '../../../constants';

export default function DocumentsInfo() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedPDFs, setSelectedPDFs] = useState<string[]>([]);
  const [documentsData, setDocumentsData] = useState<UserDocumentsResDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('')

  useEffect(() => {
    async function getUserDocuments() {
      try {
        setIsLoading(true);
        const data = await UserService.getDocumentsByUserType();
        setDocumentsData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }

    getUserDocuments();
  }, []);

  function imageTakenHandler(imageUri: string) {
    setSelectedImages((prevImages) => [...prevImages, imageUri]);
  }

  function pickedPdfHandler(pdfUri: string) {
    setSelectedPDFs((prevPDFs) => [...prevPDFs, pdfUri]);
  }

  async function handleDocumentsPost() {
    try {
      setIsLoading(true);

      const formData = new FormData();

      for (let index = 0; index < selectedImages.length; index++) {
        const imageUri = selectedImages[index];
        const documentId = documentsData![index].id;

        // @ts-ignore
        formData.append(documentId, { uri: imageUri, name: `image_test.jpg`, type: 'image/jpeg' });
      }

      for (let i = 0; i < selectedPDFs.length; i++) {
        const pdfUri = selectedPDFs[i];
        const documentId = documentsData![i].id;
        // @ts-ignore
        formData.append(documentId, { uri: pdfUri, type: 'application/pdf' });
      }

      console.log('FormData:', formData);

      await UserService.sendDocuments(formData);
      setAlertMessage('Belgeler başarılı bir şekilde gönderilmiştir')
      setSelectedImages([]);
      setSelectedPDFs([]);
    } catch (error: any) {
      Alert.alert('Error uploading documents:', error.message);
    } finally {
      setIsLoading(false);
    }
  }


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }

  if (documentsData?.length === 0) {
    return (
      <View style={{ marginTop:90, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 15,fontWeight:'bold' }}>Herhangi bir belge yüklemeniz gerekmemektedir</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ padding: 20, flex: 1 }}>
      <View style={{ paddingBottom: 100 }}>
        {documentsData?.map((i, index) => {
          if (i.types[0] === 'PDF') {
            return (
              <View style={{ marginBottom: 40 }} key={index}>
                <PdfPicker label={i.description} onSelectedPdf={pickedPdfHandler}/>
              </View>
            );
          }
          if (i.types[0] === 'IMAGE') {
            return (
              <View style={{ marginBottom: 40 }} key={index}>
                <ImagePicker label={i.description} onTakenImage={imageTakenHandler}/>
              </View>
            );
          }
        })}
        <CustomButton onPress={handleDocumentsPost}>Belgeleri Gönder</CustomButton>
      </View>
      <AlertDialog message={alertMessage} onClose={() => setAlertMessage('')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
