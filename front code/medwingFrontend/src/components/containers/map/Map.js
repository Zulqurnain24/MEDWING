import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput} from "react-native";
import MapView, { AnimatedRegion } from 'react-native-maps';
import config from '../../../config';
import queryString from 'query-string';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 51.2657;
const LONGITUDE = 10.4515;
const LATITUDE_DELTA = 2.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Map extends Component {

    constructor() {
        super();
        this.state = {
            markers: [],
            selectedMarkerIndex: 0,
            descriptionText: "",
            toggleTextInput: false,
            a: {
                latitude: LATITUDE + SPACE,
                longitude: LONGITUDE + SPACE,
              },
              b: {
                latitude: LATITUDE - SPACE,
                longitude: LONGITUDE - SPACE,
              },
        };
    }
        
     getNurses(region) {
        console.log("region : " + JSON.stringify(region));
        const query = queryString.stringify(region);
        fetch(`${config.url}api/nurse?${query}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            let newMarkers = [];
            responseJson.data.forEach(nurse => {
            const loc =  {
                coordinate: {
                        latitude: nurse.location.coordinates[1],
                        longitude: nurse.location.coordinates[0]
                    },
                    title: nurse.name,
                    description: nurse.description
                }
            newMarkers.push(loc);
        });
            this.setState({
                markers: newMarkers
            });
            return true;
        })
        .catch((err) => {
            alert('error : ' + err);
            return false;
        });
       
    }

    _onLongPress = e => {
        const coordinate = e.nativeEvent.coordinate;
        const marker = {
            coordinate: {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            },
            title: "Touched Point",
            description: "Available from " + new Date().toLocaleString() + "."
        };
        if (marker) {
            this.populateOnMap(marker);
        }
    };

    populateOnMap(marker) {
        var revisedArray = this.state.markers.concat(marker);
        this.setState({ markers: revisedArray });
    }

    getInitialState() {
        return {
          coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
          }),
        };
      }
      
    componentWillReceiveProps(nextProps) {
        const duration = 500
      
        if (this.props.coordinate !== nextProps.coordinate) {
          if (Platform.OS === 'android') {
            if (this.marker) {
              this.marker._component.animateMarkerToCoordinate(
                nextProps.coordinate,
                duration
              );
            }
          } else {
            this.state.coordinate.timing({
              ...nextProps.coordinate,
              duration
            }).start();
          }
        }
      }

    _onMarkerPress(index) {
       this.setState({selectedMarkerIndex: index, toggleTextInput: true});
    }

    _removeSelectedMarker(state, index) {
        if(index >= 0) {
            state.markers.splice(index, 1);
            this.setState({markers: state.markers});
        }
    }
    _editSelectedMarker(state, index) {
        if(index >= 0) {
            state.markers[index].key = this.state.descriptionText;
            state.markers[index].title = this.state.descriptionText;
            state.markers[index].description = this.state.descriptionText;
            this.setState({markers: state.markers, toggleTextInput: false});
        }
    }

    _renderTextInput() {
        if (this.state.toggleTextInput) {
            return (
                <TextInput
                style={styles.textInput}
                placeholder="Type Updated Description"
                onChangeText={(descriptionText) => this.setState({descriptionText})}
            />
            );
        } else {
            return null;
        }
    }

    render() {

    const markerImage = require('../../../../assets/nurseUnselected.png');
    const selectedMarkerImage = require('../../../../assets/nurseSelected.png');

        return (
            <View style={styles.container}  nativeID={"2"} >
              <TouchableOpacity style={styles.deleteTouchableOpacity} onPress={() => {this._removeSelectedMarker(this.state, this.state.selectedMarkerIndex)} }>
                <Image
                    style={styles.image}
                    source={require('../../../../assets/delete.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editTouchableOpacity} onPress={() => {this._editSelectedMarker(this.state, this.state.selectedMarkerIndex)} }>
                <Image
                    style={styles.image}
                    source={require('../../../../assets/edit.png')}
                />
              </TouchableOpacity>
            {this._renderTextInput()}   
            <MapView
              onRegionChangeComplete={region => this.getNurses(region)}
              style={styles.map}
              showsUserLocation={true}
              followsUserLocation={true}
              initialRegion={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              onLongPress={this._onLongPress}
            >
            {this.state.markers.map((marker, i)=>{
                return (
                    <MapView.Marker
                      coordinate={marker.coordinate}
                      title={marker.title}
                      description={marker.description}
                      key={`Nurse#-${i}`}
                      image={this.state.selectedMarkerIndex === i ? selectedMarkerImage : markerImage} 
                      onPress={() => {this._onMarkerPress(i)} }
                      draggable
                    >
                    </MapView.Marker>
                )
            })}
            </MapView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      height: 800,
      width: 500,
      alignItems: 'center',
    },
    map: {
      marginTop: 100,
      height: 670,
      width: 410,
      zIndex: -1
    },
    deleteTouchableOpacity: {
      position: 'absolute',
      top: '50%',
      alignSelf: 'flex-end',
      width: 50,
      height: 25,
      top: 75,
      left: 70,
      zIndex: 999,
    },
    editTouchableOpacity: {
      position: 'absolute',
      top: '50%',
      alignSelf: 'flex-end',
      width: 50,
      height: 25,
      top: 75,
      left: 120,
      zIndex: 999,
    },
    textInput: {
        position: 'absolute',
        top: '50%',
        alignSelf: 'flex-end',
        width: 185,
        height: 25,
        top: 75,
        left: 170,
        zIndex: 999,
        backgroundColor: '#d1d1d1'
      },
    image: {
      width: 50,
      height: 25,
    }
});

export default Map;