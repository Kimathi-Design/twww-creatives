function generateGrid() {
    const TYPES = [0, 1, 2, 3];
    let grid = new Array(d.tiles.size.h).fill(null).map(() => new Array(d.tiles.size.w).fill(null));

    function isValidGrid() {
        // Check rows and columns for more than two similar neighbours
        for (let i = 0; i < d.tiles.size.h; i++) {
            for (let j = 0; j < d.tiles.size.w - 2; j++) {
                if (grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2]) return false;
                if (grid[j][i] === grid[j + 1][i] && grid[j][i] === grid[j + 2][i]) return false;
            }
        }
        return true;
    }

    function fillGrid() {
        for (let i = 0; i < d.tiles.size.h; i++) {
            for (let j = 0; j < d.tiles.size.w; j++) {
                let availableTypes = TYPES.slice();
                
                // Avoid the same type in the previous two cells of the row and column
                if (i > 1) {
                    const [first, second] = [grid[i - 2][j], grid[i - 1][j]];
                    if (first === second) availableTypes = availableTypes.filter(type => type !== first);
                }
                if (j > 1) {
                    const [first, second] = [grid[i][j - 2], grid[i][j - 1]];
                    if (first === second) availableTypes = availableTypes.filter(type => type !== first);
                }
                // console.log(availableTypes);
                grid[i][j] = availableTypes[Math.floor(Math.random() * availableTypes.length)];
            }
        }
    }

    do {
        fillGrid();
    } while (!isValidGrid());

    return grid;
}





function spawnParticles( els ){

    for(var i=0; i<els.length; i++){
        var el = els[i];
        var pos = getTilePos(el.r, el.c);
        var rAmm = 6 + Math.floor( 8 * Math.random() )

        for(var j=0; j<rAmm; j++){
            spawnParticle(pos);
        }

    }



}

function spawnParticle(pos){
    // console.log( pos );

    var x = pos.x + d.tiles.w/2 + 20 * (0.5-Math.random());
    var y = pos.y + d.tiles.h/2 + 20 * (0.5-Math.random());

    var p = {
        active: true,
        x0: x, 
        y0: y,
        x: x,
        y: y,
        dx: 80 * ( 0.5 - Math.random() ),
        dy: 80 * ( 0.5 - Math.random() ),
        size: 1 + 2 * Math.random(),
        opac: 0.35 + 0.65 * Math.random(),
    }

    var dur = 1.0 + 1.0 * Math.random();

    gsap.to(p, dur*0.4, {x: "+="+p.dx*0.6, y: "+="+p.dy*0.6, ease: 'power1.out'})
    gsap.to(p, dur*0.6, {delay: dur*0.4, x: "+="+p.dx*0.4, y: "+="+p.dy*0.4, ease: 'power1.in'})

    gsap.from(p, dur/2, {delay: 0, size: 0, ease: 'power3.out'});
    gsap.to(p, dur/2, {delay: dur/2, size: 0, opac: 0, ease: 'power2.in', onComplete: function(){

        p.active = false;

    }})

    d.dots.list.push( p );
}

function drawParticles(){


    for(var i=0; i<d.dots.list.length; i++){
        var p = d.dots.list[i];
        if(p.active){
            drawParticle(p);
        }
    }

    for(var i=0; i<d.dots.list.length; i++){
        var p = d.dots.list[i];
        if(!p.active){
            d.dots.list.splice(i, 1)            
        }
    }


}

function drawParticle(p){

    ctx.globalAlpha = p.opac;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    ctx.fill();

}








function getTilePos(r, c){
  var mx = (c) * d.tiles.m;
  var my = (r) * d.tiles.m;
  var x = c * d.tiles.w + mx;
  var y = r * d.tiles.h + my;
  return {x: x, y: y};
}


function getTileNum(r, c){
  var sw = d.tiles.size.w
  var sh = d.tiles.size.h

  var num = r * sw + c;

  return num;
}


function getBounds(r, c){
  return {
        left: c == 0 ? 0 : -d.tiles.boundAmm,
        right: c == d.tiles.size.w-1 ? 0 : d.tiles.boundAmm,
        up: r == 0 ? 0 : -d.tiles.boundAmm,
        down: r == d.tiles.size.h-1 ? 0 : d.tiles.boundAmm
  }
}

function getTileByNum(num){
  var result = d.tiles.list.filter(obj => {
    return obj.num === num
  })
  // console.log(result[0])
  return result[0];
}

function getTileByRC(r, c){

  var tile = d.tiles.list.filter(function(v, i) {
    return (v.r == r && v.c == c);
  })

  return tile[0]
}