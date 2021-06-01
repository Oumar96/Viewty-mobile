import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import BaseButton from "./BaseButton.js";

const BaseModal = (props) => {
  const {
    isVisible = true,
    hide = () => {},
    text = "",
    buttonType = "",
    buttonText = "",
  } = props;

  /***********
   * Methods
   ***********/
  const hideModal = () => {
    hide();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <BaseButton
            type={buttonType}
            style={styles.buttonClose}
            onPress={hideModal}
            text={buttonText}
          />
        </View>
      </View>
    </Modal>
  );
};

export default BaseModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 250,
  },
  buttonClose: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    width: 150,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
});
