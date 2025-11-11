<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Atendimentos;

class AtendimentosController extends Controller
{
    public function index()
    {
        $atendimentos = Atendimentos::all();
        return response()->json($atendimentos);
    }

    public function show($id)
    {
        if (!$id || !is_numeric($id)) {
            return response()->json(['error' => 'Atendimento not found'], 404);
        }

        $atendimentos = Atendimentos::find($id);

        return response()->json($atendimentos);
    }

    public function showByIdPaciente(string $id_paciente)
    {
        try {
            $atendimentos = Atendimentos::where('paciente_id', $id_paciente)->get();

            return response()->json([
                'data' => $atendimentos
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao buscar atendimentos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {

        if(!$request || empty($request->all())) {
            return response()->json([
                'message' => 'Requisição vazia',
            ], 400);
        }

        try {
            $atendimento = Atendimentos::create($request->all());

            return response()->json([
                'message' => 'Atendimento criado com sucesso',
                'data' => $atendimento
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao criar atendimento',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Update an existing atendimento
    }

    public function destroy($id)
    {
        // Delete an atendimento
    }
}
