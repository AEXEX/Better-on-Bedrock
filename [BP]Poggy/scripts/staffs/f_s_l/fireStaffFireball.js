import { world, system, EquipmentSlot, ItemTypes, ItemStack } from "@minecraft/server"

class Utilities {
    static getClosestEntityFromViewDirection(entity, distance) {
        const entityRaycastHit_list = entity.getEntitiesFromViewDirection({ maxDistance: distance });
        if (entityRaycastHit_list.length === 0)
            return undefined;
        let entityClosest = undefined;
        let maxDistance = distance;
        entityRaycastHit_list.forEach((entityRaycastHit) => {
            if (entityRaycastHit.distance < maxDistance) {
                maxDistance = entityRaycastHit.distance;
                entityClosest = entityRaycastHit.entity;
            };
        });
        return entityClosest;
    };
};

world.afterEvents.itemStartUse.subscribe(e => {
    const equipmentInventory = e.source.getComponent("equippable");
    const equipable = e.source.getComponent("equippable");
    const slot = equipable.getEquipmentSlot(EquipmentSlot.Offhand);
    if (equipmentInventory.getEquipment(EquipmentSlot.Mainhand)?.typeId == "better_on_bedrock:staff_of_the_seas") {
        e.source.startItemCooldown("iceStaff", 200)
        if (equipmentInventory.getEquipment(EquipmentSlot.Offhand)?.typeId == "better_on_bedrock:scroll_of_the_kinglvl2") {
            if (slot.amount >= 2) {
                slot.setItem(new ItemStack('better_on_bedrock:scroll_of_the_kinglvl2', slot.amount - 1));
            } else if (slot.amount == 1) { slot.setItem(); }

        }
    }
    if (equipmentInventory.getEquipment(EquipmentSlot.Mainhand)?.typeId == "better_on_bedrock:staff_of_strength") {
        e.source.startItemCooldown("iceStaff", 200)
        if (equipmentInventory.getEquipment(EquipmentSlot.Offhand)?.typeId == "better_on_bedrock:scroll_of_the_netherlvl2") {
            if (slot.amount >= 2) {
                slot.setItem(new ItemStack('better_on_bedrock:scroll_of_the_netherlvl2', slot.amount - 1));
            } else if (slot.amount == 1) { slot.setItem(); }
        }
    }
    const interval = system.runInterval(() => {
        world.getAllPlayers().forEach((player) => {
            if (!player.isSneaking) {
                const equipmentInventory = player.getComponent("equippable");
                if (equipmentInventory.getEquipment(EquipmentSlot.Offhand)?.typeId == "better_on_bedrock:scroll_of_the_kinglvl2" && equipmentInventory.getEquipment(EquipmentSlot.Mainhand)?.typeId == "better_on_bedrock:staff_of_the_seas") {
                    const entities = Utilities.getClosestEntityFromViewDirection(player, 7);
                    if (entities == undefined || entities.typeId == undefined) return;
                    if (entities.typeId !== "minecraft:pig" && !player.hasTag("frostBurst")) {
                        entities.applyDamage(8)
                        entities.addEffect("slowness", 100)
                    }
                    system.runTimeout(() => {
                        system.clearRun(interval)
                        player.startItemCooldown("iceStaff", 400)
                    }, 80)
                    world.afterEvents.itemStopUse.subscribe(e => {
                        player.startItemCooldown("iceStaff", 400)
                        system.clearRun(interval)
                    })
                    world.afterEvents.itemCompleteUse.subscribe(e => {
                        player.startItemCooldown("iceStaff", 400)
                        system.clearRun(interval)
                    })
                    world.afterEvents.itemReleaseUse.subscribe(e => {
                        player.startItemCooldown("iceStaff", 400)
                        system.clearRun(interval)
                    })
                }
            }
        })
    }, 5)

})


system.runInterval(() => {
    world.getAllPlayers().filter((player) => {
        const entity = world.getDimension("minecraft:overworld").getEntities({ type: "better_on_bedrock:ambiententity" }).filter((entity) => {
            entity.teleport({ x: player.location.x, y: player.location.y + 5, z: player.location.z })
        })
    })
})

world.afterEvents.playerJoin.subscribe(e => {
    const interval = system.runInterval(() => {
        const entity = world.getDimension("minecraft:overworld").getEntities({ families: ["player"] }).forEach((entity) => {
            ///tp @e[type=better_on_bedrock:ambiententity] @p
            entity.removeTag("left")
            entity.removeTag("cave")
            entity.runCommand(`event entity @e[type=better_on_bedrock:ambiententity] despawn`)
            if (entity.hasTag("frostBurst")) {
                entity.removeTag("frostBurst")


            }
            system.runTimeout(() => {
                system.clearRun(interval)
            }, 60)
        })

    })

})


world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('pog:fireWandLvl2', {
        onUse: e => {
            const player = e.source
            const item = e.itemStack
            const entity = world.getDimension(player.dimension.id).getEntities({ families: ["mob"], location: player.location, maxDistance: 5 }).forEach((entity) => {
                system.runTimeout(() => {
                    player.removeTag("frostBurst")
                    player.startItemCooldown("iceStaff", 400)
                }, 170)

                if (player.isSneaking) {
                    console.log('ttttt')
                    player.runCommandAsync(`particle pog:ice ${player.location.x} ${player.location.y} ${player.location.z}`)
                    player.addTag("frostBurst")
                    entity.addEffect("slowness", 120, { amplifier: 15, showParticles: false })
                    entity.addEffect("wither", 120, { amplifier: 3, showParticles: false })
                    entity.runCommandAsync(`summon better_on_bedrock:icestaffsrozen ${entity.location.x} ${entity.location.y} ${entity.location.z}`)


                }
            })
        }
    });
})