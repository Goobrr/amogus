module.exports = new Effect(50, e => {
    e.scaled(e.lifetime / 2, s => {
        Draw.color(Color.white, Pal.remove, s.finpow());
        Lines.stroke(2.5 * (1 - s.finpow()));
        Lines.circle(e.x, e.y, 40 * s.finpow());
    });
    
    Draw.color(Color.gray);

    for(let i = -1; i <= 1; i+=2){
        Angles.randLenVectors(e.id, 3, 50 * e.finpow(), e.rotation + (45 * i), 15, (x, y) => {
            Fill.circle(e.x + x, e.y + y, 6 * e.fout());
        });
    };

    e.scaled(e.lifetime / 1.5, s => {
        Draw.color(Color.white, Pal.remove, s.fin());
        Drawf.tri(e.x, e.y, 10 * s.fout(), 70, e.rotation);
        Drawf.tri(e.x, e.y, 10 * s.fout(), 20, e.rotation-180);
    });
});