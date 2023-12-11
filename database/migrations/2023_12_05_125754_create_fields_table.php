<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fields', function (Blueprint $table) {
            $table->id();
            $table->integer('fieldable_id');
            $table->string('fieldable_type');
            $table->string('name');
            $table->string('value');
            $table->enum('data_type', ['content', 'design']);
            $table->enum('type', ['file', 'number', 'text', 'boolean', 'textarea', 'color', 'datetime']);
            $table->string('option')->nullable();
            $table->string('default_value')->nullable();
            $table->boolean('required')->default(false);
            $table->json('validation')->nullable();
            $table->json('apperance')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fields');
    }
};
