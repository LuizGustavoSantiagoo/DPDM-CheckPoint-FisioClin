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
        Schema::create('atendimentos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('paciente_id');
            $table->unsignedBigInteger('fisio_id');
            $table->dateTime('data_atendimento');
            $table->longText('descricao')->nullable();
            $table->longtext('observacao')->nullable();
            $table->text('observacao_paciente')->nullable();
            $table->timestamps();

            $table->foreign('paciente_id')->references('id')->on('pacientes')->onDelete('cascade');
            $table->foreign('fisio_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
