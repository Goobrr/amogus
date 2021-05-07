let killRange = 48;
let killCooldown = 600;

let amogus = extend(UnitType, "amogus", {
    health: 6969,
    hitSize: 16,
    speed: 1,
    drawCell: false,

    init(){
        if(!this) return;
        this.super$init()
        this.killCooldown = 0;
        this.target = null;
    },

    update(u){
        let aimX = Math.floor(u.mounts[0].aimX);
        let aimY = Math.floor(u.mounts[0].aimY);
        let relativeX = aimX - u.x;
        let relativeY = aimY - u.y;
        this.target = Units.closest(u.team, aimX, aimY, 8, t => {
            return (!t.dead && (t != u)) && Mathf.within(relativeX, relativeY, killRange);
        });

        this.killCooldown -= Time.delta;
        this.killCooldown = Mathf.clamp(this.killCooldown, 0, killCooldown);

        // this can kill multiple units for some reason but i dont give a shit
        if(u.isShooting && (this.target != null) && (this.killCooldown <= 0)){
            this.target.kill();
            u.vel.set(u.vel.x + (relativeX/2), u.vel.y + (relativeY/2));
            this.killCooldown = killCooldown;

            let angle = Angles.angle(u.x, u.y, this.target.x, this.target.y);
            require("amogusEffect").at(this.target.x, this.target.y, angle);
        }
    },

    draw(u){
        this.super$draw(u);
        if(this.target == null)return;
        Draw.color(Pal.remove);
        Draw.z(Layer.overlayUI);
        
        for(let i = 0; i < 4; i++){
            let rot = i * 90 + 45 + (-Time.time) % 360;
            let length = this.target.type.hitSize + 2;
            let x = Angles.trnsx(rot, length);
            let y = Angles.trnsy(rot, length);
            Draw.rect("select-arrow", this.target.x + x, this.target.y + y, length / 1.9, length / 1.9, rot - 135);
        };
    }

});

amogus.constructor = () => extend(MechUnit, {});
amogus.weapons.add(require("sus"));