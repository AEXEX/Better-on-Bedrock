import { ItemStack, world } from "@minecraft/server"

world.afterEvents.itemUse.subscribe(ev => {
    const player = ev.source
    const item = ev.itemStack

    if (player.isSneaking == true && item.typeId == 'better_on_bedrock:nether_amulet_3_stone_yellow_red_green') {
        const inventory = player.getComponent("minecraft:inventory").container;
        inventory.setItem(player.selectedSlotIndex, new ItemStack("better_on_bedrock:nether_amulet_full_purple_active", 1))
    }
    if (player.isSneaking == true && item.typeId == 'better_on_bedrock:nether_amulet_full_purple_active') {
        const inventory = player.getComponent("minecraft:inventory").container;
        inventory.setItem(player.selectedSlotIndex, new ItemStack("better_on_bedrock:nether_amulet_full_red_active", 1))
    }
    if (player.isSneaking == true && item.typeId == 'better_on_bedrock:nether_amulet_full_red_active') {
        const inventory = player.getComponent("minecraft:inventory").container;
        inventory.setItem(player.selectedSlotIndex, new ItemStack("better_on_bedrock:nether_amulet_3_stone_yellow_red_green", 1))
    }
})