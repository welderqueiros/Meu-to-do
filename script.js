document.addEventListener("DOMContentLoaded", () => {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));

    if (tarefasSalvas) {
        tarefasSalvas.forEach((tarefa) => {
            tarefas.push(tarefa);
        });
        updateListaTarefa();
        updateStatusTarefa();
    }
});

let tarefas = [];

const saveTarefas = () => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

const addTarefa = () => {
    const tarefaInput = document.getElementById("tarefa-input");
    const textoTarefa = tarefaInput.value.trim();

    if (textoTarefa) {
        tarefas.push({ textoTarefa: textoTarefa, concluido: false });
        tarefaInput.value = "";
        updateListaTarefa();
        updateStatusTarefa();
        saveTarefas();
    }
};

const updateListaTarefa = () => {
    const listaTarefa = document.getElementById("lista-tarefas");
    listaTarefa.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const tarefaItem = document.createElement("li");

        tarefaItem.innerHTML = `
            <div class="tarefaItem">
                <div class="tarefa-conteudo ${tarefa.concluido ? "concluido" : ""}">
                    <input type="checkbox" class="checkbox" ${tarefa.concluido ? "checked" : ""} onChange="toggleTarefa(${index})" />
                    <p>${tarefa.textoTarefa}</p>
                </div>
                <div class="icones">
                    <img src="assets/edit.svg" onClick="editTarefa(${index})" alt="Editar"/>
                    <img src="assets/delete.svg" onClick="deleteTarefa(${index})" alt="Excluir"/>
                </div>
            </div>
        `;
        listaTarefa.appendChild(tarefaItem);
    });
};

const toggleTarefa = (index) => {
    tarefas[index].concluido = !tarefas[index].concluido;
    console.log(tarefas);
    updateListaTarefa();
    updateStatusTarefa();
    saveTarefas();
};

const updateStatusTarefa = () => {
    const tarefaCompleta = tarefas.filter((tarefa) => tarefa.concluido).length;
    const totalTarefas = tarefas.length;
    const progresso = (tarefaCompleta / totalTarefas) * 100;
    const barraProgresso = document.getElementById("progresso");

    barraProgresso.style.width = `${progresso}%`;

    document.getElementById("numeros").innerText = `${tarefaCompleta} / ${totalTarefas}`;

    if (tarefas.length && tarefaCompleta === totalTarefas) {
        confete();
    }
};

const deleteTarefa = (index) => {
    tarefas.splice(index, 1);
    updateListaTarefa();
    updateStatusTarefa();
    saveTarefas();
};

const editTarefa = (index) => {
    const tarefaInput = document.getElementById("tarefa-input");
    tarefaInput.value = tarefas[index].textoTarefa;

    tarefas.splice(index, 1);
    updateListaTarefa();
    updateStatusTarefa();
    saveTarefas();
}

document.getElementById("nova-tarefa").addEventListener("click", function (e) {
    e.preventDefault();
    addTarefa();
});


const confete = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.1 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

