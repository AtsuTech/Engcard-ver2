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
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flashcard_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('img_path')->nullable();
            #$table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->integer('category_id')->default(1)->nullable();
            $table->string('word');
            $table->string('word_mean');
            $table->longText('sentence')->nullable();
            $table->longText('sentence_mean')->nullable();
            $table->string('link')->nullable();
            $table->boolean('memory')->default(false);
            $table->boolean('check')->default(false);
            $table->integer('correct_count')->default(0)->nullable();
            $table->integer('incorrect_count')->default(0)->nullable();
            $table->integer('view_count')->default(0)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
