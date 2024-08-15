import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "@minecraft/server-ui";

import { world, system, Player, ItemStack, ItemTypes } from "@minecraft/server";
import * as Utils from "./e_u/leafyUtils.js";


/**
 * @type {{ run: number; locations: import("@minecraft/server").Vector3[] }[]}
 */
let locations = [];

/**
 * 
 * @param { import("@minecraft/server").Player } player
 * @param { import("@minecraft/server").Block } block
 * @param { import("@minecraft/server").Dimension } dimension
 * @param { import("@minecraft/server").BlockType } blockType
 * @param { import("@minecraft/server").Vector3 } start
 * @param { number } run
 */
const breakBlocks = (player, block, dimension, blockType, start, run) => {
  let locs = locations.find(({ run: r }) => r == run);
  if (locs == undefined) {
    locations.push({ run, locations: [] });
    locs = locations.find(({ run: r }) => r == run);
  };

  const { x, y, z } = block.location;
  const alreadyVisited = locs.locations.find((l) => (l.x == x && l.y == y && l.z == z)) != undefined;
  const drops = Utils.allowedBlocksWood.find((b) => b.id == blockType.id)?.drops;
  //const tag = Utils.allowedTags.find((t) => t.id == blockType.id)?.tag;
  if (
    alreadyVisited
    || (
      locs.locations.length != 0
      && (drops == undefined || block.type.id != blockType.id)
    )
    || locs.locations.length == Utils.maxBlocks
  ) return;

  block.setType('air');
  if (locs.locations.length != 0) {
    /*** @type { import("@minecraft/server").Container } */
    const inventory = player.getComponent("minecraft:inventory").container;
    const item = inventory.getItem(player.selectedSlotIndex);
    /*** @type { import("@minecraft/server").EnchantmentList } */
    const enchantments = item.getComponent("minecraft:enchantable").getEnchantments().map((e) => e.type);
    if (enchantments.includes("silk_touch")) {

      dimension.spawnItem(new ItemStack(blockType.id), start);

    } else {
      const level = enchantments.includes("fortune")?.level ?? 0;
      const drop = drops.drops[level];
      const amount = Math.round(Math.random());
      dimension.spawnItem(new ItemStack(drops.id, 1), start);
    }
  };

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
  //.damage)

  item.getComponent('durability').damage = item.getComponent('durability').damage += 1
  //inventory.setItem(player.selectedSlotIndex, item);
};

world.afterEvents.playerBreakBlock.subscribe(
  ({ player, block, dimension, brokenBlockPermutation }) => {
    const inventory = player.getComponent("minecraft:inventory").container;
    const item = inventory.getItem(player.selectedSlotIndex);
    if (!item) return;
    if (item.getLore().includes("§r§7Leafy Liberator I")) {



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



function blockWarn(player) {
  let form = new ActionFormData();
  form.title("No Tool?");
  form.body(
    "§cYou are unable to enchant your tool. Please hold an Axe or Pickaxe you crafted or found and try again."
  );
  form.button("Ok");
  form.show(player).then((response) => {
    if (response.selection == 0) {

    }
  })
}
export function leafyLib(player) {
  let level = player.runCommandAsync("xp 0 @s").level;
  let form = new ActionFormData();
  form.title("Enchant Shears?");
  form.body(
    "§cTo enchant these shears with Leafy Libirator I, you need at least §e6 experience levels §cand §e1 Leafy Libirator I Enchanted Book\n\n§aWhen you have both of the requirements, you'll be able to enchant.\n\n§3When you don't have the requirements, you won't be able to enchant your axe."
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
        if (itemStack?.typeId === "better_on_bedrock:leafy_liberator") {
          let inv = player.getComponent("inventory").container;
          let item = inv.getItem(player.selectedSlotIndex);
          if (item?.typeId == 'minecraft:shears') {
            item?.setLore(["§r§7Leafy Liberator I"]);
            player.runCommandAsync("clear @p better_on_bedrock:leafy_liberator 0 1");
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