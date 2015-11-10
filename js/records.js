import { Record } from 'immutable';

var Project = Record({
	id: null,
	name: null
});

var Counter = Record({
	id: null,
	projectID: null,
	name: null,
	value: 0,
	maxValue: null,
  countRollovers: false,
  rolloverCount: null
});

export { Project, Counter };
