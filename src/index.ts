(function(){


    const $map = document.querySelector('#map-js');
    window.addEventListener('resize', () => {
        swal({
            icon: 'warning',
            text: "No debes cambiar el tamaño de la pantalla!",
        }).then(() => {
            location.reload();
        })
    })
    
    class Game{
        width: number;
        height: number;
        clicks: number;
        coordinates: {};
        tries: number;
    
        constructor(){
            this.inicialize()  
        }
        
        inicialize(){   
            this.width = $map.clientWidth;
            this.height = $map.clientHeight;
            this.tries = 20;
            this.clicks = 0;
            this.coordinates = {
                x: this.randomNumber(this.width),
                y: this.randomNumber(this.height)
            }
    
            $map.addEventListener('click', this.findTreasure.bind(this))
            
        }
    
        randomNumber(_size: number){
            const number = Math.floor( Math.random() * _size )
            return number;
        }
    
        distanceTreasure({ offsetX, offsetY }, _trs){
            const diffX = offsetX - _trs.x;
            const diffY = offsetY - _trs.y;
            
            return Math.sqrt((diffX*diffX) + (diffY*diffY))
        }
    
        tracks(_distance){
    
            if(_distance < 50){
                swal({
                    text: 'Estás muy cerca!',
                    button: false,
                    timer: 500
                })
    
            }else if(_distance < 100){
                swal({
                    text: 'Estás cerca!',
                    button: false,
                    timer: 500
                })
            }else if(_distance < 200){
                swal({
                    text: 'Estás un poco lejos',
                    button: false,
                    timer: 500
                })
            }else if(_distance < 300){
                swal({
                    text: 'Estás lejos',
                    button: false,
                    timer: 500
                })
            }else if(_distance < 400){
                swal({
                    text: 'Estás muy lejos!',
                    button: false,
                    timer: 500
                })
            }else{
                swal({
                    text: 'Estás demasiado lejos!!!',
                    button: false,
                    timer: 500
                })
            }
        }
    
        gameOver(){
            $map.removeEventListener('click', this.findTreasure)
            swal({
                icon: 'error',
                title: 'Has perdido',
                text: `Seguro en la próxima lo logras!`,
            }).then(() => {
                location.reload()
                this.inicialize()
            }) 
        }

        gameWon(){
            $map.removeEventListener('click', this.findTreasure)
            swal({
                icon: 'success',
                title: 'Lo encontraste!!',
                text: `¡Encontraste el tesoro en ${this.clicks} clicks!`,
            }).then(() => {
                location.reload()
                this.inicialize()
            })
        }
    
        findTreasure(event){
            this.clicks++;
            console.log("findTreasure -> clicks", this.clicks)
            const distance = this.distanceTreasure(event, this.coordinates)
            
            this.tracks(distance);
            
            if(this.clicks === this.tries){this.gameOver()}
            
            if(distance < 20){this.gameWon()}
        }
    
    }
    
    const game = new Game();

}())
