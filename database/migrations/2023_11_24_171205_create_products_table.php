<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.s
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('website_id')->nullable()->constrained('websites')->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained('item_categories')->onDelete('cascade');
            $table->string('name')->default('Untitled Name');
            $table->text('description')->nullable();
            $table->json('additional_info')->nullable()->comment('for more custom blocks and fields');
            $table->integer('price')->default(0);
            $table->json('tags')->nullable();
            $table->integer('sale_price')->default(0);
            $table->string('currency')->default('mmk');
            $table->integer('stock')->default(10);
            $table->integer('likes')->default(0);
            $table->integer('views')->default(0);
            $table->boolean('visibility')->default(0);
            $table->json('variations')->nullable()->comment('option and variatants');
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
