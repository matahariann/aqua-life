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
        Schema::create('station_main_abiotic', function (Blueprint $table) {
            $table->id();
            $table->float('salinity')->nullable();
            $table->float('temperature')->nullable();
            $table->float('dissolved_oxygen')->nullable();
            $table->float('ph')->nullable();
            $table->float('nh3')->nullable();
            $table->float('nh2')->nullable();
            $table->float('ammonia')->nullable();
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
        Schema::dropIfExists('station_main_abiotic');

        Schema::table('station_main_abiotic', function (Blueprint $table) {
            $table->dropForeign(['id_user']);
            $table->dropForeign(['id_station']);
        });
    }
};
