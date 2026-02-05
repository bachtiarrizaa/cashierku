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
        Schema::create('procedure_prices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('procedure_id')->index();
            $table->bigInteger('unit_price');
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();

            $table->foreign('procedure_id')->references('id')->on('procedures')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procedure_prices');
    }
};
