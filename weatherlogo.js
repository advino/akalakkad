// variables for mapped numbers
let value = null;
let value1 = null;
let value2 = null;

let input;
let button;

// variables for adding numbers
let add, add2, add3;
let a = 0;
let b = 0;
let c = 0;
// API for weather based data
let apiKey = "bd3f35fea17078173b70e112f7cc838b";
let site = "http://api.openweathermap.org/data/2.5/";
let city;
let url;

// Variables for particular weather conditions
let temperature, humidity, cloudiness;


function setup() {
  let canvas = createCanvas(500, 300);
  canvas.parent("canvas");


  // Set default city and associated URL
  city = "San Francisco";
  url = site + "weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;

  // Loads JSON Objects and run's data gathering function
  loadJSON(url, gotData);


  // Elements for setting a new city
  button = createButton("Enter");
  input = createInput("Enter a City");
  button.mousePressed(resetSketch);

  input.id("citySubmit");
  button.id("submitButton");
  input.parent("searchBar");
  button.parent("searchBar");

}

function resetSketch() {
  // Takes in new city and inputs it into the url, reloads the JSON data
  city = input.value();
  console.log(city);
  url = site + "weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;
  loadJSON(url, gotData);

}

function gotData(data) {

  // Obtains the temp, humid, and cloud of the city
  temperature = data.main.temp;
  humidity = data.main.humidity;
  cloudiness = data.clouds.all;

  add = temperature;
  add2 = humidity;
  add3 = cloudiness;

  console.log(add);
  console.log(add2);
  console.log(add3);

  // Maps the values from 0 to TW0_PI to get the arc lengths
  if (add < 0) {
    value = map(add, 0, -100, 0, TWO_PI);
  } else {

    value = map(add, 0, 100, 0, TWO_PI);
  }

  value1 = map(add2, 0, 100, 0, TWO_PI);
  value2 = map(add3, 0, 100, 0, TWO_PI);

  console.log(value);
  console.log(value1);
  console.log(value2);
}



function draw() {

  background(247);

  // Sets arc radii
  let x = width / 2;
  let y = height / 2;
  let d = width * 0.35;

  // Lerp creates the animation of the arc moving along the circle
  a = lerp(a, value, .05);
  b = lerp(b, value1, .05);
  c = lerp(c, value2, .05);

  // background arcs
  colorMode(RGB);
  stroke(160, 100);
  noFill();
  strokeWeight(.75);
  // rect(0,0,50,50);
  arc(x, y, d, d, 0, TWO_PI);
  arc(x, y, d - 20, d - 20, 0, TWO_PI);
  arc(x, y, d - 40, d - 40, 0, TWO_PI);

  // arcs for temp, humid, and cloud
  noFill();
  colorMode(RGB);
  strokeWeight(10);
  if (add < 0) {
    stroke(247, 147, 111);
    arc(x, y, d, d, -a, 0);
    //println(value);
  } else {
    stroke(247, 147, 111);
    arc(x, y, d, d, 0, a);
    //println(value);
  }
  stroke(255, 207, 49);
  arc(x, y, d - 20, d - 20, 0, b);
  stroke(24, 228, 247);
  arc(x, y, d - 40, d - 40, 0, c);

  // inner circle "sun"
  colorMode(RGB);
  //fill(stepping);
  fill(224, 197, 44);
  noStroke();
  ellipse(x, y, 100, 100);


}
