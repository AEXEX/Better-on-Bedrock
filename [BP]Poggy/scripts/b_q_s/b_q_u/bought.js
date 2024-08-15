import { ActionFormData } from "@minecraft/server-ui";
import { world, system, ItemStack } from "@minecraft/server";
import { quests } from "../quest_item";

export const ench = (player) => {

    const form = new ActionFormData();
    form.title("§uEnch. Expedition")
    form.body("Obtain every enchanted book added by Better on Bedrock. This can be done via searching chests or buying from Librarian Villagers\n\n§cRewards\n- 1000x XP\n- 1x Random Lootbag");
    form.button("§eStart Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    player.sendMessage('Quest Started: Enchanted Expidition')
                    player.addTag("ench")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const ench_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uEnch. Expedition")
    form.body("Obtain every enchanted book added by Better on Bedrock. This can be done via searching chests or buying from Librarian Villagers\n\n§cRewards\n- 1000x XP\n- 1x Random Lootbag");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const quest_test = (player) => {

    const form = new ActionFormData();
    form.title("§uAbyssal Enigma")
    form.body("Enter The End.\n\n§cRewards\n- 1000x XP\n 3x Ender Pearl\n- 5x Prismarine Shards");
    form.button("§eGive Items", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("abbys")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const quest_test_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uAbyssal Enigma")
    form.body("Enter The End.\n\n§cRewards\n- 1000x XP\n 3x Ender Pearl\n- 5x Prismarine Shards");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const goblin = (player) => {

    const form = new ActionFormData();
    form.title("§uGoblin Menace")
    form.body("Obtain a Willager Hat by defeating the Willager.\n\n§cRewards\n- 500x XP\n- 5x Emerald");
    form.button("§eGive Items", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    player.sendMessage('Quest Started: Goblin Menace')
                    player.addTag("goblin")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const goblin_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uGoblin Menace")
    form.body("Obtain a Willager Hat by defeating the Willager.\n\n§cRewards\n- 500x XP\n- 5x Emerald");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};


export const wisdom = (player) => {

    const form = new ActionFormData();
    form.title("§uWisdom Elixir")
    form.body("Obtain 5 Quetzacaw eggs which are found in nether chests.\n\n§cRewards\n- 250x XP\n- 1x Random Lootbag");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("wisdom")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const wisdom_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uWisdom Elixir")
    form.body("Obtain 5 Quetzacaw eggs which are found in nether chests.\n\n§cRewards\n- 250x XP\n- 1x Random Lootbag");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const dragon = (player) => {

    const form = new ActionFormData();
    form.title("§uDragon's Hoard")
    form.body("Slain the Ender Dragon.\n\n§cRewards\n- 8000x XP\n- 5x Netherite Ingot");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("dragon")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const dragon_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uDragon's Hoard")
    form.body("Slain the Ender Dragon.\n\n§cRewards\n- 8000x XP\n- 5x Netherite Ingot");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const relics = (player) => {

    const form = new ActionFormData();
    form.title("§uMystical Relics")
    form.body("Onntain 4 Necklace Fragments by killing 2 Flenders.\n\n§cRewards\n- 2000x XP\n- 1x Totem of Undying");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("relics")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const relics_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uMystical Relics")
    form.body("Onntain 4 Necklace Fragments by killing 2 Flenders.\n\n§cRewards\n- 2000x XP\n- 1x Totem of Undying");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const treasure = (player) => {

    const form = new ActionFormData();
    form.title("§uTreasure Hunter")
    form.body("Obntain a heart of the sea by searching Treasure Chests.\n\n§cRewards\n- 500x XPn\ 2x Golden Apples");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("treasure")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const treasure_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uTreasure Hunter")
    form.body("Obntain a heart of the sea by searching Treasure Chests.\n\n§cRewards\n- 500x XPn\ 2x Golden Apples");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const cursed = (player) => {

    const form = new ActionFormData();
    form.title("§uCursed Crypt")
    form.body("Cure a Zombie Villager.\n\n§cRewards\n- 369 XP\n- 20x Bone");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("cursed")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const cursed_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uCursed Crypt")
    form.body("Cure a Zombie Villager.\n\n§cRewards\n- 369 XP\n- 20x Bone");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const celest = (player) => {

    const form = new ActionFormData();
    form.title("§uCelestial Elements")
    form.body("Obtain Deepslate Stardust Ore. Found at Deepslate level (Y0 - Y-24).\n\n§cRewards\n- 269 XP\n- 3x Stardust Ingot");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("celest")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const celest_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uCelestial")
    form.body("Obtain Deepslate Stardust Ore. Found at Deepslate level (Y0 - Y-24).\n\n§cRewards\n- 269 XP\n- 3x Stardust Ingot");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const eternal = (player) => {

    const form = new ActionFormData();
    form.title("§uEternal Flame")
    form.body("Slain the Inferior.\n\n§cRewards\n- 1000x XP\n- 2x Fiery Ingots\n- 3x Combined Elements");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("eternal")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const eternal_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uEternal Flame")
    form.body("Slain the Inferior.\n\n§cRewards\n- 1000x XP\n- 2x Fiery Ingots\n- 3x Combined Elements");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const ghostly = (player) => {

    const form = new ActionFormData();
    form.title("§uGhostly Tears")
    form.body("Obtain 2 Ghast Tears.\n\n§cRewards\n- 232x XP\n- 2x Phantom Membrane");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("ghostly")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const ghostly_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uGhostly Tears")
    form.body("Obtain 2 Ghast Tears.\n\n§cRewards\n- 232x XP\n- 2x Phantom Membrane");

    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const miner = (player) => {

    const form = new ActionFormData();
    form.title("§uMiner's Dilemma")
    form.body("Have a pickaxe that has Vein Miner I.\n\n§cRewards\n- 231 XP\n- 3x Diamond");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("miner")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const miner_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uMiner's Dream")
    form.body("Have a pickaxe that has Vein Miner I.\n\n§cRewards\n- 231 XP\n- 3x Diamond");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const phoenix = (player) => {

    const form = new ActionFormData();
    form.title("§uPhoenix Rising")
    form.body("Obtain Quetzacaw Feathers.\n\n§cRewards\n- 496 XP");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("phoenix")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const phoenix_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uPhoenix Rising")
    form.body("Obtain Quetzacaw Feathers.\n\n§cRewards\n- 496 XP");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const enig = (player) => {

    const form = new ActionFormData();
    form.title("§uEnigmatic Artifacts")
    form.body("Obtain A Boss Trophy.\n\n§cRewards\n- 2000x XP");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("enig")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const enig_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uEnig. Artifacts")
    form.body("Obtain A Boss Trophy.\n\n§cRewards\n- 2000x XP");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const spectral = (player) => {

    const form = new ActionFormData();
    form.title("§uSpectral Hunt")
    form.body("Obtain at least 69 Arrows.\n\n§cRewards\n- 150x XP");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("spectral")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const spectral_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uSpectral Hunt")
    form.body("Obtain at least 69 Arrows.\n\n§cRewards\n- 150x XP");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
};

export const lost = (player) => {

    const form = new ActionFormData();
    form.title("§uLost Scroll")
    form.body("Obtain 1x Bounty Scroll found at a Trader Outpost bounty board.\n\n§cRewards\n- 200x XP\n 1x Mending Book");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("lost")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const lost_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uLost Scroll")
    form.body("Obtain 1x Bounty Scroll found at a Trader Outpost bounty board.\n\n§cRewards\n- 200x XP\n 1x Mending Book");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
}

export const titan = (player) => {

    const form = new ActionFormData();
    form.title("§uTitan's Gauntlet")
    form.body("Obtain a Nether Stone. Ususally found in Blackstone Castle Chests.\n\n§cRewards\n- 1000x XP\n 2x Nether Star");
    form.button("§eAccept Quest", "textures/items/raw_iron");
    form.button("§cDeny", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:

                    player.addTag("titan")
                    break;
                case 1:
                    break;
            }
        },
    );
};
export const titan_claim = (player) => {
    let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
    const form = new ActionFormData();
    form.title("§uTitam's Gauntlet")
    form.body("Obtain a Nether Stone. found in Blackstone Castle Chests.\n\n§cRewards\n- 1000x XP\n 2x Nether Star");
    form.button("§eOk", "textures/items/raw_iron");
    form.button("§cBack", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
}



world.afterEvents.entityDie.subscribe(ev => {
    const players = world.getAllPlayers();
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const deadEntity = ev.deadEntity
        if (deadEntity.typeId == 'minecraft:ender_dragon' && player.hasTag('dragon')) {
            player.removeTag('dragon')
            player.addTag('dragonc')

            let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
            world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:netherite_ingot', 5), player.location)
            player.addExperience(8000)
            player.sendMessage("§aYou completed quest: §eDragon's Hoard! §dRewards has been given §c(or dropped if you had a full inventory)");

            const index = unlockedQuests.findIndex(array => array[0] === 3)

            const temp = unlockedQuests[index][2] = 20;

            if (index) {
                unlockedQuests[index][2] = 20
            }

            player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

        }
        if (deadEntity.typeId == 'better_on_bedrock:inferior' && player.hasTag('eternal')) {
            player.removeTag('eternal')
            player.addTag('eternalc')

            let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
            world.getDimension(player.dimension.id).spawnItem(new ItemStack('better_on_bedrock:firey_ingot', 2), player.location)
            world.getDimension(player.dimension.id).spawnItem(new ItemStack('better_on_bedrock:combined_elements', 3), player.location)
            player.addExperience(1000)
            player.sendMessage("§aYou completed quest: §eEternal Flame! §dRewards has been given §c(or dropped if you had a full inventory)");

            const index = unlockedQuests.findIndex(array => array[0] === 8)

            const temp = unlockedQuests[index][2] = 20;

            if (index) {
                unlockedQuests[index][2] = 20
            }

            player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

        }
    }
})

system.runInterval(() => {
    const players = world.getAllPlayers();
    for (let i = 0; i < players.length; i++) {
        const player = players[i];


        const inventory = player.getComponent("inventory").container;
        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);
            if ((item?.typeId == "better_on_bedrock:vein_miner_book") && item?.amount >= 1 && player.hasTag('ench')) {
                player.removeTag('ench')
                player.addTag('enchc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                player.sendMessage("§aYou completed quest: §eEnchanted Expedition! §dRewards has been given §c(or dropped if you had a full inventory)");
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('better_on_bedrock:rare_lootbag', 1), player.location)
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:amethyst_shard', 3), player.location)
                player.addExperience(1000)

                const index = unlockedQuests.findIndex(array => array[0] == 0)

                const temp = unlockedQuests[index][2] = 20;


                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId == "better_on_bedrock:willager_hat_item" && item?.amount >= 1 && player.hasTag('goblin')) {
                player.removeTag('goblin')
                player.addTag('goblinc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('emerald', 5), player.location)
                player.addExperience(500)
                player.sendMessage("§aYou completed quest: §eGoblin Menace! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] == 1)

                const temp = unlockedQuests[index][2] = 20;


                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }
            if (item?.typeId == "better_on_bedrock:quetzacaw_egg" && item?.amount >= 5 && player.hasTag('wisdom')) {
                player.removeTag('wisdom')
                player.addTag('wisdomc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('better_on_bedrock:rare_lootbag', 1), player.location)
                player.addExperience(250)
                player.sendMessage("§aYou completed quest: §eWisdom Elixir! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 2)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }



            if (item?.typeId == "better_on_bedrock:ghost_necklace_fragment" && item?.amount >= 4 && player.hasTag('relics')) {
                player.removeTag('relics')
                player.addTag('relicsc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:totem_of_undying', 1), player.location)
                player.addExperience(2000)
                player.sendMessage("§aYou completed quest: §eAbyssal Enigma! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 4)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId == "minecraft:heart_of_the_sea" && item?.amount >= 1 && player.hasTag('treasure')) {
                player.removeTag('treasure')
                player.addTag('treasurec')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:golden_apple', 2), player.location)
                player.addExperience(500)
                player.sendMessage("§aYou completed quest: §eTreasure Hunter! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 5)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId == "better_on_bedrock:deepslate_stardust_ore" && item?.amount >= 1 && player.hasTag('celest')) {
                player.removeTag('celest')
                player.addTag('celestc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('better_on_bedrock:stardust_ingot', 3), player.location)
                player.addExperience(269)
                player.sendMessage("§aYou completed quest: §eCelestial Elements! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 7)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId == "minecraft:ghast_tear" && item?.amount >= 2 && player.hasTag('ghostly')) {
                player.removeTag('ghostly')
                player.addTag('ghostlyc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:phantom_membrane', 2), player.location)
                player.addExperience(232)
                player.sendMessage("§aYou completed quest: §eGhostly Tears! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 9)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId.includes('pickaxe') && item?.getLore().includes("§r§7Vein Miner I") && player.hasTag('miner')) {
                player.removeTag('miner')
                player.addTag('minerc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:diamond', 2), player.location)
                player.addExperience(231)
                player.sendMessage("§aYou completed quest: §eMiner's Dilemma! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 10)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId == "better_on_bedrock:quetzacaw_feather" && item?.amount >= 1 && player.hasTag('phoenix')) {
                player.removeTag('phoenix')
                player.addTag('phoenixc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                player.addExperience(496)
                player.sendMessage("§aYou completed quest: §eAbyssal Enigma! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 11)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId.includes('trophy') && item?.amount >= 1 && player.hasTag('enig')) {
                player.removeTag('enig')
                player.addTag('enigc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                player.addExperience(2000)
                player.sendMessage("§aYou completed quest: §eEnigmatic Artifacts! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 12)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId == "minecraft:arrow" && item?.amount >= 1 && player.hasTag('spectral')) {
                player.removeTag('spectral')
                player.addTag('spectralc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                player.addExperience(150)
                player.sendMessage("§aYou completed quest: §eSpectral Hunt! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 13)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId == "better_on_bedrock:quest_scroll_opened" && item?.amount >= 1 && player.hasTag('lost')) {
                player.removeTag('lost')
                player.addTag('lostc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:iron_sword', 1), player.location)
                player.addExperience(200)
                player.sendMessage("§aYou completed quest: §eLost Scroll! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 14)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }

            if (item?.typeId.includes('_stone') && item?.amount >= 1 && player.hasTag('titan')) {
                player.removeTag('titan')
                player.addTag('titanc')

                let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
                world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:nether_star', 2), player.location)
                player.addExperience(1000)
                player.sendMessage("§aYou completed quest: §eTitan's Gauntlet! §dRewards has been given §c(or dropped if you had a full inventory)");

                const index = unlockedQuests.findIndex(array => array[0] === 15)

                const temp = unlockedQuests[index][2] = 20;

                if (index) {
                    unlockedQuests[index][2] = 20
                }

                player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests))

            }
        };
    };
}, 20);

world.afterEvents.playerDimensionChange.subscribe((ev) => {
    const player = ev.player;
    const foundQuest = quests.find((quest) => quest.id);
    if (ev.toDimension.id == "minecraft:the_end" && ev.player.hasTag("abbys")) {

        let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
        world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:ender_pearl', 3), player.location)
        world.getDimension(player.dimension.id).spawnItem(new ItemStack('minecraft:prismarine_shard', 5), player.location)
        player.addExperience(1000)
        ev.player.removeTag("abbys");
        ev.player.addTag("abbysc");
        player.sendMessage("§aYou completed quest: §eAbyssal Enigma! §dRewards has been given §c(or dropped if you had a full inventory)");


        const index = unlockedQuests.findIndex(array => array[0] === 16)

        if (index) {

            unlockedQuests[index][2] = 20
        }

        player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests));

    }
});
