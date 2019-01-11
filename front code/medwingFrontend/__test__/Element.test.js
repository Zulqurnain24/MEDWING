//Element testing
import 'react-native';
import React from 'react';
import Map from '../src/components/containers/map/Map';
import Help from '../src/components/containers/help/Help';
import renderer from 'react-test-renderer';

let findElement = function(tree, element) {
    console.warn(tree);
    let result=undefined;
    for(node in tree.children)
    {
        if(tree.children[node].props.testId=element) {
            result=true;
        }
    }
    return result;
}

it('Find element', ()=>{
    let tree = renderer.create(
        <Help />
    ).toJSON();

    expect(findElement(tree, 'nativeID')).toBeDefined();
});