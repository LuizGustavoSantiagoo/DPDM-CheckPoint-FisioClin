<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::All();
        return response()->json($user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $dados_validados = $request->validate([
            'nome' => 'required|string|max:255',
            'sobrenome' => 'required|string|max:255',
            'crefito' => 'required|max:255',
            'email' => 'required|email',
            'senha' => 'required|string|min:8',
        ]);

        $dados_validados['senha'] = bcrypt($dados_validados['senha']);
        
        //retorna json com dados
        $user = User::create([
            'nome' => $dados_validados['nome'],
            'sobrenome' => $dados_validados['sobrenome'],
            'email' => $dados_validados['email'],
            'senha_hash' => $dados_validados['senha'],
            'funcao' => 'fisioterapeuta',
            'crefito' => $dados_validados['crefito'],
            'status' => false,
        ]);
        
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findorFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $dados_validados = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'sobrenome' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'senha' => 'sometimes|required|string|min:8|confirmed',
            'funcao' => 'sometimes|required|in:fisioterapeuta,admin',
            'crefito' => 'sometimes|nullable|string|max:255',
            'status' => 'sometimes|required|boolean',
        ]);

        if (isset($dados_validados['senha'])) {
            $dados_validados['senha'] = bcrypt($dados_validados['senha']);
            $dados_validados['senha_hash'] = $dados_validados['senha'];
            unset($dados_validados['senha']);
        }

        $user->update($dados_validados);

        return response()->json(['message' => 'User updated successfully'], 200);
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'senha' => 'required',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !password_verify($credentials['senha'], $user->senha_hash)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Login successful', 'user' => $user, 'token' => $token], 200);
    }
}
