//Create variables here
var database;
var dog
var foodSS
var foodObj
var lastFed
var feed,addFood;

function preload()
{
  
  sadDog= loadImage("dogImg.png")
  happyDog= loadImage("dogImg1.png")
	//load images here
}

function setup() {

  createCanvas(800, 500);

  database = firebase.database();
  
  dog=createSprite(600,350,20,20)
  dog.addImage(sadDog)
  //dog.addImage("host",dogImg1)
  dog.scale=0.2

  foodObj = new Food();

  //reading the data from Food and FeedTime in database
  foodObj.getFoodStock();
  foodObj.getLastFedTime();

  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}


function draw() {  
  background(46, 139, 87)
  foodObj.display();
  drawSprites();
}

function feedDog(){
  //first check if there is food in stock/database
  console.log(foodObj.foodStock)

  //if food is available(>0), only then we feed the dog
  if(foodObj.foodStock>0){
    //happy dog
    dog.addImage(happyDog);
    //deduct the food
    foodObj.foodStock = foodObj.foodStock - 1;
    //capture the feed time
    foodObj.lastFed = hour();
    //update the foodStock and feedtime
    foodObj.updateFoodStock()
  }
  else if (foodObj.foodStock===0){
    dog.addImage(sadDog);
  }
}


//function to add food in stock
function addFoods(){
  //add the foodStock count and update the foodStock
  foodObj.foodStock = foodObj.foodStock + 1;
  foodObj.updateFoodStock();
}
