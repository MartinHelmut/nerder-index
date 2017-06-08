/**
 * Copyright (c) 2017, Martin Helmut Fieber.
 * Licensed under the MIT license.
 */
import { analyse as parse } from 'escomplex';

/**
 * @typedef {Object} Report
 * @property {number} nerderIndex The difficulty level
 * @property {number} parameterCount Amount of parameters given
 * @property {number} complexity Cyclomatic complexity
 * @property {number} operatorIndex The operator index (total / distinct)
 */

/**
 * Analyse a function string for difficulty
 *
 * @param  {string} fn Function string
 * @return {Report} Detailed function report
 */
function analyse(fn) {
    const { cyclomatic, functions, aggregate: { halstead: { operators } } } = parse(fn);
    const operatorIndex = operators.total / operators.distinct;
    const parameterCount = functions[0].params;

	return {
        nerderIndex: operatorIndex * parameterCount * cyclomatic,
        parameterCount,
        complexity: cyclomatic,
        operatorIndex
    };
}

/**
 * Analyse a function string for difficulty
 *
 * @param {string} fn Function string
 * @return {number} Nerder index
 */
function get(fn) {
    return analyse(fn).nerderIndex;
}

export { analyse, get };
