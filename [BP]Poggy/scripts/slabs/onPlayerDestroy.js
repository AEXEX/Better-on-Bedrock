// Import necessary modules from Minecraft server API
import { world, ItemStack } from '@minecraft/server';
const slabs = [
    { id: "better_on_bedrock:chorus_slab" },
    { id: "better_on_bedrock:dusk_slab" },
    { id: "better_on_bedrock:malbite_bricks_slab" },
    { id: "better_on_bedrock:malbite_smooth_slab" },
    { id: "better_on_bedrock:malbite_smoother_slab" },
    { id: "better_on_bedrock:voiding_slab" }
];

// Subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // Register a custom component named kai:on_player_destroy for slab destroyal 
    eventData.blockComponentRegistry.registerCustomComponent('kai:on_player_destroy', {
        // Define behavior when a player destroys the slab
        onPlayerDestroy(e) {
            // Destructure event data for easier access
            const { block, player } = e;
            const isSlab = slabs.find((slab) => block.typeId(slab.id))
            // Check if player and equipment are valid
            if (!player || !player.getComponent('equippable')) {
                return;
            }

            // Get the item in the player's main hand
            const selectedItem = player.getComponent('equippable').getEquipment('Mainhand');

            // Check if the selected item is a pickaxe
            const isPickaxe = selectedItem && selectedItem.hasTag('minecraft:is_axe');

            // If the item is a pickaxe, spawn one slab in the block's position
            if (isPickaxe) {
                const slabItem = new ItemStack('better_on_bedrock:chorus_slab', 1);
                e.dimension.spawnItem(slabItem, block.location);
            }
        }
    });
});
