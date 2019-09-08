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
                            { transform: position.getTranslateTransform() },
                            {
                                height: SCREEN_HEIGHT - 120,
                                width: SCREEN_WIDTH,
                                padding: 10,
                                position: 'absolute'
                            }
                        ]}
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
                            toEvent={() => alert('navigate to Event Details page')}
                            toProfile={() => alert('navigate to other user profile page')}
                            onLeftSwipe={() => alert('liked')}
                            onRightSwipe={() => alert('rejected')}
                        />
                    </Animated.View>
                )
            }
        }).reverse();
    };

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