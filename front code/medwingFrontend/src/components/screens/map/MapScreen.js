import React, { Component } from "react";
import { View } from "react-native";
import { Map } from "../../containers/map";
class  MapScreen extends Component {
    render() {
        return (
            <View>
                <Map />
            </View>
        )
    }
}

export default MapScreen;