<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PacienteController;

Route::apiResource('/users', UserController::class);
Route::post('/login', [UserController::class, 'login'])->name('users.login');
Route::apiResource('/pacientes', PacienteController::class);