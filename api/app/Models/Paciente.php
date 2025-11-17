<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    /** @use HasFactory<\Database\Factories\PacienteFactory> */
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $fillable = [
        'nome',
        'sobrenome',
        'data_nascimento',
        'telefone',
        'endereco',
    ];

    public function atendimentos()
    {
        return $this->hasMany(Atendimentos::class);
    }

    public function getNomeCompletoAttribute()
    {
        return "{$this->nome} {$this->sobrenome}";
    }
}
