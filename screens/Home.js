import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Home = ({ navigation }) =>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Movies')}>
                <Text style={styles.option}> Go to movies </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#eaeaea"
    },
    button: {
        top: 200,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#ffffff",
    },
    option:{
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    }
  });

export default Home;
