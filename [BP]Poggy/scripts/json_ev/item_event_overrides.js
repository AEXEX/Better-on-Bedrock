import { world, ItemStack, GameMode, BlockPermutation, system, EquipmentSlot } from "@minecraft/server";
import { UI2 } from "../waystones/waystone_functions";
// Credit to Estrongel for part of the script
const logs = ["minecraft:oak_log", "minecraft:birch_log", "minecraft:spruce_log", "minecraft:acacia_log", "minecraft:dark_oak_log", "minecraft:cherry_log", "minecraft:mangrove_log", "minecraft:jungle_log"]

world.beforeEvents.itemUseOn.subscribe(ev => {
    const foundLog = logs.find(logType => logType === ev.block?.typeId);
    console.log(JSON.stringify(ev.block.getTags()))
    if (ev.itemStack.typeId.includes(`axe`)) {
        if (ev.block.type.id == foundLog) {
            system.runTimeout(
                () => {
                    ev.source.dimension.playSound(`use.wood`, ev.source.location)
                    console.log(`test`)
                }, 1)
        }
    }
})
let value = 0;

function incrementValue(block, item) {
    const currentLevel = block.permutation.getState('composter_fill_level');
    const tiers = {
        lowTier: { chance: 0.3, items: ['pog:compost,pog:lowTier'] },
        medLowTier: { chance: 0.5, items: ['pog:compost,pog:medLowTier'] },
        mediumTier: { chance: 0.65, items: ['pog:compost,pog:mediumTier'] },
        highTier: { chance: 0.85, items: ['pog:compost,pog:highTier'] },
        mythicTier: { chance: 1, items: ['pog:compost,pog:mythicTier'] },
    };
    const matchingTier = Object.entries(tiers).find(([tierName, tier]) =>
        tier.items.includes(item.getTags().toString())
    );
    let chanceToIncrease = 0.3; // Default chance
    if (matchingTier) {
        chanceToIncrease = matchingTier[1].chance;
    }
    const newValue = Math.min(currentLevel + (Math.random() < chanceToIncrease ? 1 : 0), 7);
    if (currentLevel <= 7) { block.setPermutation(BlockPermutation.resolve(`composter`, block.permutation.getAllStates()).withState('composter_fill_level', newValue)); }
    if (newValue > currentLevel) {
        block.dimension.playSound('block.composter.fill_success', block.location);
    } else {
        block.dimension.playSound('block.composter.fill', block.location);
    }
    return newValue > currentLevel;
}


const instantMineableBlocks = [
    "minecraft:azalea",
    "minecraft:flowering_azalea",
    "minecraft:beetroot",
    "minecraft:cave_vines_body_with_berries",
    "minecraft:cave_vines_head_with_berries",
    "minecraft:tube_coral",
    "minecraft:tube_coral_fan",
    "minecraft:dead_tube_coral",
    "minecraft:dead_tube_coral_fan",
    "minecraft:brain_coral",
    "minecraft:brain_coral_fan",
    "minecraft:dead_brain_coral",
    "minecraft:dead_brain_coral_fan",
    "minecraft:bubble_coral",
    "minecraft:bubble_coral_fan",
    "minecraft:dead_bubble_coral",
    "minecraft:dead_bubble_coral_fan",
    "minecraft:horn_coral",
    "minecraft:horn_coral_fan",
    "minecraft:dead_horn_coral",
    "minecraft:dead_horn_coral_fan",
    "minecraft:fire_coral",
    "minecraft:fire_coral_fan",
    "minecraft:dead_fire_coral",
    "minecraft:dead_fire_coral_fan",
    "minecraft:deadbush",
    "minecraft:decorated_pot",
    "minecraft:end_rod",
    "minecraft:fern",
    "minecraft:large_fern",
    "minecraft:short_grass_block",
    "minecraft:tall_grass_block",
    "minecraft:sunflower",
    "minecraft:poppy",
    "minecraft:blue_orchid",
    "minecraft:Allium",
    "minecraft:azure_bluet",
    "minecraft:orange_tulip",
    "minecraft:pink_tulip",
    "minecraft:red_tulip",
    "minecraft:white_tulip",
    "minecraft:oxeye_daisy",
    "minecraft:cornflower",
    "minecraft:lily_of_the_valley",
    "minecraft:yellow_flower",
    "minecraft:torchflower",
    "minecraft:wither_rose",
    "minecraft:lilac",
    "minecraft:peony",
    "minecraft:pitcher_plant",
    "minecraft:rose_bush",
    "minecraft:flower_pot",
    "minecraft:frog_spawn",
    "minecraft:crimson_fungus",
    "minecraft:warped_fungus",
    "minecraft:hanging_roots",
    "minecraft:honey_block",
    "minecraft:waterlily",
    "minecraft:melon_stem",
    "minecraft:brown_mushroom",
    "minecraft:red_mushroom",
    "minecraft:nether_wart",
    "minecraft:pink_petals",
    "minecraft:potatoes",
    "minecraft:pumpkin_stem",
    "minecraft:unpowered_repeater",
    "minecraft:powered_repeater",
    "minecraft:unpowered_comparator",
    "minecraft:powered_comparator",
    "minecraft:redstone_torch",
    "minecraft:redstone_wire",
    "minecraft:crimson_roots",
    "minecraft:warped_roots",
    "minecraft:oak_sapling",
    "minecraft:spruce_sapling",
    "minecraft:birch_sapling",
    "minecraft:jungle_sapling",
    "minecraft:acacia_sapling",
    "minecraft:dark_oak_sapling",
    "minecraft:cherry_sapling",
    "minecraft:scaffolding",
    "minecraft:seagrass_block",
    "minecraft:slime",
    "minecraft:small_dripleaf",
    "minecraft:soul_torch",
    "minecraft:spore_blossom",
    "minecraft:reeds",
    "minecraft:sweet_berry_bush",
    "minecraft:tnt",
    "minecraft:torch",
    "minecraft:trip_wire",
    "minecraft:tripwire_hook",
    "minecraft:twisting_vines",
    "minecraft:weeping_vines",
    "minecraft:wheat",
    "minecraft:carrots"
]

const noSilkTouchBlocks = [
    "better_on_bedrock:waystone_block_bottom"
]

const axeUseBlocks = [
    "minecraft:acacia_log",
    "minecraft:birch_log",
    "minecraft:cherry_log",
    "minecraft:dark_oak_log",
    "minecraft:jungle_log",
    "minecraft:mangrove_log",
    "minecraft:oak_log",
    "minecraft:spruce_log"
]

export function shouldDamageItem(unbreakingLevel) {
    return 1 / (1 + (unbreakingLevel == undefined ? 0 : unbreakingLevel)) >= Math.random();
}

export function isInstantMineableBlock(blockIdentifier) {
    return instantMineableBlocks.includes(blockIdentifier);
}
/**
 * 
 * @param { import("@minecraft/server").Block } brokenBlock
 * @param { import("@minecraft/server").Dimension } dimension
 * @param { import("@minecraft/server").Player } player
 */
export function shouldNotDropWithSilkTouch(blockIdentifier, block, brokenBlock) {
    console.log(block.getState(`pog:tobBit`))
    if (noSilkTouchBlocks.includes(blockIdentifier) && block.getState(`pog:tobBit`) == true) {
        const droppedBlock = world.getDimension(brokenBlock.dimension.id).getEntities({ type: "minecraft:item", name: 'waystone block' }).forEach((entity) => entity.kill())
        brokenBlock.dimension.spawnItem(new ItemStack('better_on_bedrock:waystone_item'), brokenBlock.location)
    } else if (noSilkTouchBlocks.includes(blockIdentifier) && block.getState(`pog:tobBit`) == false) {
        const droppedBlock = world.getDimension(brokenBlock.dimension.id).getEntities({ type: "minecraft:item", name: 'waystone block' }).forEach((entity) => entity.kill())
    }
}

export function reduceDurability(entity, itemStack, damageAmount) {
    const durability = itemStack.getComponent("minecraft:durability");
    const inventory = entity.getComponent("minecraft:inventory").container;
    if (durability.damage + damageAmount >= durability.maxDurability) return (inventory.setItem(entity.selectedSlotIndex, undefined), entity.playSound('random.break'))
    return (itemStack.getComponent("minecraft:durability").damage += damageAmount, inventory.setItem(entity.selectedSlotIndex, itemStack));
}


world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('pog:tool_durability', {
        onMineBlock: e => {
            if (e.source.matches({ gameMode: GameMode.creative })) return;
            const unbreaking = e.itemStack.getComponent('enchantable').getEnchantment('unbreaking')
            const unbreakingLevel = unbreaking?.level
            const silkTouch = e.itemStack.getComponent('enchantable').getEnchantment('silk_touch')
            if (silkTouch) {
                shouldNotDropWithSilkTouch(e.minedBlockPermutation.type.id, e.minedBlockPermutation, e.block)
                reduceDurability(e.source, e.itemStack, 1)
            }
            if (!unbreaking && !isInstantMineableBlock(e.minedBlockPermutation.type.id)) return reduceDurability(e.source, e.itemStack, 1)
            if (unbreaking && shouldDamageItem(unbreakingLevel)) { reduceDurability(e.source, e.itemStack, 1) }

        }
    });
    initEvent.itemComponentRegistry.registerCustomComponent('pog:tool_hit_entity', {
        onHitEntity: e => {
            if (e.attackingEntity.matches({ gameMode: GameMode.creative })) return;
            const unbreaking = e.itemStack.getComponent('enchantable').getEnchantment('unbreaking')
            const unbreakingLevel = unbreaking?.level
            if (!unbreaking) { reduceDurability(e.attackingEntity, e.itemStack, 1) }
            if (unbreaking && shouldDamageItem(unbreakingLevel) == true) { reduceDurability(e.attackingEntity, e.itemStack, 1) }
        }
    });
    initEvent.itemComponentRegistry.registerCustomComponent('pog:strip_log_sfx', {
        onUseOn: e => {

            console.log(`test`)

        }
    });

    initEvent.itemComponentRegistry.registerCustomComponent('pog:coconut', {
        onUse: e => {
            e.source.getComponent('inventory').container.addItem(new ItemStack('better_on_bedrock:broken_open_coconut'))
            e.source.dimension.runCommandAsync("clear @p better_on_bedrock:coconut_nut 0 1")
        },
    });
    initEvent.itemComponentRegistry.registerCustomComponent('pog:waystone_key', {
        onUse: e => {
            let player = e.source
            player.startItemCooldown('marker', 600)
            if (player.getItemCooldown('marker') >= 1) {
                UI2(player);
            }
            else { player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYour Waystone Marker is on cooldown!"}]}`); }
        },
    });

    initEvent.itemComponentRegistry.registerCustomComponent('pog:compost', {
        onUseOn: ev => {
            if (ev.itemStack?.hasTag(`pog:compost`)) {
                if (ev.block.permutation.getState('composter_fill_level') <= 6) {
                    ev.block.dimension.runCommandAsync(`particle better_on_bedrock:composter_insert_success ${ev.block.location.x} ${ev.block.location.y + 0.5} ${ev.block.location.z}`)
                    ev.block.dimension.runCommand(`clear @p ${ev.itemStack?.typeId} 0 1`)
                    incrementValue(ev.block, ev.itemStack)
                }
                if (ev.block.permutation.getState('composter_fill_level') == 7) {
                    ev.source.dimension.runCommand(`setblock ${ev.block.location.x} ${ev.block.location.y} ${ev.block.location.z} composter ["composter_fill_level"=7] destroy`)
                    ev.block.dimension.playSound('block.composter.fill_success', ev.block.location)
                    ev.block.dimension.runCommand(`stopsound @p dig.wood`)
                    const entity = world.getDimension(ev.block.dimension.id).getEntities({ type: "minecraft:item", name: 'composter' }).forEach((entity) => entity.kill())
                }
            }
        },
    });

    initEvent.itemComponentRegistry.registerCustomComponent('pog:food_effects', {
        onConsume: ev => {
            const player = ev.source
            const item = ev.itemStack
            if (item?.typeId == "better_on_bedrock:healthy_carrot_item") {
                player.addEffect("regeneration", 100, { amplifier: 3, showParticles: true })
            }
        }
    })

    initEvent.itemComponentRegistry.registerCustomComponent('pog:ghost_necklace', {
        onUse: ev => {
            const player = ev.source
            const equipmentInventory = player.getComponent("equippable");
            let invi = player.getComponent("inventory").container;
            let items = invi.getItem(player.selectedSlotIndex);
            const equipable = player.getComponent("equippable");
            const slot = equipable.getEquipmentSlot(EquipmentSlot.Offhand);

            if (equipmentInventory.getEquipment(EquipmentSlot.Offhand)?.typeId == "better_on_bedrock:soul_star") {
                if (slot.amount >= 2) {
                    slot.setItem(new ItemStack('better_on_bedrock:soul_star', slot.amount - 1));
                } else if (slot.amount == 1) { slot.setItem(); }
                player.runCommandAsync('effect @p night_vision 10 10 true')
                player.startItemCooldown('ghost', 1200);
                items.getComponent("durability").damage = items.getComponent("durability").damage + 1;
                invi.setItem(player.selectedSlotIndex, items);
                player.runCommandAsync('gamemode spectator @p')
                player.dimension.spawnParticle(`pog:poof`, player.location)
                player.playSound(`item.necklace.use`, { location: player.location })
                system.runTimeout(() => {
                    player.runCommand('gamemode s @p')
                    player.dimension.spawnParticle(`pog:poof`, player.location)
                    player.playSound(`item.necklace.stop`, { location: player.location })
                }, 200)
            } else if (equipmentInventory.getEquipment(EquipmentSlot.Offhand)?.typeId !== "better_on_bedrock:soul_star") {
                player.startItemCooldown('ghost', 40);
                player.playSound(`item.necklace.fail`, { location: player.location })
            }

        }
    })


    initEvent.itemComponentRegistry.registerCustomComponent('pog:end_podium', {
        onUseOn: ev => {
            const block = ev.block
            const blockLoc = ev.block.location
            const item = ev.itemStack
            const permutations = ev.block.permutation;

            if (block.typeId == 'better_on_bedrock:end_podium' && item.typeId == 'better_on_bedrock:the_ardent_crystal') {
                block.setPermutation(permutations.withState("pog:ring_added", true));
                ev.source.runCommand(`particle test:dragon_death2 ${blockLoc.x}  ${blockLoc.y + 5}  ${blockLoc.z}`)
                ev.source.runCommand(`clear @p better_on_bedrock:the_ardent_crystal 0 1`)
                system.runTimeout(() => {
                    ev.source.runCommand(`summon better_on_bedrock:poggy ${blockLoc.x} ${blockLoc.y + 5} ${blockLoc.z} ~ ~ minecraft:entity_spawned`)
                }, 80)
            }
            if (block.typeId == 'better_on_bedrock:end_podium_basic' && item.typeId == 'better_on_bedrock:ring_of_care' && block.permutation.getState('pog:ring_added') == 0) {
                block.setPermutation(permutations.withState("pog:ring_added", 1));
                ev.source.runCommand(`clear @p better_on_bedrock:ring_of_care 0 1`)
                block.dimension.runCommandAsync(`loot spawn ${block.location.x} ${block.location.y + 1} ${block.location.z} loot "chests/end_city_treasure_once"`)
            }
            if (block.typeId == 'better_on_bedrock:end_podium_basic' && item.typeId == 'better_on_bedrock:ring_of_hope' && block.permutation.getState('pog:ring_added') == 0) {
                block.setPermutation(permutations.withState("pog:ring_added", 2));
                ev.source.runCommand(`clear @p better_on_bedrock:ring_of_hope 0 1`)
                block.dimension.runCommandAsync(`loot spawn ${block.location.x} ${block.location.y + 1} ${block.location.z} loot "chest/lava_shrine_once"`)
            }
            if (block.typeId == 'better_on_bedrock:end_podium_basic' && item.typeId == 'better_on_bedrock:ring_of_hate' && block.permutation.getState('pog:ring_added') == 0) {
                block.setPermutation(permutations.withState("pog:ring_added", 3));
                ev.source.runCommand(`clear @p better_on_bedrock:ring_of_hate 0 1`)
                block.dimension.runCommandAsync(`loot spawn ${block.location.x} ${block.location.y + 1} ${block.location.z} loot "chests/waystone_tower_once"`)
            }
        },
    });
})
