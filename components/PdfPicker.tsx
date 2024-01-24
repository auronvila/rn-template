import { Alert, StyleSheet, Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import CustomButton from './Button';
import * as FileSystem from 'expo-file-system';


type PdfPickerProps = {
  onSelectedPdf: (pdfUri: string) => void,
  label: string
}

export default function PdfPicker(props: PdfPickerProps) {
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string>('');

  async function pickPdf() {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false
      });
      const filePath = (res as DocumentPicker.DocumentPickerSuccessResult).assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(filePath, { size: true }) as any;
      const fileSizeInBytes = fileInfo.size;
      const maxFileSizeInBytes = 1048576;

      if (fileSizeInBytes > maxFileSizeInBytes) {
        Alert.alert('File too large', 'The selected file exceeds the maximum file size limit.');
        return;
      }

      setPdfSrc((res as DocumentPicker.DocumentPickerSuccessResult).assets[0].uri);
      props.onSelectedPdf((res as DocumentPicker.DocumentPickerSuccessResult).assets[0].uri);
      setPdfName((res as DocumentPicker.DocumentPickerSuccessResult).assets[0].name)
    } catch (err: any) {
      Alert.alert('Error picking document', err.message);
      return
    }
  }


  return (
    <View>
      <Text>{props.label}</Text>
      <View style={styles.pdfPreviewStyle}>
        {pdfSrc ? <Text>Belge İsmi {pdfName}</Text> : <Text>Herhangi bir belge seçilmemiştir</Text>}
      </View>
      <View style={{ flexDirection: 'column', gap: 10 }}>
        <CustomButton onPress={() => pickPdf()}>Belge Seç</CustomButton>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  pdfPreviewStyle: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  }
});
