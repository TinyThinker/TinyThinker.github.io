class Ball{
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;

        // Modes
        this.drop = false;
        this.mouseTracked = true;
    }

    draw(){

        if(this.mouseTracked){
            this.x = mouseX;
            this.y = mouseY;

            this.drop = false;
        }
        else if(this.drop){
            this.mouseTracked = false;
            this.dropCalculate();
        }
        else{
            this.mouseTracked = false;
            this.drop = false;
            
            this.x = 0;
            this.y = 0;
        }

        fill(255, 0, 0, 200);
        circle(this.x, this.y, this.radius);
        
        return this;
    }

    mouseClicked(){
        this.drop = true;
        this.mouseTracked = false;
    }

    dropCalculate(){
        this.y -= 1;
    }
}