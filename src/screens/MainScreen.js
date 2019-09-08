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
    // inputRange value variable
    const inputRangeValue = [ -SCREEN_WIDTH / 2, 0, SCREEN_WIDTH /2 ];
    const [ state, setState ] = useState({ currentIndex: 0 });

    // handles touch on mobile for swiping
    const panResponder = PanResponder.create({
        // initializing
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        // event handler for moving gesture
        onPanResponderMove: (evt, gestureState) => {
            // assign vector value
            position.setValue({ x: gestureState.dx, y: gestureState.dy }); 
        },
        // event handler for release of gesture
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx > 120) {
                // Animated.spring = define val to animate from start to end w/o timing
                Animated.spring(position, {
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                }).start(() => {
                    setState({ currentIndex: state.currentIndex + 1 })
                    position.setValue({ x: 0, y: 0 })
                })
            } else if (gestureState.dx < -120) {
                Animated.spring(position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                }).start(() => {
                    setState({ currentIndex: state.currentIndex + 1 })
                    position.setValue({ x: 0, y: 0 })
                })
            } else {
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    friction: 4
                }).start()
            }
        }
    });

    // interpolate the val of coordinates
    const rotate = position.x.interpolate({
        // length of area animation can reach; val1 = moving left, val2 = initial value, val3 = moving right
        inputRange: inputRangeValue,
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

    // hide like/nope text until swiped left or right
    const likeOpacity = position.x.interpolate({
        // define area animation can move to (L, initial, R)
        inputRange: inputRangeValue,
        // define how value change when moved left/right
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'    
    });

    const nopeOpacity = position.x.interpolate({
        inputRange: inputRangeValue,
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'    
    });

    // adding next card effect (opacity and scale)
    const nextCardOpacity = position.x.interpolate({
        inputRange: inputRangeValue,
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'    
    })

    const nextCardScale = position.x.interpolate({
        inputRange: inputRangeValue,
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'    
    })

    const renderEvents = () => {
        return data.eventDetails.map((item, i) => {
            if (i < state.currentIndex) {
                return null;
            } else if (i === state.currentIndex) {
                // display current card
                return (
                    <Animated.View
                        {...panResponder.panHandlers} 
                        key={item.id}
                        style={[ rotateAndTranslate, styles.cardContainer ]}
                    >
                        <Animated.View style={[styles.likeSwipe, { opacity: likeOpacity, zindex: 1000 }]}>
                            <Text style={[ styles.textSwipe, { borderColor: 'green', color: 'green' }]}>
                                LIKE
                            </Text>
                        </Animated.View>

                        <Animated.View style={[styles.nopeSwipe, { opacity: nopeOpacity, zindex: 1000 }]}>
                            <Text style={[ styles.textSwipe, { borderColor: 'red', color: 'red' }]}>
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
                // Show Next Card in stack
                return (
                    <Animated.View
                        key = {item.id}
                        style = {[ styles.cardContainer, { opacity: nextCardOpacity, transform: [{ scale: nextCardScale }] }]}
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

            <View style={styles.bottomContainer}>

                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: 'green' }]} 
                    onPress={() => alert('Interested, change card')}
                >
                    <Text style={styles.textButton}>Like</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: 'red' }]} 
                    onPress={() => alert('Not interested, change card')}
                >
                    <Text style={styles.textButton}>Dislike</Text>
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
    bottomContainer: {
        height: 60, 
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    textButton: {
        fontWeight: '800',
        color: '#fff'
    },
    cardContainer: {
        height: SCREEN_HEIGHT - 120,
        width: SCREEN_WIDTH,
        padding: 10,
        position: 'absolute'
    },
    likeSwipe: {
        transform: [{ rotate: '-30deg' }],
        position: 'absolute',
        top: 50,
        left: 40, 
    },
    nopeSwipe: {
        transform: [{ rotate: '30deg' }],
        position: 'absolute',
        top: 50,
        right: 40, 
    },
    textSwipe: {
        borderWidth: 1,
        fontSize: 32,
        fontWeight: '800',
        padding: 10
    }

});

export default MainScreen;