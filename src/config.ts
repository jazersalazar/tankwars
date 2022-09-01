export const Config = {
    game: {
        backgroundColor: 0x505050,
        cells: 50,
        rows: 50,
        cellSize: 35,
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
            damage: 10,
            bullet: 2,
        },
        green: {
            damage: 25,
            bullet: 1,
        },
        blue: {
            damage: 20,
            bullet: 3,
        },
    },

    hays: {
        health: 100,
    },
}