import { View, Text, ScrollView } from 'react-native';
import ImagePicker from '../../../components/ImagePicker';
import { useEffect, useState } from 'react';
import PdfPicker from '../../../components/PdfPicker';

const fakeData = [
  {
    name: 'test1',
    fileType: 'pdf',
    label: 'test1'
  },
  {
    name: 'test2',
    fileType: 'image',
    label: 'test2'
  },
  {
    name: 'test3',
    fileType: 'pdf',
    label: 'test3'
  },
  {
    name: 'test4',
    fileType: 'image',
    label: 'test4'
  }
]

export default function DocumentsInfo() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedPdf, setSelectedPdf] = useState<string>()

  useEffect(() => {
    console.log(selectedImage)
  }, [selectedImage]);

  function imageTakenHandler(imageUri: string) {
    setSelectedImage(imageUri)
  }

  function pickedPdfHandler(pdfUri: string) {
    setSelectedPdf(pdfUri)
  }


  return (
    <ScrollView style={{ padding: 20, flex: 1 }}>
      <View style={{ paddingBottom: 100 }}>
        {fakeData.map((i, index) => {
          if (i.fileType === 'pdf') {
            return <View style={{ marginBottom: 40 }} key={index}>
              <PdfPicker label={i.label} onSelectedPdf={pickedPdfHandler}/>
            </View>
          }
          if (i.fileType === 'image') {
            return <View style={{ marginBottom: 40 }} key={index}>
              <ImagePicker label={i.label} onTakenImage={imageTakenHandler}/>
            </View>
          }
        })}
      </View>
    </ScrollView>
  )
}