// Seleciona o elemento que irá exibir os professores
const listaProfessores = document.getElementById('lista-professores');

// Faz uma requisição GET para a API 
// 54.201.86.131
fetch('http://localhost:8080/api/professores')
  .then(response => response.json())
  .then(data => {
    // Para cada professor retornado pela API, cria um elemento HTML para exibi-lo
    data.forEach(professor => {
      const professorHtml = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${professor.nome}</h5>
            <p class="card-text">
              Matrícula: ${professor.matricula}<br>
              Disciplina: ${professor.disciplina}
            </p>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary" onclick="editarProfessor(${professor.id})">Editar</button>
              <button type="button" class="btn btn-danger" onclick="removerProfessor(${professor.id})">Remover</button>
            </div>
          </div>
        </div>
      `;
      // Adiciona o elemento HTML criado à lista de professores
      listaProfessores.innerHTML += professorHtml;
    });
  })
  .catch(error => console.error(error));

// Função para remover um professor
function removerProfessor(id) {
  fetch(`http://localhost:8080/api/professores/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    // Recarrega a página para atualizar a lista de professores
    location.reload();
  })
  .catch(error => console.error(error));
}

// Função para editar um professor
function editarProfessor(id) {
  // Faz uma requisição GET para obter os dados do professor a ser editado
  fetch(`http://localhost:8080/api/professores/${id}`)
    .then(response => response.json())
    .then(professor => {
      // Preenche o formulário de edição com os dados do professor
      document.getElementById('editar-id').value = professor.id;
      document.getElementById('editar-nome').value = professor.nome;
      document.getElementById('editar-matricula').value = professor.matricula;
      document.getElementById('editar-disciplina').value = professor.disciplina;
      // Exibe o modal de edição
      $('#modal-editar').modal('show');
    })
    .catch(error => console.error(error));
}

// Função para atualizar um professor
function atualizarProfessor() {
  const nome = document.getElementById('editar-nome').value;
  const matricula = document.getElementById('editar-matricula').value;
  const disciplina = document.getElementById('editar-disciplina').value;
  const atualizacao = {
    nome,
    matricula,
    disciplina
  };
  // Faz uma requisição PUT para atualizar os dados do professor
  fetch(`http://localhost:8080/api/professores/${matricula}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(atualizacao)
  })
  .then(() => {
    // Recarrega a página para atualizar a lista de professores
    location.reload();
  })
  .catch(error => console.error(error));
}

 function cadastrarProfessor(professor) {
  const url = "http://localhost:8080/api/professores";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(professor)
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log("Professor cadastrado com sucesso:", data);
      return data;
    })
    .catch(error => {
      console.error("Erro ao cadastrar professor:", error);
      throw error;
    });
}

const formCadastro = document.querySelector("#form-cadastro");
formCadastro.addEventListener("submit", event => {
  event.preventDefault();
  const nome = document.querySelector("#nome").value;
  const matricula = document.querySelector("#matricula").value;
  const disciplina = document.querySelector("#disciplina").value;
  cadastrarAluno({ nome, matricula, disciplina });
});

