class Food{
    constructor(){
        this.image=loadImage("Milk.png")
        this.foodStock=0;
        this.lastFed=null;
    }

    getFoodStock(){
        var foodStockRef= database.ref("Food")
        foodStockRef.on("value",(data)=>{
            this.foodStock = data.val();
        })
        console.log(this.foodStock)
    }

    getLastFedTime(){
        var feedTimeRef = database.ref("FeedTime");
        feedTimeRef.on("value",(data)=>{
            this.lastFed = data.val();
        })
    }

    //updateFoodStock function is used to update Food and FeedTime
    //when we feed the pet, both Food and FeedTime gets updated
    //when we add food, only Food gets updated
    updateFoodStock(){
        database.ref("/").update({
            Food:this.foodStock,
            FeedTime:this.lastFed
        })
    }
    display(){ //display function needs to be called in the draw() function
        //displaying the last fed time
    
        fill(255,255,254);
        textSize(15);
        if(this.lastFed>=12){
            text("Last Feed: "+this.lastFed%12+" PM",350,30)
        }
        else if(this.lastFed==0){
            text("lastFeed: 12 AM",350,30)
        }
        else {
            text("Last feed: "+ this.lastFed+"AM",350,30)
        }
        
        //displaying the milk bottles
        var x =80,y=100;
        
        if(this.foodStock>0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50
                }
                image(this.image,x,y,50,50);
                x=x+30
            }
        }
        
    }
}

