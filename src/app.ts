
interface IForm {
    fullname: value;
    email: value;
    date: value;
    reset(): void;
}

interface IStudentSubject {
    subscribe(event: StudentObserve | StatisticObserve): void;
}

type value = { value: string; }

type studentSubject = { value: string; }

function calculateAge(res: Date){ 
   let currentDate = new Date();
   let birthDate = new Date(res);
   let currentYear = currentDate.getFullYear();
   
   let birthDay = birthDate.getDate();
   let birthMonth = birthDate.getMonth();
   let birthYear = birthDate.getFullYear();
   let age = currentYear - birthYear;
   let currentMonth = currentDate.getMonth();

   //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
   if(currentMonth < birthMonth){
       age--; 
   } else {
       //Se estiver no mes do nascimento, verificar o dia
       if(currentMonth == birthMonth){ 
           if(currentDate.getDate() <= birthDay ){ 
               //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
               age--; 
           }
       }
   } 
   return age; 
}


class StudentSubject {
    public students: [];
    
    public subscribers: Array<StudentObserve | StatisticObserve>[];

    constructor()
    {
        this.students = []
        this.subscribers = [];
    }
   
    public subscribe(event): void
    {
        this.subscribers.push(event)
    }
    
    public unsubscribe(event)
    {
        this.subscribers.splice(this.subscribers.indexOf(event),1)
    }
   
    public addStudent(res)
    {
        console.log(res)
        this.students.unshift(res)
        this.notify()
    }

    private notify() {
        this.subscribers.forEach(element => {
            element.update(this.students)
        });
    }
}

class StudentObserve extends StudentSubject  {
    public name: string;

   constructor(nome: string ) {
       super();
       this.name = nome
   }
   
   update(dados) {
       let tabela = ''
       for (var i of dados) {
           tabela += `
           <li class="list-group-item d-flex justify-content-between lh-condensed">
               <div>
               <h6 class="my-0 text-truncate" style="width: 190px;">Nome: `+ i.name +`</h6>
               <small class="text-muted">`+ i.email+`</small>
               </div>
               <div class="text-center">
                   <span class="text-muted text-center">Idade: `+ calculateAge(i.date) +`</span>
               </div>
           </li>
           `
       }

       document.getElementById('lista-alunos').innerHTML = tabela
       document.getElementById("cont-aluno").innerHTML = dados.length
   }
}

class StatisticObserve {
    public name: string;

   constructor(name: string)
   {
       this.name = name;
   }

   youngerStudent(res)
   {
       let maisNovo = {}
       let ageN = 999
       res.forEach(element => {
           const age = calculateAge(element.date)
           if(age < ageN){
               ageN = age
               maisNovo = element
           }
       })
       return maisNovo
   }

   olderStudent(res)
   {
       let maisVelho = {}
       let ageN = 0
       res.forEach(element => {
           const age = calculateAge(element.date)
           if(age > ageN){
               ageN = age
               maisVelho = element
           }
       })
       return maisVelho
   }
   
   median(res){
       let media = 0;
       res.forEach(element =>{
           media+=calculateAge(element.date)
       })
       return Math.round(media/res.length)
   }
   update(res){
       let media = this.median(res)
       let maisVelho = this.olderStudent(res)
       let maisNovo = this.youngerStudent(res)
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
       document.getElementById("maisVelho").innerHTML = calculateAge(maisVelho.date);
       document.getElementById("maisNovo").innerHTML = calculateAge(maisNovo.date)
       document.getElementById("maisRecente").innerHTML = HTMLrecente;
       document.getElementById("maisAntigo").innerHTML = HTMLantigo;
   }
}


let observe = new StudentSubject();

let student = new StudentObserve("students");
let statist = new StatisticObserve("statistic")


observe.subscribe(student);
observe.subscribe(statist);

function register(forms: IForm) {
   const name = forms.fullname.value;
   const email = forms.email.value;
   const date = forms.date.value;
   observe.addStudent({name, email, date})

   forms.reset()
   return false;
};
