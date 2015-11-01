 // @class Switcher
 // @constructor
 // @param {HTMLElement} node
 // @param {Boolean} [state]

var Switcher = function Switcher(node, state) {

    //node
    this._node = node;
    //state
    this._state = state || false;
    //handler
    this._handlers = {};
    //init
    this._init();
};

Switcher.prototype = {

    //setState
    setState: function (state) {
        this._state = state;
        this._drawState();
        return this;
    },

    //getState
    getState: function () {
        return this._state;
    },

    //toggle state
    toggle: function (state) {
        if (typeof state === 'boolean') {
            if (this.getState() != state) {
                this.setState(state);
            }
        } else {
            this.setState(!this.getState());
        }
        return this;
    },

    //drop handler
    destroy: function () {
        this._dropHandlers();
    },

    //init
    _init: function () {
        this._createDom();
        this._createHandlers();
        this._setHandlers();
        this._drawState();
    },

    //create handlers
    _createHandlers: function () {
        this._handlers = {
            'click': this._onClick.bind(this)
        };
    },

    //create elem
    _createDom: function () {
        var rule = document.createElement('div');
        rule.classList.add('rule');
        this._node.appendChild(rule);
    },

    //set events
    _setHandlers: function () {
        Switcher.each(this._handlers, function (handler, event) {
            this._node.addEventListener(event, handler, false);
        }, this);
    },

    //draw class
    _drawState: function () {
        this._node.classList[this._state ? 'add' : 'remove']('on');
    },

    //drop handler
    _dropHandlers: function () {
        Switcher.each(this._handlers, function (handler, event) {
            this._node.removeEventListener(event, handler, false);
        }, this);
    },

    //handler click
    _onClick: function () {
        this.toggle();
    }
};

//static method
Switcher.each = function (object, callback, context) {
     for (var key in object) {
         if (object.hasOwnProperty(key)) {
             callback.bind(context, object[key], key)();
         }
     }
};