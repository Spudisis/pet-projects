function Timer() {
    this.download = function (elId) {
        const elSelector = '#' + elId;
        const el = document.querySelector(elSelector);
        this.data = new Date(2023, 3, 6, 0, 0)
        this.now = new Date();
        this.day = el.querySelector("#day");
        this.hour = el.querySelector("#hour");
        this.min = el.querySelector('#min');
        this.sec = el.querySelector('#sec');
        this.start = el.querySelector('#timer_start');
        this.stop = el.querySelector('#timer_stop');

        this.start.addEventListener('click', (e) => {
            this.startTimer(e);
        });
        this.stop.addEventListener('click', (e) => {
            this.stopTimer(e);
        });
    }
    this.calcTime = function () {

        this.minus = this.data - this.now;
        this.day.innerText = Math.trunc(this.minus / 1000 / 60 / 60 / 24);
        this.hour.innerText = Math.trunc(this.minus / 1000 / 60 / 60 - this.day.innerText * 24);
        this.min.innerText = Math.trunc((this.minus / 1000 / 60 - Math.trunc(this.minus / 1000 / 60 / 60) * 60));
        this.sec.innerText = Math.trunc(this.minus / 1000 - Math.trunc(this.minus / 1000 / 60) * 60);
        this.runTimer();
    }
    this.startTimer = function (e) {
        this.start.className = 'hide'
        this.stop.className = 'view'
        this.calcTime();
    }
    this.stopTimer = function (e) {
        this.start.className = 'view'
        this.stop.className = 'hide'
        clearInterval(timerToDo);
    }
    this.secCount = function () {
        if (this.sec.innerText <= 10) {
            this.sec.innerText = "0" + (+this.sec.innerText - 1);
        }
        else {
            this.sec.innerText = +this.sec.innerText - 1;
        }
    }
    this.minCount = function () {
        if (this.min.innerText <= 10) {
            this.min.innerText = "0" + (+this.min.innerText - 1);
        }
        else {
            this.min.innerText = +this.min.innerText - 1;
        }
    }
    this.hourCount = function () {
        if (this.hour.innerText <= 10) {
            this.hour.innerText = "0" + (+this.hour.innerText - 1);
        }
        else {
            this.hour.innerText = +this.hour.innerText - 1;
        }
    }
    this.dayCount = function () {
        if (this.day.innerText <= 1) {
            this.day.remove();
            return false;
        }
        if (this.day.innerText <= 10) {
            this.day.innerText = "0" + (+this.day.innerText - 1);
        }
        else {
            this.day.innerText = +this.day.innerText - 1;
        }
    }
    this.runTimer = function () {
        timerToDo = setInterval(() => {
            this.checkContinueTimer();
            this.secCount();
            this.checkStopTimer();
        }, 1000)
    }
    this.checkStopTimer = function () {
        if (this.sec.innerText <= 0 && this.min.innerText <= 0 && this.hour.innerText <= 0 && this.day.innerText <= 0) {
            this.stopTimer();
        }
    }
    this.checkContinueTimer = function () {
        if (this.sec.innerText <= 0 && this.min.innerText <= 0 && this.hour.innerText <= 0 && this.day.innerText != 0) {
            this.sec.innerText = 60;
            this.min.innerText = 59;
            this.hour.innerText = 23;
            this.dayCount();
        }
        if (this.sec.innerText <= 0 && this.min.innerText <= 0 && this.hour.innerText != 0) {
            this.sec.innerText = 60;
            this.min.innerText = 59;
            this.hourCount();
        }
        if (this.sec.innerText <= 0 && this.min.innerText != 0) {
            this.sec.innerText = 60;
            this.minCount();
        }
    }
    this.animationCounter = function () {

    }
}

const TimerCreate = {
    timerCreate: function () {
        const newTimer = new Timer();
        return newTimer;
    }
}