<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\ComponentSize;
use App\Models\ItemCategory;
use App\Models\SubIndustry;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
        // $names = ['large', 'medium', 'small'];
        // foreach ($names as $name) {
        //     ComponentSize::create([
        //         'name' => $name,
        //         'styles' => "",
        //     ]);
        // }

        $this->call([
            IndustrySeeder::class,
            SubIndustrySeeder::class,
            // CategorySeeder::class,
            // TemplateSeeder::class,
            // WebsiteSeeder::class,
            // ItemCategorySeeder::class,
            // ProductSeeder::class,
            // SectionSeeder::class,
            // ComponentSeeder::class,
        ]);
    }
}
