// reference https://www.instamobile.io/react-native-controls/react-native-swipe-cards-tinder/ for swipe feature

import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableOpacity, 
    Animated, 
    Dimensions, 
    PanResponder 
} from 'react-native';

import EventCards from '../components/EventCards';

import data from '../devSource/events.json';

/*
** Global variables & functions
*/
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


/*
** MainScreen to be displayed/exported
*/
const MainScreen = ({ navigation }) => {
    // handle vector position
    const position = new Animated.ValueXY();
    const [ state, setState ] = useState({ currentIndex: 0 });

    // interpolate the val of coordinates
    const rotate = position.x.interpolate({
        // length of area animation can reach; val1 = moving left, val2 = initial value, val3 = moving right
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH /2 ],
        // move right = drop -10deg, move left = drop 10deg, val2 = initial value
        outputRange: ['-10deg', '0deg', '10deg'],
        // prevent output val from exceeding outputRange
        extrapolate: 'clamp'
    });

    // transform property
    const rotateAndTranslate = {
        transform: [{
            rotate
        }, ...position.getTranslateTransform()
        ]
    };

    // handles touch on mobile for swiping
    const responder = PanResponder.create({
        // initializing
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        // event handler for moving gesture
        onPanResponderMove: (evt, gestureState) => {
            // assign vector value
            position.setValue({ x: gestureState.dx, y: gestureState.dy }); 
        },
        // event handler for release of gesture
        onPanResponderRelease: (evt, gestureState) => {}
    });

    const renderEvents = () => {
        return data.eventDetails.map((item, i) => {
            if (i < state.currentIndex) {
                return null;
            } else if (i == state.currentIndex) {
                return (
                    <Animated.View
                        {...responder.panHandlers} 
                        key={item.id}
                        style={[
                            rotateAndTranslate,
                            {
                                height: SCREEN_HEIGHT - 120,
                                width: SCREEN_WIDTH,
                                padding: 10,
                                position: 'absolute'
                            }
                        ]}
                    >
                        <Animated.View
                            style={{
                                transform: [{ rotate: '-30deg' }],
                                position: 'absolute',
                                top: 50,
                                left: 40, 
                                zindex: 1000
                            }}
                        >
                            <Text 
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'green',
                                    color: 'green',
                                    fontSize: 32,
                                    fontWeight: '800',
                                    padding: 10
                                }}
                            >
                                LIKE
                            </Text>
                        </Animated.View>

                        <Animated.View
                            style={{
                                transform: [{ rotate: '30deg' }],
                                position: 'absolute',
                                top: 50,
                                right: 40, 
                                zindex: 1000
                            }}
                        >
                            <Text 
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    color: 'red',
                                    fontSize: 32,
                                    fontWeight: '800',
                                    padding: 10
                                }}
                            >
                                NOPE
                            </Text>
                        </Animated.View>
                        
                        <EventCards 
                            {...item}
                            toEvent={() => navigation.navigate('EventDetails')}
                            toProfile={() => navigation.navigate('UserProfile')}
                        />
                    </Animated.View>
                );
            } else {
                return (
                    <Animated.View
                        key = {item.id}
                        style = {{
                            height: SCREEN_HEIGHT - 120,
                            width: SCREEN_WIDTH,
                            padding: 10,
                            position: 'absolute'
                        }}
                    >
                        <EventCards 
                            {...item}
                            toEvent={() => navigation.navigate('EventDetails')}
                            toProfile={() => navigation.navigate('UserProfile')}
                        />
                    </Animated.View>
                )
            }
        }).reverse();
    };

    return (
        <View style={{ flex: 1 }}>
            
            <View style={{ height: 60 }}>
                <Text style={{ fontSize: 40 }}>Main Card w/ Swipe</Text>
            </View>

            <View style={{ flex: 1 }}>
                {renderEvents()}
            </View>

            <View style={{ height: 60, flexDirection: 'row' }}>
                <TouchableOpacity style={styles.yesButton} onPress={() => alert('Interested, change card')}>
                    <Text>Like</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.noButton} onPress={() => alert('Not interested, change card')}>
                    <Text>Dislike</Text>
                </TouchableOpacity>

            </View>

            {/* TODO: add notification and button to begin event and confirm attendance */}
            <Button title='START EVENT?' onPress={() => navigation.navigate('ConfirmAttendance')} />
        </View>
    );
};

/*
** Edit MainScreen Header
*/
MainScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: (
            <Button
                onPress={() => alert('Switch to Host/User View!')}
                title='Switch'
            />
        ),
        headerLeft: (
            <Button
                onPress={() => navigation.navigate('AccountMain')}
                title='Account'
            />
        ),
        headerRight: (
            <Button
                onPress={() => navigation.navigate('ChatList')}
                title='Chats'
            />
        )
    };
};

/*
** StyleSheet
*/
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

export default MainScreen;