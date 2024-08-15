import { world, system, EquipmentSlot } from "@minecraft/server";
import { TicksPerSecond } from "@minecraft/server";
system.runInterval(
    () => {
        world.getAllPlayers().filter(
            (p) => {
                const equipmentInventory = p.getComponent("equippable");
                if (
                    equipmentInventory.getEquipment(EquipmentSlot.Head)?.typeId == "better_on_bedrock:stardust_helmet"
                    && equipmentInventory.getEquipment(EquipmentSlot.Chest)?.typeId == "better_on_bedrock:stardust_chestplate"
                    && equipmentInventory.getEquipment(EquipmentSlot.Legs)?.typeId == "better_on_bedrock:stardust_leggings"
                    && equipmentInventory.getEquipment(EquipmentSlot.Feet)?.typeId == "better_on_bedrock:stardust_boots"
                ) {
                    p.addEffect("health_boost", TicksPerSecond * 2, { amplifier: 2, showParticles: false });
                    p.addEffect("resistance", TicksPerSecond * 2, { amplifier: 2, showParticles: false });
                };
            },
        );
    },
);