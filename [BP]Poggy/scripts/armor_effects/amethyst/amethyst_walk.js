import { world, system, EquipmentSlot } from "@minecraft/server";
system.runInterval(
    () => {
        const players = world.getAllPlayers().filter(
            (p) => {
                const equipmentInventory = p.getComponent("equippable");
                const velocity = ({ x: p.getVelocity().x, y: p.getVelocity().y, z: p.getVelocity().z })
                if (
                    equipmentInventory.getEquipment(EquipmentSlot.Head)?.typeId == "better_on_bedrock:amethyst_helmet"
                    && equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "better_on_bedrock:amethyst_chestplate"
                    && equipmentInventory.getEquipment(EquipmentSlot.Legs)?.typeId == "better_on_bedrock:amethyst_leggings"
                    && equipmentInventory.getEquipment(EquipmentSlot.Feet)?.typeId == "better_on_bedrock:amethyst_boots"
                    && (velocity.x > 0.005 || velocity.x < -0.005) && !p.isJumping
                ) {
                    p.playSound("step.amethyst_block", p.location);
                    return true;
                } else {
                    return false;
                };
            },
        );

    },
    8,
);
system.runInterval(
    () => {
        const players = world.getAllPlayers().filter(
            (p) => {
                const equipmentInventory = p.getComponent("equippable");
                const velocity = p.getVelocity()
                if (
                    equipmentInventory.getEquipment(EquipmentSlot.Head)?.typeId == "better_on_bedrock:amethyst_helmet"
                    && equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "better_on_bedrock:amethyst_chestplate"
                    && equipmentInventory.getEquipment(EquipmentSlot.Legs)?.typeId == "better_on_bedrock:amethyst_leggings"
                    && equipmentInventory.getEquipment(EquipmentSlot.Feet)?.typeId == "better_on_bedrock:amethyst_boots"
                    && velocity.x == 0
                ) {
                    p.playSound("step.amethyst_block", p.location);
                    return true;
                } else {
                    return false;
                };
            },
        );
    },
    150,
);

world.afterEvents.entityHurt.subscribe(ev => {
    const equipmentInventory = ev.hurtEntity.getComponent("equippable");
    if (ev.hurtEntity?.typeId == 'minecraft:player' && equipmentInventory.getEquipment(EquipmentSlot.Head)?.typeId == "better_on_bedrock:amethyst_helmet"
        && equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "better_on_bedrock:amethyst_chestplate"
        && equipmentInventory.getEquipment(EquipmentSlot.Legs)?.typeId == "better_on_bedrock:amethyst_leggings"
        && equipmentInventory.getEquipment(EquipmentSlot.Feet)?.typeId == "better_on_bedrock:amethyst_boots") {
        ev.damageSource.damagingEntity.applyKnockback(-ev.hurtEntity.getViewDirection().z, 1, 3, 0.4)
    }
})