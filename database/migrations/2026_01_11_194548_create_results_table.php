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
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->float('value');
            $table->enum('status', ['good', 'moderate', 'poor']);
            $table->string('conclusion');
            $table->string('recommendation');
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_station');
            $table->timestamps();

            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_station')->references('id')->on('stations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');

        Schema::table('results', function (Blueprint $table) {
            $table->dropForeign(['id_user']);
            $table->dropForeign(['id_station']);
        });
    }
};
