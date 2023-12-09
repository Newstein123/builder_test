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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('website_id')->constrained('websites')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('item_categories')->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->json('variations')->comment('variations for details data');
            $table->integer('price')->default(1000);
            $table->string('currency')->default('mmk');
            $table->integer('quantity')->default(10);
            $table->integer('likes')->default(0);
            $table->integer('views')->default(0);
            $table->json('gallery')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
