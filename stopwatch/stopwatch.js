//stopwatch

const counterElement = document.querySelector('#counter');
const counterInterval = document.querySelector('.interval');

const fastest = document.querySelector('#fastest')
const lowest = document.querySelector('#lowest')
const average = document.querySelector('#average')

let msec = 00;
let sec = 00;
let min = 00;
let hour = 00;
let timerID;
let n = 1;

let minus = 0
let calcMin = 0
let calcMax = 0


const btnStart = document.querySelector('#start');
btnStart.onclick = function () {
    this.className = "button hide";
    btnStop.className = "button view";
    btnInterval.className = "button view";
    timerID = setInterval(function () {
        if (msec >= 9) {
            msec = -1;
            sec++;
        }
        if (sec >= 59) {
            sec = -1;
            min++;
        }
        if (min >= 60) {
            min = 0;
            hour++;
        }

        if (msec < 9) {
            if (sec <= 9) {
                if (min < 9) {
                    if (hour <= 9) {
                        msec++;
                        counterElement.innerText = "0" + hour + ":" + 0 + min + ":" + 0 + sec + "." + msec;
                    }
                    else {
                        msec++;
                        counterElement.innerText = hour + ":" + 0 + min + ":" + 0 + sec + "." + msec;
                    }
                }
                else {
                    if (hour <= 9) {
                        msec++;
                        counterElement.innerText = "0" + hour + ":" + min + ":" + 0 + sec + "." + msec;
                    }
                    else {
                        msec++;
                        counterElement.innerText = hour + ":" + min + ":" + 0 + sec + "." + msec;
                    }
                }

            }

            else {
                if (min < 9) {
                    if (hour <= 9) {
                        msec++;
                        counterElement.innerText = "0" + hour + ":" + 0 + min + ":" + sec + "." + msec;
                    }
                    else {
                        msec++;
                        counterElement.innerText = hour + ":" + 0 + min + ":" + sec + "." + msec;
                    }
                }
                else {
                    if (hour <= 9) {
                        msec++;
                        counterElement.innerText = "0" + hour + ":" + min + ":" + sec + "." + msec;
                    }
                    else {
                        msec++;
                        counterElement.innerText = hour + ":" + min + ":" + sec + "." + msec;
                    }
                }
            }
        }
    }, 100);
}

const deleteChild = function (n) {
    for (i = n; i > 1; i--) {
        const inputLiDelete = document.querySelector('#inputLi li');
        inputLiDelete.parentNode.removeChild(inputLiDelete)
    }
}

const btnStop = document.querySelector('#pause');
btnStop.onclick = function () {
    clearInterval(timerID);
    this.className = "button hide";
    btnStart.className = "button view"
}

const btnReset = document.querySelector('#reset');
btnReset.onclick = function () {
    btnStart.className = "button view";
    btnStop.className = "button hide";
    btnInterval.className = "button hide";
    msec = 0;
    sec = 0;
    min = 0;
    hour = 0;
    minus = 0
    calcMin = 0
    calcMax = 0
    counterElement.innerText = "0" + hour + ":" + 0 + min + ":" + 0 + sec + "." + msec;
    lowest.innerText = '';
    fastest.innerText = '';
    average.innerText = '';
    clearInterval(timerID);
    if (n > 20) {
        n = 21
    }
    deleteChild(n)
    n = 1;
}


const btnInterval = document.querySelector('#interval');
btnInterval.onclick = function () {

    const createInt = document.createElement('li');
    let inputLi = document.querySelector('#inputLi')

    createInt.textContent = "???????? " + n + ": " + counterElement.innerText;
    inputLi.appendChild(createInt);
    if (n > 20) {
        deleteChild(n - (n - 2));
    }

    calc(n)

    n++;
}

const calc = function (n) {
    const calcTime = msec * 100 + sec * 1000 + min * 60000 + hour * 60000 * 60
    const calcMsec = calcTime - minus
    minus += calcMsec
    calcNowTime(calcMsec)
    if (n == 1) {
        calcMin = calcMsec
        calcMax = calcMsec
    }
    if (calcMsec <= calcMin) {
        calcMin = calcMsec
        fastest.innerText = "???????????????????? ???????? " + n + ": " + calcNowTime(calcMsec);
    }
    if (calcMsec >= calcMax) {
        calcMax = calcMsec
        lowest.innerText = "?????????????????? ???????? " + n + ": " + calcNowTime(calcMsec);
    }
    average.innerText = "???????? ?? ??????????????: " + calcNowTime(Math.trunc(calcTime / n))


}

const calcNowTime = function (p) {
    let NewHour = Math.trunc(p / (60 * 60000))
    let NewMin = Math.trunc((p - NewHour) / 60000)
    let NewSec = Math.trunc((p - NewHour - NewMin) / 1000)
    let NewMsec = Math.trunc((p - NewHour - NewMin - NewSec) / 100)
    if (NewHour.toString().length < 2) {
        NewHour = '0' + NewHour
    }
    if (NewMin.toString().length < 2) {
        NewMin = '0' + NewMin
    }
    if (NewSec.toString().length < 2) {
        NewSec = '0' + NewSec
    }
    if (NewMin.toString().length < 2) {
        NewMin = '0' + NewMin
    }
    let b = NewMsec.toString()
    let timeText = NewHour + ":" + NewMin + ":" + NewSec + "." + b[0]
    return (timeText)
}


