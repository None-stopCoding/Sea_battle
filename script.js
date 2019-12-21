var time = 60;
var Timer = function(obj){
    this.time = obj.time;
    this.onTick = obj.onTick || null;   

    this.start = () => {
        this.interval = setInterval(this.update, 1000);
    };
    this.stop = () => {
        clearInterval(this.interval);
    };
    this.update = () => {
        this.time > 0 ? this.time -= 1 : this.stop();
        this.onTick ? this.onTick() : void 0;
        return this.get();
    }
    this.get = () => {
        return this.time;
    }
}

var timer1 = new Timer({
    time: 60,
    onTick: tick
});

timer1.start()
requestAnimationFrame(tick);
function tick(){
    id("output").innerHTML = timer1.get();
}

function id(id){
    return document.getElementById(id);
}
