<?php

namespace Database\Seeders;

use App\Models\Component;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $components = [
            'btn',
            'product_card',
            'service_card',
            'pricing_card',
            'project_card',
            'social_icon',
            'navbar',
            'footer',
            'footer',
            'sidebar',
            'pagination_btn',
        ];

        foreach ($components as $cpt) {
            Component::create([
                'name' => $cpt,
            ]);
        }
    }
}
