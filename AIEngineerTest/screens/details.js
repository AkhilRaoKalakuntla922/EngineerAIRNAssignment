import React, { Component } from 'react'

import { View, Text, ScrollView, StyleSheet } from "react-native";


export default function DetailsScreen({ route, navigation }) {
    const { data } = route.params

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(data)}</Text>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})