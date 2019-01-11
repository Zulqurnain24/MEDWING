//Map Component snapshot testing
import 'react-native';
import React from 'react';
import Map from '../src/components/containers/map/Map';
import renderer from 'react-test-renderer';

test('Map snapshot', ()=>{
    let snap = renderer.create(
        <Map />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});