import React from 'react';
import {shallow} from 'enzyme';
import {CreateQuestion} from '../../components/CreateQuestion';
import toJson from 'enzyme-to-json';

it('should render CreateQuestion component correctly', () => {
    const wrapper = shallow(<CreateQuestion isAuthenticated={true}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
});