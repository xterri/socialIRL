import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableOpacity, 
} from 'react-native';

import renderEvents from '../components/renderEventCards';

const MainScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            
            <View style={{ flex: 1, borderColor: 'navyblue', borderWidth: 3 }}>
                <Text style={{ fontSize: 35 }}>Main Card w/ Swipe</Text>
            </View>

            <View style={{ flex: 8, borderColor: 'red', borderWidth: 3 }}>
                {renderEvents({ navigation })}
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

const styles = StyleSheet.create({
    bottomContainer: {
        // height: 60, 
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        borderColor: 'green', 
        borderWidth: 3
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
});

export default MainScreen;