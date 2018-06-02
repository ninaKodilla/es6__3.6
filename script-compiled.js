class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };

        this.print();
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    save() {
        const items = document.querySelector('.results');
        const item = document.createElement('li');
        item.setAttribute('class', 'list-item');
        items.appendChild(item);

        item.innerHTML += this.format(this.times);
    }

    removeSaves() {
        const allItems = document.querySelectorAll('.list-item');

        allItems.forEach(i => {
            const items = document.querySelector('.results');
            items.removeChild(document.querySelector('.list-item'));
        });
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

let startButton = document.querySelector('#start');
startButton.addEventListener('click', _ => stopwatch.start());

let stopButton = document.querySelector('#stop');
stopButton.addEventListener('click', _ => stopwatch.stop());

let resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', _ => {
    stopwatch.reset();
});

let saveButton = document.querySelector('#save');
saveButton.addEventListener('click', _ => stopwatch.save());

let removeButton = document.querySelector('#removeAll');
removeButton.addEventListener('click', _ => stopwatch.removeSaves());

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
