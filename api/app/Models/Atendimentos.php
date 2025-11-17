<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atendimentos extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $fillable = [
        'paciente_id',
        'fisio_id',
        'data_atendimento',
        'descricao',
        'observacao',
        'observacao_paciente',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'paciente_id');
    }

    public function fisio()
    {
        return $this->belongsTo(User::class, 'fisio_id');
    }
}
