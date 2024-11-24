var botao_adc = document.getElementById('adicionar');
var botao_pesq = document.getElementById('pesquisar')
var botao_des = document.getElementById('desfazer');
let lista_tarefas = document.getElementById('lista-tarefas');


let ultima_tarefa_adicionada = null;

botao_adc.addEventListener('click', function(e) {
    e.preventDefault();
    let tarefa = document.getElementById('tarefas');
    let prioridade_definida = document.getElementById('prioridade');

    const conteudo = tarefa.value.trim();
    const prioridade = prioridade_definida.value;

    if (!conteudo) return;



    // Criar elementos e adicioná-los na lista
    let li = document.createElement('li');
    let mensagem = document.createElement('span'); // Criar um elemento separado para o texto
    mensagem.textContent = `${conteudo} - Prioridade ${prioridade.toUpperCase()}`;

    // Criar checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '10px'; // Margem para separar o checkbox

    // Adicionando classe com base na prioridade
    if (prioridade === 'alta') {
        li.classList.add('pAlta');
    }
    if (prioridade === 'media') {
        li.classList.add('pMedia');
    }
    if (prioridade === 'baixa') {
        li.classList.add('pBaixa');
    }

    // Adiciona o texto à tarefa
    ultima_tarefa_adicionada = li;
    li.appendChild(mensagem);

    let editar_tarefa = document.createElement('button')
    editar_tarefa.classList.add('editar_tarefa');
    editar_tarefa.classList.textContent = 'Editar'

    editar_tarefa.addEventListener("click", function() {
        alert(`A tarefa "${conteudo}" retornará ao campo de atribuição para ser editada!`)
        tarefa.value = conteudo
        prioridade_definida = prioridade;
        li.remove();
    })

    // Adiciona o checkbox e a lixeira ao item da lista
    li.prepend(checkbox);
    let lixeira = document.createElement('button')
    lixeira.classList.add('lixeira');

    lixeira.addEventListener("click", function() {
        li.remove();
    })

   

    checkbox.addEventListener('change', function() {
        
        lixeira.style.display = 'none';


        if (checkbox.checked) {
            li.style.textDecoration = 'line-through'; // Risca a tarefa
            li.style.backgroundColor = 'blue'; // Cor de fundo quando concluída
            mensagem.textContent = `${conteudo} - TAREFA CONCLUÍDA\n`; // Muda o texto
            lixeira.style.display = 'inline'

        } else { // quando a checkbox está desmarcada
            li.style.textDecoration = 'none'; // Remove o risco
            li.style.backgroundColor = ''; // Remove a cor de fundo
            mensagem.textContent = `${conteudo} - Prioridade ${prioridade.toUpperCase()}`; // Restaura o texto
            lixeira.style.display = 'none'
            lixeira.remove();

        }
        li.appendChild(lixeira);

    });


    li.appendChild(checkbox);
    li.appendChild(mensagem);
    li.appendChild(editar_tarefa)
    // Adiciona o item à lista
    lista_tarefas.appendChild(li);

    // Limpar o campo de entrada
    tarefa.value = '';
});

botao_pesq.addEventListener('click', function(e) {
    e.preventDefault();
    let pesquisas = document.getElementById('input-pesquisas');
    let conteudo_pesquisa = pesquisas.value.trim().toLowerCase(); // Texto digitado
    let tarefas = document.querySelectorAll('#lista-tarefas li'); // Seleciona todas as tarefas

    tarefas.forEach(function(tarefa) {
        if (conteudo_pesquisa === '' || tarefa.textContent.toLowerCase().includes(conteudo_pesquisa)) {
            tarefa.style.display = ''; // Mostra a tarefa se corresponder ou se o campo está vazio
        } else {
            tarefa.style.display = 'none'; // Esconde a tarefa se não corresponder
        }
    });
});

botao_des.addEventListener('click', function(e) {
    e.preventDefault();
    if (ultima_tarefa_adicionada) {
        lista_tarefas.removeChild(ultima_tarefa_adicionada);
        ultima_tarefa_adicionada = null;
    }
})