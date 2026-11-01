/**
 * Numbers of decimal digits to round to
 */
const scale = 2;

/**
 * Calculate the score awarded when having a certain percentage on a list level.
 *
 * @param {Number} rank Position on the list (1 = hardest)
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @param {Number} totalLevels Total number of levels on the list
 * @returns {Number}
 */
export function score(rank, percent, minPercent, totalLevels) {
    const MIN_SCORE = 0.1;
    const MAX_SCORE = 250;

    // Invalid rank
    if (rank < 1 || rank > totalLevels || totalLevels < 1) {
        return 0;
    }

    // Only full completions allowed after rank 75
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Calculate score based on rank
    let baseScore;

    if (totalLevels === 1) {
        baseScore = MAX_SCORE;
    } else {
        baseScore = MAX_SCORE -
            (MAX_SCORE - MIN_SCORE) *
            ((rank - 1) / (totalLevels - 1));
    }

    // Calculate percentage multiplier
    const multiplier =
        (percent - (minPercent - 1)) /
        (100 - (minPercent - 1));

    let result = baseScore * multiplier;

    // Partial completion penalty
    if (percent != 100) {
        result -= result / 3;
    }

    result = Math.max(0, result);

    if (percent != 100) {
        return round(result);
    }

    return Math.max(round(result), 0);
}

/**
 * Round a number to the configured decimal scale.
 *
 * @param {Number} num Number to round
 * @returns {Number}
 */
export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';

        if (+arr[1] + scale > 0) {
            sig = '+';
        }

        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
