class PlanParser {
    constructor(plan) {
        this._plan = plan;
    }
    getSize() {
        return this._plan.length;
    }
    parsePlan() {
        //removeBreakLines
        this._plan = this._plan.replace(/(\r\n|\n|\r|"")/gm, "");
        //removeSpaces
        this._plan = this._plan.replace(/\s/g, "");
        //removeWrappers
        this._plan = this._plan.substring(1, this.getSize() - 1);
        //splitByMachines
        return this.splitByMachines();
    }
    splitByMachines() {
        let plan = this._plan.split(/\[*\],/);
        let machines = [];
        plan.forEach(element => {
            let m = new Maquina();
            let splitted = element.split('*');
            m.nome = splitted[0];
            m.tarefas = !!splitted[1] ? this.splitTasks(splitted[1].substring(1,splitted[1].length)) : [];
            machines.push(m);
        })
        return machines;
    }
    splitTasks(task) {
        let tasks = task.replace(/(\(|\))/g, "").split(',');
        let result = [];
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].match(/t[0-9]*/) && tasks[i + 2] == 'setup') {
                let t = new Tarefa();
                t.inicio = tasks[i].substring(1, tasks[i].length);
                t.fim = tasks[i + 1];
                t.tipo = tasks[i + 2]
                result.push(t);
            }
            if (tasks[i].match(/t[0-9]*/) && tasks[i + 2] == 'exec') {
                let t = new Tarefa();
                t.inicio = tasks[i].substring(1, tasks[i].length);
                t.fim = tasks[i + 1];
                t.tipo = tasks[i + 2];
                t.tipoOperacao = tasks[i + 3].replace(/infop/, "");
                t.ferramenta = tasks[i + 4];
                t.produto = tasks[i + 5];
                t.repeticoes = tasks[i + 6];
                t.encomenda = tasks[i + 7];
                result.push(t);
            }
        }
        return result;
    }
}
class Maquina {
    nome;
    tarefas;
}
class Tarefa {
    inicio;
    fim;
    tipo;
    produto;
    repeticoes;
    encomenda;
    tipoOperacao;
    ferramenta;
}