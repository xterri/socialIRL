import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventCards = ({ title, info, host, toEvent, toProfile }) => {
    return (
        <View style={styles.card}>
            <Text>{title}</Text>

            <TouchableOpacity style={styles.info} onPress={toEvent}>
                <Text>{info}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toProfile}>
                <Text style={{ color: 'blue' }}>{host}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 450,
        width: 330,
        borderRadius: 20,                            
        borderColor: '#000',
        borderWidth: 2
    },
    info: {
        height: 50,
        width: 50,
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 25,
    },
});

export default EventCards;