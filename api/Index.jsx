import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Obat from './Obat/Navigasi';
import Supplier from './Supplier/Navigasi';
import Masuk from './ObatMasuk/NavMasuk';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DataUser from './DataUser';
import Info from './Info';
import NavKeluar from './ObatKeluar/NavKeluar';

const Tab = createBottomTabNavigator();

export default function Index(props) {
  const {setUserToken} = props;
  return (
    <Tab.Navigator
      initialRouteName="Obat"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Obat') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (route.name === 'Supplier') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Masuk') {
            iconName = focused ? 'enter' : 'enter-outline';
          } else if (route.name === 'Keluar') {
            iconName = focused ? 'exit' : 'exit-outline';
          } else if (route.name === 'UserAccount') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Info') {
            iconName = focused ? 'information' : 'information-outline';
          }
          return <IonIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#387ADF',
        tabBarInactiveTintColor: '#387ADF',
      })}>
      <Tab.Screen name="Obat" component={Obat} options={{headerShown: false}} />
      <Tab.Screen
        name="Supplier"
        component={Supplier}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Masuk"
        component={Masuk}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Keluar"
        component={NavKeluar}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="UserAccount"
        options={{headerShown: false, title: 'User'}}>
        {props => <DataUser {...props} setUserToken={setUserToken} />}
      </Tab.Screen>
      <Tab.Screen name="Info" options={{headerShown: false, title: 'Info App'}}>
        {props => <Info {...props} setUserToken={setUserToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
