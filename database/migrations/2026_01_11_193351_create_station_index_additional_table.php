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
        Schema::create('station_index_additional', function (Blueprint $table) {
            $table->id();
            $table->float('similarity')->nullable();
            $table->float('dominance')->nullable();
            $table->float('diversity')->nullable();
            $table->integer('total_abundance')->nullable();
            $table->integer('number_of_species')->nullable();
            $table->float('conductivity')->nullable();
            $table->float('ratio_cn')->nullable();
            $table->float('turbidity')->nullable();
            $table->float('clay')->nullable();
            $table->float('sand')->nullable();
            $table->float('silt')->nullable();
            $table->float('coarse_sediment')->nullable();
            $table->float('total_organic_dissolved')->nullable();
            $table->float('total_organic_substrate')->nullable();
            $table->float('macrozoobenthos_density')->nullable();
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
        Schema::dropIfExists('station_index_additional');
        Schema::table('station_index_additional', function (Blueprint $table) {
            $table->dropForeign(['id_user']);
            $table->dropForeign(['id_station']);
        });
    }
};
