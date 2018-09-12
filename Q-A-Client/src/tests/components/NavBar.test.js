import React from 'react';
import { NavBar } from '../../containers/NavBar';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('NAVBAR CONTAINER', () => {
    it('should render navbar with home, signup & login links', () => {
        const wrapper = shallow(<NavBar />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Link')).toHaveLength(3);
    });
    it('should render navbar with home, myquestions & logout links', () => {
        const wrapper = shallow(<NavBar isAuthenticated={true} username={'ugesh'} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('a')).toHaveLength(1);
        expect(wrapper.find('Link')).toHaveLength(3);
    });
    it('should call handleLogout', () => {
         const logoutUserSpy = jest.fn();
         const wrapper = shallow(<NavBar isAuthenticated={true} username={'ugesh'} logoutUser={logoutUserSpy}/>);
         wrapper.find('Link').at(2).simulate('click');
         expect(logoutUserSpy).toHaveBeenCalled();
    });
});