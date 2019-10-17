import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
    View, 
    Text,
    Animated, 
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const ListItem = ({ details, onSwipeFromLeft, onRightPress }) => {
    return (
        <Swipeable
            renderLeftActions={LeftActions}
            onSwipeableLeftOpen={onSwipeFromLeft}
            renderRightActions={( progress, dragX ) => {
                return (
                    <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
                );
            }}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{details}</Text>
            </View>
        </Swipeable>
    );
};

const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });
    return (
        <View style={styles.leftAction}>
            <Animated.Text styles={[ styles.actionText, { transform: [{ scale }] }]}>
                Like
            </Animated.Text>
        </View>
    );
};

const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.rightAction}>
                <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
                    Nope
                </Animated.Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    text: {
        fontSize: 15,
    },
    separator: {
        flex: 1,
        height: 1, 
        marginLeft: 10,
    },
    leftAction: {
        justifyContent: 'center',
        flex: 1,
    },
    rightAction: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    actionText: {
        fontWeight: '600',
        padding: 20,
    }
});

export const Separator = () => <View style={styles.separator} />;

export default ListItem;
