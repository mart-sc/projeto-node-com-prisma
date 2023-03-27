let nomeForm, senhaForm;
const URL = 'http://localhost:8081/api/usuarios/';

window.onload = function (e) {
    nomeForm = document.querySelector('#iNome');
    emailForm = document.querySelector('#iEmail');
};

async function incluirUsuario() {
    const nome = nomeForm.value;
    const email = emailForm.value;

    if (nomeForm.value == '' || emailForm.value == '') {
       alert("Todos os campos precisam ser preenchidos!");
    } else {
        axios.post(URL, { nome, email })
            .then(res => {
                alert(res.data.mensagem);
                console.log(res.data.usuario);
                setTimeout(() => window.location.href = '/front-end', 100);
            })
            .catch(res => {
                alert(res.response.data.error);
                console.log(res.response.data);
            });
    }
}