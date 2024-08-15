import { world, system, BlockStates, ItemStack } from "@minecraft/server";

import "../../f_p/flower_pots/flower_pot.js"

const isInRange = (value, min, max) => value >= min && value <= max;

export default class SelectionBoxes {
    /**
     * Allows you to define 3D areas in a block and get the box which the face selection lies within.
     *
     * @param {Object[]} boxes Array defining the 3D areas within a block which may be selected.
     * @param {[number, number, number]} boxes[].origin [X, Y, Z] array defining the offset of the box from the block's horizontal middle and vertical bottom in pixels, extending from the north-east.
     * @param {[number, number, number]} boxes[].size [X, Y, Z] array defining the size of the box in pixels, extending from the north-east.
     * @param {string} [boxes[].name] Custom name to easily identify this box when it is selected.
     */
    constructor(...boxes) {
        this.boxes = boxes;
    }
    /**
     * Get the box which the `faceLocation` lies within.
     *
     * @param {Record<"x" | "y" | "z", number>} faceLocation Selection location relative to the bottom north-west corner of the block.
     *
     * @param {Object} [options] Optionally configure how the selected box is calculated.
     * @param {boolean} [options.invertX] X axis extends `west -> east` rather than `east -> west` if true, following [Blockbench](https://blockbench.net)'s displayed positions.
     * @param {boolean} [options.invertY] Y axis extends `up -> down` rather than `down -> up` if true.
     * @param {boolean} [options.invertZ] Z axis extends `south -> north` rather than `north -> south` if true.
     *
     * @returns {(string|number|undefined)} Selected box name, or box index if a name is not provided. If no boxes apply to the selection, `undefined` is returned.
     */
    getSelected(faceLocation, options) {
        // Create a new object so the original is not mutated
        let location = { ...faceLocation };

        // X is inverted to ensure measurements are relative to the bottom north-east.
        if (!options?.invertX) location.x = 1 - location.x;
        if (options?.invertY) location.y = 1 - location.y;
        if (options?.invertZ) location.z = 1 - location.z;

        for (let i = 0; i < this.boxes.length; i++) {
            const box = this.boxes[i];

            const origin = {
                x: box.origin[0] + 8,
                y: box.origin[1],
                z: box.origin[2] + 8,
            };

            const inXRange = isInRange(location.x, origin.x / 16, (origin.x + box.size[0]) / 16);
            const inYRange = isInRange(location.y, origin.y / 16, (origin.y + box.size[1]) / 16);
            const inZRange = isInRange(location.z, origin.z / 16, (origin.z + box.size[2]) / 16);

            if (inXRange && inYRange && inZRange) return box.name ?? i;
        }
    }
}


const verticalHalves = new SelectionBoxes(
    { origin: [-8, 15, -8], size: [16, 1, 16], name: "up" },
    { origin: [-8, 0, -8], size: [16, 1, 16], name: "bottom" },
    { origin: [-8, 0, -8], size: [1, 16, 16], name: "west" },
    { origin: [-8, 0, 8], size: [16, 16, 1], name: "north" },
    { origin: [8, 0, -8], size: [1, 16, 16], name: "east" },
    { origin: [-8, 0, -8], size: [16, 16, 1], name: "south" }
);
world.afterEvents.itemUseOn.subscribe((e) => {
    // Do nothing if the targeted block is not "wiki:example_block"
    const selectedVerticalHalf = verticalHalves.getSelected(e.faceLocation);
    if (e.block.typeId !== "better_on_bedrock:test" && e.block.permutation.getState('pog:one') <= 3) {

        // Returns the selected vertical half ("top" or "bottom").

        if (selectedVerticalHalf) {
            e.block.setPermutation(e.block.permutation.withState("minecraft:facing_direction", selectedVerticalHalf))

            world.sendMessage(`The ${selectedVerticalHalf} of the block was selected!`);
        }
    }
    if (e.block.typeId !== "better_on_bedrock:sus_soulsand" && e.block.permutation.getState('pog:one') <= 3) {

        // Returns the selected vertical half ("top" or "bottom").
        if (selectedVerticalHalf) {
            e.block.setPermutation(e.block.permutation.withState("minecraft:facing_direction", selectedVerticalHalf))

            world.sendMessage(`The ${selectedVerticalHalf} of the block was selected!`);
        }
    }
});


world.afterEvents.itemUseOn.subscribe(({ source: player, block, itemStack, blockFace }) => {
    let block = player.getBlockFromViewDirection()?.block;

    if (itemStack.typeId != "minecraft:brush") return;
    const run1 = system.runInterval(() => {
        let block = player.getBlockFromViewDirection()?.block;
        let pogOne = block.permutation.getState("pog:one");
        let pogTwo = block.permutation.getState("pog:two");
        pogOne++
        const validValues = BlockStates.get("pog:two").validValues.filter((v) => v != "air");
        const type = validValues[Math.floor(Math.random() * validValues.length)];

        switch (block.typeId) {
            case "better_on_bedrock:test":
                world.getDimension('overworld').spawnParticle('minecraft:dirted', new Vector(block.location.x, block.location.y, block.location.z))
                if (pogTwo == "air") {

                    block.setPermutation(block.permutation.withState("pog:two", type));

                };

                if (pogOne > 7) {
                    const item = block.dimension.spawnItem(new ItemStack(pogTwo), Vector.add(block.location, { x: 0, y: 1, z: 0 }));
                    item.applyImpulse({
                        x: player.location.x - item.location.x,
                        y: player.location.y - item.location.y,
                        z: player.location.z - item.location.z,
                    });

                    block.setType("dirt");
                    return;
                };
                let i = Math.random()
                //player.runCommand(`say ${i}`)
                if (i <= 14) {

                    block.setPermutation(block.permutation.withState("pog:one", pogOne));
                }
                break;
        };
        switch (block.typeId) {
            case "better_on_bedrock:sus_soulsand":
                world.getDimension('overworld').spawnParticle('minecraft:dirted', new Vector(block.location.x, block.location.y, block.location.z))
                if (pogTwo == "air") {

                    block.setPermutation(block.permutation.withState("pog:two", type));

                };

                if (pogOne > 7) {
                    const item = block.dimension.spawnItem(new ItemStack(pogTwo), Vector.add(block.location, { x: 0, y: 1, z: 0 }));
                    item.applyImpulse({
                        x: player.location.x - item.location.x,
                        y: player.location.y - item.location.y,
                        z: player.location.z - item.location.z,
                    });

                    block.setType("soul_sand");
                    return;
                };
                let i = Math.random()
                //player.runCommand(`say ${i}`)
                if (i <= 14) {

                    block.setPermutation(block.permutation.withState("pog:one", pogOne));
                }
                break;
        };
    }, 17);
    world.afterEvents.itemStopUse.subscribe(ev => {
        let pogOne = block.permutation.getState("pog:one");
        pogOne++
        const run = system.runInterval(() => {
            if (block.permutation.getState('pog:one') > 7) {
                system.clearRun(run1);

            }
            if (!block.permutation.getState('pog:one') >= 7)
                block.setPermutation(block.permutation.withState("pog:one", pogOne--))
            system.clearRun(run);
            system.clearRun(run1);
            if (block.permutation.getState('pog:one') == 0) {
                system.clearRun(run);
                system.clearRun(run1);

            }
        }, 5);


        return;
    })
});
