import { world, system } from "@minecraft/server"

system.runInterval(() => {
    world.getPlayers().forEach((player) => {
        if (player.dimension.id == "minecraft:the_end") {
            player.dimension.playSound("ambient.random.end", player.location)
        }
    })
}, Math.random() * (880 - 480) + 480)