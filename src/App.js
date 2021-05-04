function calculaIdade(data) { 
    let dataAtual = new Date();
    let dataNasc = new Date(data);
    let anoAtual = dataAtual.getFullYear();
    
    let diaNasc = dataNasc.getDate();
    let mesNasc = dataNasc.getMonth();
    let anoNasc = dataNasc.getFullYear();
    let idade = anoAtual - anoNasc;
    let mesAtual = dataAtual.getMonth(); 
    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
    if(mesAtual < mesNasc){
        idade--; 
    } else {
        //Se estiver no mes do nascimento, verificar o dia
        if(mesAtual == mesNasc){ 
            if(dataAtual.getDate() <= diaNasc ){ 
                //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
                idade--; 
            }
        }
    } 
    return idade; 
};

class Subject {
    constructor(){
        this.alunos = []
        this.lista = []
    }
    subscribe(event){
        this.lista.push(event)
    }
    unsubscribe(event){
        this.lista.slice(this.lista.indexOf(event),1)
    }
    adicionarAluno(res){
        this.alunos.push(res)
        this.notify()
    }
    notify() {
        this.lista.forEach(element => {
            element.update(this.alunos)
        });
    }
}

class AlunosObs {
    constructor(nome) {
        this.nome = nome
    }
    update(dados){
        let tabela = ''
        for (var i of dados){
            tabela += `
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                <h6 class="my-0 text-truncate" style="width: 190px;">Nome: `+ i.name +`</h6>
                <small class="text-muted">`+ i.email+`</small>
                </div>
                <div >
                    <span class="text-muted">Idade</span><br>
                    <span class="text-muted text-center">`+ calculaIdade(i.date) +`</span>
                </div>
            </li>
            `
        }

        document.getElementById('lista-alunos').innerHTML = tabela
        document.getElementById("cont-aluno").innerHTML = dados.length
    }
}


let obs = new Subject();

let aluno = new AlunosObs();

obs.subscribe(aluno)


function salvar(res) {
    const name = res.fullname.value;
    const email = res.email.value;
    const date = res.date.value;
    const aluno = {name, email, date}
    console.log(aluno)
    obs.adicionarAluno(aluno)
    return false;
};