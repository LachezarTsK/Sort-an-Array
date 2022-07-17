
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {

    let negatives = nums.filter(n => n < 0).map(n => -n);
    let nonNegatives = nums.filter(n => n >= 0);

    const radixSort = new RadixSort();
    radixSort.sort(negatives);
    radixSort.sort(nonNegatives);

    combineSortedNegativeAndNonNegativeValues(nums, negatives, nonNegatives);

    return nums;
};

/**
 * @param {number[]} nums
 * @param {number[]} negatives
 * @param {number[]} nonNegatives
 * @return {void}
 */
function combineSortedNegativeAndNonNegativeValues(nums, negatives, nonNegatives) {
    for (let i = negatives.length - 1; i >= 0; --i) {
        nums[negatives.length - i - 1] = -negatives[i];
    }
    for (let i = 0; i < nonNegatives.length; ++i) {
        nums[negatives.length + i] = nonNegatives[i];
    }
}

class RadixSort {

    /**
     * @param {number[]} values
     * @return {void}
     */
    sort(values) {
        if (values.length === 0) {
            return;
        }

        let maxValue = Math.max(...values);
        let maxNumberOfDigits = this.numberOfDigits(maxValue);

        let factor = 1;
        while (maxNumberOfDigits-- > 0) {
            this.countingSort(values, factor);
            factor *= 10;
        }
    }

    /**
     * @param {number[]} values
     * @param {number} factor
     * @return {void}
     */
    countingSort(values, factor) {
        let frequency = new Array(10).fill(0);
        let tempStore = new Array(values.length).fill(0);

        for (let i = 0; i < values.length; ++i) {
            ++frequency[Math.floor(values[i] / factor) % 10];
        }
        for (let i = 1; i < frequency.length; ++i) {
            frequency[i] += frequency[i - 1];
        }
        for (let i = values.length - 1; i >= 0; --i) {
            tempStore[frequency[Math.floor(values[i] / factor) % 10] - 1] = values[i];
            --frequency[Math.floor(values[i] / factor) % 10];
        }
        this.copyArray(tempStore, values);
    }

    /**
     * @param {number[]} source
     * @param {number[]} target
     * @return {void}
     */
    copyArray(source, target) {
        for (let i = source.length - 1; i >= 0; --i) {
            target[i] = source[i];
        }
    }

    /**
     * @param {number} num
     * @return {number}
     */
    numberOfDigits(num) {
        let digits = 0;
        while (num > 0) {
            ++digits;
            num = Math.floor(num / 10);
        }
        return (digits === 0) ? 1 : digits;
    }
}
