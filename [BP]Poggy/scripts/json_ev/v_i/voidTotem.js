import { world, system, EquipmentSlot, ItemStack } from "@minecraft/server"

system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        const equipmentInventory = player.getComponent("minecraft:equippable");
        if (
            equipmentInventory.getEquipment(EquipmentSlot.Mainhand)?.typeId == "better_on_bedrock:void_totem"
            || equipmentInventory.getEquipment(EquipmentSlot.Offhand)?.typeId == "better_on_bedrock:void_totem"
        ) {
            if (player.location.y <= 4) {
                player.applyKnockback(0, 0, 0, 7.3)
                player.addEffect("slow_falling", 1000)
                player.addEffect("nausea", 180)
                player.addEffect("blindness", 80)
                player.runCommandAsync('playsound random.totem @s ~ ~ ~ 0.1')
                player.runCommandAsync('particle minecraft:totem_particle')
                player.dimension.runCommand("clear @p better_on_bedrock:void_totem 0 1")
                if (player.getComponent('health').currentValue >= 4) {
                    player.applyDamage(19)
                }
            }

        }
        const test = player.dimension.getBlockFromRay(player.location, { x: 0, y: -1, z: 0 })
        const test1 = player.dimension.getBlockFromRay({ x: player.location.x - 2, y: player.location.y, z: player.location.z - 2 }, ({ x: 0, y: -1, z: 0 }))
        const test2 = player.dimension.getBlockFromRay({ x: player.location.x + 2, y: player.location.y, z: player.location.z + 2 }, ({ x: 0, y: -1, z: 0 }))


        if ((test == undefined || test1 == undefined || test2 == undefined) && equipmentInventory.getEquipment(EquipmentSlot.Feet)?.typeId === "better_on_bedrock:voiding_boots") {
            player.runCommandAsync('effect @p slowness 3 1 true')
            player.runCommand(`fill ${player.location.x - 1} ${player.location.y - 1} ${player.location.z - 1} ${player.location.x + 1} ${player.location.y - 1} ${player.location.z + 1} better_on_bedrock:void_block replace air`)
        }
    })
}, 1)

system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {

        const equipmentInventory = player.getComponent("minecraft:equippable");
        const item = equipmentInventory.getEquipment(EquipmentSlot.Feet);

        const durability = item?.getComponent("durability");
        const test = player.dimension.getBlockFromRay({ x: player.location.x - 2, y: player.location.y, z: player.location.z - 2 }, ({ x: 0, y: -1, z: 0 }))
        const test2 = player.dimension.getBlockFromRay({ x: player.location.x + 2, y: player.location.y, z: player.location.z + 2 }, ({ x: 0, y: -1, z: 0 }))
        const floorBlock = player.dimension.getBlockFromRay({ x: player.location.x, y: player.location.y + 1, z: player.location.z }, ({ x: 0, y: -1, z: 0 }))
        if (item !== undefined) {
            durability.damage += 1;


            if (test == undefined && equipmentInventory?.getEquipment(EquipmentSlot.Feet)?.typeId == "better_on_bedrock:voiding_boots") {
                equipmentInventory.setEquipment(EquipmentSlot.Feet, item)
            } else if (durability.damage >= durability.maxDurability) {
                equipmentInventory.setEquipment(EquipmentSlot.Feet, undefined)
            }
        }
        if (player.hasTag('endFog')) {
            if (floorBlock.block.typeId == 'better_on_bedrock:shrub_nylium' && !player.hasTag('vacant')) {
                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:vacant_dusk test")
                player.playMusic("ambient.vacant", { volume: 1, fade: 1, loop: true })
                player.addTag('vacant')
                player.removeTag('void')
                player.removeTag('chorus')
                player.removeTag('abyssal')
                player.removeTag("wastes")
                player.removeTag('shroom')
            }
            if (floorBlock.block.typeId == 'better_on_bedrock:void_grass_block' && !player.hasTag('void')) {
                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:voiding_plains test")
                player.playMusic("ambient.voiding_plains", { volume: 1, fade: 1, loop: true })
                player.addTag('void')
                player.removeTag('chorus')
                player.removeTag('abyssal')
                player.removeTag('vacant')
                player.removeTag("wastes")
                player.removeTag('shroom')
            }
            if (floorBlock.block.typeId == 'better_on_bedrock:shroom_nylium' && !player.hasTag('shroom')) {
                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:fungal_grove test")
                player.playMusic("ambient.fungal_grove", { volume: 1, fade: 1, loop: true })
                player.addTag('shroom')
                player.removeTag('vacant')
                player.removeTag('chorus')
                player.removeTag('abyssal')
                player.removeTag('void')
                player.removeTag("wastes")
            }
            if (floorBlock.block.typeId == 'better_on_bedrock:fall_nylium' && !player.hasTag('abyssal')) {

                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:voided_abyssal test")
                player.playMusic("ambient.voided_abyss", { volume: 1, fade: 1, loop: true })
                player.addTag('abyssal')
                player.removeTag('vacant')
                player.removeTag('shroom')
                player.removeTag('chorus')
                player.removeTag('void')
                player.removeTag("wastes")
            }
            if (floorBlock.block.typeId == 'better_on_bedrock:chorus_grass_block' && !player.hasTag('chorus')) {
                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:chorus_forest test")
                player.playMusic("ambient.chorus_forest", { volume: 1, fade: 1, loop: true })
                player.addTag('chorus')
                player.removeTag('vacant')
                player.removeTag("wastes")
                player.removeTag('shroom')
                player.removeTag('void')
            }
            if (floorBlock.block.typeId == 'minecraft:end_stone' && !player.hasTag('wastes')) {
                player.runCommand("fog @p remove test")
                player.addTag("wastes")
                player.playMusic("ambient.end_wastes", { volume: 1, fade: 1, loop: true })
                player.removeTag('abyssal')
                player.removeTag('vacant')
                player.removeTag('shroom')
                player.removeTag('void')
                player.removeTag('chorus')
            }
        }
    })
}, 30)
/*
world.afterEvents.playerInteractWithBlock.subscribe(ev => {
    const block = ev.block
    const blockLoc = ev.block.location
    const item = ev.itemStack
    const permutations = ev.block.permutation;
    const states = permutations.getState("pog:ring_added");
    const aboves = ev.block.above();
    if (block.typeId == 'better_on_bedrock:end_podium' && item.typeId == 'better_on_bedrock:the_ardent_crystal') {
        block.setPermutation(permutations.withState("pog:ring_added", true));
        ev.player.runCommand(`particle test:dragon_death2 ${blockLoc.x}  ${blockLoc.y + 5}  ${blockLoc.z}`)
        ev.player.runCommand(`clear @p better_on_bedrock:the_ardent_crystal 0 1`)
        system.runTimeout(() => {
            ev.player.runCommand(`summon better_on_bedrock:poggy ${blockLoc.x} ${blockLoc.y + 5} ${blockLoc.z} ~ ~ minecraft:entity_spawned`)
        }, 80)
    }
    if (block.typeId == 'better_on_bedrock:end_podium_basic' && item.typeId == 'better_on_bedrock:ring_of_care' && block.permutation.getState('pog:ring_added') == 0) {
        block.setPermutation(permutations.withState("pog:ring_added", 1));
        ev.player.runCommand(`clear @p better_on_bedrock:ring_of_care 0 1`)
        block.dimension.runCommandAsync(`loot spawn ${block.location.x} ${block.location.y + 1} ${block.location.z} loot "chests/end_city_treasure_once"`)
    }
    if (block.typeId == 'better_on_bedrock:end_podium_basic' && item.typeId == 'better_on_bedrock:ring_of_hope' && block.permutation.getState('pog:ring_added') == 0) {
        block.setPermutation(permutations.withState("pog:ring_added", 2));
        ev.player.runCommand(`clear @p better_on_bedrock:ring_of_hope 0 1`)
        block.dimension.runCommandAsync(`loot spawn ${block.location.x} ${block.location.y + 1} ${block.location.z} loot "chest/lava_shrine_once"`)
    }
    if (block.typeId == 'better_on_bedrock:end_podium_basic' && item.typeId == 'better_on_bedrock:ring_of_hate' && block.permutation.getState('pog:ring_added') == 0) {
        block.setPermutation(permutations.withState("pog:ring_added", 3));
        ev.player.runCommand(`clear @p better_on_bedrock:ring_of_hate 0 1`)
        block.dimension.runCommandAsync(`loot spawn ${block.location.x} ${block.location.y + 1} ${block.location.z} loot "chests/waystone_tower_once"`)
    }
})
*/
world.afterEvents.itemCompleteUse.subscribe(ev => {
    const item = ev.itemStack
    const player = ev.source
    if (item.typeId == 'better_on_bedrock:rage_potion') {

        player.runCommandAsync("effect @p speed 30 1 false")
        player.runCommandAsync("effect @p strength 30 2 false")
        player.runCommandAsync("effect @p haste 30 3 false")
        player.runCommandAsync("effect @p absorption 30 3 false")
        player.runCommandAsync("effect @p regeneration 30 1 false")
        player.runCommandAsync("replaceitem entity @p slot.weapon.mainhand 0 glass_bottle")
    }
})