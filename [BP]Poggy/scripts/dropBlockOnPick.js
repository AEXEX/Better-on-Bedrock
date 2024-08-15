import { world, system, ItemStack, GameMode, EquipmentSlot } from "@minecraft/server"

world.afterEvents.playerBreakBlock.subscribe(ev => {
    const player = ev.player
    const equipmentInventory = player.getComponent("equippable")
    if (ev.brokenBlockPermutation.type.id == 'minecraft:iron_ore' && (equipmentInventory.getEquipment(EquipmentSlot.Mainhand)?.typeId == 'better_on_bedrock:stone_pickaxe')) {
        const entity = world.getDimension(ev.block.dimension.id).getEntities({ type: "minecraft:item", name: 'raw iron' }).forEach((entity) => entity.kill())
        player.sendMessage("§cYou can only mine this ore with a copper or better pickaxe!")
        player.playSound("random.break", player.location)

    }
    if (ev.brokenBlockPermutation.type.id == 'minecraft:iron_ore' && (equipmentInventory.getEquipment(EquipmentSlot.Mainhand)?.typeId == 'better_on_bedrock:stone_pickaxe')) {
        const entity = world.getDimension(ev.block.dimension.id).getEntities({ type: "minecraft:item", name: 'raw iron' }).forEach((entity) => entity.kill())
        player.sendMessage("§cYou can only mine this ore with a copper or better pickaxe!")
        player.playSound("random.break", player.location)

    }
})