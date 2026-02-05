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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();

            $table->uuid('insurance_id');

            $table->enum('type', ['percentage', 'fixed']);
            $table->bigInteger('value');
            $table->bigInteger('max_discount')->nullable();

            $table->date('start_date');
            $table->date('end_date');

            $table->timestamps();

            $table->foreign('insurance_id')
                ->references('id')
                ->on('insurances')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
