import {
    ActionFormData,
    MessageFormData,
    ModalFormData,
} from "@minecraft/server-ui";

import { world, system, Player, ItemStack, ItemTypes } from "@minecraft/server";
import * as Utils from "./e_u/utils.js";


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
    const drops = Utils.smeltedBlocks.find((b) => b.id == blockType.id)?.drops;
    const alreadyVisited = locs.locations.find((l) => (l.x == x && l.y == y && l.z == z)) != undefined;
    const dropsSmelted = Utils.smeltedBlocks.find((b) => b.id == blockType.id)?.drops;
    const dropXp = Utils.smeltedBlocks.find((b) => b.id == blockType.id)?.dropXP;
    const inventory = player.getComponent("minecraft:inventory").container;
    const item = inventory.getItem(player.selectedSlotIndex);
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
    /*** @type { import("@minecraft/server").Container } */

    /*** @type { import("@minecraft/server").EnchantmentList } */

    const enchantments = item.getComponent("minecraft:enchantable").getEnchantments().map((e) => e.type);
    if (enchantments.includes("silk_touch")) {
        dimension.spawnItem(new ItemStack(blockType.id), start);
    } else {


        if (item.getLore().includes('§r§7Ore Smelter I')) {

            const level = item.getComponent("minecraft:enchantable").getEnchantment("fortune")?.level ?? 0;
            const drop = drops.drops[level];
            const amount = Math.random() * (drop.max - drop.min) + drop.min;
            const entity = world.getDimension(block.dimension.id).getEntities({ type: "minecraft:item", name: 'raw iron' }).forEach((entity) => entity.kill())
            const entity2 = world.getDimension(block.dimension.id).getEntities({ type: "minecraft:item", name: 'raw gold' }).forEach((entity) => entity.kill())
            const entity3 = world.getDimension(block.dimension.id).getEntities({ type: "minecraft:item", name: 'raw copper' }).forEach((entity) => entity.kill())
            dimension.spawnItem(new ItemStack(dropsSmelted.id, amount), start);
        }
    };


    item.getComponent('durability').damage = item.getComponent('durability').damage += 1
    inventory.setItem(player.selectedSlotIndex, item);
};

world.afterEvents.playerBreakBlock.subscribe(
    ({ player, block, dimension, brokenBlockPermutation }) => {
        const inventory = player.getComponent("minecraft:inventory").container;
        const item = inventory.getItem(player.selectedSlotIndex);
        if (!item) return;
        if (item.getLore().includes("§r§7Ore Smelter I")) {
            if (!item.hasTag('minecraft:is_pickaxe')) return;

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
        "§cYou are unable to enchant your tool. Please hold an Hoe or PickHoe you crafted or found and try again."
    );
    form.button("Ok");
    form.show(player).then((response) => {
        if (response.selection == 0) {

        }
    })
}
