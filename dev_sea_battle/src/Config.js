export const config = {
    fieldSize: 10,
    ships: {
        battleship: {
            size: 4,
            amount: 1,
            units: [],
            destroyed: []
        },
        cruiser: {
            size: 3,
            amount: 2,
            units: [],
            destroyed: []
        },
        destroyer: {
            size: 2,
            amount: 3,
            units: [],
            destroyed: []
        },
        boat: {
            size: 1,
            amount: 4,
            units: [],
            destroyed: []
        }
    },
    safeValue: 5,
    timeAIIsWaiting: 500,
    timerStart: 30,
    defaultHeaders: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    timeLoadChatMessages: 2000
};