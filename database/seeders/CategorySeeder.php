<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $personals = [
            'Graphic Designer',
            'Web Developer',
            'Photographer',
            'Artist'
        ];

        foreach ($personals as $key => $value) {
            Category::create([
                'sub_industry_id' => 1,
                'name' => $value,
            ]);
        }

        $agencies = [
            'Medical',
            'Music',
            'Beauty'
        ];

        foreach ($agencies as $key => $value) {
            Category::create([
                'sub_industry_id' => 2,
                'name' => $value,
            ]);
        }
        $clubs = [
            'Esports',
            'Soccer',
            'Social'
        ];
        foreach ($clubs as $key => $value) {
            Category::create([
                'sub_industry_id' => 3,
                'name' => $value,
            ]);
        }
        $resturants = [
            'Cafe',
            'Bar',
            'Shshi',
            'Piza'
        ];
        foreach ($resturants as $key => $value) {
            Category::create([
                'sub_industry_id' => 4,
                'name' => $value,
            ]);
        }
        $products = [
            'Technology',
            'Baby',
            'Car',
            'Small Shop',
            'Clothing',
            'Sports',
        ];
        foreach ($products as $key => $value) {
            Category::create([
                'sub_industry_id' => 5,
                'name' => $value,
            ]);
        }

        $real_estates = [
            'Hotels',
            'Motels and Guest House',
            'Land'
        ];
        foreach ($real_estates as $key => $value) {
            Category::create([
                'sub_industry_id' => 7,
                'name' => $value,
            ]);
        }

    }
}
