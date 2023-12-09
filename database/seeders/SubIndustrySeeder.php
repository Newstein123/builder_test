<?php

namespace Database\Seeders;

use App\Models\SubIndustry;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubIndustrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $portfolios = [
            'Personal',
            'Agency',
            'Club',
        ];
        foreach ($portfolios as $key => $value) {
            SubIndustry::create([
                'industry_id' => 1,
                'name' => $value,
            ]);
        }

        $services = [
            'Resturant',
            'Product',
            'Tea Shop',
            'Real Estate'
        ];
        foreach ($services as $key => $value) {
            SubIndustry::create([
                'industry_id' => 2,
                'name' => $value,
            ]);
        }

        $flyers = [
            'Wedding',
            'Funeral',
            'Job',
            'Event',
            'Birthday'
        ];
        foreach ($flyers as $key => $value) {
            SubIndustry::create([
                'industry_id' => 3,
                'name' => $value,
            ]);
        }
    }
}
