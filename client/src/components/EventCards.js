import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { navigate } from '../navigationRef';

const EventCards = ({ title, description, hostname, toEvent, toProfile }) => {
    return (
        <View style={styles.card}>
            <Text>{title}</Text>

            <TouchableOpacity style={styles.info} onPress={() => navigate('EventDetails')}>
                <Text>{description}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('UserProfile')}>
                <Text style={{ color: 'blue' }}>{hostname}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        // width: 330,
        borderRadius: 20,                            
        borderColor: 'blue',
        borderWidth: 2,
    },
    info: {
        height: 75,
        // width: 50,
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 25,
    },
});

export default EventCards;