<?php

namespace App\Helper;

class MyHelper {

function cartesianProduct(array $arrays)
{
    $result = [[]];

    foreach ($arrays as $property => $propertyValues) {
            $append = [];

            foreach ($result as $resultItem) {
                foreach ($propertyValues as $propertyValue) {
                    $append[] = $resultItem + [$property => $propertyValue];
                }
            }

            $result = $append;
        }

        return $result;
    }


    function generateCombinations($optionsData, &$combinations, $index = 0, $currentCombination = [])
    {
        if ($index == count($optionsData)) {
            $combinations[] = $currentCombination;
            return;
        }

        $optionData = $optionsData[$index];
        $option = $optionData['option'];
        $variants = $optionData['variants'];

        foreach ($variants as $variant) {
            $newCombination = $currentCombination;
            $newCombination[$option] = $variant;

            $this->generateCombinations($optionsData, $combinations, $index + 1, $newCombination);
        }
    }
}