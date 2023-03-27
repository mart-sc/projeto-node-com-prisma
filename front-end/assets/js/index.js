let nomeForm, senhaForm, opForm, form;
const FRONT = 'http://localhost:5500/front-end/';
const API = 'http://localhost:8081/api/usuarios';

window.onload = function (e) {
    nomeForm = document.querySelector('#iNome');
    senhaForm = document.querySelector('#iEmail');

    form = document.querySelector('#form');
    opForm = document.querySelector('#op');

    listarUsuarios();
};

function criarTabela(usuarios) {
    const corpoTabela = document.querySelector('#usuarios');
    corpoTabela.innerHTML = '';

    if (usuarios) {
        const linhas = usuarios.map(usuario => {
            const tdId = document.createElement('td');
            tdId.innerHTML = usuario.id;

            const tdNome = document.createElement('td');
            tdNome.innerHTML = usuario.nome;

            const tdEmail = document.createElement('td');
            tdEmail.innerHTML = usuario.email;

            const acaoAlterar = document.createElement('a');
            acaoAlterar.innerHTML = 'Alterar';
            acaoAlterar.setAttribute('href', FRONT + 'alterar_usuario.html?id=' + usuario.id);
            acaoAlterar.classList.add('btn', 'btn-primary', 'me-2');
            acaoAlterar.innerHTML += ' <i class="fa-regular fa-pen-to-square"></i>';

            const acaoExcluir = document.createElement('a');
            acaoExcluir.innerHTML = 'Excluir';
            acaoExcluir.classList.add('btn', 'btn-danger');
            acaoExcluir.innerHTML += ' <i class="fa-solid fa-trash"></i>';

            acaoExcluir.addEventListener('click', function (event) {
                if (confirm('Tem certeza que deseja excluir?')) {
                    axios.delete(API + '/' + usuario.id, {})
                        .then(res => {
                            alert(res.data.mensagem);
                            listarUsuarios();
                        });
                }
            }, false);

            const tdAcoes = document.createElement('td');
            tdAcoes.appendChild(acaoAlterar);
            tdAcoes.appendChild(acaoExcluir);
            

            const tr = document.createElement('tr');
            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdEmail);
            tr.appendChild(tdAcoes);

            return tr;
        });

        linhas.forEach(Linha => corpoTabela.appendChild(Linha));
    }
}

async function listarUsuarios() {
    const res = await axios.get(API, {});

    console.log(res);
    criarTabela(res.data.usuarios);
}