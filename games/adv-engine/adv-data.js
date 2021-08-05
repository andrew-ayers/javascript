var titleData = {
	name: 'Adventure Engine - Test 1',
	desc: '',
	author: 'Andrew L. Ayers',
	copy: 'CC BY-SA - 2014 by Andrew L. Ayers',
}
	
var	objectData = {
	0: {
		type: 'room',
		id: 'kitchen',
		
		states: {
			0: {
				id: '',
				name: 'Kitchen',
				short: 'You are in a small but tidy kitchen.',
				long: 'You are in the kitchen of the house. It is small, but neatly kept. A window on the north wall looks out over an inviting garden.',
				exits: {
					0: {
						direction: 'north',
						to: 'garden',
						blocked: 'kitchen door'
					},

					1: {
						direction: 'west',
						to: 'dining room',
						blocked: false
					}
				},
				
				enter: {
				},
				
				exit: {
				}						
			}
		}
		
	},
	
	1: {
		type: 'object',
		id: 'cupboard',
		name: 'Cupboard',
		short: 'A wood cupboard is mounted to the wall. It is ',
		long: 'A cupboard made of oak is mounted to the wall; it has an interesting design on the doors, which are ',
		extra: 'open.|closed.',
		visible: true,
		open: false,
		carryable: false,
		breakable: false,
		location: 'kitchen',
		weight: 999
	},
	
	2: {
		type: 'object',
		id: 'cupboard',
		name: 'Coffee Cup',
		short: 'It is a small green coffee cup.',
		long: "It's a small green coffee cup, made of ceramic.",
		visible: false,
		carryable: true,
		breakable: true,
		location: 'cupboard',
		weight: 1
		
	}
}
	
var	playerData = {
	score: 0,
	health: 100,
	location: 'kitchen',
	carrying: []
}

var verbs = [
	'look',
	'go',
	'walk',
	'get',
	'take',
	'use',
	'hit',
	'attack',
	'jump',
	'pull',
	'push',
	'press',
	'nudge',
	'bump',
	'read',
	'say'
]
