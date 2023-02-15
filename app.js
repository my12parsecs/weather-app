// require('dotenv').config();

let tenki;
let forecast;
const main = document.getElementById("main");
const test = document.getElementById("test");
const time = document.getElementById("time")

const city = document.querySelector(".pull-down")
const num = city.selectedIndex
const selectCity = city.options[num].value

// 今後の予定
// 天気のアイコンをもっと画質良くてデザインも良いやつに
// 他の都市=>シンガポール、ニューヨーク、パリなど
// 天気の地図
// openweatherの他のAPI

if(selectCity === "Yokohama"){
  document.body.style.backgroundImage = 'url("https://www.yokohamaport.co.jp/wp/wp-content/uploads/2022/03/yokohamakou-R2-PA-01.jpg")'
}else if(selectCity === "Paris"){
  document.body.style.backgroundImage = 'url("https://assets.weforum.org/article/image/hJtDE4psGyQdqDfPVdyczLlG2Aq3RdjBFrO37lHiPJ4.jpg")'
}else if(selectCity === "Barcelona"){
  document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80")'
}else if(selectCity === "Zurich"){
  document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1620563092215-0fbc6b55cfc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80")'
}else if(selectCity === "Rome"){
  document.body.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/0_Castel_et_pont_Sant%27Angelo_%281%29.JPG/2560px-0_Castel_et_pont_Sant%27Angelo_%281%29.JPG")'
}else if(selectCity === "Munich"){
  document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1577462281852-279bf4986f7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80")'
}else if(selectCity === "Amsterdam"){
  document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1516203709415-9d4bd0d5ce18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80")'
}else if(selectCity === "Brussels"){
  document.body.style.backgroundImage = 'url("https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/bltb5cb5d32753041a6/61bc44b0abe5293e65780e91/US_Brussels_Belgium_Header.jpg")'
}



function currentTime(){
  let dateTime = new Date();
  document.getElementById("time").innerHTML = `${dateTime.toLocaleTimeString("ja-JP")}`
}
currentTime()





fetch(
  // `https://api.openweathermap.org/data/2.5/weather?q=Yokohama,jp&appid=${process.env.KEY1}&lang=ja&units=metric`
  `https://api.openweathermap.org/data/2.5/weather?q=${selectCity}&appid=00646bf47bf59252c96e0d849c52c488&lang=ja&units=metric`
)
  .then((res) => res.json())
  .then((data) => {
    tenki = data;
    // console.log(tenki);

    const icon = `http://openweathermap.org/img/wn/${tenki.weather["0"].icon}@4x.png`;
    document.getElementById("icon").src = icon;
    document.getElementById("icon").style.visibility = "visible";

    const timezone = tenki.timezone / 3600;

    // Dateがミリ秒なので1000倍が必要
    function unixChange(unix) {
      let dateTime = new Date(unix * 1000);
      return dateTime.toLocaleTimeString("ja-JP").slice(0, -3)
    //   return dateTime.toString()
    }
    function unixChangeFull(unix) {
        let dateTime = new Date(unix * 1000);
        return dateTime.toString()
      }
    // let dateTime = new Date(tenki.dt * 1000);
    // console.log(dateTime.toString()); // => Wed Sep 04 2019 12:03:35 GMT+0900 (日本標準時)
    // console.log(dateTime.toLocaleDateString()); // => 2019/9/4
    // console.log(dateTime.toLocaleDateString('ja-JP').slice(5)); // => 9/4
    // console.log(dateTime.toLocaleTimeString()); // => 12:03:35
    // console.log(dateTime.toLocaleTimeString('ja-JP')); // => 12:03:35

    main.innerHTML = `
    <p class="temp">${Math.round(tenki.main.temp * 10)/10}°</p>
    <p class="city">${tenki.name}</p>
    <p id="time"></p>
    <p class="global">${tenki.sys.country}・UTC+${timezone}:00</p>

    <div class="current-wrapper">
    <div class="detail-left">体感温度</div>
    <div class="detail-right">${Math.round(tenki.main.feels_like * 10)/10}°</div>
    <div class="detail-left">湿度</div>
    <div class="detail-right">${tenki.main.humidity}%</div>
    <div class="detail-left">雲量</div>
    <div class="detail-right">${tenki.clouds.all}%</div>
    <div class="detail-left">日の出</div>
    <div class="detail-right">${unixChange(tenki.sys.sunrise)}</div>
    <div class="detail-left">日の入り</div>
    <div class="detail-right">${unixChange(tenki.sys.sunset)}</div>
    </div>
    <p class="recieved">データ取得時間　${unixChangeFull(tenki.dt)}</p>
    `;

    currentTime()
    setInterval('currentTime()', 1000)
  });

//   <p>${tenki.weather["0"].main}</p>
//   <p>天気　${tenki.weather["0"].description}</p>






fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${selectCity}&appid=00646bf47bf59252c96e0d849c52c488&lang=ja&units=metric`
)
  .then((res) => res.json())
  .then((data) => {
    forecast = data;
    // console.log(forecast);

    function unixChangeDate(unix) {
      let dateTime = new Date(unix * 1000);
      return dateTime.toLocaleDateString("ja-JP").slice(5)
    }
    function unixChangeTime(unix) {
        let dateTime = new Date(unix * 1000);
        return dateTime.toLocaleTimeString("ja-JP").slice(0, -3)
      }

    function kosui(pop) {
      const percent = pop * 100;
      return percent.toString().slice(0, 2);
    }

    test.innerHTML = `
    <div class="forecast-wrapper">
    <div></div>
    <div class="forecast-date">${unixChangeDate(forecast.list[0].dt)}</div>
    <div class="forecast-date">${unixChangeDate(forecast.list[1].dt)}</div>
    <div class="forecast-date">${unixChangeDate(forecast.list[2].dt)}</div>
    <div class="forecast-date">${unixChangeDate(forecast.list[3].dt)}</div>
    <div class="forecast-date">${unixChangeDate(forecast.list[4].dt)}</div>
    <div></div>
    <div class="forecast-time">${unixChangeTime(forecast.list[0].dt)}</div>
    <div class="forecast-time">${unixChangeTime(forecast.list[1].dt)}</div>
    <div class="forecast-time">${unixChangeTime(forecast.list[2].dt)}</div>
    <div class="forecast-time">${unixChangeTime(forecast.list[3].dt)}</div>
    <div class="forecast-time">${unixChangeTime(forecast.list[4].dt)}</div>
    <div></div>
    <img id="icon0" class="forecast-icon"></img>
    <img id="icon1" class="forecast-icon"></img>
    <img id="icon2" class="forecast-icon"></img>
    <img id="icon3" class="forecast-icon"></img>
    <img id="icon4" class="forecast-icon"></img>
    <div class="forecast-detail">気温</div>
    <div>${Math.round(forecast.list[0].main.temp * 10)/10}°</div>
    <div>${Math.round(forecast.list[1].main.temp * 10)/10}°</div>
    <div>${Math.round(forecast.list[2].main.temp * 10)/10}°</div>
    <div>${Math.round(forecast.list[3].main.temp * 10)/10}°</div>
    <div>${Math.round(forecast.list[4].main.temp * 10)/10}°</div>
    <div class="forecast-detail">湿度</div>
    <div>${forecast.list[0].main.humidity}%</div>
    <div>${forecast.list[1].main.humidity}%</div>
    <div>${forecast.list[2].main.humidity}%</div>
    <div>${forecast.list[3].main.humidity}%</div>
    <div>${forecast.list[4].main.humidity}%</div>
    <div class="forecast-detail">降水確率</div>
    <div>${kosui(forecast.list[0].pop)}%</div>
    <div>${kosui(forecast.list[1].pop)}%</div>
    <div>${kosui(forecast.list[2].pop)}%</div>
    <div>${kosui(forecast.list[3].pop)}%</div>
    <div>${kosui(forecast.list[4].pop)}%</div>
    </div>
      `;

    const icon0 = `http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`;
    document.getElementById("icon0").src = icon0;
    const icon1 = `http://openweathermap.org/img/wn/${forecast.list[1].weather[0].icon}@2x.png`;
    document.getElementById("icon1").src = icon1;
    const icon2 = `http://openweathermap.org/img/wn/${forecast.list[2].weather[0].icon}@2x.png`;
    document.getElementById("icon2").src = icon2;
    const icon3 = `http://openweathermap.org/img/wn/${forecast.list[3].weather[0].icon}@2x.png`;
    document.getElementById("icon3").src = icon3;
    const icon4 = `http://openweathermap.org/img/wn/${forecast.list[4].weather[0].icon}@2x.png`;
    document.getElementById("icon4").src = icon4;
  });

// <p>気温　${forecast.list[0].main.temp}</p>
// <p>体感温度　${forecast.list[0].main.feels_like}</p>
// <p>湿度　${forecast.list[0].main.humidity}</p>
// <p>${forecast.list[0].weather[0].main}</p>
// <p>天気　${forecast.list[0].weather[0].description}</p>
// <p>${forecast.list[0].weather[0].icon}</p>
// <p>雲量　${forecast.list[0].clouds.all}</p>
// <p>降水確率　${forecast.list[0].pop}かける100で%</p>
// <p>昼夜　${forecast.list[0].sys.pod}n-night or d-day</p>
// <p>予報時間　${forecast.list[0].dt_txt}足す9時間</p>






// fetch("https://tile.openweathermap.org/map/precipitation_new/5/138/36.png?appid=00646bf47bf59252c96e0d849c52c488")
//   .then((res)=> res)
//   .then((data)=> console.log(data))







// 自動リロード
function reload(){
  window.location.reload()
}

window.addEventListener("load", function(){
  // 1分ごとに
  setTimeout(reload, 120000);
})











// 背景画像設定

const submit = document.getElementById("background-submit")
const button = document.getElementById("background-button")
const body = document.body


// localStorage.setItem("url", "https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2016/08/Minato-mirai.jpg")
// body.style.backgroundImage = `url(${localStorage.getItem("url")})`

// body.style.backgroundImage = "url(https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2016/08/Minato-mirai.jpg)"

submit.addEventListener("click", function(){
  if(localStorage.getItem("url")){
    localStorage.clear()
  }
  const value = document.forms[0].elements[0].value
  localStorage.setItem("url", value)
  body.style.backgroundImage = `url(${localStorage.getItem("url")})`
})

button.addEventListener("click",function(){
  const defaultUrl = "https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2016/08/Minato-mirai.jpg"
  if(localStorage.getItem("url")){
    localStorage.clear()
  }
  localStorage.setItem("url", defaultUrl)
  body.style.backgroundImage = `url(${defaultUrl})`
})