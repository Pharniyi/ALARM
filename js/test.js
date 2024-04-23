let currentTime = document.querySelector('h1'),
    content = document.querySelector('.content'),
    selectMenu = document.querySelectorAll('select'),
    setAlarmbutton = document.querySelector('button');


let alarmTime,
    isAlarmSet = false;


let ringtone = new Audio("./assets/alarm.mp3");

ringtone.addEventListener('loadedmetadata', () => {
    console.log('Audio duration:', ringtone.duration);
});

ringtone.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
});

ringtone.play();


for (let i = 12; i > 0; i--) {
    let hour = i < 10 ? "0" + i : i;
    let option = `<option value="${hour}">${hour}</option>`;
    selectMenu[0].insertAdjacentHTML("beforeend", option);
}

for (let i = 59; i >= 0; i--) {
    let minute = i < 10 ? "0" + i : i;
    let option = `<option value="${minute}">${minute}</option>`;
    selectMenu[1].insertAdjacentHTML("beforeend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].insertAdjacentHTML("beforeend", option);
}

setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h} : ${m} : ${s} ${ampm}`;

    if (alarmTime == `${h} : ${m} : ${s} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disabled");
        setAlarmbutton.innerText = "Set Alarm";
        isAlarmSet = false;
    } else {
        let time = `${selectMenu[0].value} : ${selectMenu[1].value}  ${selectMenu[2].value}`;
        if (time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")) {
            return alert("Please select a valid time to set Alarm!");
        }
        isAlarmSet = true;
        alarmTime = time;
        content.classList.add("disabled");
        setAlarmbutton.innerText = "Clear Alarm";
        console.log(time);
    }
}

setAlarmbutton.addEventListener('click', setAlarm);
