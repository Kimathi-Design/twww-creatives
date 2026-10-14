
  // vars
  var w = 300;
  var h = 600;

  var myDraggable = [];
  var startX, startY;
  var ctx, d;

  var o = {};
  var oNames = {
    id: 'canvas grid g1 g2 g3 ctaArea1 cursorCont ctaArea2 cta1Cont score_text1 none score_text2 bg_add_1Cont cokeCont gameContainer game_ui time_counter ctaArea2 coke1 cta2Cont slide2 coke2 bg_add_2Cont',
  }

  function init(){
    setVars();
    initAnim();
    events();

    loop();

    createBoard();

    d.startTO = setTimeout( playAI, 1000 );
  }

    // width: 62px;
    // height: 77px;
    // width: 278px;
    // height: 298px;

  function setVars(){
    d = {
      gameStarted: false,
      tls: [],
      ai: {
        int: null,
      },
      canvas: {
        w: 278,
        h: 298,
      },
      dots: {
        list: [],
      },
      score: {
        cur: 0,
      },
      timer:{
        pause: 0,
        pauseAmm: 1200,
        tot: 15,
        cur: 15,
        width: 477,
      },
      tiles: {
        boundAmm: 60,
        dragNeed: 40,
        size: {
          w: 4,
          h: 4,
        },
        types: 4,
        typeScale: [0.8, 0.8, 0.9, 0.9],
        w: 62,
        h: 67,
        m: 10,
        list: [],
      },
      drag: {
        cur: {x: 0, y: 0},
        sum: {x: 0, y: 0},
        delay: {x: 0, y: 0},
        ft: false,
        start: {x: 0, y: 0},
      },
      loop: true,
    }

    ctx = o.canvas.getContext('2d');
    ctx.fillStyle = "white";
  }

  function playAI(){

    d.ai.int = setInterval( () => {

      if(d.timer.pause <= 0){
        AImoveTile()
      }

    }, 500)

  }

  function AImoveTile(){

    var rn = Math.floor( d.tiles.list.length * Math.random() )
    var tile = d.tiles.list[rn];

    // console.log(tile)

    var move_dir;
    var count = 0;
    var dirs = ["left", "right", "up", "down"];

    while( count < 100 ){

      var rn2 = Math.floor( dirs.length * Math.random() )
      move_dir = dirs[rn2];
      var dir_amm = tile.bounds[ move_dir ];
      // console.log('dir_amm', dir_amm)
      if( dir_amm != 0 ){
        // console.log(dir_amm)
        // console.log(dir_amm != 0)
        // console.log('got DIR', move_dir)
        break;
      }

      count++;
    }

    // console.log('move_dir', move_dir)
    doDrop(move_dir, tile)
  }

  function initAnim(){

    gsap.set(o.cokeCont, {scale: 0.9})
    gsap.set(o.coke1, {opacity: 0});
    gsap.set(o.cpin, {scale: 0.5});


    gsap.from(o.bg_add_1Cont, 1.5, {scale: 1.35, ease: 'power3.out', onComplete: function(){
      d.tl6 = gsap.to(o.bg_add_1Cont, 3, {scale: 0.95, ease: 'power1.inOut', repeat: -1, yoyo: true})
    }})
    d.tl5 = gsap.to(o.bg_add_1Cont, 2.5, {rotation: 3, ease: 'power1.inOut', repeat: -1, yoyo: true})

    gsap.set(o.g1, {x: -164, y: -127, scale: 0.5, rotation: -5})

    gsap.from([o.coke1, o.g1, o.cpin], 0.75, {delay: 0.1, x: 500, ease: 'power3.out'})


    d.tl1 = gsap.to(o.g1, 2.5, {rotation: 5, ease: 'power1.inOut', repeat: -1, yoyo: true})
    d.tl3 = gsap.from(o.g1, 1, {delay: 0.35, scale: 0, ease: 'back.out', onComplete: function(){
      d.tl2 = gsap.to(o.g1, 1.7, {scale: 0.35, repeat: -1, yoyo: true})
    }})

    gsap.from(o.cta1Cont, 0.75, {delay: 0.25, x: 500, ease: 'power3.out', transformOrigin: '50% 82%'})

    // d.tl4 = gsap.timeline({repeat: -1, repeatDelay: 1});
    // d.tl4.to(o.cta1Cont, 0.22, {delay: 1.5, scale: 0.75, ease: 'power1.inOut', repeat: 1, yoyo: true, transformOrigin: '50% 82%'})
  


    d.tl6 = gsap.timeline({repeat: -1, repeatDelay: 1});
    d.tl6.to(o.cokeCont, 0.05, {rotation: 2, ease: 'power2.out'})
    d.tl6.to(o.cokeCont, 0.1, {rotation: -2, ease: 'power2.out'})
    d.tl6.to(o.cokeCont, 0.1, {rotation: 2, ease: 'power2.out'})
    d.tl6.to(o.cokeCont, 0.05, {rotation: 0, ease: 'power2.out'})
    
  }

  function events(){

    o.ctaArea1.addEventListener("click", startGame);
    o.ctaArea2.addEventListener("click", ctaFunction);


    return Draggable.create(o.none, {edgeResistance: 0.93,
      onPress:function() { 
      },
      onDrag: function(e) {
      },onRelease:function(e){
        gsap.set(this.target, {x: 0, y: 0})
        this.target.style.zIndex = 50;
      }
    })

  }

  // function onPress(el){
  //   if(!d.drag.ft){
  //     d.drag.ft = true;
  //     gsap.to(o.cursorCont, 0.3, {autoAlpha: 0, onComplete: function(){
  //       d.cursorTl.kill();
  //     }})
  //   }
  //   d.drag.cur.x = el.x;
  //   d.drag.sum.x = 0
  //   startEvent('drag');

  //   gsap.to(el.target, 0.15, {scale: 1.25, ease: 'power2.out'})
  // }

function prevent(e){
   e.preventDefault();
}


function startGame(){

  gsap.to(o.cpin, {x: -500, opacity: 0});
  startEvent('main');
  if(d.ai.int) clearInterval(d.ai.int);
  if(d.int2) clearInterval(d.int2);
  clearTimeout(d.startTO);
  d.gameStarted = true;

  for(var i=0; i<d.tls.length; i++){
    if( d.tls[i].active ){
      d.tls[i].kill();
    }
  }

  var dx = 30;
  gsap.set(o.cursor, {marginTop: -45, x: -dx, scale: 0.55, display: 'block'})
  gsap.from(o.cursor, 0.7, {delay: 1, scale: 0, ease: 'back.out'})
  d.cursorTl = gsap.to(o.cursor, {x: dx, ease: 'power2.inOut', repeat: -1, yoyo: true})

  o.ctaArea1.removeEventListener("click", startGame);
  o.ctaArea1.style.display = 'none';
  d.tl1.kill();
  if(d.tl3) d.tl3.kill();
  if(d.tl2) d.tl2.kill();
  if(d.tl4) d.tl4.kill();
  if(d.tl5) d.tl5.kill();
  if(d.tl6) d.tl6.kill();

  gsap.set(o.time_icon_rodykles, {x: 18, y: 9, scale: 0.8})
  gsap.to(o.time_icon_rodykles, 0.6, {rotation: 360, ease: 'none', repeat: -1})

  gsap.to(o.cta1Cont, 0.3, {scale: 0, ease: 'power2.in', transformOrigin: '50% 82%'})

  gsap.to(o.g1, 0.4, {scale: 0, ease: 'power2.in'})
  gsap.to([o.coke1, o.g1], 0.65, {delay: 0.0, x: -500, rotation: 0, ease: 'power2.in'})
  gsap.to([o.bg_add_1], 0.65, {delay: 0.1, x: -500, ease: 'power2.in'})


  setTimeout( deleteBoard, 100 );
  setTimeout( createBoard, 500 );
  setTimeout( startCountdown, 1500 );

  o.game_ui.style.display = 'block';
  gsap.from(o.game_ui, 0.5, {delay: 0.4, x: 500, ease: 'power2.out'})

  gsap.set([o.score_box], {scale: 0.5, transformOrigin: '100% 0%'})
  gsap.set([o.time_bar], {scale: 0.5, transformOrigin: '0% 100%'})
}

function startCountdown(){
  // gsap.to(d.timer, d.timer.tot, {cur: 0, onComplete: function(){

  // }})

  var int_size = 300;

  d.timer.int = setInterval( function(){


    if(d.timer.pause <= 0){

      d.timer.cur += -int_size*0.001;

      var proc = d.timer.cur / d.timer.tot;
      var w = proc * d.timer.width;
      gsap.to(o.time_counter, 0.2, {width: w, ease: 'power2.inOut'})

      if(d.timer.cur <= 0){
        clearInterval( d.timer.int );
        endGame();
      }

    }

  }, int_size );

}

function endGame(){
  startEvent('seen_all');
  gsap.to(o.cursorCont, 0.3, {autoAlpha: 0, onComplete: function(){
    d.cursorTl.kill();
  }})
  d.endGame = true;
  for(var i=0; i<d.tiles.list.length; i++){
    var tile = d.tiles.list[i];
    gsap.to(tile.el, 0.35, {delay: 0.2 * Math.random(), scale: 0, ease: 'back.in'})
  }
  gsap.to(o.game_ui, 0.7, {delay: 0.1, x: -500, ease: 'power2.in', onComplete: function(){
    o.game_ui.style.display = 'none';
    o.gameContainer.style.display = 'none';
  }})


  setTimeout( showLastFrame, 1000 );
}

function showLastFrame(){
  o.score_text2.innerHTML = d.score.cur + ' points';
  o.slide2.style.display = 'block';
  gsap.from(o.bg_add_2Cont, 0.8, {scale: 1.3, ease: 'power2.out', onComplete: function(){

    gsap.to(o.bg_add_2Cont, 3, {scale: 0.95, ease: 'power1.inOut', repeat: -1, yoyo: true})
    gsap.to(o.bg_add_2Cont, 2.5, {rotation: 3, ease: 'power1.inOut', repeat: -1, yoyo: true})

  }})

  gsap.set(o.coke2, {scale: 0.65, transformOrigin: '50% 50%'})

  gsap.from(o.block, 0.8, {delay: 0.1, scale: 0, ease: 'back.out'})
  gsap.from(o.coke2, 0.8, {delay: 0.25, scale: 0, ease: 'back.out'})
  gsap.from(o.cta2Cont, 0.8, {delay: 0.4, scale: 0, ease: 'back.out', transformOrigin: "50% 85%"})

    d.tl6 = gsap.timeline({repeat: -1, repeatDelay: 1});
    d.tl6.to(o.cta2Cont, 0.05, {rotation: 2, ease: 'power2.out', transformOrigin: "50% 85%"})
    d.tl6.to(o.cta2Cont, 0.1, {rotation: -2, ease: 'power2.out'})
    d.tl6.to(o.cta2Cont, 0.1, {rotation: 2, ease: 'power2.out'})
    d.tl6.to(o.cta2Cont, 0.05, {rotation: 0, ease: 'power2.out'})

  gsap.set([o.g2, o.g3], {scale: 0.6})

  gsap.to(o.g2, 1, {scale: 0.1, yoyo: true, repeat: -1, ease: 'power1.inOut'})
  gsap.to(o.g3, 1.3, {scale: 0.1, yoyo: true, repeat: -1, ease: 'power1.inOut'})


}

var lt = new Date();   

function loop(){
  requestAnimFrame( loop );

  if( d.loop ){

    ctx.clearRect(0, 0, d.canvas.w, d.canvas.h)
    drawParticles();

    var ct = new Date();
    var dt = ct - lt;
    lt = ct;

    d.timer.pause += -dt;

  }
}







// CREATE BOARD

function deleteBoard(){
  for(var i=0; i<d.tiles.list.length; i++){
    var tile = d.tiles.list[i];
    tile.draggable[0].disable();
    tile.el.remove();
  }
  d.tiles.list = [];
  d.score.cur = 0;
  o.score_text1.innerHTML = 0;
  d.matchFound = false;
  if(d.dropTl) clearTimeout( d.dropTl );

  gameContainer.style.zIndex = 100;
}

  function createBoard(){
    // console.log('createBoard', d.tiles.list.length)
    const rand_grid = generateGrid();
    // console.log('rand_grid', rand_grid);

    var count = 0;
    for(var r=0; r<4; r++){
      for(var c=0; c<4; c++){
        var rand_type = rand_grid[r][c]
        var tile = createTile(r, c, count, rand_type)
        count++;
        var del = 0.35 * Math.random();
        gsap.from(tile.el, 0.5, {delay: del, scale: 0, ease: 'back.out'})
      }
    }
  }
      
  function createTile(r, c, num, rand_type){
    var type
    if(rand_type != null){
      type = rand_type;
    } else {
      type = Math.floor( d.tiles.types * Math.random() )
    }
    var pos = getTilePos(r, c);

    const newTile = document.createElement("div");
    newTile.classList.add("tile");
    newTile.classList.add("tileSize");
    newTile.classList.add("tile");

    const tilePic = document.createElement("div");
    tilePic.classList.add("abs");
    tilePic.classList.add("noEvents");
    tilePic.classList.add("tilePic");
    tilePic.classList.add("tileSize");
    tilePic.classList.add("c"+(type+1));
    gsap.set(tilePic, {scale: d.tiles.typeScale[type]})

    const tileHl = document.createElement("div");
    tileHl.classList.add("abs");
    tileHl.classList.add("noEvents");
    tileHl.classList.add("tileHl");
    tileHl.classList.add("tileSize");
    tileHl.style.display = 'none';

    gsap.set(newTile, {left: pos.x, top: pos.y});
    newTile.appendChild(tilePic);
    newTile.appendChild(tileHl);
    o.grid.appendChild(newTile);

    var bounds = getBounds(r, c);

    var t = {
      el: newTile,
      r: r,
      c: c,
      num: num,
      type: type,
      bounds: {
        left: c == 0 ? 0 : -d.tiles.boundAmm,
        right: c == d.tiles.size.w-1 ? 0 : d.tiles.boundAmm,
        up: r == 0 ? 0 : -d.tiles.boundAmm,
        down: r == d.tiles.size.h-1 ? 0 : d.tiles.boundAmm,
      },
    }


    initDrag( t )
    d.tiles.list.push( t )

    return t;
  }



/////////////////// D R A G ////////////////////////

var startX, startY;
var dragFt = false;

  function initDrag( tile ){ 

    tile.draggable = addDraggable(tile);

  }

  function addDraggable(tile){

    return Draggable.create(tile.el, {edgeResistance: 0.93,
        onPress:function() { 
          onPress(this);
        },
        onDrag: function(e) {
          onDrag(this, tile);
        },onRelease:function(e){
          onRelease(this);
        }
      })
  }


  function onPress(el){
    if(!d.drag.ft){
      d.drag.ft = true;
      gsap.to(o.cursorCont, 0.3, {autoAlpha: 0, onComplete: function(){
        d.cursorTl.kill();
      }})
    }
    d.drag.cur.x = el.x;
    d.drag.sum.x = 0
    startEvent('drag');

    gsap.to(el.target, 0.15, {scale: 1.25, ease: 'power2.out'})
  }

  function onDrag(el, tile){
    var curX = el.x;
    var curY = el.y;
    d.drag.cur.x = curX;
    d.drag.cur.y = curY;

    // console.log(el.x, el.y)
    // var tile = d.tiles.list[num]
    // var tile = getTileByRC[num]
    // var tile = getTileByNum(num)
    var bounds = tile.bounds
    // console.log(tile.r, tile.c, bounds)

    var dec = 0.09;


    if(el.x < bounds.left) el.x = bounds.left   - (bounds.left - el.x) * dec;
    if(el.x > bounds.right) el.x = bounds.right - (bounds.right - el.x) * dec;
    if(el.y < bounds.up) el.y = bounds.up       - (bounds.up - el.y) * dec;
    if(el.y > bounds.down) el.y = bounds.down   - (bounds.down - el.y) * dec;

    gsap.set(tile.el, {x: el.x, y: el.y})

    var dn = d.tiles.dragNeed
    if(el.x > dn || el.x < -dn || el.y < -dn || el.y > dn){
      // drop draggable
      if(Math.abs(el.x) > Math.abs(el.y)){
        // hor drop
        if(el.x > 0){
          // right drop
          doDrop('right', tile)
        } else {
          // left drop
          doDrop('left', tile)
        }
      } else {
        // ver drop
        if(el.y > 0){
          // down drop
          doDrop('down', tile)
        } else {
          // up drop
          doDrop('up', tile)
        }
      }
    }
  }

  function doDrop(side, tile){
    var r = tile.r;
    var c = tile.c;
    // console.log(tile.draggable)
    tile.draggable[0].disable();
    // console.log('doDrop', side)
    var dest_tile = {c: tile.c, r: tile.r}
    switch(side){
      case 'left':
        dest_tile.c += -1;
        break;
      case 'right':
        dest_tile.c += 1;
        break;
      case 'up':
        dest_tile.r += -1;
        break;
      case 'down':
        dest_tile.r += 1;
        break;
    }

    var dest_tile = getTileByRC(dest_tile.r, dest_tile.c)

    // gsap.to(dest_tile.el, 1, {scale: 2})

    // console.log(tile.r, tile.c, dest_tile.r, dest_tile.c)
    // console.log(tile.num, dest_num)

    var tilePos = getTilePos(tile.r, tile.c);
    var destPos = getTilePos(dest_tile.r, dest_tile.c);

    // console.log(tilePos, destPos)

    var dur = 0.35;
    var ease = 'power1.out'
    gsap.to(tile.el, dur, {x: 0, y: 0, left: destPos.x, top: destPos.y, scale: 1, ease: ease})
    gsap.to(dest_tile.el, dur, {x: 0, y: 0, left: tilePos.x, top: tilePos.y, ease: ease, onComplete: function(){
      tile.draggable[0].enable();

      //swap tile data
      var dest_num = dest_tile.num;
      dest_tile.num = tile.num;
      tile.num = dest_num;

      tile.r = dest_tile.r;
      tile.c = dest_tile.c;
      dest_tile.r = r;
      dest_tile.c = c;


      tile.bounds = getBounds(tile.r, tile.c)
      dest_tile.bounds = getBounds(dest_tile.r, dest_tile.c)

      // initDrag( tile )
      // initDrag( dest_tile )

      checkGrid()
    }})

  }

  function checkGrid(){
    // console.log('checkGrid')

    if(!d.endGame){

      var count = 0;

      for(var r = 0; r<d.tiles.size.h; r++){
        for(var c = 0; c<d.tiles.size.w; c++){

          if(!d.matchFound){
            var tile = getTileByRC(r, c)
            // console.log(r, c+1, tile)
            var type = tile.type;

            // console.log(tile)

            // check hor
            if(c <= d.tiles.size.w-3){
              var nextTile = getTileByRC(r, c+1)
              var nextType = nextTile.type;

              var nextTile2 = getTileByRC(r, c+2)
              var nextType2 = nextTile2.type;

              var nextType3 = -1;
              var nextTile3;

              if(c+3 < d.tiles.size.w){
                nextTile3 = getTileByRC(r, c+3)
                nextType3 = nextTile3.type;
              }

              // console.log(type, nextType, nextType2, nextType3);

              if(type == nextType && type == nextType2 && type == nextType3){
                onMatchFound( [tile, nextTile, nextTile2, nextTile3] );
              } else if(type == nextType && type == nextType2){
                onMatchFound( [tile, nextTile, nextTile2] );
              }
            }

            // check ver
            if(r <= d.tiles.size.h-3){
              var nextTile = getTileByRC(r+1, c)
              var nextType = nextTile.type;

              var nextTile2 = getTileByRC(r+2, c)
              var nextType2 = nextTile2.type;

              var nextType3 = -1;
              var nextTile3;
              if(r+3 < d.tiles.size.h){
                nextTile3 = getTileByRC(r+3, c)
                nextType3 = nextTile3.type;
              }

              if(type == nextType && type == nextType2 && type == nextType3){
                onMatchFound( [tile, nextTile, nextTile2, nextTile3] );
              } else if(type == nextType && type == nextType2){
                onMatchFound( [tile, nextTile, nextTile2] );
              }
            }
            count++;

          }

        }
      }

      // on end // if no match found, we do nothing
      // if(!d.matchFound){
        // checkGrid()
      // }

    }
  }

  function onMatchFound( els ){
    // console.log('onMatchFound')
    if(d.gameStarted) startEvent('matchFound');
    // console.log('onMatchFound', els)

    d.timer.pause = d.timer.pauseAmm;

    if(d.gameStarted){
      try {
        navigator.vibrate([30, 30, 30]);
      } catch (error) {
        console.error(error);
      }
    }


    spawnParticles( els );

    d.matchFound = true;
    var addDel = 0.1;
    var dur = 0.5;

    for(var i=0; i<els.length; i++){
      var tile = els[i];
      // console.log(tile)
      var l = d.tls.length;

      var tl = gsap.to(tile.el, 0.35, {delay: i*addDel, scale: 0.3, ease: 'back.in', 
        onComplete: removeTile,
        onCompleteParams:[tile, l],
      })
      d.tls.push( tl );

      var hl = tile.el.getElementsByClassName('tileHl');
      // console.log(tile.el)
      // console.log(hl)
      hl[0].style.display = 'block';
      gsap.fromTo(hl[0], 0.2, {scale: 1.4, opacity: 0}, {delay: 0.03 * i, scale: 1.05, opacity: 1, ease: 'power2.out'})
    }

    d.score.cur += 30 * els.length;

    setTimeout( function(){
      o.score_text1.innerHTML = d.score.cur;
      gsap.fromTo(o.score_text1, 0.3, {scale: 1.8}, {scale: 1, ease: 'power2.out'})
    }, 200)

    d.int2 = setTimeout( function(){

      if(!d.endGame){
        d.matchFound = false;
        // checkGrid();
        // dropTiles(els)
        doTileDropCheck();

        // console.log(d.tiles.list)
      }

    }, (0.1 + dur + (els.length-1) * addDel) * 1000 )

  }




  var found_tile_adj = false

  function doTileDropCheck(){
    // console.log('doTileDropCheck')

    if(!d.endGame){

      found_tile_adj = false

      for(var r=0; r<4; r++){
        for(var c=0; c<4; c++){
          checkTile(r, c);
        }
      }

      // console.log('found_tile_adj', found_tile_adj)
      if(found_tile_adj) {
        d.dropTl = setTimeout(doTileDropCheck, 300)
      } else {
        checkGrid();
      }
    }
  }

  function checkTile(r, c){
    var tile = getTileByRC(r, c);

    if(!tile){

      var tile_above = getTileByRC(r-1, c);

      if(r-1 < 0){
        dropNewTile(r, c);
        found_tile_adj = true;
      } else if(tile_above){
        // console.log('tile_above', tile_above)
        dropTileDown(tile_above, r, c);
        found_tile_adj = true;
      }

    }
  }

  function dropTileDown(tile, r, c){
    tile.r = r;

    tile.bounds = getBounds(r, c);

    var pos = getTilePos(r, c)
    // console.log(r, c, pos)
    gsap.to(tile.el, 0.2, {left: pos.x, top: pos.y, x: 0, y: 0, ease: 'power1.inOut'})
  }

  function dropNewTile(r, c){
    var tile = createTile(r, c, 1000 + Math.round(10000*Math.random()));
    gsap.from(tile.el, 0.3, {scale: 0, ease: 'back.out'})
  }

  function removeTile(data, l){
    // console.log('removeTile', data)

    var num = d.tiles.list.map(function(e) { return e.num; }).indexOf(data.num);
    // console.log(data.num, num)

    d.tiles.list.splice(num, 1);
    data.el.remove();

    d.tls[l].active = false;
  }

  function onRelease(el, endPos){
    var curX = startX + el.x;
    var curY = startY + el.y;
    d.drag.sum.x += d.drag.cur.x
    d.drag.cur.x = 0
    // TweenMax.to(el.target, 0.05, {x: 0, y: 0, rotation: 0, ease: Power1.easeOut})
    gsap.to(el.target, 0.1, {x: 0, y: 0, scale: 1})
  }



////////////////// F U N C T I O N S //////////////////////
///////////////////////////

// SHAKE //


function vibrate(array){
  if( d.drag.ft ){
    try {
      window.navigator.vibrate(array);
    }
      catch (e) {
    }
  }
}

  function activateTap(mode){
    if(mode){
      o.d2.addEventListener("click", tapFunction);
    } else {
      o.d2.removeEventListener("click", tapFunction);
    }
  }

  function activateButtons(){
    o.ctaArea.style.display = 'block';
    o.ctaArea.addEventListener("click", ctaFunction);
  }

  function removeButtons(){
    o.ctaArea.style.display = 'none';
    o.ctaArea.removeEventListener("click", ctaFunction);
  }

/////////////////////////////


  function smoothOriginChange(element, transformOrigin) {
    if (typeof(element) === "string") {
      element = document.querySelector(element);
    }
    var before = element.getBoundingClientRect();
    element.style.transformOrigin = transformOrigin;
    var after = element.getBoundingClientRect();
    TweenLite.set(element, {x:"+=" + (before.left - after.left), y:"+=" + (before.top - after.top)});
}

  function getCssProperty(elmId, property){
     var elem = document.getElementById(elmId);
     return parseInt( window.getComputedStyle(elem,null).getPropertyValue(property) );
  }

  function getTransformValue(element, property){       
      var values = element.style.transform.split(")");
      for (var key in values){
          var val = values[key];              
          var prop = val.split("(");          
          if (prop[0].trim() == property)
              return prop[1];
      }                   
      return false;           
  }

  function pitagor(a, b){ return Math.pow( ( Math.pow( a , 2) + Math.pow( b , 2 ) ) , 0.5) }
  function easeInCubic(t) { return t*t*t }

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
              window.setTimeout(callback, 1000 / 60);
          };
})();


var assetsCur = 0;
var assetsTotal = 0;
var allLoaded = false;

//

function initLoad(){
  prepareElements();
  loadAsset(assets.init);
}

function prepareElements(){
  // id
  var names = oNames.id.split(' ');
  for(var i=0; i<names.length; i++){
    var name = names[i];
    o[name] = document.getElementById(name);
  };
}


function loadOther(){
    assetsTotal =  Object.size(assets);
    // console.log("assetsTotal");
    for (var prop in assets) {
      if(prop != "init"){
        loadAsset(assets[prop]);
      }
    }
}

function loadMid(){
    loadAsset(assets.mid);
}

function loadEnd(){
    loadAsset(assets.end);
}

function loadAsset(a){
    a.cur_asset_pack = 0;
    a.asset_packs = a.length;

  for(var k=0; k<a.asset_packs; k++){
      var names = a[k].names.split(" ");
      a[k].curLoad = 0;

      // console.log( a[k] )

      if( a[k].type == "seq" ){


        for( var z=a[k].start; z<a[k].start+a[k].amm; z++){

          var id = a[k].names + z;
          // console.log("id", id)

          var img = new Image();
          img.myCustomData = {name: a[k].names, index: z, id: id};

          img.onload = function() {

            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.backgroundImage = "url(" + this.src + ")";
            div.style.opacity = 0;
            div.setAttribute("id", this.myCustomData.id)
            o.seqAll.appendChild(div);

            o[this.myCustomData.id] = div;

          }

          img.src = assets_url + a[k].folder + "/" + id + "." + a[k].format;

        }

      } else {
        for (var i=0; i<names.length; i++){
            var img = new Image();
            img.myCustomData = {total: names.length, a:a, name:names[i], numb: k};
            img.onload = function() {
              o[this.myCustomData.name] = document.getElementById(this.myCustomData.name);
              
              var type = this.myCustomData.a[this.myCustomData.numb].type;
              var elAmm = 1;
              if (type == "class"){
                o[this.myCustomData.name] = document.getElementsByClassName(this.myCustomData.name);
                elAmm = o[this.myCustomData.name].length;
              }

              for(var j=0;j<elAmm;j++){
                // console.log(this.myCustomData.name);
                var el;
                if (type == "class"){
                  el = o[this.myCustomData.name][j];
                  el.style.backgroundImage = "url(" + this.src + ")";
                } else if (type == "id") {
                  el = o[this.myCustomData.name];
                  el.style.backgroundImage = "url(" + this.src + ")";
                } else if (type == "src") {
                  // console.log( this.src );
                  el = o[this.myCustomData.name];
                  o[this.myCustomData.name].src = this.src;
                }

                el.style.position = "absolute";
                el.style.width = this.width + "px";
                el.style.height = this.height + "px";

                if(this.myCustomData.a[this.myCustomData.numb].scale != 1){
                  var scale = 1/this.myCustomData.a[this.myCustomData.numb].scale;
                  TweenMax.set(el, {scale: scale, left: -this.width/4, top: -this.height/4, transformOrigin: '50% 50%'});
                }
              }

              countAsset( this.myCustomData.a, this.myCustomData.numb, this.myCustomData.total );
            };
            img.src = assets_url + names[i] + "." + a[k].format;
        }
      }
  }
}

function countAsset(asset, o, total){
  // console.log( "countAsset", asset[o].curLoad, total );

  asset[o].curLoad++;
  if(asset[o].curLoad == (total) ) {
    // console.log("proceed", asset.cur_asset_pack, asset.asset_packs)
    asset.cur_asset_pack++;
    // console.log( asset.cur_asset_pack, asset.asset_packs )
    if(asset.cur_asset_pack == (asset.asset_packs)){
      assetSetLoaded();
    }
  }
}

function assetSetLoaded(){
    // console.log("assetSetLoaded");
    assetsCur++;
    if(assetsCur == 1){
      // adArea.style.opacity = 1;
      init();
      TweenMax.to(adArea, 0.3, {delay: 0.05, opacity: 1});
      // loadMid();
      loadOther();
    // } else if(assetsCur == 2) {
      // loadEnd();

      // initDrag();
    } else if(assetsCur == assetsTotal){
      allLoaded = true;
    }
}

//

Object.size = function(obj) { // get objects ammount in var
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


if (window.addEventListener) {
    window.addEventListener('load', initLoad(), false);
} else if (window.attachEvent) {
    window.attachEvent('onload', initLoad());
}

