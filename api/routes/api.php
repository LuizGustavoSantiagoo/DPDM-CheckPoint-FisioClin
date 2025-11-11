<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PacienteController;
use App\Http\Controllers\Api\AtendimentosController;

Route::apiResource('/users', UserController::class);
Route::post('/login', [UserController::class, 'login'])->name('users.login');

Route::apiResource('/pacientes', PacienteController::class);
Route::get('/pacientes/nome/{nome}', [PacienteController::class, 'showByName']);

Route::apiResource('/atendimentos', AtendimentosController::class);
Route::get('/atendimentos/paciente/{id_paciente}', [AtendimentosController::class, 'showByIdPaciente']);