import { world } from "@minecraft/server"

world.afterEvents.itemUse.subscribe(data => {
  let { source: player } = data

  let invi = player.getComponent("inventory").container;
  let items = invi.getItem(player.selectedSlotIndex);
  if (items?.typeId == "better_on_bedrock:uncommon_lootbag") {
    player.runCommandAsync("function lootbag_uncommon")
  }
  if (items?.typeId == "better_on_bedrock:common_lootbag") {
    player.runCommandAsync("function common_lootbag")
  }
  if (items?.typeId == "better_on_bedrock:rare_lootbag") {
    player.runCommandAsync("function rare_lootbag")
  }
})