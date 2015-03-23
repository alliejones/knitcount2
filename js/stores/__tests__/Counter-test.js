jest.dontMock('../Counters');

describe('Counter store', function() {
	var Immutable, CounterStore, CounterSource, Counter;
	beforeEach(function() {
		Immutable = require('immutable');

		CounterStore = require('../Counters');
		CounterSource = require('../../sources/Counters');

		Counter = require('../../utl/records').Counter;

		CounterStore.getByID = jest.genMockFunction();
		CounterStore.getByID.mockReturnValue(new Counter({
			name: 'Test',
			value: 1
		}));

		CounterStore.updateCounter = jest.genMockFunction();
	});

	it('increments counters', function() {
		CounterStore.incCounter('1');
		var updatedCounter = CounterStore.updateCounter.mock.calls[0][0];
		expect(updatedCounter.get('value')).toEqual(2);
	});

	it('enforces the max value when incrementing', function() {
		CounterStore.getByID.mockReturnValue(new Counter({
			name: 'Test',
			value: 1,
			maxValue: 1
		}));	

		CounterStore.incCounter('1');

		expect(CounterStore.updateCounter).not.toBeCalled();
	});

	it('decrements counters', function() {
		CounterStore.decCounter('1');
		var updatedCounter = CounterStore.updateCounter.mock.calls[0][0];
		expect(updatedCounter.get('value')).toEqual(0);
	});

	it("doesn't allow counter values to go negative", function() {
		CounterStore.getByID.mockReturnValue(new Counter({
			name: 'Test',
			value: 0
		}));

		CounterStore.decCounter('1');

		expect(CounterStore.updateCounter).not.toBeCalled();
	});
});