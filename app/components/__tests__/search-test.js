'use strict';
import React from "react/addons";
import {shallow} from 'enzyme';
import Search from '../Search.jsx';

describe('search component', () => {
	it('test search callback', () => {
		let myMock = new jest.fn()();

		const search = shallow(
		    <Search searchCallback={myMock}/>
		);

		search.find('.input-group-addon').simulate('click');
		
		// expect(myMock.calls.length).toBe(1);
	});
});