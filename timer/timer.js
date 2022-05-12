//timer

let timerID;
const hourCount = document.querySelector("#hour");
const minCount = document.querySelector('#min');
const secCount = document.querySelector('#sec');

const btnTimerStart = document.querySelector('#timer_start');
const btnTimerStop = document.querySelector('#timer_stop');



btnTimerStart.onclick = function() {
    
    let sec = secCount.value;
    let min = minCount.value;
    let hour = hourCount.value;

    if (secCount.value = ""){
        secCount.value = 0;
    }
    if (minCount.value = ""){
        minCount.value = 0;
    }
    if (hourCount.value = ""){
        hourCount.value = 0;
    }
    if (sec, min >59){
        console.log('больше')
    }
    else{
        this.className = "hide";
        btnTimerStop.className = "view";
        timerID = setInterval(function () {
            if (sec==0 && min ==0 && hour ==0){
                StopTimerFunc();
            }
            if (sec<0 && min!=0 && hour !=0){
                sec=59;
                min--;
            }
            if (sec<0 && min!=0){
                sec=59;
                min--;
            }
            if (sec<0 && min==0 && hour!=0){
                min=59;
                sec=59;
                hour--;
            }
            if (0<=sec && sec<=9){
                secCount.value = "0" + sec;
                sec--;    
                console.log('gg')
            }
            else{
                secCount.value = sec;
                sec--;
                console.log('gd')
            }
            
            
            if(min<=9 && minCount.value!=00){
                minCount.value = "0" + min;

            }

            else{
                minCount.value =  min;
            }
            if(hour<=9 && hourCount.value!=00){
                hourCount.value = "0" + hour;
            }
            else{
                hourCount.value = hour;
            }
        }, 1000) 
    }
    
};

secCount.onclick = function(){
    secCount.Value = sec++;
}

btnTimerStop.onclick = function () {
    
    StopTimerFunc();
};

const StopTimerFunc = function () {
    clearInterval(timerID);
    btnTimerStart.className = "view";
    btnTimerStop.className = "hide";
}

secCount.onclick = function(){
    this.value = "";
}
minCount.onclick = function(){
    this.value = "";
}
hourCount.onclick = function(){
    this.value = "";
}

