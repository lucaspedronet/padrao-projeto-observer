function calculaIdade(res){ 
   let dataAtual = new Date();
   let dataNasc = new Date(res);
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
}
class AlunosSubject {
   constructor(){
       this.alunos = []
       this.lista = []
   }
   subscribe(event){
       this.lista.push(event)
   }
   unsubscribe(event){
       this.lista.splice(this.lista.indexOf(event),1)
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

class ViewAlunosObs {
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
               <div class="text-center">
                   <span class="text-muted text-center">Idade: `+ calculaIdade(i.date) +`</span>
               </div>
           </li>
           `
       }

       document.getElementById('lista-alunos').innerHTML = tabela
       document.getElementById("cont-aluno").innerHTML = dados.length
   }
}

class EstatisticaObs {
   constructor(nome){
       this.nome = nome;
   }
   getMaisNovo(res){
       let maisNovo = {}
       let idadeN = 999
       res.forEach(element => {
           const idade = calculaIdade(element.date)
           if(idade < idadeN){
               idadeN = idade
               maisNovo = element
           }
       })
       return maisNovo
   }
   getMaisVelho(res){
       let maisVelho = {}
       let idadeN = 0
       res.forEach(element => {
           const idade = calculaIdade(element.date)
           if(idade > idadeN){
               idadeN = idade
               maisVelho = element
           }
       })
       return maisVelho
   }
   getMedia(res){
       let media = 0;
       res.forEach(element =>{
           media+=calculaIdade(element.date)
       })
       return Math.round(media/res.length)
   }
   update(res){
       let media = this.getMedia(res)
       let maisVelho = this.getMaisVelho(res)
       let maisNovo = this.getMaisNovo(res)
       let recente = res[res.length-1]
       let antigo = res[0]

       let HTMLantigo = `<div class="text-muted" id="antigo">
           <p class="small mb-0 mt-2"><strong>Nome: <span class="font-italic">`+ antigo.name+`</span></strong></p>
           <p class="small mb-0 "> Email: <span class="font-italic">`+ antigo.email +`</span></p>
           <p class="small">Data Nascimento: <span class="font-italic">`+ antigo.date+`</span></p>
       </div>
       `;
       let HTMLrecente = `<div class="text-muted" id="recente">
           <p class="small mb-0 mt-2"><strong>Nome: <span class="font-italic">`+ recente.name+`</span></strong></p>
           <p class="small mb-0 "> Email: <span class="font-italic">`+ recente.email +`</span></p>
           <p class="small">Data Nascimento: <span class="font-italic">`+ recente.date+`</span></p>
       </div>
       `;




       document.getElementById("media").innerHTML = media+' <small class="text-muted m-0">Anos</small>';
       document.getElementById("maisVelho").innerHTML = calculaIdade(maisVelho.date);
       document.getElementById("maisNovo").innerHTML = calculaIdade(maisNovo.date)
       document.getElementById("maisRecente").innerHTML = HTMLrecente;
       document.getElementById("maisAntigo").innerHTML = HTMLantigo;
   }
}


let obs = new AlunosSubject();
let aluno = new ViewAlunosObs("Alunos");
let estatistica = new EstatisticaObs("Estatistica")


obs.subscribe(aluno);
obs.subscribe(estatistica);

function cadastrar(res) {
   const name = res.fullname.value;
   const email = res.email.value;
   const date = res.date.value;
   obs.adicionarAluno({name, email, date})

   res.reset()
   return false;
};