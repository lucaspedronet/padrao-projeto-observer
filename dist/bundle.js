"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calculateAge(res) {
  var currentDate = new Date();
  var birthDate = new Date(res);
  var currentYear = currentDate.getFullYear();
  var birthDay = birthDate.getDate();
  var birthMonth = birthDate.getMonth();
  var birthYear = birthDate.getFullYear();
  var age = currentYear - birthYear;
  var currentMonth = currentDate.getMonth(); //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  

  if (currentMonth < birthMonth) {
    age--;
  } else {
    //Se estiver no mes do nascimento, verificar o dia
    if (currentMonth == birthMonth) {
      if (currentDate.getDate() <= birthDay) {
        //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
        age--;
      }
    }
  }

  return age;
}

var StudentSubject = /*#__PURE__*/function () {
  function StudentSubject() {
    _classCallCheck(this, StudentSubject);

    _defineProperty(this, "students", void 0);

    _defineProperty(this, "subscribers", void 0);

    this.students = [];
    this.subscribers = [];
  }

  _createClass(StudentSubject, [{
    key: "subscribe",
    value: function subscribe(event) {
      this.subscribers.push(event);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(event) {
      this.subscribers.splice(this.subscribers.indexOf(event), 1);
    }
  }, {
    key: "addStudent",
    value: function addStudent(res) {
      console.log(res);
      this.students.push(res);
      this.notify();
    }
  }, {
    key: "notify",
    value: function notify() {
      var _this = this;

      this.subscribers.forEach(function (element) {
        element.update(_this.students);
      });
    }
  }]);

  return StudentSubject;
}();

var StudentObserve = /*#__PURE__*/function (_StudentSubject) {
  _inherits(StudentObserve, _StudentSubject);

  var _super = _createSuper(StudentObserve);

  function StudentObserve(nome) {
    var _this2;

    _classCallCheck(this, StudentObserve);

    _this2 = _super.call(this);

    _defineProperty(_assertThisInitialized(_this2), "name", void 0);

    _this2.name = nome;
    return _this2;
  }

  _createClass(StudentObserve, [{
    key: "update",
    value: function update(dados) {
      var tabela = '';

      var _iterator = _createForOfIteratorHelper(dados),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var i = _step.value;
          tabela += "\n           <li class=\"list-group-item d-flex justify-content-between lh-condensed\">\n               <div>\n               <h6 class=\"my-0 text-truncate\" style=\"width: 190px;\">Nome: " + i.name + "</h6>\n               <small class=\"text-muted\">" + i.email + "</small>\n               </div>\n               <div class=\"text-center\">\n                   <span class=\"text-muted text-center\">age: " + calculateAge(i.date) + "</span>\n               </div>\n           </li>\n           ";
        } //    const subscribersStudents = document.getElementById('subscribers-students');
        //    const countStudent = document.getElementById("cont-aluno");
        //    console.log(subscribersStudents)
        //    console.log(countStudent)
        //    subscribersStudents.innerHTML = tabela;
        //    countStudent.innerHTML = dados.length;
        //    subscribersStudents !== null ? subscribersStudents.innerHTML = tabela : subscribersStudents;
        //    countStudent !== null ? countStudent.innerHTML = dados.length : countStudent;

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      document.getElementById('lista-alunos').innerHTML = tabela;
      document.getElementById("cont-aluno").innerHTML = dados.length;
    }
  }]);

  return StudentObserve;
}(StudentSubject);

var StatisticObserve = /*#__PURE__*/function () {
  function StatisticObserve(name) {
    _classCallCheck(this, StatisticObserve);

    _defineProperty(this, "name", void 0);

    this.name = name;
  }

  _createClass(StatisticObserve, [{
    key: "youngerStudent",
    value: function youngerStudent(res) {
      var maisNovo = {};
      var ageN = 999;
      res.forEach(function (element) {
        var age = calculateAge(element.date);

        if (age < ageN) {
          ageN = age;
          maisNovo = element;
        }
      });
      return maisNovo;
    }
  }, {
    key: "olderStudent",
    value: function olderStudent(res) {
      var maisVelho = {};
      var ageN = 0;
      res.forEach(function (element) {
        var age = calculateAge(element.date);

        if (age > ageN) {
          ageN = age;
          maisVelho = element;
        }
      });
      return maisVelho;
    }
  }, {
    key: "median",
    value: function median(res) {
      var media = 0;
      res.forEach(function (element) {
        media += calculateAge(element.date);
      });
      return Math.round(media / res.length);
    }
  }, {
    key: "update",
    value: function update(res) {
      var media = this.median(res);
      var maisVelho = this.olderStudent(res);
      var maisNovo = this.youngerStudent(res);
      var recente = res[res.length - 1];
      var antigo = res[0];
      var HTMLantigo = "<div class=\"text-muted\" id=\"antigo\">\n           <p class=\"small mb-0 mt-2\"><strong>Nome: <span class=\"font-italic\">" + antigo.name + "</span></strong></p>\n           <p class=\"small mb-0 \"> Email: <span class=\"font-italic\">" + antigo.email + "</span></p>\n           <p class=\"small\">Data Nascimento: <span class=\"font-italic\">" + antigo.date + "</span></p>\n       </div>\n       ";
      var HTMLrecente = "<div class=\"text-muted\" id=\"recente\">\n           <p class=\"small mb-0 mt-2\"><strong>Nome: <span class=\"font-italic\">" + recente.name + "</span></strong></p>\n           <p class=\"small mb-0 \"> Email: <span class=\"font-italic\">" + recente.email + "</span></p>\n           <p class=\"small\">Data Nascimento: <span class=\"font-italic\">" + recente.date + "</span></p>\n       </div>\n       ";
      document.getElementById("media").innerHTML = media + ' <small class="text-muted m-0">Anos</small>';
      document.getElementById("maisVelho").innerHTML = calculateAge(maisVelho.date);
      document.getElementById("maisNovo").innerHTML = calculateAge(maisNovo.date);
      document.getElementById("maisRecente").innerHTML = HTMLrecente;
      document.getElementById("maisAntigo").innerHTML = HTMLantigo;
    }
  }]);

  return StatisticObserve;
}();

var observe = new StudentSubject();
var student = new StudentObserve("students");
var statist = new StatisticObserve("statistic");
observe.subscribe(student);
observe.subscribe(statist);

function register(forms) {
  var name = forms.fullname.value;
  var email = forms.email.value;
  var date = forms.date.value;
  observe.addStudent({
    name: name,
    email: email,
    date: date
  });
  forms.reset();
  return false;
}

;
