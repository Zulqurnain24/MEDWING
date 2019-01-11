import React, { Component } from "react";
import { View, StyleSheet, Text} from "react-native";

class Help extends Component {

    render() {

        return (
            <View nativeID={"2"} style={styles.container}>
                 <Text>
                    <Text style={ styles.boldText }>{"Instructions: \n"}</Text>
                    <Text style={ styles.bulletText }>{"1.  The app loads the pins from mlab database.  \n \n"}</Text>
                    <Text style={ styles.bulletText }>{"2.  You can add further pins onto the map by long press on the map.  \n \n"}</Text>
                    <Text style={ styles.bulletText }>{"3.  You can touch the markers on the map and drag to alter their location.  \n \n"}</Text>
                    <Text style={ styles.bulletText }>{"4.  You can tap on the markers to select them.  \n \n"}</Text>
                    <Text style={ styles.bulletText }>{"5.  You can delete the marker by tapping the delete button.  \n \n"}</Text>
                    <Text style={ styles.bulletText }>{"6.  You can edit the marker by pressing the edit button and then entering the description to alter the description of the marker.  \n \n"}</Text>
                    <Text style={ styles.bulletText }>{"7.  In backend app the region setting is for Germany so only the pins within Germany will be displayed.  \n \n"}</Text>
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      marginTop:-200,
      alignItems: 'center',
      width: 400,
    },
    bulletText: {
        flex: 1,
        width: 10,
    },
    boldText: {
        fontWeight: 'bold'
    }
});

export default Help;