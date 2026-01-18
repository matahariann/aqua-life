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
        Schema::create('stations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_type_water');
            $table->unsignedBigInteger('id_geo_zone');
            $table->unsignedBigInteger('id_user');
            $table->timestamps();

            $table->foreign('id_type_water')->references('id')->on('water_types')->onDelete('cascade');
            $table->foreign('id_geo_zone')->references('id')->on('geo_zones')->onDelete('cascade');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stations');

        Schema::table('stations', function (Blueprint $table) {
            $table->dropForeign(['id_type_water']);
            $table->dropForeign(['id_geo_zone']);
            $table->dropForeign(['id_user']);
        });
    }
};
