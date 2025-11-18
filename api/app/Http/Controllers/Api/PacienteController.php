<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        // Normaliza a data (aceita dd/mm/YYYY e YYYY-mm-dd) e valida payload
        if ($request->filled('data_nascimento')) {
            $dn = $request->input('data_nascimento');
            if (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $dn)) {
                [$d, $m, $y] = explode('/', $dn);
                $request->merge(['data_nascimento' => sprintf('%04d-%02d-%02d', (int)$y, (int)$m, (int)$d)]);
            }
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|min:2|max:100',
            'sobrenome' => 'required|string|min:2|max:100',
            'data_nascimento' => 'required|date_format:Y-m-d',
            'telefone' => 'required|string',
            'endereco' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $pacientes = Paciente::create($validator->validated());

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
        try {
            $paciente = Paciente::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Paciente não encontrado',
                'error' => $e->getMessage(),
            ], 404);
        }

        if ($request->filled('data_nascimento')) {
            $dn = $request->input('data_nascimento');

            if (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $dn)) {
                [$d, $m, $y] = explode('/', $dn);
                $request->merge(['data_nascimento' => sprintf('%04d-%02d-%02d', (int)$y, (int)$m, (int)$d)]);
            }
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'sometimes|required|string|min:2|max:100',
            'sobrenome' => 'sometimes|required|string|min:2|max:100',
            'data_nascimento' => 'sometimes|required|date_format:Y-m-d',
            'telefone' => 'sometimes|required|string',
            'endereco' => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $dadosValidados = $validator->validated();

        if (empty($dadosValidados)) {
            return response()->json([
                'message' => 'Nenhum campo válido enviado para atualização',
                'errors' => ['payload' => ['Envie ao menos um campo para atualizar.']],
            ], 422);
        }

        try {
            $paciente->update($dadosValidados);

            return response()->json([
                'message' => 'Paciente atualizado com sucesso',
                'data' => $paciente
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar paciente',
                'error' => $e->getMessage()
            ], 500);
        }
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
