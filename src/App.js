

export default class Aluno {
  constructor() {
    this.observers = [];
  }
  
  subscribe(f) 
  {
    this.observers.push(f);
  }

  unsubscribe(f)
  {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }

  
}

const name = document.getElementById("#name");
const email = document.getElementById("#email");
const age = document.getElementById("#age");

const salve = document.getElementById("#salve");