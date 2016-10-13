import stateEngin from '../stateEngin';

describe("stateEngin", () => {
	let newStateEngin = new stateEngin(['state1', 'state2', 'state3']);

	beforeEach(() => {
		newStateEngin.resetState();
	});

	it('nextState', () => {
		expect(newStateEngin.getCurrentState()).toBe('state1');
		expect(newStateEngin.nextState()).toBe('state2');
		expect(newStateEngin.nextState()).toBe('state3');
		expect(newStateEngin.nextState()).toBe('state3');
	});

	it('transferToState', () => {
		expect(newStateEngin.transferToState('state3')).toBe('state3');
		expect(newStateEngin.transferToState('state1')).toBe('state1');
	});

	it('preState', () => {
		expect(newStateEngin.transferToState('state3')).toBe('state3');
		expect(newStateEngin.preState()).toBe('state2');
		expect(newStateEngin.preState()).toBe('state1');
		expect(newStateEngin.preState()).toBe('state1');
	});

	it('resetState', () => {
		expect(newStateEngin.transferToState('state3')).toBe('state3');
		expect(newStateEngin.resetState()).toBe('state1');
	});

});