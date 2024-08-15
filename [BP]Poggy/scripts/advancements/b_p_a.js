import {
  world,
  EntityInventoryComponent,
} from "@minecraft/server";

world.afterEvents.playerPlaceBlock.subscribe((data) => {
  let players = world.getPlayers();
  for (let player of players) {
    if (
      data.block.typeId == "better_on_bedrock:enchant_bench" &&
      !player.hasTag("firts_block")
    ) {
      player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §aMiner's Dream!"
      );
      player.addTag("firts_block");
      player.runCommandAsync("playsound normal_quest @p")
    }
    if (
      data.block.typeId == "minecraft:carrots" &&
      !player.hasTag("carrots")
    ) {
      player.runCommandAsync("title @p title carrots")
      player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §aA Seedy Place!"
      );
      player.addTag("carrots");
      player.runCommandAsync("playsound normal_quest @p")
    }
    if (
      data.block.typeId == "minecraft:crafting_table" &&
      !player.hasTag("craftingTable")
    ) {
      player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §a§aBenchmarking!"
      );
      player.addTag("craftingTable");
      player.runCommandAsync("title @p title craftingTable")
      player.runCommandAsync("playsound normal_quest @p")
    }
  }
});

world.afterEvents.playerBreakBlock.subscribe(({ block, player, brokenBlockPermutation, r }) => {
  let inv = player.getComponent("inventory").container;
  const inventory = player.getComponent(EntityInventoryComponent.componentId);
  for (let slot = 0; slot < inventory.container.size; slot++) {
    var vars = slot;
    if (brokenBlockPermutation.type.id == "minecraft:stone" && !player.hasTag("stone_age")) {
      player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §eStone Age!"
      );
      player.runCommandAsync("playsound normal_quest @p")
      player.addTag("stone_age");
      player.runCommandAsync('title @p title stone_age')
    }
    block.permutation.type.id
    if (brokenBlockPermutation.type.id == "better_on_bedrock:stardust_ore" && !player.hasTag("stardust_ore")) {
      player.sendMessage(
        "[§2" + player.nameTag + "§f] Made The Advancement: §5Magic Stones!"
      );
      player.runCommandAsync("playsound epic_quest @p")
      player.addTag("stardust_ore");
      player.runCommandAsync('title @p title stardust_ore')
    }

  }
})


