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
        Schema::create('main_abiotic_parameters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('initial_value');
            $table->float('final_value');
            $table->float('weight')->default(0);
            $table->unsignedBigInteger('id_geo_zone')->nullable();
            $table->unsignedBigInteger('id_type_water')->nullable();
            $table->timestamps();

            $table->foreign('id_geo_zone')->references('id')->on('geo_zones')->onDelete('cascade');
            $table->foreign('id_type_water')->references('id')->on('water_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('main_abiotic_parameters');

        Schema::table('main_abiotic_parameters', function (Blueprint $table) {
            $table->dropForeign(['id_geo_zone']);
            $table->dropForeign(['id_type_water']);
        });
    }
};
