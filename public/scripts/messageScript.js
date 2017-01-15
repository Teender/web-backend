'use strict';
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
let Messenger = function () {
  function Messenger() {
    _classCallCheck(this, Messenger);
    this.messageList = [];
    this.deletedList = [];
    this.me = 1;
    this.them = 5;
    this.onRecieve = function (message) {
      return console.log('Recieved: ' + message.text);
    };
    this.onSend = function (message) {
      return console.log('Sent: ' + message.text);
    };
    this.onDelete = function (message) {
      return console.log('Deleted: ' + message.text);
    };
  }

  Messenger.prototype.send = function send() {
    let text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    text = this.filter(text);
    if (this.validate(text)) {
      let message = {
        user: this.me,
        text: text,
        time: new Date().getTime()
      };
      this.messageList.push(message);
      this.onSend(message);
    }
  };
  Messenger.prototype.recieve = function recieve() {
    let text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    text = this.filter(text);
    if (this.validate(text)) {
      let message = {
        user: this.them,
        text: text,
        time: new Date().getTime()
      };
      this.messageList.push(message);
      this.onRecieve(message);
    }
  };
  Messenger.prototype.delete = function _delete(index) {
    index = index || this.messageLength - 1;
    let deleted = this.messageLength.pop();
    this.deletedList.push(deleted);
    this.onDelete(deleted);
  };
  Messenger.prototype.filter = function filter(input) {
    let output = input.replace('bad input', 'good output');
    return output;
  };
  Messenger.prototype.validate = function validate(input) {
    return !!input.length;
  };
  return Messenger;
}();
let BuildHTML = function () {
  function BuildHTML() {
    _classCallCheck(this, BuildHTML);
    this.messageWrapper = 'message-wrapper';
    this.circleWrapper = 'circle-wrapper';
    this.textWrapper = 'text-wrapper';
    this.meClass = 'me';
    this.themClass = 'them';
  }

  BuildHTML.prototype._build = function _build(text, who) {
    let html = '<div class="' + this.messageWrapper + ' ' + this[who + 'Class'] + '">\n              <div class="' + this.circleWrapper + '"></div>\n              <div class="' + this.textWrapper + '">...</div>\n            </div>';
    console.log('html = ' + html);
    return html;
  };
  BuildHTML.prototype.me = function me(text) {
    return this._build(text, 'me');
  };
  BuildHTML.prototype.them = function them(text) {
    return this._build(text, 'them');
  };
  return BuildHTML;
}();
$(document).ready(function () {
  let messenger = new Messenger();
  let buildHTML = new BuildHTML();
  let $input = $('#input');
  let $send = $('#send');
  let $content = $('#content');
  let $inner = $('#inner');

  function safeText(text) {
    $content.find('.message-wrapper').last().find('.text-wrapper').text(text);
  }

  function animateText() {
    setTimeout(function () {
      $content.find('.message-wrapper').last().find('.text-wrapper');
    }, 350);
  }

  function scrollBottom() {
    $($inner).animate({scrollTop: $($content).offset().top + $($content).outerHeight(true)}, {
      queue: false,
      duration: 'ease'
    });
  }

  function buildSent(message) {
    console.log('sending: ', message.text);
    $content.append(buildHTML.me(message.text));
    safeText(message.text);
    animateText();
    scrollBottom();
  }

  function buildRecieved(message) {
    console.log('recieving: ', message.text);
    $content.append(buildHTML.them(message.text));
    safeText(message.text);
    animateText();
    scrollBottom();
  }

  function sendMessage() {
    let text = $input.val();
    messenger.send(text);
    $input.val('');
    $input.focus();
  }

  messenger.onSend = buildSent;
  messenger.onRecieve = buildRecieved;
  setTimeout(function () {
    messenger.recieve('Hello there!');
  }, 1500);
  setTimeout(function () {
    messenger.recieve('Do you like this? If so check out more on my page...');
  }, 5000);
  setTimeout(function () {
    messenger.recieve('Or maybe just give it a like!');
  }, 7500);
  $input.focus();
  $send.on('click', function (e) {
    sendMessage();
  });
  $input.on('keydown', function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
      e.preventDefault();
      sendMessage();
    }
  });
});