import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import ImagePicker from '../../../components/ImagePicker';
import React, { useEffect, useState } from 'react';
import PdfPicker from '../../../components/PdfPicker';
import CustomButton from '../../../components/Button';
import { UserService } from '../../../services/user.service';
import { UserDocumentsResDto } from '../../../services/dto/UserDto';

export default function DocumentsInfo() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedPDFs, setSelectedPDFs] = useState<string[]>([]);
  const [documentsData, setDocumentsData] = useState<UserDocumentsResDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  function handleDocumentsPost() {
    console.log([...selectedImages, ...selectedPDFs]);
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
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
