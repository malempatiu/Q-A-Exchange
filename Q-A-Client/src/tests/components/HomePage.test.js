import React from 'react';
import { HomePage } from '../../containers/HomePage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const questions = [
    {
        _id: "5b8d55fcfac57133747fc5c4",
        text: "What is React?"
    },
    {
        _id: "5b8d55fcfac57133747fc5c5",
        text: "What is the difference between state and props in React?",
    }
]
describe('HOMEPAGE CONTAINER', () => {
    let removeErrorSpy;
    let fetchQuestionsSpy;
    let wrapper;
    beforeEach(() => {
        removeErrorSpy = jest.fn();
        fetchQuestionsSpy = jest.fn();
        wrapper = shallow(<HomePage questions={questions} removeError={removeErrorSpy} fetchQuestions={fetchQuestionsSpy} />);
    });
    it('should render homepage', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('Link')).toHaveLength(3);
    });
    it('should set state text', () => {
        const value = 'React';
        wrapper.find('input').simulate('change', {
            target: { value }
        });
        expect(wrapper.state('text')).toBe(value);
    });
});