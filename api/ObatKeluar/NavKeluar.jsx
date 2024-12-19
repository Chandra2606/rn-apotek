import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import FormInput from './FormInput';
import DataKeluar from './Data';
import DetailKeluar from './DetailData';
export default function NavKeluar() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#387ADF"
        translucent={true}
      />

      <Stack.Navigator initialRouteName="DataKeluar">
        <Stack.Screen
          name="DataKeluar"
          component={DataKeluar}
          options={{
            headerTitle: 'Data Obat Keluar',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DetailData"
          component={DetailKeluar}
          options={{
            headerTitle: 'Detail Obat Keluar',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
          }}
        />
        <Stack.Screen
          name="FormInput"
          component={FormInput}
          options={{
            headerTitle: 'Input Obat Keluar',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
