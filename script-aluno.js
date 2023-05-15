// Seleciona o elemento que irá exibir os alunos
const listaAlunos = document.getElementById('lista-alunos');

// Faz uma requisição GET para a API
// 54.201.86.131
fetch('http://localhost:8080/api/alunos')
  .then(response => response.json())
  .then(data => {
    // Para cada aluno retornado pela API, cria um elemento HTML para exibi-lo
    data.forEach(aluno => {
      const alunoHtml = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${aluno.nome}</h5>
            <p class="card-text">
              Matrícula: ${aluno.matricula}<br>
            </p>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary" onclick="editarAluno(${aluno.id})">Editar</button>
              <button type="button" class="btn btn-danger" onclick="removerAluno(${aluno.id})">Remover</button>
            </div>
          </div>
        </div>
      `;
      // Adiciona o elemento HTML criado à lista de alunos
      listaAlunos.innerHTML += alunoHtml;
    });
  })
  .catch(error => console.error(error));

// Função para remover um aluno
function removerAluno(id) {
  fetch(`http://localhost:8080/api/alunos/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    // Recarrega a página para atualizar a lista de alunos
    location.reload();
  })
  .catch(error => console.error(error));
}

// Função para editar um aluno
function editarAluno(id) {
  // Faz uma requisição GET para obter os dados do aluno a ser editado
  fetch(`http://localhost:8080/api/alunos/${id}`)
    .then(response => response.json())
    .then(aluno => {
      // Preenche o formulário de edição com os dados do aluno
      document.getElementById('editar-id').value = aluno.id;
      document.getElementById('editar-nome').value = aluno.nome;
      document.getElementById('editar-matricula').value = aluno.matricula;
      // Exibe o modal de edição
      $('#modal-editar').modal('show');
    })
    .catch(error => console.error(error));
}

// Função para atualizar um aluno
function atualizarAluno() {
  const nome = document.getElementById('editar-nome').value;
  const matricula = document.getElementById('editar-matricula').value;
  const atualizacao = {
    nome,
    matricula
  };
  // Faz uma requisição PUT para atualizar os dados do aluno
  fetch(`http://localhost:8080/api/alunos/${matricula}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(atualizacao)
  })
  .then(() => {
    // Recarrega a página para atualizar a lista de alunos
    location.reload();
  })
  .catch(error => console.error(error));
}

 function cadastrarAluno(aluno) {
  const url = "http://localhost:8080/api/alunos";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(aluno)
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log("Aluno cadastrado com sucesso:", data);
      return data;
    })
    .catch(error => {
      console.error("Erro ao cadastrar aluno:", error);
      throw error;
    });
}

const formCadastro = document.querySelector("#form-cadastro");
formCadastro.addEventListener("submit", event => {
  event.preventDefault();
  const nome = document.querySelector("#nome").value;
  const matricula = document.querySelector("#matricula").value;
  cadastrarAluno({ nome, matricula });
});
