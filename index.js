const round = require('@alvarocastro/round');
const mexp = require('math-expression-evaluator');

const rollDice = function (sides) {
	return Math.ceil(roll.random() * sides);
};

const parseDice = function (diceString) {
	const re = /(\d*)d(\d+|%)/;
	const [, countString, sidesString] = re.exec(diceString);

	return {
		sides: sidesString === '%' ? 100 : Number(sidesString),
		count: countString ? Number(countString) : 1
	};
};

const roll = function (rollString, rollCallback = () => {}) {
	const rollStringRegex = /^(\d*)d(\d+|%)(([+\-/*bw])(\d+))?(([+\-/*])(\d+|(\d*)d(\d+|%)(([+\-/*bw])(\d+))?))*$/;

	if (!rollStringRegex.test(rollString)) {
		throw new Error(`"${rollString}" is not a valid roll`);
	}

	const formula = rollString.replace(/(\d*)d(\d+|%)/g, diceString => {
		const dice = parseDice(diceString);

		const rolls = [];
		for (let i = 0; i < dice.count; i++) {
			const roll = rollDice(dice.sides);
			rolls.push(roll);
		}

		rollCallback(`${dice.count}d${dice.sides}`, rolls);
		return `(${rolls.join('+')})`;
	});

	const result = mexp.eval(formula);
	return round(result);
};

roll.detailed = function (rollString) {
	const rolls = [];
	const result = roll(rollString, (roll, result) => {
		rolls.push({
			roll,
			result
		});
	});

	return {
		rolls,
		result
	};
};

roll.random = function () {
	return Math.random();
};

module.exports = roll;
