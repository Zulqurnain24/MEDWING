//Functional testing
import 'react-native';
import React from 'react';
import Map from '../src/components/containers/map/Map';
import renderer from 'react-test-renderer';

it('Function and state test case', ()=>{
    let mapData = renderer.create(<Map />).getInstance();
    let region = {"longitudeDelta":1.8464767173929317,"latitudeDelta":2.092200000001931,"longitude":10.45150000000004,"latitude":51.26570000000001}
    expect( mapData.getNurses(region), true);
});
