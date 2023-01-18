let tenki;
let forecast
const main = document.getElementById("main");
const sub = document.getElementById("sub");


fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Yokohama,jp&appid=00646bf47bf59252c96e0d849c52c488&lang=ja&units=metric`
)
  .then((res) => res.json())
  .then((data) => {
    tenki = data
    console.log(tenki);

    const icon = `http://openweathermap.org/img/wn/${tenki.weather["0"].icon}@4x.png`
    document.getElementById("icon").src = icon;

    const timezone = tenki.timezone/3600

    // Dateがミリ秒なので1000倍が必要
    function unixChange(unix){
        let dateTime = new Date(unix * 1000);
        return dateTime.toLocaleTimeString('ja-JP')
        // return dateTime.toString()
    }
// let dateTime = new Date(tenki.dt * 1000);
// console.log(dateTime.toString()); // => Wed Sep 04 2019 12:03:35 GMT+0900 (日本標準時)
// console.log(dateTime.toLocaleDateString()); // => 2019/9/4
// console.log(dateTime.toLocaleDateString('ja-JP').slice(5)); // => 9/4
// console.log(dateTime.toLocaleTimeString()); // => 12:03:35
// console.log(dateTime.toLocaleTimeString('ja-JP')); // => 12:03:35

    main.innerHTML = `
    <p class="temp">${tenki.main.temp}°</p>
    <p class="city">${tenki.name}</p>
    <p class="global">${tenki.sys.country}・UTC+${timezone}:00</p>
    <p>体感温度　${tenki.main.feels_like}</p>
    <p>湿度　${tenki.main.humidity}</p>
    <p>雲量　${tenki.clouds.all}</p>
    <p class="sun">日の出　${unixChange(tenki.sys.sunrise)}</p>
    <p class="sun">日の入り　${unixChange(tenki.sys.sunset)}</p>
    <p class="recieved">データ取得時間　${unixChange(tenki.dt)}</p>
    `
  });

//   <p>${tenki.weather["0"].main}</p>
//   <p>天気　${tenki.weather["0"].description}</p>




fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Yokohama,jp&appid=00646bf47bf59252c96e0d849c52c488&lang=ja&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      forecast = data
      console.log(forecast);

      function unixChange(unix){
        let dateTime = new Date(unix * 1000);
        return dateTime.toLocaleDateString('ja-JP').slice(5) + " " + dateTime.toLocaleTimeString('ja-JP').slice(0, 4)
    }

      function kosui(pop){
        const percent = pop * 100
        return percent.toString().slice(0, 2)
      }

      sub.innerHTML = `
      <div class="forecast-container">
      <p>日付<p>
      <img />
      <p>気温</p>
      <p>湿度</p>
      <p>降水確率</p>
      </div>

      <div class="forecast-container">
      <p>${unixChange(forecast.list[0].dt)}<p>
      <img id="icon0" />
      <p>${forecast.list[0].main.temp}°</p>
      <p>${forecast.list[0].main.humidity}%</p>
      <p>${kosui(forecast.list[0].pop)}%</p>
      </div>

      <div class="forecast-container">
      <p>${unixChange(forecast.list[1].dt)}<p>
      <img id="icon1" />
      <p>${forecast.list[1].main.temp}°</p>
      <p>${forecast.list[1].main.humidity}%</p>
      <p>${kosui(forecast.list[1].pop)}%</p>
      </div>
      `

    const icon0 = `http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`
    document.getElementById("icon0").src = icon0;
    const icon1 = `http://openweathermap.org/img/wn/${forecast.list[1].weather[0].icon}@2x.png`
    document.getElementById("icon1").src = icon1;
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