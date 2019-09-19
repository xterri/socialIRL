import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

import EventCards from '../components/EventCards';

import data from '../devSource/events.json';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const renderEvents = (toEventDetails) => {
    return data.eventDetails.map((item, i) => {        
        return (
            <Animated.View 
                key={i}
                style={{
                    height: SCREEN_HEIGHT - 120,
                    width: SCREEN_WIDTH,
                    padding: 10,
                    position: 'absolute'
                }}
            >
                <EventCards 
                    {...item}
                    toEvent={() => alert('navigate to Event Details page')}
                    toProfile={() => alert('navigate to other user profile page')}
                    onLeftSwipe={() => alert('liked')}
                    onRightSwipe={() => alert('rejected')}
                />
            </Animated.View>
        );
    })
}

const TestScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            
            <View style={{ height: 60 }}>
                <Text style={{ fontSize: 40 }}>Test Card & Swipe</Text>
            </View>

            <View style={{ flex: 1 }}>
                {renderEvents()}
            </View>

            <View style={{ height: 60, flexDirection: 'row' }}>
                <TouchableOpacity style={styles.yesButton} onPress={() => alert('Interested, change card')}>
                    <Text>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.noButton} onPress={() => alert('Not interested, change card')}>
                    <Text>No</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    noButton: {
        marginLeft: 200,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        width: 50
    },
    yesButton: {
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        width: 50
    }
});

export default TestScreen;