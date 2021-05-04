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
          <tr class="tr-line">
              <td>`+i.name+`</td>
          </tr>
          `
      }

      document.getElementById('list').innerHTML = tabela
  }
}


let obs = new Subject();

let aluno = new AlunosObs();

obs.subscribe(aluno)


function salvar(res) {
  const name = res.name.value;
  const email = res.email.value;
  const date = res.date.value;
  const aluno = {name, email, date}
  console.log(aluno)
  obs.adicionarAluno(aluno)
  return false;
};