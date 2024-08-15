import { world } from "@minecraft/server"

world.afterEvents.playerBreakBlock.subscribe(ev => {
    const player = ev.player
    const block = ev.brokenBlockPermutation
    if (block.type.id == 'minecraft:jukebox') {
        player.dimension.runCommand('stopsound @p')
    }
})
