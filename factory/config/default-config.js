defaultConfig = {
    tables: {
        scale: 0.5,
        total: 8,
        positions: [
            { x: 30, y: 0, z:15 },
            { x: 10, y: 0, z:15 },
            { x: -10, y: 0, z:15 },
            { x: -30, y: 0, z:15 },
            { x: 30, y: 0, z:-15 },
            { x: 10, y: 0, z:-15 },
            { x: -10, y: 0, z:-15 },
            { x: -30, y: 0, z:-15 }
        ]
    },
    machines: {
        total: 8,
        types: ["Robotic Arm"],
        positions: [
            { x: -40, y: -20, z: 10 },
            { x: -20, y: -20, z: 10 },
            { x: 0, y: -20, z: 10 },
            { x: 20, y: -20, z: 10 },
            { x: -40, y: 10, z: -10 },
            { x: -20, y: 10, z: -10 },
            { x: 0, y: 10, z: -10 },
            { x: 20, y: 10, z: -10 },
        ]
    },
    placeholders: {
        total: 8,
        positions: [
            { x: -40, y: 0, z: 25 },
            { x: -20, y: 0, z: 25 },
            { x: 0, y: 0, z: 25 },
            { x: 20, y: 0, z: 25 },

            { x: -40, y: 0, z: -5 },
            { x: -20, y: 0, z: -5 },
            { x: 0, y: 0, z: -5 },
            { x: 20, y: 0, z: -5 }
        ]
    }
};