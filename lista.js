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

    //cria elemento e atribui a lista
    let li = document.createElement('li');
    let mensagem = document.createElement('span'); 
    mensagem.textContent = `${conteudo}`;//modifica o texto

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '10px'; 

    if (prioridade === 'alta') {
        li.classList.add('pAlta'); //da um id para o elemento
    }
    if (prioridade === 'media') { //adiciona a checkbox como primeiro elemento da li
        li.classList.add('pMedia');
    }
    if (prioridade === 'baixa') {
        li.classList.add('pBaixa');
    }

    // Adiciona o texto a tarefa
    ultima_tarefa_adicionada = li; // pega o ultimo item adicionado
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

    // Adiciona o checkbox e os botoes concluir e lixeira ao item da lista
    li.prepend(checkbox); //adiciona a checkbox como primeiro elemento da li
    let lixeira = document.createElement('button')
    lixeira.classList.add('lixeira');

    lixeira.addEventListener("click", function() {
        li.remove(); // remove a tarefa selecionada
        alert("Tarefa removida  com sucesso")

    })

    let concluir = document.createElement('button')
    concluir.classList.add('concluir');

    concluir.addEventListener("click", function() {
        
        li.remove(); //tambem remove a tarefa selecionada
        alert("Tarefa concluída com sucesso")
    })
    


   

checkbox.addEventListener('change', function() {
        
        lixeira.style.display = 'none';
        concluir.style.display = 'none';


        if (checkbox.checked) {
            li.style.textDecoration = 'bold'; 
            li.style.backgroundColor = 'blue'; 
            mensagem.textContent = `${conteudo} - TAREFA SELECIONADA\n`; // altera o texto
            lixeira.style.display = 'inline'
            concluir.style.display = 'inline'


        } else { 
            // li.style.textDecoration = 'none'; 
            li.style.backgroundColor = ''; 
            mensagem.textContent = `${conteudo}`; // Restaura o texto quando eu desmarco a checkbox
            lixeira.style.display = 'none'
            concluir.style.display = 'none'

            lixeira.remove();

        }
        li.appendChild(lixeira);
        li.appendChild(concluir);


    });


    li.appendChild(checkbox);
    li.appendChild(mensagem);
    li.appendChild(editar_tarefa)
    // adiciona o item a lista
    lista_tarefas.appendChild(li);

    // limpa o campo de entrada assim que a tarefa é adicioonada
    tarefa.value = '';
});

botao_pesq.addEventListener('click', function(e) {
    e.preventDefault();
    let pesquisas = document.getElementById('input-pesquisas');
    let conteudo_pesquisa = pesquisas.value.trim().toLowerCase(); // case-sensitive
    let tarefas = document.querySelectorAll('#lista-tarefas li'); // transforma todas as atividades em uma lista - nodelist

    tarefas.forEach(function(tarefa) {
        if (conteudo_pesquisa === '' || tarefa.textContent.toLowerCase().includes(conteudo_pesquisa)) {
            tarefa.style.display = ''; // Mostra a tarefa filtrada ou todas se o campo estiver vazio
        } else {
            tarefa.style.display = 'none'; // nao aparece nenhuma tarefa se não conter o filtro
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