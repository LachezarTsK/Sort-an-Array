
#include <array>
#include <vector>
using namespace std;

class RadixSort {
    
public:
    void sort(vector<int>& values) {
        if (values.size() == 0) {
            return;
        }

        int maxValue = *max_element(values.begin(), values.end());
        int maxNumberOfDigits = numberOfDigits(maxValue);
        int factor = 1;

        while (maxNumberOfDigits-- > 0) {
            countingSort(values, factor);
            factor *= 10;
        }
    }

private:
    void countingSort(vector<int>& values, int factor) {
        array<int, 10> frequency{};
        vector<int> tempStore(values.size());

        for (int i = 0; i < values.size(); ++i) {
            ++frequency[(values[i] / factor) % 10];
        }
        for (int i = 1; i < frequency.size(); ++i) {
            frequency[i] += frequency[i - 1];
        }
        for (int i = values.size() - 1; i >= 0; --i) {
            tempStore[frequency[(values[i] / factor) % 10] - 1] = values[i];
            --frequency[(values[i] / factor) % 10];
        }

        values.assign(tempStore.begin(), tempStore.end());
    }

    int numberOfDigits(int num) {
        int digits = 0;
        while (num > 0) {
            ++digits;
            num /= 10;
        }
        return (digits == 0) ? 1 : digits;
    }
};

class Solution {
    
public:
    vector<int> sortArray(vector<int>& nums) {

        vector<int> negatives;
        copy_if(nums.begin(), nums.end(), back_inserter(negatives), [](int n){return n < 0;});
        transform(negatives.begin(), negatives.end(), negatives.begin(), [](int n){return -n;});

        vector<int> nonNegatives;
        copy_if(nums.begin(), nums.end(), back_inserter(nonNegatives), [](int n){return n >= 0;});

        RadixSort radixSort;
        radixSort.sort(negatives);
        radixSort.sort(nonNegatives);

        transform(negatives.rbegin(), negatives.rend(), nums.begin(), [](int n){return -n;});
        copy(nonNegatives.begin(), nonNegatives.end(), nums.begin() + negatives.size());

        return nums;
    }
};
