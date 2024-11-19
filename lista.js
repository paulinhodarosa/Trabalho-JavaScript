// Selecionando os elementos
frm = document.querySelector("form");
adicionar = document.getElementById("adicionar");
tarefas = document.getElementById("tarefas");
var lista = [];
var tarefaAtual = null; // Variável para armazenar a tarefa atual que será atribuída a prioridade
var historico = []; // Histórico das ações para poder desfazer

// Função para atualizar a lista no HTML
function atualizarLista() {
    var listaHTML = document.getElementById("lista-tarefas");
    listaHTML.innerHTML = ''; // Limpar a lista antes de atualizar

    lista.forEach(function(tarefa, index) {
        var li = document.createElement("li");
        li.textContent = tarefa.nome;

        // Definir a cor da tarefa conforme a urgência
        if (tarefa.urgencia) {
            if (tarefa.urgencia === "Alta") {
                li.style.color = "red";
            } else if (tarefa.urgencia === "Média") {
                li.style.color = "orange";
            } else if (tarefa.urgencia === "Baixa") {
                li.style.color = "green";
            }
        }

        // Adicionar botões de ação (Selecionar, Editar, Excluir, Concluído)
        var btnContainer = document.createElement("div");
        
        // Botão de selecionar
        var selectBtn = document.createElement("button");
        selectBtn.textContent = "Selecionar";
        selectBtn.addEventListener("click", () => {
            tarefaAtual = tarefa;
            tarefas.value = tarefa.nome; // Preencher o campo de input com o nome da tarefa para edição
            exibirBotoesPrioridade(); // Mostrar os botões de prioridade
        });
        btnContainer.appendChild(selectBtn);

        // Botão de editar
        var editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => {
            tarefa.nome = prompt("Editando tarefa:", tarefa.nome) || tarefa.nome; // Usar prompt para edição
            atualizarLista(); // Atualizar a lista de tarefas
        });
        btnContainer.appendChild(editBtn);

        // Botão de excluir
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Excluir";
        deleteBtn.addEventListener("click", () => {
            // Salvar o estado antes de excluir para possível desfazer
            historico.push({ tipo: "excluir", tarefa: tarefa, index: index });
            lista.splice(index, 1); // Remover a tarefa do array
            atualizarLista(); // Atualizar a lista após exclusão
        });
        btnContainer.appendChild(deleteBtn);

        // Botão de concluir
        var doneBtn = document.createElement("button");
        doneBtn.textContent = tarefa.concluida ? "Reverter Conclusão" : "Concluir";
        doneBtn.addEventListener("click", () => {
            tarefa.concluida = !tarefa.concluida; // Alterar o status de conclusão
            atualizarLista(); // Atualizar a lista de tarefas
        });
        btnContainer.appendChild(doneBtn);

        // Adicionar os botões de ação ao li
        li.appendChild(btnContainer);

        // Exibir a urgência se já estiver definida
        if (tarefa.urgencia) {
            var urgenciaDisplay = document.createElement("span");
            urgenciaDisplay.textContent = ` - Urgência: ${tarefa.urgencia}`;
            li.appendChild(urgenciaDisplay);
        }

        // Marcar a tarefa como concluída, se aplicável
        if (tarefa.concluida) {
            li.style.textDecoration = "line-through"; // Riscar o texto se a tarefa estiver concluída
            li.style.color = "gray"; // Alterar cor para cinza
        }

        // Adicionar o item de tarefa à lista
        listaHTML.appendChild(li);
    });
}

// Função para exibir os botões de prioridade fora da lista
function exibirBotoesPrioridade() {
    var prioridadeContainer = document.getElementById("prioridade-container");
    prioridadeContainer.innerHTML = ''; // Limpar os botões de prioridade anteriores

    if (tarefaAtual) {
        var prioridadeBotoes = ["Alta", "Média", "Baixa"];
        
        // Criar os botões de prioridade
        prioridadeBotoes.forEach(function(urgencia) {
            var btn = document.createElement("button");
            btn.textContent = urgencia;
            btn.classList.add("btn-urgencia", urgencia.toLowerCase());
            
            // Mudar a cor do botão conforme a urgência
            if (urgencia === "Alta") {
                btn.style.backgroundColor = "red";
            } else if (urgencia === "Média") {
                btn.style.backgroundColor = "orange";
            } else if (urgencia === "Baixa") {
                btn.style.backgroundColor = "green";
            }

            // Adicionar a prioridade ao clicar no botão
            btn.addEventListener("click", () => {
                tarefaAtual.urgencia = urgencia;
                atualizarLista(); // Atualizar a lista de tarefas
                exibirBotoesPrioridade(); // Atualizar os botões (caso a prioridade mude)
            });
            prioridadeContainer.appendChild(btn);
        });
    }
}

// Adicionando evento de clique ao botão "Adicionar"
adicionar.addEventListener("click", () => {
    if (tarefas.value.trim() !== "") { // Evitar adicionar tarefas vazias
        var novaTarefa = {
            nome: tarefas.value,
            urgencia: null, // Inicialmente sem urgência
            concluida: false // Inicialmente não concluída
        };
        lista.push(novaTarefa);
        tarefaAtual = novaTarefa; // A tarefa que está sendo editada atualmente
        tarefas.value = ''; // Limpar o campo de input após adicionar
        console.log(lista);
        atualizarLista(); // Atualizar a lista no HTML
        exibirBotoesPrioridade(); // Exibir os botões de prioridade para a nova tarefa
    }
});

// Função para desfazer a última ação (Excluir ou Concluir)
document.getElementById("desfazer").addEventListener("click", () => {
    if (historico.length > 0) {
        var ultimaAcao = historico.pop(); // Pega a última ação do histórico
        if (ultimaAcao.tipo === "excluir") {
            lista.splice(ultimaAcao.index, 0, ultimaAcao.tarefa); // Restaura a tarefa excluída
        } else if (ultimaAcao.tipo === "concluir") {
            ultimaAcao.tarefa.concluida = !ultimaAcao.tarefa.concluida; // Reverte a conclusão
        }
        atualizarLista(); // Atualizar a lista de tarefas após desfazer a ação
    }
});

// Inicializa a lista
atualizarLista();