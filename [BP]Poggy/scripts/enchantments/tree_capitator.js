import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "@minecraft/server-ui";

import { world, system, Player, ItemStack, ItemTypes } from "@minecraft/server";
import * as Utils from "./e_u/treeUitls.js";


/**
 * @type {{ run: number; locations: import("@minecraft/server").Vector3[] }[]}
 */
let locations = [];

const breakBlocks = (player, block, dimension, blockType, start, run) => {
  let locs = locations.find(({ run: r }) => r === run);
  if (locs === undefined) {
    locations.push({ run, locations: [] });
    locs = locations.find(({ run: r }) => r === run);
  }

  const { x, y, z } = block.location;
  const alreadyVisited = locs.locations.find((l) => (l.x === x && l.y === y && l.z === z)) !== undefined;
  const drops = Utils.allowedBlocksWood.find((b) => b.id === blockType.id)?.drops;

  if (
    alreadyVisited ||
    (locs.locations.length !== 0 && (drops === undefined || block.type.id !== blockType.id)) ||
    locs.locations.length === Utils.maxBlocks
  )
    return;

  block.setType('air');
  if (locs.locations.length !== 0) {
    const inventory = player.getComponent("minecraft:inventory").container;
    const item = inventory.getItem(player.selectedSlotIndex);
    const enchantments = item.getComponent("minecraft:enchantable").getEnchantments().map((e) => e.type);

    if (enchantments.includes("silk_touch")) {
      dimension.spawnItem(new ItemStack(blockType.id), start);
    } else {
      const level = enchantments.includes("fortune")?.level ?? 0;
      const drop = drops.drops[level];
      const amount = Math.random() * (drop.max - drop.min) + drop.min;
      dimension.spawnItem(new ItemStack(drops.id, amount), start);
    }
  }

  locs.locations.push({ x, y, z });

  // Iterate through neighboring blocks manually
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
  //.damage)

  item.getComponent('durability').damage = item.getComponent('durability').damage += 1
  inventory.setItem(player.selectedSlotIndex, item);

};

world.afterEvents.playerBreakBlock.subscribe(
  ({ player, block, dimension, brokenBlockPermutation }) => {
    const inventory = player.getComponent("minecraft:inventory").container;
    const item = inventory.getItem(player.selectedSlotIndex);
    const durability = item?.getComponent('durability')
    const veinLore = item?.getLore().includes("§r§7Tree Capitator I")
    if (!item) return;
    if (item?.getLore().includes("§r§7Tree Capitator I") && (durability.maxDurability - durability.damage) != 0) {
      if (!item.hasTag('minecraft:is_axe')) return;

      breakBlocks(player, block, dimension, brokenBlockPermutation.type, block.location, Date.now());
    }

  },
);



system.afterEvents.scriptEventReceive.subscribe(
  ({ id, sourceEntity }) => {
    if (!(sourceEntity instanceof Player)) return;
    if (id == "bob:warn") {
      blockWarn(sourceEntity)
    }
  },
  {
    namespaces: [
      "bob",
    ],
  },
);



export function blockWarn(player) {
  let form = new ActionFormData();
  form.title("No Tool?");
  form.body(
    "§cYou are unable to enchant your tool. Please hold either of these tools and try again.§e\n\n-Axe\n-Pickaxe\n-Shears\n-Hoe"
  );
  form.button("Ok");
  form.show(player).then((response) => {
    if (response.selection == 0) {

    }
  })
}
export function treeCapitator(player) {
  let level = player.runCommandAsync("xp 0 @s").level;
  let form = new ActionFormData();
  form.title("Enchant axe?");
  form.body(
    "§cTo enchant this axe with Tree Capitator I, you need the following requirements:\n\n§e- 1x Axe\n- 1x Tree Capitator Book\n- 6x XP levels"
  );
  ///buttons
  form.button("Enchant");
  form.button("Don't Enchant");
  form.show(player).then((response) => {
    if (response.selection == 0 && player.level >= 6) {
      const inventory = player.getComponent(
        'inventory'
      );
      for (let slot = 0; slot < inventory.container.size; slot++) {
        const itemStack = inventory.container.getItem(slot);
        if (itemStack?.typeId === "better_on_bedrock:tree_cap_book") {
          let inv = player.getComponent("inventory").container;
          let item = inv.getItem(player.selectedSlotIndex);
          let newItem = new ItemStack(ItemTypes?.get("better_on_bedrock:stone_axe"));
          if (item?.hasTag('minecraft:is_axe')) {
            item?.setLore(["§r§7Tree Capitator I"]);
            player.runCommandAsync("clear @p better_on_bedrock:tree_cap_book 0 1");
            player.runCommandAsync("xp -6l @p");
            inv.setItem(player.selectedSlotIndex, item);
            player.runCommandAsync("enchant @p efficiency 1");
          }

        }
      }
    } else if (response.selection == 0 && player.level < 6) {
      player.sendMessage("§cYou don't have enough levels.")
    }
    if (response.selection == 1) {

    }
  });
}