var raycaster = new THREE.Raycaster();
raycaster.params = {
  Mesh: {}
};
// collect objects for raycasting, 
// for better performance don't raytrace all scene
var tooltipEnabledObjects = [];

// this will be 2D coordinates of the current mouse position, [0,0] is middle of the screen.
var mouse = new THREE.Vector2();

var latestMouseProjection; // this is the latest projection of the mouse on object (i.e. intersection with ray)
var hoveredObj; // this objects is hovered at the moment

// tooltip will not appear immediately. If object was hovered shortly,
// - the timer will be canceled and tooltip will not appear at all.
var tooltipDisplayTimeout;

// This will move tooltip to the current mouse position and show it by timer.
function showTooltip() {
  var divElement = $("#tooltip");

  if (divElement && latestMouseProjection) {
    divElement.css({
      display: "block",
      opacity: 0.0
    });

    var canvasHalfWidth = renderer.domElement.offsetWidth / 2;
    var canvasHalfHeight = renderer.domElement.offsetHeight / 2;

    var tooltipPosition = latestMouseProjection.clone().project(camera);
    tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + renderer.domElement.offsetLeft;
    tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + renderer.domElement.offsetTop;

    var tootipWidth = divElement[0].offsetWidth;
    var tootipHeight = divElement[0].offsetHeight;

    divElement.css({
      left: `${tooltipPosition.x - tootipWidth / 2}px`,
      top: `${tooltipPosition.y - tootipHeight - 5}px`
    });

    var machine = null;
    for (var w = 0; w < productionLines.length; w++) {
      for (var y = 0; y < productionLines[w].machinesListDtos.length; y++) {
        if (productionLines[w].machinesListDtos[y].description == hoveredObj.userData.parentGroup) {
          machine = productionLines[w].machinesListDtos[y];
          let machineType = machineTypes.filter(mt => mt.id === machine.machineTypeId)[0];
          machine["machineType"] = machineType;
        }
      }
    }

    $("#machineId").html(machine.id);
    $("#description").html(machine.description);
    $("#machineType").html(machine.machineType.desc);
    $("#productionLine").html(machine.productionLineId);
    let operationsHtml = "";
    machine.machineType.operationList.map(ele => {
      operationsHtml += ("Description: " + ele.operationType.desc + "<br/>");
      operationsHtml += ("Tool: " + ele.tool + "<br/>");
      operationsHtml += ("Execution Time: " + ele.operationType.executionTime + "<br/>");
      operationsHtml += ("Setup Time:" + ele.operationType.setupTime + "<br/><br/>");
    });

    $("#operations").html(operationsHtml);


    setTimeout(function () {
      divElement.css({
        opacity: 1.0
      });
    }, 25);
  }
}

// This will immediately hide tooltip.
function hideTooltip() {
  var divElement = $("#tooltip");
  if (divElement) {
    divElement.css({
      display: "none"
    });
  }
}

// Following two functions will convert mouse coordinates
// from screen to three.js system (where [0,0] is in the middle of the screen)
function updateMouseCoords(event, coordsObj) {
  coordsObj.x = ((event.clientX - renderer.domElement.offsetLeft + 0.5) / window.innerWidth) * 2 - 1;
  coordsObj.y = -((event.clientY - renderer.domElement.offsetTop + 0.5) / window.innerHeight) * 2 + 1;
}

function handleManipulationUpdate() {
  raycaster.setFromCamera(mouse, camera);
  let objects = scene.children.filter(e => (e.type == "Group"));
  let intersects = raycaster.intersectObjects(objects, true);
  if (intersects.length > 0) {
    latestMouseProjection = intersects[0].point;
    hoveredObj = intersects[0].object;
  }

  if (tooltipDisplayTimeout || !latestMouseProjection) {
    clearTimeout(tooltipDisplayTimeout);
    tooltipDisplayTimeout = undefined;
    hideTooltip();
  }

  if (!tooltipDisplayTimeout && latestMouseProjection) {
    tooltipDisplayTimeout = setTimeout(function () {
      tooltipDisplayTimeout = undefined;
      showTooltip();
    }, 330);
  }
}

function onMouseMove(event) {
  updateMouseCoords(event, mouse);

  latestMouseProjection = undefined;
  hoveredObj = undefined;
  handleManipulationUpdate();
}

window.addEventListener('mousemove', onMouseMove, false);