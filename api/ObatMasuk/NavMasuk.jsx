import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import FormInput from './FormInput';
import DataMasuk from './Data';
import DetailMasuk from './DetailData';
export default function NavMasuk() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#387ADF"
        translucent={true}
      />

      <Stack.Navigator initialRouteName="DataMasuk">
        <Stack.Screen
          name="DataMasuk"
          component={DataMasuk}
          options={{
            headerTitle: 'Data Obat Masuk',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DetailData"
          component={DetailMasuk}
          options={{
            headerTitle: 'Detail Obat Masuk',
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
            headerTitle: 'Input Obat Masuk',
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
