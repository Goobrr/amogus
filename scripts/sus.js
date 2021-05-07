module.exports = extend(Weapon, {
    rotate: true,
    mirror: false,
    reload: 600,
    x: 0,
    y: 0,
    shootSound: Sounds.none,
    bullet: extend(BasicBulletType, {
        damage: 0,
        width: 0.1,
        height: 0.1,
        instantDisappear: true,
        speed: 0,
    
        hitEffect: Fx.none,
        shootEffect: Fx.none,
        smokeEffect: Fx.none,
        despawnEffect: Fx.none,
    })
});

