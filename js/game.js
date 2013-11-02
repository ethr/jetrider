var CONSTANTS = {
        SHIP_SPEED : 20.0,
        MISSILE_SPEED : 250,
        MISSILE_SIZE : 0.5,
        MISSED_SPHERE_PUNISHMENT : 1000,
        SPHERE_DEAD_SIZE : 0.001

}


function getShipSpeed(level) {
        return CONSTANTS.SHIP_SPEED*(Math.log(2*level + (5-level)));
}


function attachParticleSystem(mesh, scene) {
    //Loading Fountain Particle System

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("Assets/Flare.png", scene);

    //TextureMask
    //particleSystem.textureMask = new BABYLON.Color4(0.9, 0.9, 0.9, 1.0);


    // Where the particles comes from
    particleSystem.emitter = mesh; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0.75, -28); // Starting all From
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0.75, -28); // To...

    // Colors of all particles (splited in 2 + specific color before dispose)
    particleSystem.color1 = new BABYLON.Color4(0.5, 0.5 , 0.5, 0.5);
    particleSystem.color2 = new BABYLON.Color4(0.5, 0.5 , 0.5, 0.5);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.5;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.2
    particleSystem.maxLifeTime = 0.2;

    // Emission rate
    particleSystem.emitRate = 200;
    // OR
    //particleSystem.manualEmitCount = 1000;


    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    //Set the gravity of all particles (not necessary down)
    //particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    //Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(0, 0, -1);
    particleSystem.direction2 = new BABYLON.Vector3(0, 0, -1);

    //angular speed, in radian
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;
    particleSystem.maxAngularSpeed = 0;

    //particleSystem.targetStopDuration = 3;

    //speed
    particleSystem.updateSpeed = 0.005;

    particleSystem.minEmitPower = 100;
    particleSystem.maxEmitPower = 100;

    //dispose
    particleSystem.disposeOnStop = true;

    //Start the particle system
    particleSystem.start();
}

function sphereExplosion(mesh, scene) {
  //Loading Fountain Particle System
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("Assets/Flare.png", scene);
    particleSystem.emitter = mesh; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all From
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0); // To...
    particleSystem.color1 = new BABYLON.Color4(0.5, 0.5 , 0.5, 0.1);
    particleSystem.color2 = new BABYLON.Color4(0.5, 0.5 , 0.5, 0.9);
    particleSystem.minSize = 3;
    particleSystem.maxSize = 5;
    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.2
    particleSystem.maxLifeTime = 1.0;
    // Emission rate
    particleSystem.emitRate = 50;
    // OR
    //particleSystem.manualEmitCount = 1000;
    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    //Set the gravity of all particles (not necessary down)
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    //Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(0, 0, -5);
    particleSystem.direction2 = new BABYLON.Vector3(0, 0, 5);

    //angular speed, in radian
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    particleSystem.targetStopDuration = 1;

    //speed
    particleSystem.updateSpeed = 0.005;

    particleSystem.minEmitPower = 2;
    particleSystem.maxEmitPower = 10;

    //dispose
    particleSystem.disposeOnStop = true;

    //Start the particle system
    particleSystem.start();
}


window.onload = function () {
        if (!BABYLON.Engine.isSupported()) {
                alert("BablyonJS no supported");
                return;
        }
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(engine);
        window.addEventListener("resize", function () {
                engine.resize();
        });
        engine.switchFullscreen(true);
        var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 0), scene);
        var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);
        // Skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("Assets/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        BABYLON.SceneLoader.ImportMesh("", "scenes/",
                        "SpaceBicoFino.babylon", scene,
                        function (newMeshes, particleSystems) {
                var spaceShip = newMeshes[0];
                attachParticleSystem(spaceShip, scene);
                spaceShip.position = new BABYLON.Vector3(0, 0, 20);
                spaceShip.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                var transform = BABYLON.Matrix.RotationY(Math.PI);
                spaceShip.bakeTransformIntoVertices(transform);

                // Sound
                var volume = 1.0;
                var sound = new Howl({
                        loop: true,
                        volume: volume,
                        urls: ['sounds/164842__plymouthjcliffords__rocket-roar-looping.wav']
                });
                sound.play();
                var lazySound = new Howl({
                        volume: volume,
                        urls: ['sounds/30935__aust-paul__possiblelazer.wav']
                });
                var explosionSound = new Howl({
                        volume: volume,
                        urls: ['sounds/113977__sfxsource-com__sfxsource-com-free-explosion-sound-effect.mp3']
                });
                var volumeControl = document.getElementById("volume");
                volumeControl.value = volume;
                volumeControl.addEventListener("change", function() {
                        volume = volumeControl.value;
                        sound.volume(volume);
                        lazySound.volume(volume);
                        explosionSound.volume(volume);
                });

                var shipHealth = 100;
                var movementDirs = {
                        UP : false,
                        DOWN : false,
                        RIGHT : false,
                        LEFT : false
                }
                var fired = false;
                var canFire = true;
                document.addEventListener("keydown", function(info) {
                        if (shipHealth > 0) {
                                switch (info.keyCode) {
                                        // Left
                                        case 37:
                                                movementDirs.LEFT = true;
                                                break;
                                        // Up
                                        case 38:
                                                movementDirs.UP = true;
                                                break;
                                        // Right
                                        case 39:
                                                movementDirs.RIGHT = true;
                                                break;
                                        // Down
                                        case 40:
                                                movementDirs.DOWN = true;
                                                break;
                                        // Space
                                        case 32:
                                                if (canFire) {
                                                        fired = true;
                                                        canFire = false;
                                                }
                                                break;
                                        default:
                                                break;
                                }
                        }
                });
                document.addEventListener("keyup", function(info) {
                        if (shipHealth > 0) {
                                switch (info.keyCode) {
                                        // Left
                                        case 37:
                                                movementDirs.LEFT = false;
                                                break;
                                        // Up
                                        case 38:
                                                movementDirs.UP = false;
                                                break;
                                        // Right
                                        case 39:
                                                movementDirs.RIGHT = false;
                                                break;
                                        // Down
                                        case 40:
                                                movementDirs.DOWN = false;
                                                break;
                                        // Space
                                        case 32:
                                                canFire = true;
                                                break;
                                        default:
                                                break;
                                }
                        }
                });
                var lastSphereTime = new Date().getTime();
                var spheres = [];
                var missiles = [];
                var healthDisplay = document.getElementById("ship_health");
                var scoreDisplay = document.getElementById("score_display");
                var levelDisplay = document.getElementById("level_display");
                var gameOverDisplay = document.getElementById("game_over");
                var score = 0;
                var startTime = new Date().getTime();
                var level = 1;
                var time = new Date().getTime(); // Time of last frame
                scene.registerBeforeRender(function() {
                        if (shipHealth > 0) {
                                var newTime = new Date().getTime();
                                var diffTime = newTime - time;
                                // Do ship movements
                                if (movementDirs.LEFT && spaceShip.position.x > -12.5) {
                                        spaceShip.position.x -= 0.3;
                                }
                                if (movementDirs.UP && spaceShip.position.y < 7.5) {
                                        spaceShip.position.y += 0.3;
                                }
                                if (movementDirs.RIGHT && spaceShip.position.x < 12.5) {
                                        spaceShip.position.x += 0.3;
                                }
                                if (movementDirs.DOWN && spaceShip.position.y > -7.5) {
                                        spaceShip.position.y -= 0.3;
                                }
                                spaceShip.position.z += getShipSpeed(level)*(diffTime/1000.0)
                                camera.position.z += getShipSpeed(level)*(diffTime/1000.0)
                                skybox.position.z += getShipSpeed(level)*(diffTime/1000.0)
                                /// Missiles animation and hit detection
                                for (var i = 0; i < missiles.length;) {
                                        missiles[i].position.z += CONSTANTS.MISSILE_SPEED*(diffTime/1000.0);
                                        if (missiles[i].position.z - spaceShip.position.z > 200) {
                                                var m = missiles[i];
                                                missiles.splice(i, 1);
                                                m.dispose();
                                                continue;
                                        }
                                        var struck = false;
                                        for (var j = 0; j < spheres.length; j++) {
                                                if (missiles[i].intersectsMesh(spheres[j], true)) {
                                                        spheres[j].scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
                                                        sphereExplosion(spheres[j], scene);
                                                        struck = true;
                                                        break;
                                                }
                                        }
                                        if (struck) {
                                                explosionSound.play();
                                                score += 100;
                                                var m = missiles[i];
                                                missiles.splice(i, 1);
                                                m.dispose();
                                        } else {
                                                i++;
                                        }
                                }
                                // Score
                                score += diffTime/100;
                                if (score > level*1000) {
                                        level++;
                                }
                                // Spheres
                                var diffSphereTime = newTime - lastSphereTime;
                                if (diffSphereTime > 1200/(Math.log(level + 1))) {
                                        lastSphereTime = newTime;
                                        var x = Math.floor((Math.random()*22)) - (11);
                                        var y = Math.floor((Math.random()*12)) - (6);
                                        var scale = Math.floor(Math.random()*7) + 4;
                                        var sphere1 = BABYLON.Mesh.CreateSphere("Sphere" + i, 20, 1 /**Math.floor(Math.random()*7) + 4**/, scene);
                                        sphere1.scaling = new BABYLON.Vector3(scale, scale, scale);
                                        spheres.push(sphere1);
                                        sphere1.position = new BABYLON.Vector3(x, y, spaceShip.position.z + 150);
                                }
                                for (var i = 0; i < spheres.length; i++) {
                                        var diff = spheres[i].position.z - spaceShip.position.z;
                                        if (diff < 20) {
                                                if (spheres[i].scaling.x > CONSTANTS.SPHERE_DEAD_SIZE) {
                                                        if (spheres[i].intersectsMesh(spaceShip, true)) {
                                                                explosionSound.play();
                                                                spheres[i].scaling = new BABYLON.Vector3(
                                                                                CONSTANTS.SPHERE_DEAD_SIZE,
                                                                                CONSTANTS.SPHERE_DEAD_SIZE,
                                                                                CONSTANTS.SPHERE_DEAD_SIZE);
                                                                sphereExplosion(spheres[i], scene);
                                                                shipHealth -= 10.0;
                                                                break;
                                                        }
                                                }
                                        } else {
                                                break;
                                        }
                                }
                                if (fired) {
                                        (function() {
                                                var missile = BABYLON.Mesh.CreateSphere(
                                                        "Sphere", 20, 1, scene);
                                                missile.scaling = new BABYLON.Vector3(
                                                        CONSTANTS.MISSILE_SIZE,
                                                        CONSTANTS.MISSILE_SIZE, 
                                                        CONSTANTS.MISSILE_SIZE);
                                                missile.position = new BABYLON.Vector3(
                                                        spaceShip.position.x,
                                                        spaceShip.position.y,
                                                        spaceShip.position.z);
                                                missiles.push(missile);
                                        })();
                                        lazySound.play();
                                        fired = false;
                                }
                                // Remove spheres that are behind the
                                // camera
                                while (spheres.length > 0 && spheres[0].position.z < spaceShip.position.z - 40.0) {
                                        if (spheres[0].scaling.x > CONSTANTS.SPHERE_DEAD_SIZE) {
                                                score -= CONSTANTS.MISSED_SPHERE_PUNISHMENT;
                                        }
                                        spheres[0].dispose();
                                        spheres.shift();
                                }
                                // Check score
                                if (score < -4000) {
                                        shipHealth = 0;
                                }
                                if (shipHealth <= 0) {
                                        gameOverDisplay.className = "";
                                        //spaceShip.dispose();
                                        spaceShip.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
                                        sound.stop();
                                }
                                time = newTime;
                        }
                        healthDisplay.innerHTML = shipHealth;
                        scoreDisplay.innerHTML = Math.floor(score);
                        levelDisplay.innerHTML = level;
                });
                engine.runRenderLoop(function () {
                        scene.render();
                });
        });
};

