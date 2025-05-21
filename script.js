// Gerenciamento de Estado
let pacientes = [];
let medicos = [];
let atendimentos = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    inicializarNavegacao();
    carregarDados();
    inicializarFormularios();
});

// Navegação
function inicializarNavegacao() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            mostrarSecao(targetId);
            atualizarNavegacaoAtiva(e.target);
        });
    });
}

function mostrarSecao(id) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

function atualizarNavegacaoAtiva(linkAtivo) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    linkAtivo.classList.add('active');
}

// Carregamento de Dados
function carregarDados() {
    // Simulação de dados - Em um ambiente real, isso viria do banco de dados
    medicos = [
        { id: 1, nome: 'Dr. João Silva', especialidade: 'Clínico Geral' },
        { id: 2, nome: 'Dra. Maria Santos', especialidade: 'Cardiologista' }
    ];

    // Carregar médicos no select
    const selectMedico = document.getElementById('select-medico');
    medicos.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = `${medico.nome} - ${medico.especialidade}`;
        selectMedico.appendChild(option);
    });

    atualizarTabelaHistorico();
}

// Formulários
function inicializarFormularios() {
    // Formulário de Cadastro de Paciente
    const formCadastro = document.getElementById('form-cadastro');
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        cadastrarPaciente();
    });

    // Formulário de Atendimento
    const formAtendimento = document.getElementById('form-atendimento');
    formAtendimento.addEventListener('submit', (e) => {
        e.preventDefault();
        registrarAtendimento();
    });
}

function cadastrarPaciente() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;

    if (!validarEmail(email)) {
        alert('Por favor, insira um email válido');
        return;
    }

    const novoPaciente = {
        id: pacientes.length + 1,
        nome,
        dataNascimento,
        telefone,
        email,
        endereco
    };

    pacientes.push(novoPaciente);
    atualizarSelectPacientes();
    document.getElementById('form-cadastro').reset();
    alert('Paciente cadastrado com sucesso!');
}

function registrarAtendimento() {
    const pacienteId = document.getElementById('select-paciente').value;
    const medicoId = document.getElementById('select-medico').value;
    const data = document.getElementById('data-atendimento').value;
    const descricao = document.getElementById('descricao-atendimento').value;

    const novoAtendimento = {
        id: atendimentos.length + 1,
        pacienteId: parseInt(pacienteId),
        medicoId: parseInt(medicoId),
        data,
        descricao
    };

    atendimentos.push(novoAtendimento);
    atualizarTabelaHistorico();
    document.getElementById('form-atendimento').reset();
    alert('Atendimento registrado com sucesso!');
}

// Utilitários
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function atualizarSelectPacientes() {
    const selectPaciente = document.getElementById('select-paciente');
    selectPaciente.innerHTML = '<option value="">Selecione o paciente</option>';
    
    pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.nome;
        selectPaciente.appendChild(option);
    });
}

function atualizarTabelaHistorico() {
    const tbody = document.querySelector('#tabela-historico tbody');
    tbody.innerHTML = '';

    atendimentos.forEach(atendimento => {
        const paciente = pacientes.find(p => p.id === atendimento.pacienteId);
        const medico = medicos.find(m => m.id === atendimento.medicoId);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${paciente ? paciente.nome : 'N/A'}</td>
            <td>${formatarData(atendimento.data)}</td>
            <td>${atendimento.descricao}</td>
            <td>${medico ? medico.nome : 'N/A'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function formatarData(data) {
    return new Date(data).toLocaleString('pt-BR');
}

function filtrarHistorico() {
    const termoBusca = document.getElementById('busca-paciente').value.toLowerCase();
    const dataFiltro = document.getElementById('filtro-data').value;

    const tbody = document.querySelector('#tabela-historico tbody');
    tbody.innerHTML = '';

    const atendimentosFiltrados = atendimentos.filter(atendimento => {
        const paciente = pacientes.find(p => p.id === atendimento.pacienteId);
        const dataAtendimento = atendimento.data.split('T')[0];

        const matchPaciente = paciente && paciente.nome.toLowerCase().includes(termoBusca);
        const matchData = !dataFiltro || dataAtendimento === dataFiltro;

        return matchPaciente && matchData;
    });

    atendimentosFiltrados.forEach(atendimento => {
        const paciente = pacientes.find(p => p.id === atendimento.pacienteId);
        const medico = medicos.find(m => m.id === atendimento.medicoId);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${paciente ? paciente.nome : 'N/A'}</td>
            <td>${formatarData(atendimento.data)}</td>
            <td>${atendimento.descricao}</td>
            <td>${medico ? medico.nome : 'N/A'}</td>
        `;
        tbody.appendChild(tr);
    });
}