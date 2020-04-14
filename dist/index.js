(function () {
    var $map = document.querySelector('#map-js');
    window.addEventListener('resize', function () {
        swal({
            icon: 'warning',
            text: "No debes cambiar el tamaño de la pantalla!"
        }).then(function () {
            location.reload();
        });
    });
    var Game = /** @class */ (function () {
        function Game() {
            this.inicialize();
        }
        Game.prototype.inicialize = function () {
            this.width = $map.clientWidth;
            this.height = $map.clientHeight;
            this.tries = 20;
            this.clicks = 0;
            this.coordinates = {
                x: this.randomNumber(this.width),
                y: this.randomNumber(this.height)
            };
            $map.addEventListener('click', this.findTreasure.bind(this));
        };
        Game.prototype.randomNumber = function (_size) {
            var number = Math.floor(Math.random() * _size);
            return number;
        };
        Game.prototype.distanceTreasure = function (_a, _trs) {
            var offsetX = _a.offsetX, offsetY = _a.offsetY;
            var diffX = offsetX - _trs.x;
            var diffY = offsetY - _trs.y;
            return Math.sqrt((diffX * diffX) + (diffY * diffY));
        };
        Game.prototype.tracks = function (_distance) {
            if (_distance < 50) {
                swal({
                    text: 'Estás muy cerca!',
                    button: false,
                    timer: 500
                });
            }
            else if (_distance < 100) {
                swal({
                    text: 'Estás cerca!',
                    button: false,
                    timer: 500
                });
            }
            else if (_distance < 200) {
                swal({
                    text: 'Estás un poco lejos',
                    button: false,
                    timer: 500
                });
            }
            else if (_distance < 300) {
                swal({
                    text: 'Estás lejos',
                    button: false,
                    timer: 500
                });
            }
            else if (_distance < 400) {
                swal({
                    text: 'Estás muy lejos!',
                    button: false,
                    timer: 500
                });
            }
            else {
                swal({
                    text: 'Estás demasiado lejos!!!',
                    button: false,
                    timer: 500
                });
            }
        };
        Game.prototype.gameOver = function () {
            var _this = this;
            $map.removeEventListener('click', this.findTreasure);
            swal({
                icon: 'error',
                title: 'Has perdido',
                text: "Seguro en la pr\u00F3xima lo logras!"
            }).then(function () {
                location.reload();
                _this.inicialize();
            });
        };
        Game.prototype.gameWon = function () {
            var _this = this;
            $map.removeEventListener('click', this.findTreasure);
            swal({
                icon: 'success',
                title: 'Lo encontraste!!',
                text: "\u00A1Encontraste el tesoro en " + this.clicks + " clicks!"
            }).then(function () {
                location.reload();
                _this.inicialize();
            });
        };
        Game.prototype.findTreasure = function (event) {
            this.clicks++;
            console.log("findTreasure -> clicks", this.clicks);
            var distance = this.distanceTreasure(event, this.coordinates);
            this.tracks(distance);
            if (this.clicks === this.tries) {
                this.gameOver();
            }
            if (distance < 20) {
                this.gameWon();
            }
        };
        return Game;
    }());
    var game = new Game();
}());
