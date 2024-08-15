import { world, system, EquipmentSlot, GameMode } from "@minecraft/server";
system.runInterval(
    () => {
        const players = world.getAllPlayers().filter(
            (p) => {
                const velocity = ({ x: p.getVelocity().x, y: p.getVelocity().y, z: p.getVelocity().z })
                if (
                    (velocity.x > 0.005 || velocity.x < -0.005) && !p.hasTag('introMove')
                ) {
                    p.sendMessage("Thanks for playing §dBetter §fon §8Bedrock§f! Be sure to read the info book to get started on what to expect and how some things work!")
                    p.addTag('introMove')
                    p.runCommand('title @p title begin')
                    p.playSound('normal_quest', { location: p.location })
                }
                if (
                    (velocity.x > 0.005 || velocity.x < -0.005) && !p.hasTag('left')
                ) {
                    if (p.dimension.id == "minecraft:overworld" && p.matches({ gameMode: GameMode.survival })) {
                        p.dimension.spawnEntity('better_on_bedrock:ambiententity', p.location)
                    }
                    if (p.matches({ gameMode: GameMode.survival })) {
                        p.playSound('confused_and_deeds_and_prelude', { location: p.location })
                        p.addTag('left')
                        p.removeTag('swamp')
                        p.removeTag('swamps')
                        p.removeTag('cold')
                        p.removeTag('colds')
                        p.removeTag('taiga')
                        p.removeTag('taigas')
                        p.removeTag('plain')
                        p.removeTag('plains')
                        p.removeTag('abyssal')
                        p.removeTag('vacant')
                        p.removeTag('shroom')
                        p.removeTag('void')
                        p.removeTag('chorus')
                        p.removeTag('wastes')
                    }
                }
            },
        );

    },
    20,
);
