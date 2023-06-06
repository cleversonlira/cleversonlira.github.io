// Função para cadastrar uma nova atividade
function cadastrarAtividade(nome, nota, alunoId) {
    const data = { nome, nota, aluno: { id: alunoId } };
    fetch('http://35.163.253.248:8080/api/atividades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(atividade => {
      console.log(`Atividade ${atividade.id} cadastrada com sucesso!`);
      listarAtividades();
    })
    .catch(error => {
      console.error(`Erro ao cadastrar atividade: ${error}`);
    });
  }
  
  // Função para listar todas as atividades cadastradas
  function listarAtividades() {
    fetch('http://35.163.253.248:8080/api/atividades')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(atividades => {
      const listaAtividades = document.getElementById('lista-atividades');
      listaAtividades.innerHTML = '';
      atividades.forEach(atividade => {
        const itemLista = document.createElement('li');
        itemLista.innerText = `${atividade.nome} - Nota: ${atividade.nota} - Aluno: ${atividade.aluno.nome}`;
        listaAtividades.appendChild(itemLista);
      });
    })
    .catch(error => {
      console.error(`Erro ao listar atividades: ${error}`);
    });
  }
  
  // Função para obter o valor selecionado no campo de aluno
  function obterAlunoSelecionado() {
    const selectAluno = document.getElementById('aluno');
    return selectAluno.value;
  }
  
  // Event listener para o formulário de cadastro
  const formCadastro = document.getElementById('form-cadastro');
  formCadastro.addEventListener('submit', event => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const nota = document.getElementById('nota').value;
    const alunoId = obterAlunoSelecionado();
    cadastrarAtividade(nome, nota, alunoId);
  });

  function carregarAlunos() {
    fetch('http://35.163.253.248:8080/api/alunos')
      .then(response => response.json())
      .then(alunos => {
        const dropdown = document.querySelector('#aluno');
        alunos.forEach(aluno => {
          const option = document.createElement('option');
          option.value = aluno.id;
          option.textContent = aluno.nome;
          dropdown.appendChild(option);
        });
      });
  }
  carregarAlunos();
  
  // Listar as atividades ao carregar a página
  listarAtividades();

  function carregarAtividades() {
    fetch('http://35.163.253.248:8080/api/atividades')
      .then(response => response.json())
      .then(atividades => {
        const lista = document.querySelector('#lista-atividades');
        lista.innerHTML = '';
        let i = 1;
        atividades.forEach(atividade => {
          const row = lista.insertRow();
          row.innerHTML = `
            <td class="d-none">${atividade.id}</td>
            <td>${atividade.nome}</td>
            <td>${atividade.nota}</td>
            <td>${atividade.aluno.nome}</td>
            <td>
              <button id="btn-excluir${i++}" class="btn-excluir btn btn-danger">
                <i class="bi bi-trash-fill"></i> Excluir
              </button>
            </td>
          `;
        });
      })
      .then(() => {
        // Adiciona o evento de exclusão a cada botão de exclusão
        botoesExclusao = document.querySelectorAll(".btn-excluir");
        botoesExclusao.forEach(botaoExcluir => {
          botaoExcluir.addEventListener("click", () => {
            // Obtém o ID da atividade a ser excluída
            const idAtividade = botaoExcluir.parentNode.parentNode.querySelector('.d-none').textContent;
            // Realiza a chamada fetch para excluir a atividade
            fetch(`http://35.163.253.248:8080/api/atividades/${idAtividade}`, {
              method: 'DELETE'
            })
              .then(response => {
                if (response.ok) {
                  console.log('Atividade excluída com sucesso!');
                  location.reload();
                } else {
                  console.error('Erro ao excluir a atividade.');
                }
              })
              .catch(error => {
                console.error('Erro na requisição:', error);
              });
          });
        });
      });
  }
  carregarAtividades();