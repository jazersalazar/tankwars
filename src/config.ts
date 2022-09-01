export const Config = {
    game: {
        backgroundColor : 0x505050,
        cells           : 50,
        rows            : 50,
        cellSize        : 35,
    },

    textures: {
        tanks: {
            red     : 'tank_red.png',
            green   : 'tank_green.png',
            blue    : 'tank_blue.png',
        },
    },

    tanks: {
        red: {
            bulletDamage    : 10,
            bulletCount     : 2,
        },
        green: {
            bulletDamage    : 25,
            bullet: 1,
        },
        blue: {
            bulletDamage    : 20,
            bulletCount     : 3,
        },
    },

    hays: {
        health : 100,
    },
}