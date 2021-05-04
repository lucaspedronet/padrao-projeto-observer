"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function calculaIdade(data) {
  var dataAtual = new Date();
  var dataNasc = new Date(data);
  var anoAtual = dataAtual.getFullYear();
  var diaNasc = dataNasc.getDate();
  var mesNasc = dataNasc.getMonth();
  var anoNasc = dataNasc.getFullYear();
  var idade = anoAtual - anoNasc;
  var mesAtual = dataAtual.getMonth(); //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  

  if (mesAtual < mesNasc) {
    idade--;
  } else {
    //Se estiver no mes do nascimento, verificar o dia
    if (mesAtual == mesNasc) {
      if (dataAtual.getDate() <= diaNasc) {
        //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
        idade--;
      }
    }
  }

  return idade;
}

;

var Subject = /*#__PURE__*/function () {
  function Subject() {
    _classCallCheck(this, Subject);

    this.alunos = [];
    this.lista = [];
  }

  _createClass(Subject, [{
    key: "subscribe",
    value: function subscribe(event) {
      this.lista.push(event);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(event) {
      this.lista.slice(this.lista.indexOf(event), 1);
    }
  }, {
    key: "adicionarAluno",
    value: function adicionarAluno(res) {
      this.alunos.push(res);
      this.notify();
    }
  }, {
    key: "notify",
    value: function notify() {
      var _this = this;

      this.lista.forEach(function (element) {
        element.update(_this.alunos);
      });
    }
  }]);

  return Subject;
}();

var AlunosObs = /*#__PURE__*/function () {
  function AlunosObs(nome) {
    _classCallCheck(this, AlunosObs);

    this.nome = nome;
  }

  _createClass(AlunosObs, [{
    key: "update",
    value: function update(dados) {
      var tabela = '';

      var _iterator = _createForOfIteratorHelper(dados),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var i = _step.value;
          tabela += "\n            <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\n                <div>\n                <h6 class=\"my-0 text-truncate\" style=\"width: 190px;\">Nome: " + i.name + "</h6>\n                <small class=\"text-muted\">" + i.email + "</small>\n                </div>\n                <div >\n                    <span class=\"text-muted\">Idade</span><br>\n                    <span class=\"text-muted text-center\">" + calculaIdade(i.date) + "</span>\n                </div>\n            </li>\n            ";
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      document.getElementById('lista-alunos').innerHTML = tabela;
      document.getElementById("cont-aluno").innerHTML = dados.length;
    }
  }]);

  return AlunosObs;
}();

var obs = new Subject();
var aluno = new AlunosObs();
obs.subscribe(aluno);

function salvar(res) {
  var name = res.fullname.value;
  var email = res.email.value;
  var date = res.date.value;
  var aluno = {
    name: name,
    email: email,
    date: date
  };
  console.log(aluno);
  obs.adicionarAluno(aluno);
  return false;
}

;
