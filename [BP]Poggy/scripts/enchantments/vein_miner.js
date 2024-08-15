import { world, system, ItemStack, EntityInventoryComponent, EntityType } from "@minecraft/server";
import * as Utils from "./e_u/utils.js";
import { ActionFormData } from "@minecraft/server-ui";



let locations = [];

const breakBlocks = (player, block, dimension, blockType, start, run) => {
  let locs = locations.find(({ run: r }) => r === run);
  if (locs === undefined) {
    locations.push({ run, locations: [] });
    locs = locations.find(({ run: r }) => r === run);
  }

  const { x, y, z } = block.location;
  const alreadyVisited = locs.locations.find((l) => (l.x === x && l.y === y && l.z === z)) !== undefined;
  const drops = Utils.allowedBlocks.find((b) => b.id === blockType.id)?.drops;
  const dropsSmelted = Utils.smeltedBlocks.find((b) => b.id === blockType.id)?.drops;
  const dropXp = Utils.allowedBlocks.find((b) => b.id === blockType.id)?.dropXP;

  if (alreadyVisited || (locs.locations.length !== 0 && (drops === undefined || block.type.id !== blockType.id)) || locs.locations.length === Utils.maxBlocks) return;

  block.setType('air');
  if (locs.locations.length !== 0) {
    const inventory = player.getComponent("minecraft:inventory").container;
    const item = inventory.getItem(player.selectedSlotIndex);
    const level = item.getComponent("minecraft:enchantable").getEnchantment("fortune")?.level ?? 0;
    const drop = drops.drops[level];
    const amount = Math.random() * (drop.max - drop.min) + drop.min;

    if ((item.getLore().join('').includes('§r§7Ore Smelter I') || item.getLore().join('').includes('§r§7Ore Smelter I'))) {
      const entity = world.getDimension(block.dimension.id).getEntities({ type: "minecraft:item", maxDistance: 1 }).forEach((entity) => entity.kill());
      dimension.spawnItem(new ItemStack(dropsSmelted.id, amount), start);
    } else {
      const enchantments = item.getComponent("minecraft:enchantable").getEnchantments().map((e) => e.id);

      if (item.getComponent("minecraft:enchantable").hasEnchantment('silk_touch')) {
        dimension.spawnItem(new ItemStack(blockType.id), start);
      } else {
        const level = item.getComponent("minecraft:enchantable").getEnchantment("fortune")?.level ?? 0;
        const drop = drops.drops[level];
        const amount = Math.random() * (drop.max - drop.min) + drop.min;

        if (!(item.getLore().join('').includes('§r§7Ore Smelter I') || item.getLore().join('').includes('§r§7Ore Smelter I'))) {
          dimension.spawnItem(new ItemStack(drops.id, amount), start);
        }

        if (dropXp === true) {
          dimension.spawnEntity('minecraft:xp_orb', start);
          dimension.spawnEntity('minecraft:xp_orb', start);

          if (drops.id === 'minecraft:lapis_lazuli' || drops.id === 'minecraft:deepslate_lapis_lazuli' || drops.id === 'minecraft:quartz_ore') {
            dimension.spawnEntity('minecraft:xp_orb', start);
          }
        }
      }
    }
  }

  locs.locations.push({ x, y, z });

  const neighbors = [
    { x: block.location.x + 1, y, z },
    { x: block.location.x - 1, y, z },
    { x, y: block.location.y + 1, z },
    { x, y: block.location.y - 1, z },
    { x, y, z: block.location.z + 1 },
    { x, y, z: block.location.z - 1 },
  ];

  for (const neighbor of neighbors) {
    const neighborBlock = dimension.getBlock(neighbor);
    breakBlocks(player, neighborBlock, dimension, blockType, start, run);
  }

  const inventory = player.getComponent("minecraft:inventory").container;
  const item = inventory.getItem(player.selectedSlotIndex);

  item.getComponent('durability').damage = item.getComponent('durability').damage += 1
  inventory.setItem(player.selectedSlotIndex, item);
};

world.afterEvents.playerBreakBlock.subscribe(
  ({ player, block, dimension, brokenBlockPermutation, experience }) => {
    const inventory = player.getComponent("minecraft:inventory").container;
    const item = inventory.getItem(player.selectedSlotIndex);

    if (!item) return;
    if (item.getLore().join('').includes('§r§7Vein Miner I')) {
      if (!item.hasTag('minecraft:is_pickaxe')) return;

      breakBlocks(player, block, dimension, brokenBlockPermutation.type, block.location, Date.now());
    }
  },
);



/**
 * @param { import("@minecraft/server").Player } player
 */
export function veinMine(player) {

  let form = new ActionFormData();
  form.title("Enchant Pickaxe?");
  form.body(
    "§cTo enchant this pickaxe, select an option below. You need the following requirements:\n\n§e- 1x Pickaxe\n- 1x Vein Miner Book or 1x Ore Smelter Book\n- 6x XP levels"
  );
  ///buttons
  form.button("Vein Miner I");
  form.button("Auto Smelter I");
  form.button("Don't Enchant");
  form.show(player).then((response) => {
    if (response.selection == 0 && player.level >= 6) {
      const inventory = player.getComponent(
        EntityInventoryComponent.componentId
      );
      for (let slot = 0; slot < inventory.container.size; slot++) {
        const itemStack = inventory.container.getItem(slot);
        if (itemStack?.typeId === "better_on_bedrock:vein_miner_book") {
          let inv = player.getComponent("inventory").container;
          let item = inv.getItem(player.selectedSlotIndex);

          if (item.hasTag('minecraft:is_pickaxe')) {

            if (item.getLore().includes("§r§7Ore Smelter I")) {
              item.setLore(['§r§7Vein Miner I' + '\n' + item?.getLore()])
              player.runCommandAsync("clear @p better_on_bedrock:vein_miner_book 0 1");
              player.runCommandAsync("xp -6l @p");
              inv.setItem(player.selectedSlotIndex, item);
              player.runCommandAsync("enchant @p efficiency 1");
            } else if (item?.getLore() == false) {
              item.setLore(['§r§7Vein Miner I'])
              player.runCommandAsync("clear @p better_on_bedrock:vein_miner_book 0 1");
              player.runCommandAsync("xp -6l @p");
              inv.setItem(player.selectedSlotIndex, item);
              player.runCommandAsync("enchant @p efficiency 1");
            }
          }

        }
      }
    }
    if (response.selection == 1 && player.level >= 6) {
      const inventory = player.getComponent(
        EntityInventoryComponent.componentId
      );
      for (let slot = 0; slot < inventory.container.size; slot++) {
        const itemStack = inventory.container.getItem(slot);
        if (itemStack?.typeId === "better_on_bedrock:auto_smelter") {
          let inv = player.getComponent("inventory").container;
          let item = inv.getItem(player.selectedSlotIndex);
          if (item.hasTag('minecraft:is_pickaxe')) {
            if (item.getLore().includes("§r§7Vein Miner I")) {
              item.setLore(['§r§7Ore Smelter I' + '\n' + item?.getLore()])
              player.runCommandAsync("clear @p better_on_bedrock:auto_smelter 0 1");
              player.runCommandAsync("xp -6l @p");
              inv.setItem(player.selectedSlotIndex, item);
              player.runCommandAsync("enchant @p efficiency 1");
            } else if (item?.getLore() == false) {
              item.setLore(['§r§7Ore Smelter I'])
              player.runCommandAsync("clear @p better_on_bedrock:auto_smelter 0 1");
              player.runCommandAsync("xp -6l @p");
              inv.setItem(player.selectedSlotIndex, item);
              player.runCommandAsync("enchant @p efficiency 1");
            }

          }

        }
      }
    }
    else if ((response.selection == 0 || response.selection == 1) && player.level < 6) {
      player.sendMessage("§cYou don't have enough levels.")
    }
    if (response.selection == 2) {
    }
  });
}
