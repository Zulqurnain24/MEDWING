//Help Component snapshot testing
import 'react-native';
import React from 'react';
import Help from '../src/components/containers/help/Help';
import renderer from 'react-test-renderer';

test('Help snapshot', ()=>{
    let snap = renderer.create(
        <Help />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});