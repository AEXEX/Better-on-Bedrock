import { world, system, BlockTypes } from "@minecraft/server"

/**
 * 
 * @param { import("@minecraft/server").Block } brokenBlock
 * @param { import("@minecraft/server").Dimension } dimension
 * @param { import("@minecraft/server").Entity } entity
 */
class Utilities {
    static getClosestEntityFromViewDirection(entity, distance) {
        const entityRaycastHit_list = entity.getEntitiesFromViewDirection({ maxDistance: distance, });
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



system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:poggy', location: player.location, closest: 1 }).forEach((pig) => {
            if (pig.getComponent('variant')?.value == 0) {
                pig.runCommandAsync('playsound mob.endermen.portal @p')
                pig.teleport({ x: player.location.x, y: player.location.y, z: player.location.z })
            } else if (pig.getComponent('variant')?.value == 4) {
                pig.applyKnockback(0, 0, 0, -0.3)
            } if (pig.getComponent('variant')?.value === 0) {
                pig.applyKnockback(0, 0, 0, -3.5)
            }
        })
    })
}, 32)
system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:seeker' }).forEach(husl => {
            const entities = Utilities.getClosestEntityFromViewDirection(husl, 32);

            if (entities == undefined || entities.typeId == undefined) return;
            if (entities.typeId == "minecraft:player" && husl.getComponent("minecraft:variant")?.value == 2) {
                player.applyDamage(3)
            }
            if (entities.typeId == "minecraft:player" && husl.getComponent("minecraft:variant")?.value == 5) {
                player.addEffect("slowness", 100)
                player.addEffect("weakness", 220, { amplifier: 2 })
                player.applyDamage(12)
            }
        })
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:seeker', location: player.location, closest: 1 }).forEach((pig) => {
            const dx = pig.location.x - player.location.x;
            const dy = pig.location.y - player.location.y;
            const dz = pig.location.z - player.location.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (pig.getComponent('variant')?.value == 3 && distance <= 16) {
                player.applyKnockback(pig.location.x - player.location.x, pig.location.z - player.location.z, (Math.abs(pig.location.x - player.location.x) + Math.abs(pig.location.z - player.location.z)) * 0.05, (pig.location.y - player.location.y) * 0.05)
            }

        })
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:soot_eye', location: player.location, closest: 1 }).forEach((pig) => {
            const entities = Utilities.getClosestEntityFromViewDirection(pig, 32);
            if (entities == undefined || entities.typeId == undefined) return;
            if (pig.getComponent('variant')?.value == 1) {
                player.applyDamage(9)
            }

        })
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:soot_eye_beam', location: player.location, closest: 1 }).forEach((pig) => {
            const entities = Utilities.getClosestEntityFromViewDirection(pig, 32);
            if (entities == undefined || entities.typeId == undefined) return;
            if (pig.getComponent('variant')?.value == 1) {
                player.applyDamage(5)
                player.setOnFire(2)
            }

        })

        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:poggy', location: player.location, closest: 1 }).forEach((pig) => {
            if (pig.getComponent('variant')?.value == 3) {
                pig.applyKnockback(0, 0, 0, 0.16)
            } else if (pig.getComponent('variant')?.value == 4) {
                pig.applyKnockback(0, 0, 0, -0.3)
            }

        })

        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:poggy', location: player.location, closest: 1 }).forEach((pig) => {
            const entities = Utilities.getClosestEntityFromViewDirection(pig, 128);
            if (entities == undefined || entities.typeId == undefined) return;
            if (pig.getComponent('variant')?.value == 11) {
                player.applyDamage(1)
            }

        })
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:poggy', location: player.location, closest: 1 }).forEach((pig) => {
            const entities = Utilities.getClosestEntityFromViewDirection(pig, 128);
            if (entities == undefined || entities.typeId == undefined) return;
            if (pig.getComponent('variant')?.value == 15) {
                player.applyDamage(6)
            }

        })
        world.getDimension(player.dimension.id).getEntities({ type: "better_on_bedrock:soot_yeet" }).forEach(yeet => {
            const dx = yeet.location.x - player.location.x;
            const dy = yeet.location.y - player.location.y;
            const dz = yeet.location.z - player.location.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (yeet.getComponent('variant').value == 1 && distance <= 2) {
                player.applyKnockback(0, 0, 0, 1.4)
                world.getDimension(player.dimension.id).spawnParticle('pog:soot_yee_player', yeet.location)
            }
        })
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:poggy' }).forEach((pig) => {
            if (pig.getComponent('variant')?.value == 13) {
                pig.teleport({ x: player.location.x, y: player.location.y, z: player.location.z })
            }

        })
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:poggy', location: player.location, closest: 1 }).forEach((pig) => {
            if (pig.getComponent('variant')?.value == 12) {
                pig.applyKnockback(0, 0, 0, -0.3);
                const dx = pig.location.x - player.location.x;
                const dy = pig.location.y - player.location.y;
                const dz = pig.location.z - player.location.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (distance <= 4) {
                    player.applyKnockback(0, 0, 5.4, 1);
                    player.applyDamage(4);
                    if (pig.getComponent('variant')?.value == 12) {
                        world.getDimension(player.dimension.id).runCommandAsync('event entity @e[type=better_on_bedrock:poggy] phase_2_move_up');
                    } else if (pig.getComponent('mark_variant')?.value == 1) {
                        world.getDimension(player.dimension.id).runCommandAsync('event entity @e[type=better_on_bedrock:poggy] phase_3_move_up');
                    }
                }
            }
        })
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:poggy', location: player.location, closest: 1 }).forEach((pig) => {
            if (pig.getComponent('minecraft:mark_variant')?.value == 100 && pig.getComponent('minecraft:health')?.currentValue <= 25) {
                pig.triggerEvent('phase_1_fail')
            }
            if (pig.getComponent('minecraft:mark_variant')?.value == 10 && pig.getComponent('minecraft:health')?.currentValue <= 45) {
                pig.triggerEvent('phase_2_fail')
            }
        })

    });
}, 1);
world.afterEvents.entityHitEntity.subscribe(ev => {
    world.getAllPlayers().forEach((player) => {
        const target = ev.hitEntity
        const attacker = ev.damagingEntity
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:chorus_behimeth' }).forEach((pig) => {
            if (attacker.typeId == "better_on_bedrock:chorus_behimeth" && target.typeId == 'minecraft:player') {
                player.applyKnockback(0, 0, 0, 0.7)
                pig.playAnimation("animation.chorus_behemoth.attack")
            }
        })
    })
})
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source
    if (data.itemStack.typeId == 'minecraft:compass') {
        world.getDimension(player.dimension.id).getEntities({ type: 'better_on_bedrock:seeker', location: player.location, closest: 1 }).forEach((pig) => {
            player.applyKnockback(pig.location.x - player.location.x, pig.location.z - player.location.z, (Math.abs(pig.location.x - player.location.x) + Math.abs(pig.location.z - player.location.z)) * 0.05, (pig.location.y - player.location.y) * 0.05)
        })
    }
})