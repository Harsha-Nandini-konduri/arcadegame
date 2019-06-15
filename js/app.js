// position of Enemies in the game
var Enemy = function(x, y, spd) {
  this.x = x;
  this.y = y;
  this.spd = spd;
  this.sprite = 'images/enemy-bug.png';
};
//Fixing the position of player
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-horn-girl.png';
};
var player = new Player(202, 400);
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.spd * dt;
  if (this.x > 505) {
    this.x = 0;
  }
  //collision function where player collides the bug
  if (player.x < this.x + 60 && player.x + 60 > this.x &&
    player.y < this.y + 60 && player.y + 60 > this.y) {
    player.y = 400;
    player.x = 200;
    // The objects are touching
    sweetAlert("Are you willing to play again.......");
  }
};

Player.prototype.update = function(dt) {

};
//Draw the player on the game board
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var allEnemies = [];
var enemyPos = [65, 145, 230];
//giving random speeds to the bugs
enemyPos.filter(function(p) {
  var min = 40;
  var max = 100;
  var random = Math.random() * (max - min) + min;
  var enemy = new Enemy(0, p, random);
  allEnemies.push(enemy);
})
//movements of plyer
//player should not move out of the game board
player.handleInput = function(key) {
  if (key == 'left' && this.x > 5) {
    this.x = this.x - 100;
  } else if (key == 'right' && this.x < 401) {
    this.x = this.x + 100;
  } else if (key == 'up' && this.y > 10) {
    this.y = this.y - 82;
  } else if (key == 'down' && this.y < 400) {
    this.y = this.y + 82;
  }
  //when player moves up with out colliding then player wins the game
  if (this.y < 60) {
    swal({
      html: true,
      title: "congratulations🎊🎊🎈🎈you won the game....",
      type: "success",
      confirmButtonText: "playagain",
    }, function() {
      location.reload(); //to restart the game after colliding
    })

  }
}

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
