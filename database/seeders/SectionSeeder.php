<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\SectionField;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $portfolio_sections = array (
            "Hero" => ['name', 'position', 'image'],
            "About" => ['email', 'phone', 'address', 'content', 'image'],
            "Service" => ['name', 'description', 'icon'],
            'Project' => ['name', 'description', 'image'],
            'Team' => ['name', 'summary', 'position', 'social_icons'],
            'Testomonial' => ['name', 'saying', 'image'],
            'Contact' => ['email'],
        );

        foreach ($portfolio_sections as $key => $item) {
            SectionField::create([
                'name' => $key,
                'value' => Str::lower($key),
                'industry_id' => 1,
                'content' => json_encode($item),
            ]);
        }
    }
}
