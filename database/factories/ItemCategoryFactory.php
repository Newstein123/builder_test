<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ItemCategory>
 */
class ItemCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        $array = ['size', 'battery_life', 'color'];
        return [
            'name' => $this->faker->text(10),
            'value' => $this->faker->text(10),
            'website_id' => 1,
            'variations' => json_encode($array),
        ];
    }
}
