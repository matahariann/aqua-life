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
        Schema::create('species', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('abundance')->default(0);
            $table->float('taxa_indicator')->nullable();
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_station');
            $table->unsignedBigInteger('id_family');
            $table->timestamps();

            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_station')->references('id')->on('stations')->onDelete('cascade');
            $table->foreign('id_family')->references('id')->on('biotic_families')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species');

        Schema::table('species', function (Blueprint $table) {
            $table->dropForeign(['id_user']);
            $table->dropForeign(['id_station']);
            $table->dropForeign(['id_family']);
        });
    }
};
