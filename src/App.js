interface IAluno {
  name: string;
  email: String;
  age: number;
}

class Aluno {
  constructor() {
    this.observers = [];

  }

  subscribe(f) {
    this.observers.push(f);

  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const number = document.querySelector('#number');

const salvar = document.querySelector('#salvar');

const aluno1: IAluno = {
  name,
  email,
  number,
};

console.log(aluno1)


const subscribeP1 = document.querySelector('.js-subscribe-p1');

const unsubscribeP1 = document.querySelector('.js-unsubscribe-p1');

const updateP1 = text => aluno1.textContent = text;

const headingsObserver = new Aluno();

headingsObserver.subscribe(updateP1);

subscribeP1.addEventListener('click', () => headingsObserver.subscribe(updateP1));
unsubscribeP1.addEventListener('click', () => headingsObserver.unsubscribe(updateP1));

// deve modificar para o botão salvar
input.addEventListener('keyup', e => {
  headingsObserver.notify(e.target.value);
});
