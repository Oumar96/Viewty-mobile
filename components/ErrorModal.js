import React, {useState}from "react";
import {Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";

const ErrorModal = (props) =>{
    const {
        isVisible = true,
        hide = ()=>{}
    } = props;

    /***********
     * State
     ***********/
    const [buttonTextColor, setButtonTextColor] = useState({color:'red'});

    /***********
     * Methods
     ***********/
    const hideModal = () =>{
        setButtonTextColor({color:'red'})
        hide()
    }

    return (
      <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>An error occured! Please try again. If the error persists contact support</Text>
                  <TouchableHighlight
                      style={styles.buttonClose}
                      onPress={hideModal}
                      underlayColor="red"
                      onShowUnderlay={() => {setButtonTextColor({color:'white'})}}
                      onHideUnderlay={() => {setButtonTextColor({color:'red'})}}
                  >
                      <Text style={[styles.textStyle, buttonTextColor]}>Close</Text>
                  </TouchableHighlight>
              </View>
          </View>
      </Modal>
    )
}

export default ErrorModal;

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
    backgroundColor:"rgba(0, 0, 0, 0.5)",
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:250,
  },
  buttonClose: {
    backgroundColor: "white",
    borderColor:"red",
    borderWidth:1,
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    width: 150
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16
  }
});
