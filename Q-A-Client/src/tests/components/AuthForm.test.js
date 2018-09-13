import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AuthForm } from '../../components/AuthForm';

describe('AUTHFORM COMPONENT', () => {
    it('should render LogIn fields', () => {
        const wrapper = shallow(<AuthForm btnText="Log In" heading="Welcome Back to Q-A-Exchange" />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('.form-group')).toHaveLength(3);
    });
    it('should render SignUp fields', () => {
        const wrapper = shallow(<AuthForm signUp btnText="Sign Up" heading="Exchange Q & A by joining." />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('.form-group')).toHaveLength(4);
    });
    it('should handle form submit for user login', () => {
        const userAuthenticationSpy = jest.fn();
        const addErrorSpy = jest.fn();
        const email = 'abc@gmail.com';
        const password = 'abc123';
        const wrapper = shallow(<AuthForm btnText="Log In" heading="Welcome Back to Q-A-Exchange" userAuthentication={userAuthenticationSpy} addError={addErrorSpy} />);
        wrapper.find('input').at(0).simulate('change', {
            target: { value: email }
        });
        expect(wrapper.state('email')).toBe(email);
        wrapper.find('input').at(1).simulate('change', {
            target: { value: password }
        });
        expect(wrapper.state('password')).toBe(password);
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        expect(userAuthenticationSpy).toHaveBeenLastCalledWith('signin', {
            email: 'abc@gmail.com',
            password: 'abc123',
            username: ''
        });
    });
    it('should handle form submit for handling invalid password length', () => {
        const userAuthenticationSpy = jest.fn();
        const addErrorSpy = jest.fn();
        const email = 'abc@gmail.com';
        const password = 'abc12';
        const wrapper = shallow(<AuthForm btnText="Log In" heading="Welcome Back to Q-A-Exchange" userAuthentication={userAuthenticationSpy} addError={addErrorSpy} />);
        wrapper.find('input').at(0).simulate('change', {
            target: { value: email }
        });
        expect(wrapper.state('email')).toBe(email);
        wrapper.find('input').at(1).simulate('change', {
            target: { value: password }
        });
        expect(wrapper.state('password')).toBe(password);
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        expect(addErrorSpy).toHaveBeenLastCalledWith('Check password length');
    });
});
