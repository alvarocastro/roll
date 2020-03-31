const test = require('ava');
const roll = require('.');

roll.random = function () {
	return 1;
};

test('Should return a number', t => {
	t.is(typeof roll('1d6'), 'number');
	t.is(typeof roll('1d6+1'), 'number');
	t.is(typeof roll('2d6-1d3'), 'number');
	t.is(typeof roll('1d6*1d6'), 'number');
});

test('Should work with single roll inputs', t => {
	t.is(roll('1d6'), 6);
	t.is(roll('1d10'), 10);
	t.is(roll('2d3'), 6);
	t.is(roll('5d5'), 25);
	t.is(roll('d20'), 20);
	t.is(roll('3d%'), 300);
});

test('Should support basic mathematical expressions', t => {
	t.is(roll('1d6+3'), 9);
	t.is(roll('1d6-10'), -4);
	t.is(roll('2d6-1d10'), 2);
	t.is(roll('1d6*1d6'), 36);
	t.is(roll('1d2/1d3'), 0.67);
});

test('Should support % for 100-sided dices', t => {
	t.is(roll('1d%'), 100);
	t.is(roll('2d%'), 200);
	t.is(roll('1d%+1'), 101);
});

test('Should return detailed information', t => {
	t.deepEqual(roll.detailed('1d6'), {
		result: 6,
		rolls: [
			{
				roll: '1d6',
				result: [6]
			}
		]
	});
	t.deepEqual(roll.detailed('2d10+4'), {
		result: 24,
		rolls: [
			{
				roll: '2d10',
				result: [10, 10]
			}
		]
	});
	t.deepEqual(roll.detailed('2d10-1d6'), {
		result: 14,
		rolls: [
			{
				roll: '2d10',
				result: [10, 10]
			},
			{
				roll: '1d6',
				result: [6]
			}
		]
	});
});

test('Should throw error on invalid input', t => {
	t.throws(() => {
		return roll('bad');
	}, {
		instanceOf: Error,
		message: '"bad" is not a valid roll'
	});
});
