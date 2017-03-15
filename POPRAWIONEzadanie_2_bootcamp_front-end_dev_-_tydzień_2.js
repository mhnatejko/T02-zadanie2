function EventEmitter() {
    this.events = {};
}
EventEmitter.prototype.on = function(type, fn) {
    if(!type || !fn) return;
    this.events[type] = this.events[type] || [];
    this.events[type].push(fn);
}
EventEmitter.prototype.emit = function(type, data) {
    var fns = this.events[type];
    if(!fns || !fns.length) return;
    for(var i = 0; i < fns.length; i++) {
        fns[i](data);
    }
 };

/**************************************************/
Database.prototype = Object.create(EventEmitter.prototype)
Database.prototype.constructor = Database

function Database(url) {
    this.url = url;
    EventEmitter.call(this)
}



Database.prototype.connect = function() {
    this.emit("connect", this.url);
}
Database.prototype.disconnect = function() {
    this.emit("disconnect", this.url);
    
}

/**************************************************/

var ev = new EventEmitter();
ev.on("hello", function(message) {
    console.log("Witaj " + message + "!");
});
ev.on("hello", function(message) {
    console.log("Siema " + message + ".");
});
ev.on("goodbye", function() {
    console.log("Do widzenia!");
});

ev.emit("hello", "Marek");
ev.emit("goodbye");

/**************************************************/
var db = new Database("db://localhost:3000");
db.on("connect", function(url) {
    console.log("Połączenie z bazą pod adresem " + url + " zostało ustanowione.");
});
db.on("disconnect", function(url) {
    console.log("Połączenie z bazą pod adresem " + url + " zostało zakończone.");
});

db.connect();
setTimeout(function() {
    db.disconnect();
}, 5000);