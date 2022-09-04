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

    hays: {
        health  : 100,
        texture : 'haystack.png', 
    },

    walls: {
        texture : 'wall.png',
    }
}