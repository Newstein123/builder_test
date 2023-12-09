<?php

namespace Database\Factories;

use App\Models\ItemCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        $array = array(
            'size' => 'L',
            'battery_life' => '10 hr',
            'color' => 'green'
        );
        return [
            'name' => $this->faker->name(),
            'user_id' => 1,
            'category_id' => $this->faker->randomElement(ItemCategory::pluck('id')->toArray()),
            'description' => $this->faker->realText(20),
            'variations' => json_encode($array),
        ];
    }
}
