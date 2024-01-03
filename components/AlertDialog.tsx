import React from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import CustomButton from './Button';

type AlertDialogProps = {
  message: string;
  onClose: () => void;
  closeExternalDialog?: () => void;
}

export default function AlertDialog(props: AlertDialogProps) {
  const { message, onClose } = props;
  const isVisible = message !== '';

  function handleCloseDialog() {
    if (props.closeExternalDialog) {
      props.closeExternalDialog();
    }
    props.onClose();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.message}</Text>
          <CustomButton styles={styles.customButtonStyle} onPress={onClose}>Tamam</CustomButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(89,88,88,0.42)',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    minHeight: 150,
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15
  },
  customButtonStyle: {
    alignSelf: 'flex-end',
    bottom: 20,
    right: 20,
    position: 'absolute'
  }
});
