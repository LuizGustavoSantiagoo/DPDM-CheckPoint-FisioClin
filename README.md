# FisioClin
 Sobre o App: FisioClin é um aplicativo de gerenciamento para clínicas de fisioterapia, projetado para que o profissional possa otimizar o agendamento e o acompanhamento de seus pacientes. A plataforma centraliza o cadastro de pacientes e o registro de prontuários de forma eficiente.

## Funcionalidades Básicas (MVP)
[ ] Cadastro e Login de Profissionais (Fisioterapeutash).

[ ] Cadastro, edição e visualização de Pacientes.

[ ] Agendamento de novas consultas para os pacientes cadastrados.

[ ] Visualização da lista de atendimentos (com filtros).

[ ] Registro da evolução do paciente em cada atendimento (prontuário).

[ ] Edição de dados da conta do profissional.

## Funcionalidades Adicionais (Trabalhos Futuros)
[ ] Notificações de lembrete de consulta (via SMS ou WhatsApp).

[ ] Geração de relatórios de atendimentos.

[ ] Módulo de pagamentos para as consultas.

[ ] Upload de exames e documentos pelo profissional no perfil do paciente.

## Protótipos de Tela

Acesse o protótipo no Figma aqui: <a target="_blank" href="https://www.figma.com/design/wPQYZdNIcVJYgV9jYjIe9r/FisioClin?t=XbRz2Mv6GEjKdsIL-0">AQUI</a>

Modelagem do Banco de Dados
Implementação
A arquitetura do projeto será baseada em uma API RESTful desenvolvida com o framework Laravel. Para a persistência dos dados, será utilizado um banco de dados MySQL. O aplicativo front-end será desenvolvido em React Native.

## Estrutura do banco de dados.

<img width="1064" height="510" alt="image" src="https://github.com/user-attachments/assets/1a805e45-f6f8-4b09-a690-1cb3ef31b812" />

## Planejamento de Sprints
O desenvolvimento do projeto será dividido em sprints, focando na entrega contínua de valor.

## telas implementadas <a href="https://www.youtube.com/watch?v=tqJnYOcl1NQ">Link</a>

## Sprint 1 (✓)
Foco: Estrutura e Autenticação (Equipe)

[ ] Configuração do ambiente de desenvolvimento (React Native, PHP, Composer, Laravel, MySQL).

[ ] Criação do projeto Laravel e configuração da conexão com o banco de dados.

[ ] Implementação das telas de Login e Conta para a Equipe no React Native.

[ ] Desenvolvimento dos endpoints da API (rotas e controllers) para autenticação da Equipe.

## Sprint 2 (✓)
Foco: Gerenciamento de Pacientes

[ ] Desenvolvimento dos endpoints da API para CRUD (Criar, Ler, Atualizar, Deletar) de Pacientes.

[ ] Implementação da tela de listagem de pacientes com busca no React Native.

[ ] Implementação do formulário para cadastrar e editar pacientes.

## Sprint 3 (✓)
Foco: Gerenciamento de Atendimentos

[ ] Desenvolvimento dos endpoints da API para CRUD de Atendimentos.

[ ] Implementação da tela para agendar um novo atendimento.

[ ] Implementação da tela de listagem de atendimentos (com filtros).

[ ] Implementação da tela de detalhes do atendimento para adicionar anotações (prontuário).

## Sprint 4 ()
Foco: Refinamento e Testes

[ ] Testes completos do fluxo de ponta a ponta (front-end e API).

[ ] Ajustes de UI/UX com base nos protótipos.

[ ] Correção de bugs e preparação da versão final.
