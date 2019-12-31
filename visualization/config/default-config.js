defaultConfig = {
    machines: {
        types: ["none",
        "Robotic Arm", "Hydraulic Press"]
    },
    lines:{
        initialX: 76,
        finalX: -75,
        lineAY: 15,
        lineBY: -14.5,
        lineZ: 6
    },
    timeflow:15, //framerate, when timeflow==1000 frames are updated every second
    speed:5 //number of simulation seconds that pass every real second
};