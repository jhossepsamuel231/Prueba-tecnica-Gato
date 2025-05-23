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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->enum('type', ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER']);
            $table->decimal('amount', 15, 2);
            $table->string('description')->nullable();

            $table->foreignId('destination_account_id')->nullable()->constrained('accounts')->onDelete('set null');

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
