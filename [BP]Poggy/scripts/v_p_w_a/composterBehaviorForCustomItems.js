import { world, system, BlockPermutation } from "@minecraft/server"

/**
 * 
 * @param { import("@minecraft/server").Block } block
 * @param { import("@minecraft/server").ItemStack } item
 */

let value = 0;

function incrementValue(block, item) {
    const currentLevel = block.permutation.getState('composter_fill_level');
    const tiers = {
        lowTier: { chance: 0.3, items: ['pog:compost,pog:lowTier'] },
        medLowTier: { chance: 0.5, items: ['pog:compost,pog:medLowTier'] },
        mediumTier: { chance: 0.65, items: ['pog:compost,pog:mediumTier'] },
        highTier: { chance: 0.85, items: ['pog:compost,pog:highTier'] },
        mythicTier: { chance: 1, items: ['pog:compost,pog:mythicTier'] },
    };
    const matchingTier = Object.entries(tiers).find(([tierName, tier]) =>
        tier.items.includes(item.getTags().toString())
    );
    let chanceToIncrease = 0.3; // Default chance
    if (matchingTier) {
        chanceToIncrease = matchingTier[1].chance;
    }
    const newValue = Math.min(currentLevel + (Math.random() < chanceToIncrease ? 1 : 0), 7);
    if (currentLevel <= 7) { block.setPermutation(BlockPermutation.resolve(`composter`, block.permutation.getAllStates()).withState('composter_fill_level', newValue)); }
    if (newValue > currentLevel) {
        block.dimension.playSound('block.composter.fill_success', block.location);
    } else {
        block.dimension.playSound('block.composter.fill', block.location);
    }
    return newValue > currentLevel;
}
/*
world.afterEvents.playerInteractWithBlock.subscribe(ev => {
    if (ev.itemStack?.hasTag(`pog:compost`)) {
        if (ev.block.permutation.getState('composter_fill_level') <= 6) {
            ev.block.dimension.runCommandAsync(`particle better_on_bedrock:composter_insert_success ${ev.block.location.x} ${ev.block.location.y + 0.5} ${ev.block.location.z}`)
            ev.block.dimension.runCommand(`clear @p ${ev.itemStack?.typeId} 0 1`)
            incrementValue(ev.block, ev.itemStack)
        }
        if (ev.block.permutation.getState('composter_fill_level') == 7) {
            world.beforeEvents.playerInteractWithBlock.subscribe(ev => {
                if (ev.block.permutation.getState('composter_fill_level') == 7) {
                    ev.cancel = true
                }
            })
            ev.player.dimension.runCommand(`setblock ${ev.block.location.x} ${ev.block.location.y} ${ev.block.location.z} composter ["composter_fill_level"=7] destroy`)
            ev.block.dimension.playSound('block.composter.fill_success', ev.block.location)
            ev.block.dimension.runCommand(`stopsound @p dig.wood`)
            const entity = world.getDimension(ev.block.dimension.id).getEntities({ type: "minecraft:item", name: 'composter' }).forEach((entity) => entity.kill())
        }
    }
})

*/