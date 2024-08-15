import { world, system, GameMode } from "@minecraft/server"


const range = 32; // Adjust this value to define the desired search area
const chunkSize = 8; // Adjust this value to control the number of blocks checked per iteration

function searchCube(player, targetTypeId, particleType) {
    const playerLocation = player.location;

    // Loop through chunks within the search area
    for (let xStart = -range; xStart <= range; xStart += chunkSize) {
        for (let yStart = -range; yStart <= range; yStart += chunkSize) {
            for (let zStart = -range; zStart <= range; zStart += chunkSize) {

                // Check random blocks within the chunk
                for (let i = 0; i < chunkSize; i++) {
                    if (Math.random() < 0.7) { // Adjust probability here (0.25 for 25% chance per chunk)
                        const randomXOffset = Math.floor(Math.random() * chunkSize);
                        const randomYOffset = Math.floor(Math.random() * chunkSize);
                        const randomZOffset = Math.floor(Math.random() * chunkSize);

                        const blockX = playerLocation.x + xStart + randomXOffset;
                        const blockY = playerLocation.y + yStart + randomYOffset + 16;
                        const blockZ = playerLocation.z + zStart + randomZOffset;

                        const targetBlock = world?.getDimension(player.dimension.id).getBlock({ x: blockX, y: blockY, z: blockZ });
                        if (!player.hasTag("fallenLeaves")) {
                            if (targetBlock?.typeId == 'minecraft:oak_leaves') {
                                // Spawn particle effect
                                targetBlock.dimension.spawnParticle("pog:oak_leaf", targetBlock.location);
                            }
                            if (targetBlock?.typeId == 'minecraft:spruce_leaves') {
                                // Spawn particle effect
                                targetBlock.dimension.spawnParticle("pog:spruce_leaf", targetBlock.location);
                            }
                            if (targetBlock?.typeId == 'minecraft:jungle_leaves') {
                                // Spawn particle effect
                                targetBlock.dimension.spawnParticle("pog:jungle_leaf", targetBlock.location);
                            }
                            if (targetBlock?.typeId == 'minecraft:birch_leaves') {
                                // Spawn particle effect
                                targetBlock.dimension.spawnParticle("pog:birch_leaf", targetBlock.location);
                            }
                        }
                    }
                }
            }
        }
    }
}

system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        if (player.dimension.id == "minecraft:overworld" && !player.matches({ gameMode: GameMode.creative })) {
            player.playSound('confused_and_deeds_and_prelude', { location: player.location })
        }
    })
}, Math.floor(Math.random() * (18 - 8 + 1)) + 8 * 60 * 20)

system.runInterval(() => {
    world.getPlayers().forEach((player) => {

        if (player.hasTag(`cave`)) {
            if (player.dimension.id == "minecraft:overworld") {
                player.dimension.playSound("ambient.cave_random", player.location)
            }
        }

    })
}, Math.random() * (880 - 480) + 480)

system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        if (player.dimension.id == "minecraft:overworld") {
            player.removeTag('overworld')
            searchCube(player, "leaves", "pog:spruce_leaf")
        }
    })
}, 40)


system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        if (player.dimension.id == "minecraft:nether" && !player.hasTag('overworld')) {
            console.log('tttt')
            player.stopMusic()
            player.addTag('overworld')
            player.runCommand(`stopsound @p confused_and_deeds_and_prelude`)
        }
        if (player.dimension.id == "minecraft:the_end" && !player.hasTag('overworld')) {
            console.log('tttt')
            player.stopMusic()
            player.addTag('overworld')
            player.runCommand(`stopsound @p confused_and_deeds_and_prelude`)
            player.removeTag('night')
            player.removeTag('swamps')
            player.removeTag('swamp')
            player.removeTag('taigas')
            player.removeTag('taiga')
            player.removeTag('jungles')
            player.removeTag('jungle')
            player.removeTag('plain')
            player.removeTag('plains')
        }
        const entity = world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:ambiententity', location: player.location, minDistance: 1, maxDistance: 8, tags: ['plains'] }).forEach(entity => {
            if (!entity.hasTag('plain')) {
                console.log('Plains')
                entity.addTag('plain')
                player.playMusic('ambient.plains', { loop: true, fade: 3, volume: 0.2 })
            }
        })
        const entity1 = world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:ambiententity', location: player.location, minDistance: 1, maxDistance: 8, tags: ['taigas'] }).forEach(entity1 => {
            if (!entity1.hasTag('taiga')) {
                console.log('Taiga')
                entity1.addTag('taiga')
                player.playMusic('ambient.bird', { loop: true, fade: 3, volume: 0.07 })
            }
        })
        const entity2 = world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:ambiententity', location: player.location, minDistance: 1, maxDistance: 8, tags: ['swamps'] }).forEach(entity2 => {
            if (!entity2.hasTag('swamp')) {
                console.log('Swamp')
                entity2.addTag('swamp')
                player.playMusic('ambient.swamp', { loop: true, fade: 3, volume: 0.25 })
            }
        })
        const entity3 = world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:ambiententity', location: player.location, minDistance: 1, maxDistance: 8, tags: ['jungles'] }).forEach(entity3 => {
            if (!entity3.hasTag('jungle')) {
                console.log('Jungle')
                entity3.addTag('jungle')
                player.playMusic('ambient.jungle', { loop: true, fade: 3, volume: 0.13 })
            }
        })
        const entity4 = world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:ambiententity', location: player.location, minDistance: 1, maxDistance: 8, tags: ['colds'] }).forEach(entity4 => {
            if (!entity4.hasTag('cold')) {
                console.log('tesssst')
                entity4.addTag('cold')
                player.playMusic('ambient.snow', { loop: true, fade: 3, volume: 0.43 })
            }
        })


        if (player.location.y <= 56 && !player.isInWater && !player.hasTag('overworld')) {
            if (!player.hasTag('cave')) {
                console.log('play cave stuff')
                const entity = world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:ambiententity', location: player.location, minDistance: 1, maxDistance: 5 }).forEach(entity => {
                    entity.triggerEvent(`despawn`)
                })
                player.playMusic('ambient.cave_loop', { loop: true, fade: 1, volume: 0.13 })

                player.addTag('cave')
                player.removeTag('night')

            }
        }
        if (player.location.y >= 60 && !player.hasTag('overworld')) {
            if (player.hasTag('cave')) {
                player.dimension.spawnEntity(`better_on_bedrock:ambiententity`, player.location)

                console.log(`ssdsdd`)
                player.removeTag('cave')
                player.removeTag('night')
            }
        }
        if (player.dimension.getBlock({ x: player.location.x, y: player.location.y + 1, z: player.location.z }).typeId.includes('water') && !player.hasTag(`underwater`)) {
            player.addTag('underwater')
            const entity = world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:ambiententity', location: player.location, minDistance: 1, maxDistance: 5 }).forEach(entity => {
                entity.triggerEvent(`despawn`)
            })
            player.playMusic("ambient.underwater.loop", { volume: 1, loop: true, fade: 1 })
        } else if (!player.dimension.getBlock({ x: player.location.x, y: player.location.y + 1, z: player.location.z }).typeId.includes('water') && player.hasTag(`underwater`)) {
            player.dimension.spawnEntity(`better_on_bedrock:ambiententity`, player.location)
            player.stopMusic()
            player.removeTag('underwater')
            player.removeTag('cave')
            player.removeTag('night')
        }

        if (world.getTimeOfDay() >= 12500 && world.getTimeOfDay() <= 23500 && !player.hasTag('night') && player.location.y >= 63 && !player.hasTag('overworld')) {
            player.playMusic('ambient.night', { loop: true, fade: 3, volume: 0.1 })
            player.addTag('night')
            player.runCommand(`event entity @e[type=better_on_bedrock:ambiententity] despawn`)
        } else if (world.getTimeOfDay() >= 0 && world.getTimeOfDay() <= 12500 && player.hasTag('night') && !player.hasTag('overworld')) {
            player.removeTag('night')
            player.dimension.spawnEntity('better_on_bedrock:ambiententity', player.location)
        }
    })
}, 20)