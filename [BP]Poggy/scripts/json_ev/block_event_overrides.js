import { world, BlockPermutation, BlockStates, EquipmentSlot } from "@minecraft/server";
import { pots, plants, getSelectedPot, isPotOccupied, setPotPlant, playPlantSound } from "../f_p/flower_pots/flower_pot";
import { UI3, UI4 } from "../waystones/waystone_functions";
import { tallBottomDoors } from "./c_t/door_types";
import { forgeBaseUI } from "../forge_table/forge_table";
import { veinMine } from "../enchantments/vein_miner";
import { treeCapitator } from "../enchantments/tree_capitator";
import { leafyLib } from "../enchantments/leafy_libirator";
import { harvestTouch } from "../enchantments/harvest_touch";
import { blockWarn } from "../enchantments/tree_capitator";


world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent('pog:tick', {
        onTick: e => {
            if (e.block.typeId == "better_on_bedrock:void_block") {
                e.block.setType('air')
            }
            if (e.block.typeId == "better_on_bedrock:voided_bush") {
                e.block.dimension.spawnParticle('pog:leaves', e.block.location)
            }
            if (e.block.typeId == "better_on_bedrock:soul_jar_block") {
                e.block.dimension.spawnParticle('pog:soul_jar', e.block.location)
                e.block.dimension.playSound('bloom.sculk_catalyst', e.block.location)
            }

        }
    });
    initEvent.blockComponentRegistry.registerCustomComponent('pog:waystoneemitter', {
        onTick: e => {
            if (e.block.permutation.getState("pog:activated") == true) {
                e.block.dimension.runCommandAsync(`particle pog:waystone_activate ${e.block.location.x} ${e.block.location.y} ${e.block.location.z}`)
                e.block.dimension.runCommandAsync(`playsound block.waystone.ambient @p ${e.block.location.x} ${e.block.location.y} ${e.block.location.z}`)
            }
            if (e.block.permutation.getState("pog:activatedAsGlobal") == true) {
                e.block.dimension.runCommandAsync(`particle pog:waystone_activate_global ${e.block.location.x} ${e.block.location.y} ${e.block.location.z}`)
                e.block.dimension.runCommandAsync(`playsound block.waystone.ambient @p ${e.block.location.x} ${e.block.location.y} ${e.block.location.z}`)
            }

        }
    });
    initEvent.blockComponentRegistry.registerCustomComponent('pog:random_particle', {
        onTick: e => {
            e.block.dimension.runCommandAsync(`particle better_on_bedrock:paper_lantern_particle ${e.block.location.x} ${e.block.location.y + 0.2} ${e.block.location.z}`)

        }
    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:forger', {
        onPlayerInteract: ev => {
            forgeBaseUI(ev.player)
        }

    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:dummy_chest', {
        onPlayerInteract: e => {
            e.block.dimension.spawnEntity(`better_on_bedrock:willager`, e.block.location)
            e.block.dimension.runCommandAsync(`structure load willager_loot_box ${e.block.location.x} ${e.block.location.y} ${e.block.location.z}`)
        }
    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:placed', {
        onPlace: e => {
            if (e.block.typeId == "better_on_bedrock:pedestal_block") {
                e.block.dimension.runCommandAsync(`summon better_on_bedrock:pedestal ${e.block.location.x} ${e.block.location.y} ${e.block.location.z}`)
            }

        }
    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:int', {
        onPlayerInteract: e => {
            if (e.block.typeId == "better_on_bedrock:quest_block" && e.block.permutation.getState('better_on_bedrock:interact') == 'default') {
                e.block.setPermutation(BlockPermutation.resolve('better_on_bedrock:quest_block').withState("better_on_bedrock:interact", "used"))
                e.block.dimension.runCommandAsync(`loot spawn ${e.block.location.x} ${e.block.location.y} ${e.block.location.z} loot "blocks/paper"`)
            }

        }
    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:enchant_ui', {
        onPlayerInteract: e => {
            const equipmentInventory = e.player.getComponent("equippable");
            const item = equipmentInventory.getEquipment(EquipmentSlot.Mainhand)
            if (!item?.hasTag('minecraft:is_pickaxe') && !item?.hasTag('minecraft:is_axe') && !item?.hasTag('minecraft:is_hoe') && item?.typeId !== 'minecraft:shears') {
                blockWarn(e.player)
            } else {
                if (item?.hasTag('minecraft:is_pickaxe')) {
                    veinMine(e.player)
                }
                if (item?.hasTag('minecraft:is_axe')) {
                    treeCapitator(e.player)
                }
                if (item?.typeId == 'minecraft:shears') {
                    leafyLib(e.player)
                }
                if (item?.hasTag('minecraft:is_hoe')) {
                    harvestTouch(e.player)
                }
            }

        }
    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:leaves_orange', {
        beforeOnPlayerPlace: e => {
            e.permutationToPlace = e.permutationToPlace.withState('pog:playerPlaced', true);
        },
        onRandomTick: e => {
            const validLogBlocks = ["minecraft:oak_log", "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log", "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log", "minecraft:jungle_log"]
            const loc = e.block.location;
            const radius = 3; // Change this value to adjust the radius

            function isWithinSphere(blockLoc, center, radius) {
                const dx = blockLoc.x - center.x;
                const dy = blockLoc.y - center.y;
                const dz = blockLoc.z - center.z;
                const distanceSquared = dx * dx + dy * dy + dz * dz;
                return distanceSquared <= radius * radius;
            }

            let foundLog = false; // Flag to track if a log is found
            // Iterate through blocks within a spheric area
            for (let xOffset = -radius; xOffset <= radius; xOffset++) {
                for (let yOffset = -radius; yOffset <= radius; yOffset++) {
                    for (let zOffset = -radius; zOffset <= radius; zOffset++) {
                        const blockLoc = {
                            x: loc.x + xOffset,
                            y: loc.y + yOffset,
                            z: loc.z + zOffset,
                        };
                        // Check if the block is within the sphere radius
                        if (isWithinSphere(blockLoc, loc, radius)) {
                            const block = e.block.dimension.getBlock(getMaterial(blockLoc)); // Get block using getMaterial
                            const foundValidLog = validLogBlocks.find(logType => logType === block?.typeId);
                            // Check for any log type (modify as needed)
                            if (foundValidLog) {
                                foundLog = true; // Set flag if a log is found
                                break; // Exit the inner loop if a log is found within this layer
                            }
                        }
                    }
                }
                // Check the flag after processing a layer
                if (foundLog) {
                    break; // Exit the outermost loop if a log is found in any layer
                }
            }
            // Set block to air and spawn loot table only if no log was found
            if (!foundLog) {
                if (e.block.permutation.getState('pog:playerPlaced') === false) {
                    e.block.setType('air');
                    e.block.dimension.runCommand(`loot spawn ${loc.x} ${loc.y} ${loc.z} loot "blocks/peach"`);
                }
            }

            // Helper function to potentially avoid unnecessary block lookups
            function getMaterial(blockLoc) {
                return blockLoc;
            }
        }

    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:leaves_peach', {
        beforeOnPlayerPlace: e => {
            e.permutationToPlace = e.permutationToPlace.withState('pog:playerPlaced', true);
        },
        onRandomTick: e => {
            const validLogBlocks = ["minecraft:oak_log", "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log", "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log", "minecraft:jungle_log"]
            const loc = e.block.location;
            const radius = 3; // Change this value to adjust the radius

            function isWithinSphere(blockLoc, center, radius) {
                const dx = blockLoc.x - center.x;
                const dy = blockLoc.y - center.y;
                const dz = blockLoc.z - center.z;
                const distanceSquared = dx * dx + dy * dy + dz * dz;
                return distanceSquared <= radius * radius;
            }

            let foundLog = false; // Flag to track if a log is found
            // Iterate through blocks within a spheric area
            for (let xOffset = -radius; xOffset <= radius; xOffset++) {
                for (let yOffset = -radius; yOffset <= radius; yOffset++) {
                    for (let zOffset = -radius; zOffset <= radius; zOffset++) {
                        const blockLoc = {
                            x: loc.x + xOffset,
                            y: loc.y + yOffset,
                            z: loc.z + zOffset,
                        };
                        // Check if the block is within the sphere radius
                        if (isWithinSphere(blockLoc, loc, radius)) {
                            const block = e.block.dimension.getBlock(getMaterial(blockLoc)); // Get block using getMaterial
                            const foundValidLog = validLogBlocks.find(logType => logType === block?.typeId);
                            // Check for any log type (modify as needed)
                            if (foundValidLog) {
                                foundLog = true; // Set flag if a log is found
                                break; // Exit the inner loop if a log is found within this layer
                            }
                        }
                    }
                }
                // Check the flag after processing a layer
                if (foundLog) {
                    break; // Exit the outermost loop if a log is found in any layer
                }
            }
            // Set block to air and spawn loot table only if no log was found
            if (!foundLog) {
                if (e.block.permutation.getState('pog:playerPlaced') === false) {
                    e.block.setType('air');
                    e.block.dimension.runCommand(`loot spawn ${loc.x} ${loc.y} ${loc.z} loot "blocks/peach"`);
                }
            }

            // Helper function to potentially avoid unnecessary block lookups
            function getMaterial(blockLoc) {
                return blockLoc;
            }
        }

    });

    initEvent.blockComponentRegistry.registerCustomComponent('content:turn_to_air', {
        beforeOnPlayerPlace: e => {
            if (e.block.above().isAir === false) {
                e.cancel = true;
            }
            const blockPlacements = new Map([
                ["better_on_bedrock:bottom_tall_chorus", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:bottom_tall_chorus").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:bottom_tall_abyss_grass_block", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:bottom_tall_abyss_grass_block").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:custom_tall_plant", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:custom_tall_plant").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:bluegrod_bottom", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:bluegrod_bottom").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:lush_grass_block_bottom", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:lush_grass_block_bottom").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:tall_lavender_bottom", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:tall_lavender_bottom").withState("pog:double_plant", "top_bit"))],
                ["myname:tall_ashen_fungus", (block) => block.above(1).setPermutation(BlockPermutation.resolve("myname:tall_ashen_fungus").withState("pog:double_plant", "top_bit"))],
            ]);
            const placementFunction = blockPlacements.get(e.permutationToPlace.type.id);
            if (placementFunction && e.block.above().isAir === true) {
                placementFunction(e.block);
            }
        },
        onPlayerDestroy: e => {
            const blockPlacements = new Map([
                ["better_on_bedrock:bottom_tall_chorus", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:bottom_tall_chorus").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:bottom_tall_abyss_grass_block", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:bottom_tall_abyss_grass_block").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:custom_tall_plant", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:custom_tall_plant").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:lush_grass_block_bottom", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:lush_grass_block_bottom").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:tall_lavender_bottom", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:tall_lavender_bottom").withState("pog:double_plant", "top_bit"))],
                ["better_on_bedrock:bluegrod_bottom", (block) => block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:bluegrod_bottom").withState("pog:double_plant", "top_bit"))],
                ["myname:tall_ashen_fungus", (block) => block.above(1).setPermutation(BlockPermutation.resolve("myname:tall_ashen_fungus").withState("pog:double_plant", "top_bit"))],


            ]);
            const placementFunction = blockPlacements.get(e.destroyedBlockPermutation.type.id);
            if (placementFunction && e.destroyedBlockPermutation.getState("pog:double_plant") == 'top_bit') {
                e.block.dimension.runCommand(`setblock ${e.block.location.x} ${e.block.location.y - 1} ${e.block.location.z} air [] destroy`)
            }
        },
    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:custom_door', {

        beforeOnPlayerPlace: e => {
            const matchingBottomDoors = tallBottomDoors.find((door) => e.permutationToPlace.matches(door.id));
            const left = e.block.dimension.getBlock({ x: e.block.location.x - 1, y: e.block.location.y, z: e.block.location.z }).typeId == matchingBottomDoors.id
            const right = e.block.dimension.getBlock({ x: e.block.location.x + 1, y: e.block.location.y, z: e.block.location.z }).typeId == matchingBottomDoors.id
            const left1 = e.block.dimension.getBlock({ x: e.block.location.x, y: e.block.location.y, z: e.block.location.z - 1 }).typeId == matchingBottomDoors.id
            const right2 = e.block.dimension.getBlock({ x: e.block.location.x, y: e.block.location.y, z: e.block.location.z + 1 }).typeId == matchingBottomDoors.id
            e.block.setPermutation(e.permutationToPlace.withState(`test:door_open`, false))
            e.block.setPermutation(e.permutationToPlace.withState(`test:mirrored`, false))
            const matchingBottomDoorsId = matchingBottomDoors.topBit.id;
            if (matchingBottomDoors != undefined && left || right || left1 || right2) {
                e.block.setPermutation(e.block.permutation.withState(`test:door_open`, false))
                e.block.setPermutation(e.block.permutation.withState(`test:mirrored`, true))
                e.block.above().setPermutation(BlockPermutation.resolve(matchingBottomDoors.id, e.block.permutation.getAllStates()).withState("pog:custom_door", "top_bit"));
            }
            if (e.block.above().isAir === false) {
                e.cancel = true;
            } else if (e.block.above().isAir === true) {
                e.block.above(1).setPermutation(BlockPermutation.resolve(matchingBottomDoors.id, e.permutationToPlace.getAllStates()).withState("pog:custom_door", "top_bit"));
            }

            if (e.block.typeId == "poppy") {
                e.block.setType('air')
            }
        },
        onPlayerInteract: e => {
            const matchingBottomDoors = tallBottomDoors.find((door) => e.block.matches(door.id));
            switch (e.block.typeId) {

                case matchingBottomDoors.id:
                    const permutation = e.block.permutation;
                    const state = permutation.getState("test:door_open");
                    e.block.setPermutation(permutation.withState("test:door_open", !state));
                    const above = e.block.above();
                    const below = e.block.below();
                    if (e.block.permutation.getState("pog:custom_door") == "default") {
                        above.setPermutation(above.permutation.withState("test:door_open", !state));
                    }
                    if (e.block.permutation.getState("pog:custom_door") == "top_bit") {
                        below.setPermutation(below.permutation.withState("test:door_open", !state));
                    }
                    break;
            }

            if (e.block.permutation.getState("test:door_open") == false) {
                e.block.dimension.playSound("close.wooden_door", e.block.location)
            } else {
                e.block.dimension.playSound("open.wooden_door", e.block.location)
            }
        },
        onTick: e => {
            const permutation = e.block.permutation;
            const state = permutation.getState("test:door_open");
            const above = e.block.above();
            const block = e.block
            const matchingBottomDoors = tallBottomDoors.find((door) => e.block.matches(door.id));
            const directions = [
                { x: -1, y: 0, z: 0, name: 'west' },
                { x: 1, y: 0, z: 0, name: 'east' },
                { x: 0, y: 0, z: -1, name: 'north' },
                { x: 0, y: 0, z: 1, name: 'south' },
                { x: 0, y: 1, z: 0, name: 'up' },
                { x: 0, y: -1, z: 0, name: 'down' },
                { x: -1, y: 1, z: 0, name: 'up-west' },
                { x: -1, y: -1, z: 0, name: 'down-west' },
                { x: 1, y: 1, z: 0, name: 'up-east' },
                { x: 1, y: -1, z: 0, name: 'down-east' },
                { x: 0, y: 1, z: -1, name: 'up-north' },
                { x: 0, y: -1, z: -1, name: 'down-north' },
                { x: 0, y: 1, z: 1, name: 'up-south' },
                { x: 0, y: -1, z: 1, name: 'down-south' },
            ];
        },
        onPlayerDestroy: e => {
            const matchingBottomDoors = tallBottomDoors.find((door) => e.destroyedBlockPermutation.matches(door.id));
            if (e.block.below(1).typeId == matchingBottomDoors.id && e.block.below(1).permutation.getState("pog:custom_door") == 'default') {
                e.block.below(1).setType('air')
            }
            if (e.block.above(1).typeId == matchingBottomDoors.id && e.block.above(1).permutation.getState("pog:custom_door") == 'top_bit') {
                e.block.above(1).setType('air')
            }
        }
    });


    /*
      This function retrieves the valid values for a given crop block.
     
      **Important:** To use this function, a dummy block named `a:a` must be registered first with your state and all valid values. This serves as a reference for block state validation.
    */

    /**
    *@param {string} blockId - The unique identifier of the block.
    *@param {object} block - The block object representing the crop block.
    *@returns {object} An object containing valid values for each block state, or an empty object if no valid values are found.
    */
    function getValidValuesForBlock(blockId, block) {
        const states = {}; // Empty object to store valid state values

        // Iterate through all available states for the block
        for (const stateName in BlockPermutation.resolve(blockId).getAllStates()) {
            const validValuesForState = BlockStates.get(stateName)?.validValues; // Get valid values for the current state

            if (!validValuesForState) {
                continue; // Skip if no valid values for this state
            }

            validValuesForState.forEach((value) => {
                // Check if the block state with the current value is valid
                if (isBlockStateValid(blockId, stateName, value)) {
                    if (!states[stateName]) {
                        states[stateName] = []; // Initialize an array for this state's values
                    }
                    states[stateName].push(value); // Add the valid value to the state's array
                }
            });

            // Logic to determine and potentially update the block's state
            const firstKey = Object.keys(states)[0];
            const currentState = block.permutation.getState(firstKey)
            const maxStage = states[stateName].length - 1
            const nextStage = Math.min(currentState + 1, maxStage);
            block.setPermutation(block.permutation.withState(firstKey, nextStage))
        }

        return states;
    }

    // This function checks if a specific block state with a given value is valid.
    function isBlockStateValid(blockId, blockState, blockValue) {
        const state = {}; // Create a temporary state object
        state[blockState] = blockValue; // Set the state with the provided value

        const permutation = BlockPermutation.resolve(blockId, state); // Create a permutation based on the state
        return permutation.getState(blockState) === blockValue; // Check if the permutation matches the provided value

    }


    initEvent.blockComponentRegistry.registerCustomComponent('pog:ticking', {
        onRandomTick: e => {
            // Call getValidValuesForBlock to update the block's state
            getValidValuesForBlock(e.block.typeId, e.block);
            if (e.block.permutation.getState("better_on_bedrock:crack_stage") == 3) {
                e.block.setType('minecraft:air')
                e.block.dimension.spawnEntity("better_on_bedrock:quetzacaw_friendly", e.block.location)
            }
        },
        onPlayerInteract: e => {
            const item = e.player.getComponent('inventory').container.getItem(e.player.selectedSlotIndex);
            const currentState = e.block.permutation.getState("better_on_bedrock:growth_stage");
            if (item?.typeId === 'minecraft:bone_meal') {
                if (e.player.getGameMode() == 'survival') { e.player.dimension.runCommandAsync('clear @p bone_meal 0 1') } // Remove used bone meal
                e.block.dimension.playSound('item.bone_meal.use', e.block.location); // Play bone meal sound
                e.block.dimension.runCommandAsync(`particle minecraft:crop_growth_emitter ${e.block.location.x} ${e.block.location.y} ${e.block.location.z}`); // Spawn growth particles
                getValidValuesForBlock(e.block.typeId, e.block); // Update block state on bone meal use
            }
            if (e.block.typeId == "better_on_bedrock:blueberry_block" && e.block.permutation.getState("better_on_bedrock:growth_stage") == 2) {
                e.block.dimension.runCommandAsync(`loot spawn ${e.block.location.x} ${e.block.location.y} ${e.block.location.z} loot "blocks/blueberry_half"`)
                e.block.dimension.playSound("block.sweet_berry_bush.pick", e.block.location)
                e.block.setPermutation(e.block.permutation.withState("better_on_bedrock:growth_stage", currentState - 1))
            }
            if (e.block.typeId == "better_on_bedrock:blueberry_block" && e.block.permutation.getState("better_on_bedrock:growth_stage") == 3) {
                e.block.dimension.runCommandAsync(`loot spawn ${e.block.location.x} ${e.block.location.y} ${e.block.location.z} loot "blocks/blueberry"`)
                e.block.dimension.playSound("block.sweet_berry_bush.pick", e.block.location)
                e.block.setPermutation(e.block.permutation.withState("better_on_bedrock:growth_stage", currentState - 2))
            }
            if (e.block.typeId == "better_on_bedrock:grape" && e.block.permutation.getState("better_on_bedrock:growth_stage") == 2) {
                e.block.dimension.runCommandAsync(`loot spawn ${e.block.location.x} ${e.block.location.y} ${e.block.location.z} loot "blocks/grape_half"`)
                e.block.dimension.playSound("block.sweet_berry_bush.pick", e.block.location)
                e.block.setPermutation(e.block.permutation.withState("better_on_bedrock:growth_stage", currentState - 1))
            }
            if (e.block.typeId == "better_on_bedrock:grape" && e.block.permutation.getState("better_on_bedrock:growth_stage") == 3) {
                e.block.dimension.runCommandAsync(`loot spawn ${e.block.location.x} ${e.block.location.y} ${e.block.location.z} loot "blocks/grape"`)
                e.block.dimension.playSound("block.sweet_berry_bush.pick", e.block.location)
                e.block.setPermutation(e.block.permutation.withState("better_on_bedrock:growth_stage", currentState - 2))
            }

        }
    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:interact_placeholder', {
        onPlace: e => {
            if (e.block.typeId === "better_on_bedrock:hanging_pot_base" || !plants[item.typeId]) {

            }
        },
        onPlayerInteract: e => {
            const equipmentInventory = e.player.getComponent("equippable");

            if (e.block.type.id !== "better_on_bedrock:hanging_pot_base" || !plants[equipmentInventory.getEquipment(EquipmentSlot.Mainhand)?.typeId]) return;
            const selectedPot = getSelectedPot(e);
            const plant = plants[equipmentInventory.getEquipment(EquipmentSlot.Mainhand)?.typeId];
            setPotPlant(e.block, selectedPot, plant.value);
            playPlantSound(e.block.dimension, e.block.location, plant.sound);
        }
    });

    initEvent.blockComponentRegistry.registerCustomComponent('pog:waystone_behaviors', {
        beforeOnPlayerPlace: e => {

            const above = e.block.above();
            if (e.block.above().isAir === false) {
                e.cancel = true;
            }
            if (above.isAir) {
                e.block.above(1).setPermutation(BlockPermutation.resolve("better_on_bedrock:waystone_block_bottom", e.permutationToPlace.getAllStates()).withState(`pog:tobBit`, true));
            }
        },
        onPlayerDestroy: e => {
            if (e.block.below(1).typeId === "better_on_bedrock:waystone_block_bottom") {
                e.block.below(1).setType("air");
            }
            if (
                e.destroyedBlockPermutation.type.id === "better_on_bedrock:waystone_block_bottom" &&
                e.player.getTags().filter(v => v.startsWith('Warp:'))
            ) {
                if (e.destroyedBlockPermutation.getState('pog:tobBit') == false) {

                    const warpTags = e.player.getTags().filter(v => v.startsWith('Warp:'));
                    for (let tag of warpTags) {
                        let warpName = tag.match(/(?<=Warp:).*?(?=-)/)[0];
                        const test = `Warp:${warpName}-${e.block.location.x}|${e.block.location.y}|${e.block.location.z}|${e.player.dimension.id}`;
                        const test2 = `Warp:${warpName}-${e.block.location.x}|${e.block.location.y + 1}|${e.block.location.z}|${e.player.dimension.id}`;
                        e.block.dimension.runCommand('tag @a remove "' + test + '"')
                        e.block.dimension.runCommand('tag @a remove "' + test2 + '"')
                        e.player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cThis Wasytone has been removed!"}]}`);
                    }
                }
                if (e.destroyedBlockPermutation.getState('pog:tobBit') == true) {
                    const warpTags = e.player.getTags().filter(v => v.startsWith('Warp:'));
                    for (let tag of warpTags) {
                        let warpName = tag.match(/(?<=Warp:).*?(?=-)/)[0];
                        const test = `Warp:${warpName}-${e.block.location.x}|${e.block.location.y - 1}|${e.block.location.z}|${e.player.dimension.id}`;

                        e.block.dimension.runCommand('tag @a remove "' + test + '"')
                        e.player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cThis Wasytone has been removed!"}]}`);
                    }
                }
            }
            if (
                e.destroyedBlockPermutation.type.id === "better_on_bedrock:waystone_top" &&
                e.player.getTags().filter(v => v.startsWith('Warp:'))
            ) {
                const warpTags = e.player.getTags().filter(v => v.startsWith('Warp:'));
                for (let tag of warpTags) {
                    let warpName = tag.match(/(?<=Warp:).*?(?=-)/)[0];
                    const test = `Warp:${warpName}-${e.block.location.x}|${e.block.location.y}|${e.block.location.z}|${e.player.dimension.id}`;
                    const test2 = `Warp:${warpName}-${e.block.location.x}|${e.block.location.y - 1}|${e.block.location.z}|${e.player.dimension.id}`;
                    e.block.dimension.runCommand('tag @a remove "' + test + '"')
                    e.block.dimension.runCommand('tag @a remove "' + test2 + '"')
                    e.player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cThis Wasytone has been removed!"}]}`);
                }
            }
            if (
                e.destroyedBlockPermutation.type.id === "better_on_bedrock:waystone" &&
                e.player.getTags().filter(v => v.startsWith('Warp:'))
            ) {
                const warpTags = e.player.getTags().filter(v => v.startsWith('Warp:'));
                for (let tag of warpTags) {
                    let warpName = tag.match(/(?<=Warp:).*?(?=-)/)[0];
                    const test = `Warp:${warpName}-${e.block.location.x}|${e.block.location.y}|${e.block.location.z}|${e.player.dimension.id}`;

                    e.block.dimension.runCommand('tag @a remove "' + test + '"')
                    e.player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cThis Wasytone has been removed!"}]}`);
                }
            }
        },
        onPlayerInteract: e => {
            console.log(e.block.permutation.getState(`pog:activatedAsGlobal`))
            if (e.block.permutation.getState('pog:activated') == false && e.block.permutation.getState('pog:activatedAsGlobal') == false) {
                UI3(e.player);
            }
            if (e.block.permutation.getState('pog:activated') == true && e.block.permutation.getState('pog:activatedAsGlobal') == false) {
                UI4(e.player, e.block);
            }
            if (e.block.permutation.getState('pog:activatedAsGlobal') == true && e.block.permutation.getState('pog:activated') == false) {
                UI4(e.player, e.block);
            }
        }
    });
    initEvent.blockComponentRegistry.registerCustomComponent('pog:waystone_behaviors_old', {
        onPlayerDestroy: e => {
            if (
                e.destroyedBlockPermutation.type.id === "better_on_bedrock:waystone" &&
                e.player.getTags().filter(v => v.startsWith('Warp:'))
            ) {

                const warpTags = e.player.getTags().filter(v => v.startsWith('Warp:'));
                for (let tag of warpTags) {
                    let warpName = tag.match(/(?<=Warp:).*?(?=-)/)[0];
                    const test = `Warp:${warpName}-${e.block.location.x}|${e.block.location.y}|${e.block.location.z}|${e.player.dimension.id}`;
                    e.block.dimension.runCommand('tag @a remove "' + test + '"')
                    e.player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cThis Wasytone has been removed!"}]}`);
                }
            }
            if (
                e.destroyedBlockPermutation.type.id === "better_on_bedrock:waystone" &&
                e.player.getTags().filter(v => v.startsWith('Warp:'))
            ) {
                const warpTags = e.player.getTags().filter(v => v.startsWith('Warp:'));
                for (let tag of warpTags) {
                    let warpName = tag.match(/(?<=Warp:).*?(?=-)/)[0];
                    const test = `Warp:${warpName}-${e.block.location.x}|${e.block.location.y}|${e.block.location.z}|${e.player.dimension.id}`;

                    e.block.dimension.runCommand('tag @a remove "' + test + '"')
                    e.player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cThis Wasytone has been removed!"}]}`);
                }
            }
        },
        onPlayerInteract: e => {

            if ((e.block.permutation.getState('pog:activated') == false || e.block.permutation.getState('pog:activatedAsGlobal') == false)) {
                UI4(e.player);
            } else if (e.block.permutation.getState('pog:activated') == true || e.block.permutation.getState('pog:activatedAsGlobal') == true) {

                UI3(e.player, e.block);
            }
        }
    });
});


