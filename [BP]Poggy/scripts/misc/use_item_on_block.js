import { world, ItemStack, Entity, ItemTypes, EntityInventoryComponent, Block, } from "@minecraft/server"
import { system } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"

world.beforeEvents.itemUseOn.subscribe((use) => {
  let player = use.source,
    item = use.itemStack; // this do not work. can't get item no more
  let blockTest = player.getBlockFromViewDirection()?.block;

  //custom shovel and hoe sounds when they change dirt to farmland and grass_block to paths.
  //We uses this to prevent server lag caused by run_command.
  if (
    (item?.typeId == "better_on_bedrock:stardust_hoe") &&
    (blockTest?.typeId == "minecraft:grass_block" || blockTest?.typeId == "minecraft:dirt" || blockTest?.typeId == "minecraft:coarse_dirt")
  ) {

    world.getDimension(player.dimension.id).runCommandAsync("playsound use.gravel @p")
  }
  if (
    (item?.typeId == "better_on_bedrock:stardust_shovel") &&
    (blockTest?.typeId == "minecraft:grass_block" || blockTest?.typeId == "minecraft:dirt")
  ) {

    world.getDimension(player.dimension.id).runCommandAsync("playsound step.grass_block @p")
  }
  //step.grass_block
});

world.afterEvents.itemUse.subscribe((use) => {
  let player = use.source,
    item = use.itemStack; // this do not work. can't get item no more
  let blockTest = player.getBlockFromViewDirection()?.block;
  if (item.typeId == 'better_on_bedrock:amethyst_helmet') {
    player.runCommand("playsound step.amethyst_block @p")
  }
  if (item.typeId == 'better_on_bedrock:amethyst_chestplate') {
    player.runCommand("playsound step.amethyst_block @p")
  }
  if (item.typeId == 'better_on_bedrock:amethyst_leggings') {
    player.runCommand("playsound step.amethyst_block @p")
  }
  if (item.typeId == 'better_on_bedrock:amethyst_boots') {
    player.runCommand("playsound step.amethyst_block @p")
  }
})