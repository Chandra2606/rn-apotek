import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Card, Avatar} from 'react-native-elements';
import {apiImage, apiUrl} from '../config';
import defaultAvatar from '../img/avatar.png';
import ActionButton from './ActionButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailObat = ({route}) => {
  const {kodeobat} = route.params;
  const [obat, setObat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const goToPageFormUpload = () => {
    navigation.navigate('FormUpload', {
      kodeobat: kodeobat,
      foto: obat.foto_thumb,
    });
  };
  
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        try {
          token = await AsyncStorage.getItem('userToken');
          const response = await fetch(`${apiUrl}obat/${kodeobat}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await response.json();
          setObat(json);
        } catch (error) {
          setError('Tidak dapat memuat data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
    return unsubcribe;
  }, [navigation, kodeobat]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {obat && (
            <Card>
              <Avatar
                size="xlarge"
                rounded
                source={
                  obat.foto
                    ? {uri: `${apiImage}${obat.foto_thumb}`}
                    : defaultAvatar
                }
                containerStyle={styles.avatarContainer}
                onPress={goToPageFormUpload}
              />
              <Card.Title style={styles.title}>
                {obat.kodeobat}
              </Card.Title>
              <Card.Divider />
              <Text style={styles.detail}>Nama Obat:</Text>
              <Text style={styles.detailData}>
                {obat.namaobat}
              </Text>
              <Text style={styles.detail}>Jenis Obat:</Text>
              <Text style={styles.detailData}>
                {obat.jenisobat}
              </Text>
              <Text style={styles.detail}>Stok Obat:</Text>
              <Text style={styles.detailData}>{obat.stokobat}</Text>
              <Text style={styles.detail}>Harga Beli:</Text>
              <Text style={styles.detailData}>{obat.hargabeli}</Text>
              <Text style={styles.detail}>Harga Jual:</Text>
              <Text style={styles.detailData}>{obat.hargajual}</Text>
            </Card>
          )}
        </View>
      </ScrollView>
      <ActionButton kodeobat={obat.kodeobat} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
    color: '#ccd',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailData: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
    fontWeight: 'bold',
  },
});
export default DetailObat;
