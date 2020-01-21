import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function Main({ navigation }){

  const [users, setUsers] = useState([]);
  const [techs, setTechs] = useState('');

  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
    
      if(granted){
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }

    loadInitialPosition();
  }, []);

  async function loadUsers(){
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/searchUser', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setUsers(response.data.users);
    console.log(users);
  }

  function handleRegionChanged(region){
    setCurrentRegion(region);
  }

  if(!currentRegion){
    return null;
  }

  return (
    <>
      <MapView style={styles.map} initialRegion={ currentRegion } onRegionChangeComplete={handleRegionChanged}>
        { users.map(user => (
          <Marker key={user.id} coordinate={{ latitude: user.location.coordinates[1], longitude: user.location.coordinates[0] }} >
            <Image source={{ uri: user.pictureUrl }} style={ styles.avatar } />

            <Callout onPress={() => {
              navigation.navigate('Profile', { githubUsername: user.githubUsername })
            }}>
              <View style={ styles.callout }>
                <Text style={styles.devName}>{ user.name }</Text>
                <Text style={styles.devBio}> { user.bio || 'Bio não disponivel' } </Text>
                <Text style={styles.devTechs}>{ user.techs.join(', ') }</Text>
              </View>
            </Callout>
          </Marker> 
        )) }
      </MapView>
      <View style={ styles.searchForm }>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por tecs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={ styles.loadButton } onPress={loadUsers}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },
  callout: {
    width:260
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
});

export default Main;
