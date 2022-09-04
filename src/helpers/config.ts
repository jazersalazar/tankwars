export const Config = {
    game: {
        columns         : 50,
        rows            : 50,
        cellSize        : 35,
    },

    tanks: {
        red: {
            bulletDamage    : 10,
            bulletCount     : 2,
            texture         : 'tank_red.png',
        },
        green: {
            bulletDamage    : 25,
            bulletCount     : 1,
            texture         : 'tank_green.png',
        },
        blue: {
            bulletDamage    : 20,
            bulletCount     : 3,
            texture         : 'tank_blue.png',
        },
    },

    bullets: {
        texture         : 'bullet.png',
        speed           : 30,
        shootingRate    : 1,
    },

    hays: {
        health  : 100,
        texture: {
            normal      : 'haystack.png',
            destroyed   : 'haystack_destroyed.png',
        },
    },

    walls: {
        texture : 'wall.png',
    },
}