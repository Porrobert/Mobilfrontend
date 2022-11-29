import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Elso from './Elso'
import Masodik from './Masodik'
import Kiadas from './Kiadas'


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function elso_lap({ navigation }) {
  return (
    <Elso />
  );
}

function masodik_lap({ navigation }) {
  return (
    <Masodik />
  );
}

function kiadas_lap({ navigation }) {
  return (
    <Kiadas />
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Első" component={elso_lap} />
        <Drawer.Screen name="Második" component={masodik_lap} />
        <Drawer.Screen name="Kiadás" component={kiadas_lap} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
