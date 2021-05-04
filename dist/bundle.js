"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

dados = [];

var Observer = /*#__PURE__*/function () {
  function Observer() {
    _classCallCheck(this, Observer);

    this.lista = [];
  }

  _createClass(Observer, [{
    key: "subscribe",
    value: function subscribe(event) {
      this.lista.push(event);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(item) {
      this.lista.slice(this.lista.indexOf(item), 1);
    }
  }, {
    key: "notify",
    value: function notify() {
      this.lista.forEach(function (element) {
        element.update();
      });
    }
  }]);

  return Observer;
}();

var View = /*#__PURE__*/function () {
  function View(nome) {
    _classCallCheck(this, View);

    this.nome = nome;
  }

  _createClass(View, [{
    key: "update",
    value: function update() {
      var tabela = '';

      var _iterator = _createForOfIteratorHelper(dados),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var i = _step.value;
          tabela += "<tr><td>" + i + "</td></tr>";
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      document.getElementById('list').innerHTML = tabela;
    }
  }]);

  return View;
}();

var obs = new Observer();
var lista = new View();
obs.subscribe(lista);

function salvar() {
  // dados.push(response.value)
  console.log(dados); // obs.notify()
  // response.value = ''
}

;
