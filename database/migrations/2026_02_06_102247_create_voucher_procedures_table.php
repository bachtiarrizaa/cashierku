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
        Schema::create('voucher_procedures', function (Blueprint $table) {
            $table->id();
            $table->uuid('procedure_id');
            $table->foreignId('voucher_id')->constrained('vouchers')->cascadeOnDelete();
            $table->timestamps();

            $table->foreign('procedure_id')
                ->references('id')
                ->on('procedures')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_procedures');
    }
};
