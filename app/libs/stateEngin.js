class statesEngin {
	constructor(stateArray) {
		if (!stateArray instanceof Array) {
			throw "first parameter must be array";
			return false;
		}

		if (stateArray.length <= 0) {
			throw "the array must contains at lest one element";
			return false;
		}

		this.states = stateArray;
		this.currentIndex = 0;
	}

	resetState() {
		this.currentIndex = 0;
		return this.getCurrentState();
	}

	getCurrentState() {
		return this.states[this.currentIndex];
	}

	nextState() {
		/**
		* it's already last state
		**/
		if (this.currentIndex >= this.states.length - 1) {
			return this.states[this.currentIndex];
		}

		this.currentIndex += 1;

		return this.getCurrentState();
	}

	preState() {
		/**
		* it's already the first state
		**/
		if (this.currentIndex <= 0) {
			return this.states[this.currentIndex];
		}

		this.currentIndex -= 1;
		
		return this.getCurrentState();
	}

	transferToState(state) {
		/**
		* should check if the state already exist
		**/
		let pos = this.states.indexOf(state);	

		if (pos === -1) {
			return false;
		}

		this.currentIndex = pos;

		return this.getCurrentState();
	}
}

export default statesEngin;