import { world, BlockVolume, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.blockComponentRegistry.registerCustomComponent('pog:leavesCubioud', {
        beforeOnPlayerPlace: e => {
            e.permutationToPlace = e.permutationToPlace.withState('pog:playerPlaced', true);
        },
        onRandomTick: e => {
            const validLogBlocks = [
                "minecraft:oak_log",
                "minecraft:birch_log",
                "minecraft:spruce_log",
                "minecraft:acacia_log",
                "minecraft:dark_oak_log",
                "minecraft:cherry_log",
                "minecraft:mangrove_log",
                "minecraft:jungle_log",
            ]; //Array of call block types that will be considered a valid log
            const range = 3
            const locationOfOriginalBlock = e.block.location //Location of the origin leaf block
            const from = { x: locationOfOriginalBlock.x - range, y: locationOfOriginalBlock.y - range, z: locationOfOriginalBlock.z - range };
            const to = { x: locationOfOriginalBlock.x + range, y: locationOfOriginalBlock.y + range, z: locationOfOriginalBlock.z + range };
            const volume = new BlockVolume(from, to);
            const contains = e.block.dimension.containsBlock(volume, {
                includeTypes: validLogBlocks
            }, true); //returns true if any of the block types within `validLogBlocks` is found within the block volume
            if (contains == true) return;
            else { //runs when the log was not found withing the volume
                if (e.block.permutation.getState('pog:playerPlaced') === false) {
                    e.block.setType('air')
                    e.block.dimension.runCommand(`loot spawn ${e.block.location.x} ${e.block.location.y}  ${e.block.location.z} loot "blocks/peach"`)
                    //assign your loot table ^
                }
            }
        }
    });
});


