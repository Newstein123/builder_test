<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Template::create([
            'name' => 'Porfolio1',
            'layout' => 'this is layout data',
            'content' => json_encode(array(
                'sectionone' => "hello world"
            )),
            'css' => 'this is css',
            'js' => 'this is js',
            'links' => 'this is links',
            'scripts' => 'this is scripts',
            'category_id' => '1',
        ]);
    }
}
