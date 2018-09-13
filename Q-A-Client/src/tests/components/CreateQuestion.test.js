import React from 'react';
import { CreateQuestion } from '../../components/CreateQuestion';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('CREATEQUESTION COMPONENT', () => {
    it('should render createquestion component', () => {
        const wrapper = shallow(<CreateQuestion isAuthenticated={true} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('h4')).toHaveLength(1);
        expect(wrapper.find('.form-group')).toHaveLength(2);
    });
    it('should set state text and handle form submit', () => {
        const value = 'What is Jest?';
        const createQuestionSpy = jest.fn();
        const historyMock = { push: jest.fn() };
        const wrapper = shallow(<CreateQuestion history={historyMock} isAuthenticated={true} createQuestion={createQuestionSpy} email={'abc@gmail.com'} />);
        wrapper.find('textarea').simulate('change', {
            target: { value }
        });
        expect(wrapper.state('text')).toBe(value);
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        expect(createQuestionSpy).toHaveBeenLastCalledWith({
            text: value,
            createdBy: 'abc@gmail.com'
        });
    });
});