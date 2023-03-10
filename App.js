import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Kiadas from './Kiadas'
import Kereses from './Kereses'
import Rendszerezes from './Rendszerezes'
import Felvitel from './Felvitel'
import Felvitel2 from './Felvitel2'
import Ujosszeg from './Ujosszeg'
import Bevetelfizetes from './Bevetelfizetes'
import Beveteltorles from './Beveteltorles'



function Kiadas_lap({ navigation }) {
  return (
    <Kiadas />
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
function Felvitel2_lap({ navigation }) {
  return (
    <Felvitel2 />
  );
}
function Ujosszeg_lap({ navigation }) {
  return (
    <Ujosszeg />
  );
}
function Bevetelfizetes_lap({ navigation }) {
  return (
    <Bevetelfizetes />
  );
}
function Beveteltorles_lap({ navigation }) {
  return (
    <Beveteltorles />
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Kiadás" component={Kiadas_lap} />
        <Drawer.Screen name="Keresés" component={Kereses_lap} />
        <Drawer.Screen name="Rendszerezés" component={Rendszerezes_lap} />
        <Drawer.Screen name="Felvitel" component={Felvitel_lap} />
        <Drawer.Screen name="Felvitel2" component={Felvitel2_lap} />
        <Drawer.Screen name="Új bevétel hozzáadása" component={Ujosszeg_lap} />
        <Drawer.Screen name="Bevételfizetés" component={Bevetelfizetes_lap} />
        <Drawer.Screen name="Bevételtörlés" component={Beveteltorles_lap} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
