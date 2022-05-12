//stopwatch

const counterElement = document.querySelector('#counter');
const counterInterval = document.querySelector('.interval');

let msec = 000;
let sec = 00;
let min = 00;
let hour = 00;
let timerID;
let n = 1;

const btnStart = document.querySelector('#start');

btnStart.onclick = function () {
    this.className = "button hide";
    btnStop.className = "button view";
    btnInterval.className="button view";
    timerID = setInterval(function () {
        if (msec>=9){
            msec= -1;
            sec++;
        }
        if (sec>=59){
            sec=-1;
            min++;
        }
        if (min>=60){
            min=0;
            hour++;
        }

        if (msec<9){  
            if (sec<=9){
                if (min<9){
                    if(hour<=9){
                        msec++;
                        counterElement.innerText = "0" + hour + ":" + 0 + min + ":" + 0 + sec +"."+   msec;
                    }
                    else{
                        msec++;
                        counterElement.innerText = hour + ":" + 0 + min + ":" + 0 + sec+ "."+  msec;
                    }     
                }
                else{
                    if(hour<=9){
                         msec++;
                        counterElement.innerText = "0" + hour + ":" +  min + ":" + 0 + sec+ "."+  msec;
                    }
                    else{
                         msec++;
                        counterElement.innerText = hour + ":" +  min + ":" + 0 + sec+ "."+  msec;
                    } 
                }
                
            }
            
            else{
                if (min<9){
                    if (hour<=9){
                         msec++;
                        counterElement.innerText = "0" + hour + ":" + 0 + min + ":" + sec+ "."+  msec;
                    }
                    else{
                         msec++;
                        counterElement.innerText = hour + ":" + 0 + min + ":" + sec+ "."+  msec;
                    }
                }
                else{
                    if (hour<=9){
                         msec++;
                        counterElement.innerText = "0" + hour + ":" + min + ":" + sec+ "."+  msec;
                    }
                    else{
                        msec++;
                        counterElement.innerText = hour + ":" +  min + ":" + sec+ "."+ msec;
                    }
                }
            }
        }  
    }, 100);
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
    btnInterval.className="button hide";
    msec=0;
    sec = 0;
    min = 0;
    hour = 0;
    
    counterElement.innerText = "0" + hour + ":" + 0 + min + ":" + 0 + sec+"." +msec;
    clearInterval(timerID);
    
    for (i = n; i>1; i--) {
        const inputLiDelete = document.querySelector('#inputLi li');
        inputLiDelete.parentNode.removeChild(inputLiDelete)
    }
    n=1;
}


const btnInterval = document.querySelector('#interval');

btnInterval.onclick = function () {
    const createInt= document.createElement('li');
    const inputLi = document.querySelector('#inputLi')
    createInt.textContent =  "Круг "+ n +": " +counterElement.innerText;
    inputLi.appendChild(createInt);
    n++;
}





