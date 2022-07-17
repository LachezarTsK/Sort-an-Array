
import java.util.Arrays;

public class Solution {

    public int[] sortArray(int[] nums) {
        int[] negatives = Arrays.stream(nums).filter(n -> n < 0).map(n -> -n).toArray();
        int[] nonNegatives = Arrays.stream(nums).filter(n -> n >= 0).toArray();

        RadixSort radixSort = new RadixSort();
        radixSort.sort(negatives);
        radixSort.sort(nonNegatives);

        combineSortedNegativeAndNonNegativeValues(nums, negatives, nonNegatives);

        return nums;
    }

    private void combineSortedNegativeAndNonNegativeValues(int[] nums, int[] negatives, int[] nonNegatives) {
        for (int i = negatives.length - 1; i >= 0; --i) {
            nums[negatives.length - i - 1] = -negatives[i];
        }
        for (int i = 0; i < nonNegatives.length; ++i) {
            nums[negatives.length + i] = nonNegatives[i];
        }
    }
}

class RadixSort {

    void sort(int[] values) {
        if (values.length == 0) {
            return;
        }

        int maxValue = Arrays.stream(values).max().getAsInt();
        int maxNumberOfDigits = numberOfDigits(maxValue);

        int factor = 1;
        while (maxNumberOfDigits-- > 0) {
            countingSort(values, factor);
            factor *= 10;
        }
    }

    private void countingSort(int[] values, int factor) {
        int[] frequency = new int[10];
        int[] tempStore = new int[values.length];

        for (int i = 0; i < values.length; ++i) {
            ++frequency[(values[i] / factor) % 10];
        }
        for (int i = 1; i < frequency.length; ++i) {
            frequency[i] += frequency[i - 1];
        }
        for (int i = values.length - 1; i >= 0; --i) {
            tempStore[frequency[(values[i] / factor) % 10] - 1] = values[i];
            --frequency[(values[i] / factor) % 10];
        }
        System.arraycopy(tempStore, 0, values, 0, values.length);
    }

    private int numberOfDigits(int num) {
        int digits = 0;
        while (num > 0) {
            ++digits;
            num /= 10;
        }
        return (digits == 0) ? 1 : digits;
    }
}
