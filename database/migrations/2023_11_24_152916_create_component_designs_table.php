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
        Schema::create('component_designs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('value');
            $table->foreignId('component_id')->constrained('components')->onDelete('cascade');
            $table->longText('content')->nullable()->comment('jsx content or htmlcontent');
            $table->longText('skeleton')->nullable()->comment('jsx content or htmlcontent of skeleton structure');
            $table->boolean('isPremium')->default(false);
            $table->boolean('isShow')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('component_designs');
    }
};
