/** 
 * **************************************************************************************************
 * CONSTANTS
 * **************************************************************************************************
 *  */

const CONFIG = defaultConfig;
const MODELS = CONFIG.machines.types;
const API_URL = configurationsApi.visualizationApi.url;

const LINE = CONFIG.lines;

/** 
 * **************************************************************************************************
 * MAIN CONTROlS AND CALLS
 * **************************************************************************************************
 **/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var gui = new dat.GUI();

var groupSpoon = new THREE.Group();

var linesX = LINE.initialX;
var lineAY = LINE.lineAY;
var lineBY = LINE.lineBY;
var linesZ = LINE.lineZ;

var nProductionLines;

// Axis Helper
var axesHelper = new THREE.AxesHelper(10);
var currentTime;
var productionLines;
var machines = [];
var machinesWithPlan;
var planFiles;
var machineTypes;
var tasks = [];
var products = [];

var productionAnimation;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Add element to the scene
scene.add(axesHelper);

this.productionLines = getProductionLines();
this.machineTypes = getMachineTypes();
this.planFiles = getPlanFiles();

buildWidgets();
buildScene();

//controls.update() must be called after any manual changes to the camera's transform
camera.position.z = 50;
camera.position.y = 20;
controls.update();
animate();



/** 
 * **************************************************************************************************
 * FUNCTIONS
 * **************************************************************************************************
 *  */

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


function buildScene() {
    machines = [];
    buildFloor();
    buildTables();
    buildMachines();

    scene.add(LigthHelper.ambientLight());
    scene.add(LigthHelper.directionalLigth());

    Util.dragAndDrop();
}

function buildFloor() {
    let floor = new Floor({ name: 'floor', color: 0x42423e, receiveShadows: true });
    scene.add(floor.buildFloor());
}

function buildTables() {
    nProductionLines = 0;
    var tables = [];
    var table;
    var i;
    this.productionLines.forEach(function (e) {
        tables[nProductionLines] = new Table({ name: e.productionLineName, castShadows: true, receiveShadows: true });
        nProductionLines++;
    });
    for (i = 1; i <= nProductionLines; i++) {
        this.productionLines[i - 1]["products"] = [];
        if (i % 2 == 0) {
            table = tables[i - 1].buildProductionLine(0.5, { x: 30, y: 0, z: 15 * (i - 1) });
            scene.add(table);
        } else {
            table = tables[i - 1].buildProductionLine(0.5, { x: 30, y: 0, z: -15 * i });
            scene.add(table);
        }
    }
}

function buildWorkTables(machine, plCount) {
    var productionLinePlacement = -30;
    productionLinePlacement = productionLinePlacement + (20 * (machine.productionLinePosition - 1));

    nProductionLines = 0;
    var workTables = [];
    var workTable;
    this.productionLines.forEach(function (e) {
        workTables[nProductionLines] = new WorkTable({ name: e.productionLineName, castShadows: true, receiveShadows: true });
        nProductionLines++;
    });

    if (plCount % 2 == 0) {
        workTable = workTables[plCount - 1].buildWorkLine(0.5, { x: productionLinePlacement, y: 0, z: 15 * (plCount - 1) + 6 });
        scene.add(workTable);
    } else {
        workTable = workTables[plCount - 1].buildWorkLine(0.5, { x: productionLinePlacement, y: 0, z: -15 * plCount + 6 });
        scene.add(workTable);
    }

}

function buildFork(x, y, z, name, pl) {
    var groupFork = new THREE.Group();
    var loader = new THREE.ColladaLoader();
    loader.load(API_URL + 'models/fork.dae', collada => {
        collada.scene.scale.set(0.50, 0.8, 1);
        collada.scene.position.set(x, y, z);
        collada.scene.rotateZ(Math.PI/2);
        groupFork.add(collada.scene)
    });
    groupFork.name = name;
    if(pl !==null){this.productionLines[pl].products.push(groupFork);}
    scene.add(groupFork);
}

function buildMachine(machine, productionLineNumber, model) {
    var productionLinePlacement = -30;
    productionLinePlacement = productionLinePlacement + (20 * (machine.productionLinePosition - 1));

    let newSceneObject;
    switch (model) {
        case "Robotic Arm":
            let roboticArm = new RoboticArm({
                name: machine.description, castShadows: true, receiveShadows: true,
                productionLineNumber: productionLineNumber, productionLinePosition: machine.productionLinePosition
            });
            machines.push(roboticArm);
            if (productionLineNumber % 2 == 0) {
                newSceneObject = roboticArm.buildRobotArm({ x: productionLinePlacement - 8, y: 0, z: (15 * (productionLineNumber - 1)) + 15 });
            } else {
                newSceneObject = roboticArm.buildRobotArm({ x: productionLinePlacement - 8, y: 0, z: (-15 * productionLineNumber) + 15 });
            }
            break;
        case "Hydraulic Press":
            let pressMachine = new PressMachine({
                name: machine.description, castShadows: true, receiveShadows: true,
                productionLineNumber: productionLineNumber, productionLinePosition: machine.productionLinePosition
            });
            machines.push(pressMachine);
            if (productionLineNumber % 2 == 0) {
                newSceneObject = pressMachine.buildHydraulicPress({ x: productionLinePlacement - 6, y: 5, z: (15 * (productionLineNumber / 2)) + 6 });
            } else {
                newSceneObject = pressMachine.buildHydraulicPress({ x: productionLinePlacement - 6, y: 5, z: (-15 * productionLineNumber) + 6 });
            }
            break;
    }
    scene.add(newSceneObject);
}

function buildMachines() {
    var plCount = 0;
    this.productionLines.forEach(function (pl) {
        plCount++;
        var count = 1;
        pl.machinesListDtos.forEach(function (machine) {

            if (machine.productionLinePosition == 0) {
                machine.productionLinePosition = count;
                if (configurationsApi.factoryApi.isEnable) {
                    updateMachinePosition(machine);
                }
            }

            var model = getModelOfMachineType(machine.machineTypeId);
            buildMachine(machine, plCount, model);
            buildWorkTables(machine, plCount);
            count++;
        });
    });
}

function getModelOfMachineType(machineTypeId) {
    var result;
    this.machineTypes.forEach(function (type) {
        if (type.id === machineTypeId) {
            result = type.visualizationModel;
        }
    });
    return result;
}

function buildWidgets() {
    var plNames = [];
    productionLines.forEach(e => {
        plNames.push(e.productionLineName);
    });
    let selectedMachine = {
        type: null
    };
    let selectedPosition = {
        Position: ""
    };


    let controllerMachineTypes = gui.addFolder(`Change Model of Machine Type`)
    for (i = 0; i < this.machineTypes.length; i++) {
        let idx = i;

        controllerMachineTypes.addFolder(this.machineTypes[i].desc)
            .add(selectedMachine, 'type', MODELS)
            .onChange((selectedValue) =>
                updateModel(idx, selectedValue)
            );


    }
    let controllerMachines = gui.addFolder(`Change Machine Position`);
    let changePL = gui.addFolder(`Switch Machine to a different Prod. Line`);
    for (k = 0; k < this.productionLines.length; k++) {
        for (j = 0; j < this.productionLines[k].machinesListDtos.length; j++) {
            let macdesc = this.productionLines[k].machinesListDtos[j].description;
            var button = {
                add: function () {
                    if (selectedPosition.Position != "") {
                        var mtc = getMachineByDesc(macdesc);
                        swapMachine(mtc, parseInt(selectedPosition.Position))
                        mtc.productionLinePosition = parseInt(selectedPosition.Position)
                        if (configurationsApi.factoryApi.isEnable) {
                            updateMachinePosition(mtc)
                        } else {
                            updateVisualizationModelListener()
                        }
                    }
                }
            };
            var line = controllerMachines.addFolder(macdesc);
            line.add(selectedPosition, 'Position');
            line.add(button, 'add').name('Save Change');

            changePL.addFolder(macdesc)
                .add(selectedMachine, 'type', plNames).name('Production Line:')
                .onChange((selectedValue) =>
                    updateProductionLines(macdesc, selectedValue)
                );
        }
    }
    let controllerProducts = gui.addFolder(`Begin ProductionPlan`);
    for (r = 0; r < this.planFiles.length; r++) {
        let fileName = this.planFiles[r];
        var button = {
            add: function () {
                initiatePlan(fileName);
            }
        };
        var line = controllerProducts.addFolder(fileName);
        line.add(button, 'add').name('Initiate');
    }
}

function containsTask(task) {
    for (let i = 0; i < this.tasks.length; i++) {
        if (tasks[i].product === task.product && tasks[i].order === task.order) {
            return true;
        }
    }
    return false;
}

function indexOfTask(task) {
    for (let i = 0; i < this.tasks.length; i++) {
        if (tasks[i].product === task.product && tasks[i].order === task.order) {
            return i;
        }
    }
}

function initiatePlan(fileName) {
    var plan = getPlanByFileName(fileName);
    for (let i = 0; i < plan.length; i++) {
        for (let j = 0; j < this.machines.length; j++) {
            if (this.machines[j]._properties.name == plan[i].nome && plan[i].tarefas.length !== 0) {
                this.machines[j]["schedule"] = plan[i].tarefas;
                for (const key in plan[i].tarefas) {
                    if (plan[i].tarefas[key].tipo !== "setup") {
                        let newtask = {
                            product: plan[i].tarefas[key].produto,
                            quantity: plan[i].tarefas[key].repeticoes,
                            order: plan[i].tarefas[key].encomenda
                        }
                        if (!containsTask(newtask)) {
                            this.tasks.push(newtask);
                        }
                    }
                }
            }
        }
    }

    this.machinesWithPlan = this.machines.filter(m => m.schedule !== undefined);
    clearInterval(this.productionAnimation);
    this.currentTime = 0;
    this.productionAnimation = setInterval(animationTimeout, CONFIG.timeflow);
}

function animationTimeout() {
    this.machinesWithPlan.map(m => {
        var currentTarefas = taskAtTime(m.schedule, this.currentTime);
        if (currentTarefas.length !== 0) {
            m.timeout();
            let newtask = { product: currentTarefas[0].produto, quantity: currentTarefas[0].repeticoes, order: currentTarefas[0].encomenda };
            if (containsTask(newtask)) {
                var currentAmount = productionLines[m._properties.productionLineNumber - 1].products.length
                if (m._properties.productionLineNumber % 2 == 0) {
                    var ply = (15 * (m._properties.productionLineNumber - 1));
                } else {
                    var ply =(-15 * m._properties.productionLineNumber);
                }
                for (let c = 0; c < newtask.quantity-1; c++) {
                    buildFork(-45 + (currentAmount *3) , 6, ply, newtask.product, m._properties.productionLineNumber - 1);
                    currentAmount++;
                }
                buildFork(-30 + (20 * (m._properties.productionLinePosition - 1)), 6, ply+6, newtask.product, null);
                this.tasks.splice(this.indexOfTask(newtask), 1);
            }
        }
    });

    //var productionLinePlacement = (10 * (cont) - 3);
    //let time = checkMachine(productPlan, cont);
    //if ((groupFork.position.x === productionLinePlacement) && (cont <= capablePl.machinesListDtos.length)) {
    //  if (!!time) {
    //    timeoutOperation(time, capablePl, position, cont, productPlan);
    //} else {
    //  cont++;
    //groupFork.position.x++;
    /*timeout(capablePl, position, cont, productPlan);
    }
    } else if (groupFork.position.x == LINE.initialX) {
    scene.remove(scene.getObjectByName('fork'));
    groupFork.position.x = position.x;
    groupFork.position.y = position.x;
    groupFork.position.z = position.y;
    } else {
    groupFork.position.x++;
    timeout(capablePl, position, cont, productPlan);
    }*/
    this.currentTime += ((CONFIG.timeflow / 1000) * CONFIG.speed);
}

function taskAtTime(schedule, time) {
    return schedule.filter(element => element.inicio <= time && element.fim >= time);
}

function checkMachine(productPlan, cont) {
    let flag = 0;
    productPlan.map(pp => {
        if (pp.machine.productionLinePosition === cont) {
            flag = pp.time;
            return;
        }
    })
    return flag;
}

function getPlanByFileName(fileName) {
    return getMachinesAgendas(fileName);
}

function swapMachine(machine, position) {
    var oldpos = machine.productionLinePosition;
    this.productionLines.forEach(function (pl) {
        if (pl.productionLineId == machine.productionLineId) {
            pl.machinesListDtos.forEach(function (m) {
                if (m.productionLinePosition == position) {
                    m.productionLinePosition = oldpos;
                }
                if (m == machine) {
                    m.productionLinePosition = position;
                }
            });
        }
    });
}

function updateModel(idx, selectedValue) {
    this.machineTypes[idx].visualizationModel = selectedValue;
    if (configurationsApi.factoryApi.isEnable) {
        updateVisualizationModel(this.machineTypes[idx]);
    } else {
        updateVisualizationModelListener();
    }
}

function updateVisualizationModelListener() {

    scene = new THREE.Scene();
    buildScene();
}

function updateProductionLines(macdesc, pl) {
    var machine = getMachineByDesc(macdesc);
    var oldPlIndex;
    var newPlIndex;
    var newPlId;
    for (i = 0; i < productionLines.length; i++) {
        if (productionLines[i].productionLineId == machine.productionLineId) {
            oldPlIndex = i;
        }
        if (productionLines[i].productionLineName == pl) {
            newPlIndex = i;
            newPlId = productionLines[i].productionLineId;
        }
    }


    newPlList = productionLines[oldPlIndex].machinesListDtos.filter(mac => mac !== machine);
    productionLines[oldPlIndex].machinesListDtos = newPlList;
    machine.productionLineId = newPlId;
    machine.productionLinePosition = findFirstFree(newPlIndex);
    productionLines[newPlIndex].machinesListDtos.push(machine);

    if (configurationsApi.factoryApi.isEnable) {
        updateMovedMachine(machine);
    } else {
        updateVisualizationModelListener();
    }
}

function findFirstFree(index) {
    for (c = 1; c < 200; c++) {
        let b = true
        productionLines[index].machinesListDtos.forEach(function (machine) {
            if (machine.productionLinePosition == c) {
                b = false;
            }
        });
        if (b) {
            return c;
        }
    }
}


function getMachineByDesc(macdesc) {
    var machine;
    productionLines.forEach(e => {
        e.machinesListDtos.forEach(m => {
            if (m.description == macdesc) {
                machine = m;
            }
        });
    });
    return machine;
}

