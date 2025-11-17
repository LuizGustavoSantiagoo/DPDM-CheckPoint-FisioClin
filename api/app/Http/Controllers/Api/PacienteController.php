<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    
    public function index()
    {
        $pacientes = Paciente::all();

        return response()->json([
            'message' => 'Lista de pacientes',
            'data' => $pacientes
        ], 200);

    }

    public function store(Request $request)
    {
        
        try {
            $pacientes = Paciente::create($request->all());

            return response()->json([
                'message' => 'Paciente criado com sucesso',
                'data' => $pacientes
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao criar paciente',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function showByName( string $nome) {

        try {
            $paciente = Paciente::where('nome', 'like', '%' . $nome . '%')->orWhere('sobrenome', 'like', '%' . $nome . '%')->get();

            return response()->json([
                'message' => 'Detalhes do paciente',
                'data' => $paciente
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Paciente não encontrado',
                'error' => $e->getMessage()
            ], 404);
        }

    }

    public function show(string $id)
    {
        try {
            $paciente = Paciente::findOrFail($id);

            return response()->json([
                'message' => 'Detalhes do paciente',
                'data' => $paciente
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Paciente não encontrado',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        
    }

    public function destroy(string $id)
    {
        try {
            $paciente = Paciente::findOrFail($id);
            $paciente->delete();

            return response()->json([
                'message' => 'Paciente excluído com sucesso'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao excluir paciente',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
