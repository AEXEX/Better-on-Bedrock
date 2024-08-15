
/**
 * 
 * @param { import("@minecraft/server").Block } block
 * @param { import("@minecraft/server").Dimension } dimension
 */
export const hoeGround = (block, dimension) => {
    const { x, y, z } = block.location;

    // Define the check area corners
    const corner1 = { x: x + 1, y: y + 1, z: z + 1 };
    const corner2 = { x: x - 1, y: y - 1, z: z - 1 };

    // Iterate through individual block positions within the area
    for (let checkX = corner1.x; checkX >= corner2.x; checkX--) {
        for (let checkY = corner1.y; checkY >= corner2.y; checkY--) {
            for (let checkZ = corner1.z; checkZ >= corner2.z; checkZ--) {
                const checkLocation = { x: checkX, y: checkY, z: checkZ };
                const targetBlock = dimension.getBlock(checkLocation);

                if (targetBlock.hasTag('minecraft:crop') || targetBlock.typeId === 'minecraft:short_grass_block') {
                    dimension.runCommandAsync(`setblock ${checkX} ${checkY} ${checkZ} air [] destroy`);
                }
            }
        }
    }
};
