import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const EventCards = ({ toEvent, toProfile, onLeftSwipe, onRightSwipe }) => {
    const LeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp' // lock to our output range, do not exceed our values
        });

        return (
            <View style={styles.leftAction}>
                <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Card Liked</Animated.Text>
            </View>
        );
    };

    const RightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp' // lock to our output range, do not exceed our values
        });

        return (
            <TouchableOpacity onPress={() => {onRightSwipe()}}>
                <View style={styles.rightAction}>
                    <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Card Rejected</Animated.Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            renderLeftActions={LeftActions}
            onSwipeableLeftOpen={onLeftSwipe}
            renderRightActions={RightActions}
        >
            <View style={styles.card}>
                <Text>Event Details/Information</Text>

                <TouchableOpacity style={styles.info} onPress={toEvent}>
                    <Text>Info</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toProfile}>
                    <Text style={{ color: 'blue' }}>Username</Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 400,
        width: 350,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    info: {
        height: 50,
        width: 50,
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 25,
    },
    leftAction: {
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        flex: 1,
    }, 
    rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20
    }
});

export default EventCards;