import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Elso from './Elso'
import Masodik from './Masodik'
import Kiadas from './Kiadas'
import Kiadas2 from './Kiadas2'
import Kereses from './Kereses'
import Rendszerezes from './Rendszerezes'
import Felvitel from './Felvitel'


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

function Elso_lap({ navigation }) {
  return (
    <Elso />
  );
}

function Masodik_lap({ navigation }) {
  return (
    <Masodik />
  );
}

function Kiadas_lap({ navigation }) {
  return (
    <Kiadas />
  );
}
function Kiadas2_lap({ navigation }) {
  return (
    <Kiadas2 />
  );
}
function Kereses_lap({ navigation }) {
  return (
    <Kereses />
  );
}
function Rendszerezes_lap({ navigation }) {
  return (
    <Rendszerezes />
  );
}
function Felvitel_lap({ navigation }) {
  return (
    <Felvitel />
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Első" component={Elso_lap} />
        <Drawer.Screen name="Második" component={Masodik_lap} />
        <Drawer.Screen name="Kiadás" component={Kiadas_lap} />
        <Drawer.Screen name="Kiadás2" component={Kiadas2_lap} />
        <Drawer.Screen name="Keresés" component={Kereses_lap} />
        <Drawer.Screen name="Rendszerezés" component={Rendszerezes_lap} />
        <Drawer.Screen name="Felvitel" component={Felvitel_lap} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
