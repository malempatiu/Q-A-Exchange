import React from 'react';
import {UserQuestions} from '../../components/UserQuestions';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('USERQUESTIONS COMPONENT', () => {
     it('should render component and set state text', () => {
         const questions = [
             {
               _id: '1235456852',
               text: 'Node.js'
             },
             {
                _id: '6658816594',
                text: 'React'
             }
         ];
         const removeErrorSpy = jest.fn();
         const fetchUserQuestionsSpy = jest.fn();
         const wrapper = shallow(<UserQuestions questions={questions} removeError={removeErrorSpy} fetchUserQuestions={fetchUserQuestionsSpy} username='ugesh'/>);
         expect(toJson(wrapper)).toMatchSnapshot();
     });
});
