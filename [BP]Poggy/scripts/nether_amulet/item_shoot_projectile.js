import { world, EquipmentSlot } from "@minecraft/server"
import { system } from "@minecraft/server";

/**
 * @type {{ run: number; locations: import("@minecraft/server").Vector3[] }[]}
 */
let locations = [];

/**
 * 
 * @param { import("@minecraft/server").Player } player
 * @param { import("@minecraft/server").ItemType } itemType
 */

const one_stoned_amulet = [
    {
        id: "better_on_bedrock:nether_amulet_1_stone_green",
        isHeld: ["only_wither_skull_dangerous"]
    },
    {
        id: "better_on_bedrock:nether_amulet_1_stone_red",
        isHeld: ["none"]
    },
    {
        id: "better_on_bedrock:nether_amulet_1_stone_yellow",
        isHeld: ["only_shield"]
    }
]
const two_stoned_amulet = [
    {
        id: "better_on_bedrock:nether_amulet_1_stone_red_green",
        isHeld: ["only_wither_skull_dangerous"]
    },
    {
        id: "better_on_bedrock:nether_amulet_1_stone_red_yellow",
        isHeld: ["only_shield"]
    },
    {
        id: "better_on_bedrock:bether_amulet_2_stone_green_yellow",
        isHeld: ["only_wither_skull_dangerous", "only_shield"]
    }
]
const three_stoned_amulet = [
    {
        id: "better_on_bedrock:nether_amulet_3_stone_yellow_red_green",
        isHeld: ["only_wither_skull_dangerous", "only_shield", "vitality"]
    },
    {
        id: "better_on_bedrock:nether_amulet_3_stone_yellow_red_green",
        isHeld: false
    }
];





world.afterEvents.itemStartUse.subscribe(data => {
    if (data.itemStack.typeId == 'better_on_bedrock:nether_amulet_full_purple_active' && data.source.isSneaking == false) {
        const wither_skull_dangerous = world.getDimension(data.source.dimension.id).spawnEntity("minecraft:wither_skull_dangerous", { x: data.source.location.x + (data.source.getViewDirection().x), y: data.source.location.y + 1 + (data.source.getViewDirection().y), z: data.source.location.z + (data.source.getViewDirection().z) })
        world.getDimension(data.source.dimension.id).runCommand("playsound mob.amulet.shoot @p")
        wither_skull_dangerous.clearVelocity();
        wither_skull_dangerous.applyImpulse({ x: data.source.getViewDirection().x, y: data.source.getViewDirection().y, z: data.source.getViewDirection().z });
    }
    if (data.itemStack.typeId == 'better_on_bedrock:nether_amulet_full_red_active' && data.source.isSneaking == false) {
        data.source.runCommand('effect @p regeneration 30 2 true')
        data.source.runCommand('damage @e[type=!player, r=16] 15 fire')
        data.source.runCommand('particle pog:heal ~ ~ ~')

    }



})


world.afterEvents.itemReleaseUse.subscribe(data => {
    const randomIndexTwo = two_stoned_amulet.find((e) => e.id === data.itemStack.typeId);
    const randomIndexThree = three_stoned_amulet.find((e) => e.id === data.itemStack.typeId);
    if (data.itemStack.typeId == 'better_on_bedrock:nether_amulet_3_stone_yellow_red_green' && data.source.isSneaking == false) {
        const wither_skull_dangerous = world.getDimension(data.source.dimension.id).spawnEntity("better_on_bedrock:inferno_shield", { x: data.source.location.x + (data.source.getViewDirection().x), y: data.source.location.y + (data.source.getViewDirection().y), z: data.source.location.z + (data.source.getViewDirection().z) })
        world.getDimension(data.source.dimension.id).runCommand("playsound mob.amulet.shoot @p")
        wither_skull_dangerous.clearVelocity();
        wither_skull_dangerous.applyImpulse({ x: data.source.getViewDirection().x, y: 0, z: data.source.getViewDirection().z });
    }
    if (randomIndexTwo != undefined && randomIndexTwo.isHeld != undefined && data.source.isSneaking == false) {
        const wither_skull_dangerous = world.getDimension(data.source.dimension.id).spawnEntity("better_on_bedrock:inferno_shield", { x: data.source.location.x + (data.source.getViewDirection().x), y: data.source.location.y + (data.source.getViewDirection().y), z: data.source.location.z + (data.source.getViewDirection().z) })
        world.getDimension(data.source.dimension.id).runCommand("playsound mob.amulet.shoot @p")
        wither_skull_dangerous.clearVelocity();
        wither_skull_dangerous.applyImpulse({ x: data.source.getViewDirection().x, y: 0, z: data.source.getViewDirection().z });
        if (randomIndexThree != undefined && randomIndexThree.isHeld != undefined && data.useDuration <= 199960 && data.source.isSneaking == false) {
            const wither_skull_dangerous = world.getDimension(data.source.dimension.id).spawnEntity("better_on_bedrock:inferno_shield", { x: data.source.location.x + (data.source.getViewDirection().x), y: data.source.location.y + (data.source.getViewDirection().y), z: data.source.location.z + (data.source.getViewDirection().z) })
            world.getDimension(data.source.dimension.id).runCommand("playsound mob.amulet.shoot @p")
            wither_skull_dangerous.clearVelocity();
            wither_skull_dangerous.applyImpulse({ x: data.source.getViewDirection().x, y: 0, z: data.source.getViewDirection().z });

        }
    }
})
world.afterEvents.dataDrivenEntityTrigger.subscribe(data => {
    if (data?.entity?.getComponent("minecraft:variant")?.value == 19 && data.entity?.typeId == "better_on_bedrock:inferior") {
        system.runInterval
        const zombie = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x + 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z - 1.5 })
        const zombies = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x, y: data.entity.location.y + 0.5, z: data.entity.location.z })
        const zombiess = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x - 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z + 1.5 })
        const zombiew = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x + 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z - 1.5 })
        const zombiesw = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x - 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z + 1.5 })
        const zombiessw = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x - 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z + 1.5 })
        const zombiesssw = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x + 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z - 1.5 })
        const zombiews = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x + 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z + 1.5 })
        const zombiesws = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x - 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z - 1.5 })
        const zombiessws = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x - 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z - 1.5 })
        const zombiesssws = world.getDimension(data.entity.dimension.id).spawnEntity("better_on_bedrock:inferno_shield_boss", { x: data.entity.location.x + 1.5, y: data.entity.location.y + 0.5, z: data.entity.location.z + 1.5 })

        zombie.clearVelocity();
        zombies.clearVelocity();
        zombiess.clearVelocity();

        zombiew.clearVelocity();
        zombiesw.clearVelocity();
        zombiessw.clearVelocity();
        zombiesssw.clearVelocity();

        zombiews.clearVelocity();
        zombiesws.clearVelocity();
        zombiessws.clearVelocity();
        zombiesssws.clearVelocity();

        zombie.applyImpulse({ x: 1, y: 0, z: 0 });
        zombies.applyImpulse({ x: 0, y: 0, z: 1 });
        zombiess.applyImpulse({ x: -1, y: 0, z: 0 });

        zombiew.applyImpulse({ x: 1, y: 0, z: -1 });
        zombiesw.applyImpulse({ x: -1, y: 0, z: 1 });
        zombiessw.applyImpulse({ x: -1, y: 0, z: 1 });
        zombiesssw.applyImpulse({ x: 1, y: 0, z: -1 });

        zombiews.applyImpulse({ x: 1, y: 0, z: 1 });
        zombiesws.applyImpulse({ x: -1, y: 0, z: -1 });
        zombiessws.applyImpulse({ x: -1, y: 0, z: -1 });
        zombiesssws.applyImpulse({ x: 1, y: 0, z: 1 });
    }

})

world.afterEvents.entityHitEntity.subscribe(data => {
    let invi = data?.damagingEntity?.getComponent("inventory")?.container
    const items = data.damagingEntity.getComponent("equippable");

    if (data.damagingEntity.typeId == "better_on_bedrock:flame_beam" || data.damagingEntity.typeId == "better_on_bedrock:inferno_shield_boss" && data.hitEntity.typeId == "minecraft:player") {
        data.hitEntity.setOnFire(3, true)
    }
    if (data.damagingEntity?.typeId == "minecraft:player" && items.getEquipment(EquipmentSlot.Mainhand)?.typeId == 'better_on_bedrock:blade_of_the_nether') {
        data.hitEntity.setOnFire(6, true)
    }
    if (data.damagingEntity?.typeId == "minecraft:player" && items.getEquipment(EquipmentSlot.Mainhand)?.typeId == 'better_on_bedrock:bane_spike') {
        data.hitEntity.addEffect('poison', 5 * 20)
    }
})