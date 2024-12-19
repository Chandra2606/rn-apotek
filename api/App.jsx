import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Import Screen
import LoginScreen from './Login';
import Index from './Index';
import NavObat from './Obat/Navigasi';
import NavSupplier from './Supplier/Navigasi';
import NavMasuk from './ObatMasuk/NavMasuk';
import NavKeluar from './ObatKeluar/NavKeluar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Periksa Token Saat Aplikasi dimuat
    const checkTokenUser = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      setUserToken(userToken);
    };

    checkTokenUser();
  }, []);
  const handleSetUserToken = token => {
    setUserToken(token);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <Stack.Screen name="Login" options={{headerShown: false}}>
            {props => (
              <LoginScreen {...props} setUserToken={handleSetUserToken} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Index" options={{headerShown: false}}>
              {props => <Index {...props} setUserToken={setUserToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="Obat"
              component={NavObat}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Supplier"
              component={NavSupplier}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ObatMasuk"
              component={NavMasuk}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ObatKeluar"
              component={NavKeluar}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserAccount"
              options={{headerShown: false, title: 'User'}}>
              {props => (
                <DataUser {...props} setUserToken={handleSetUserToken} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Info"
              options={{headerShown: false, title: 'Info App'}}>
              {props => (
                <DataUser {...props} setUserToken={handleSetUserToken} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
