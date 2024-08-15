import { world, ItemStack, Entity, ItemTypes, EntityInventoryComponent, Block, ItemEnchantableComponent, } from "@minecraft/server"
import { system } from "@minecraft/server";
import { onPlayerDeath } from "./player_corpse/death_coords";
import { toolTip } from "./wawla_ui/main.js";
import { quests, quests2, quests3, quests4, quests5, quests6, quests7 } from "./b_q_s/bounty_ui.js";

import * as Quests from "./b_q_s/constants/Quests.js";
import * as QuestStatus from "./b_q_s/constants/QuestStatus.js";


const advancements = [
    {
        name: "Getting an Upgrade!",
        item: "better_on_bedrock:stone_pickaxe",
        requiredAmount: 1,
        tag: "stone_pickaxe",
        title: "stone_pickaxe",
        epic: false,
    },
    {
        name: "Aquire Hardware!",
        item: "minecraft:iron_ingot",
        requiredAmount: 1,
        tag: "iron_ingot",
        title: "iron_ingot",
        epic: false,
    },
    {
        name: "Hot Stuff!",
        item: "minecraft:lava_bucket",
        requiredAmount: 1,
        tag: "lava_bucket",
        title: "lava_bucket",
        epic: false,
    },
    {
        name: "Suit Up!",
        item: "minecraft:iron_chestplate",
        requiredAmount: 1,
        tag: "iron_chestplate",
        title: "iron_chestplate",
        epic: false,
    },
    {
        name: "Isn't It Iron Pick!",
        item: "better_on_bedrock:iron_pickaxe",
        requiredAmount: 1,
        tag: "iron_pickaxe",
        title: "iron_pickaxe",
        epic: false,
    },
    {
        name: "Ice Bucket Challenge!",
        item: "minecraft:obsidian",
        requiredAmount: 1,
        tag: "obsidian",
        title: "obsidian",
        epic: false,
    },
    {
        name: "Diamonds!",
        item: "minecraft:diamond",
        requiredAmount: 1,
        tag: "diamond",
        title: "diamond",
        epic: false,
    },
    {
        name: "Cover me with Diamonds!",
        item: "minecraft:diamond_chestplate",
        requiredAmount: 1,
        tag: "diamond_chestplate",
        title: "diamond_chestplate",
        epic: false,
    },
    {
        name: "Enchanter!",
        item: "minecraft:enchanted_book",
        requiredAmount: 1,
        tag: "enchanted_book",
        title: "enchanted_book",
        epic: false,
    },
    {
        name: "Zombie Doc!",
        item: "minecraft:golden_apple",
        requiredAmount: 1,
        tag: "golden_apple",
        title: "golden_apple",
        epic: false,
    },
    {
        name: "Eye Spy!",
        item: "minecraft:ender_eye",
        requiredAmount: 1,
        tag: "ender_eye",
        title: "ender_eye",
        epic: true,
    },

    {
        name: "Bee Our Guest!",
        item: "minecraft:honey_bottle",
        requiredAmount: 1,
        tag: "honey_bottle",
        title: "honey_bottle",
        epic: false,
    },
    {
        name: "BFF!",
        item: "minecraft:lead",
        requiredAmount: 1,
        tag: "lead",
        title: "lead",
        epic: false,
    },


    {
        name: "Don't Wild Carrots!",
        item: "better_on_bedrock:wild_carrot_food",
        requiredAmount: 1,
        tag: "wild_carrot",
        title: "wild_carrot",
        epic: true,
    },
    {
        name: "Coconut nut is a giant nut?",
        item: "better_on_bedrock:coconut_nut",
        requiredAmount: 1,
        tag: "coconut_nut",
        title: "coconut_nut",
        epic: false,
    },
    {
        name: "Sad Days.",
        item: "better_on_bedrock:ender_tear",
        requiredAmount: 1,
        tag: "ender_tear",
        title: "ender_tear",
        epic: true,
    },
    {
        name: "More Travels!",
        item: "better_on_bedrock:waystone",
        requiredAmount: 1,
        tag: "waystone",
        title: "waystone",
        epic: false,
    },
];
let tick = 0;
system.runInterval(
    () => {
        const players = world.getAllPlayers();
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (!player.hasTag('joined3')) {
                player.addTag('joined3')
            }
            if (player.hasTag('joined3')) {
                if (!player.getDynamicProperty("quests")) {
                    player.setDynamicProperty(
                        "quests",
                        JSON.stringify(quests),
                    );
                };
                if (!player.getDynamicProperty("quests2")) {
                    player.setDynamicProperty(
                        "quests2",
                        JSON.stringify(quests2),
                    );
                };
                if (!player.getDynamicProperty("quests3")) {
                    player.setDynamicProperty(
                        "quests3",
                        JSON.stringify(quests3),
                    );
                };
                if (!player.getDynamicProperty("quests4")) {
                    player.setDynamicProperty(
                        "quests4",
                        JSON.stringify(quests4),
                    );
                };
                if (!player.getDynamicProperty("quests5")) {
                    player.setDynamicProperty(
                        "quests5",
                        JSON.stringify(quests5),
                    );
                };
                if (!player.getDynamicProperty("quests6")) {
                    player.setDynamicProperty(
                        "quests6",
                        JSON.stringify(quests6),
                    );
                };
                if (!player.getDynamicProperty("quests7")) {
                    player.setDynamicProperty(
                        "quests7",
                        JSON.stringify(quests7),
                    );
                }

                if (player.getDynamicProperty("tiersCompleted") == undefined) {
                    player.setDynamicProperty("tiersCompleted", 0)
                }
            };

            if (!player.hasTag("toolTip")) toolTip(player);
            if (!player.hasTag("allow_corpse")) onPlayerDeath(player);

            if (tick >= 20) {
                tick = 0;
                ticks(player);
            } else tick++;
        };
    },
);

const ticks = (player) => {
    const inventory = player.getComponent("inventory").container;
    for (let slot = 0; slot < inventory.size; slot++) {
        const item = inventory.getItem(slot);
        if (
            item?.typeId === "better_on_bedrock:fixed_ghost_necklace" &&
            item?.getComponent("durability").damage >= 10
        ) inventory.setItem(
            slot,
            new ItemStack("better_on_bedrock:broken_ghost_necklace", 1)
        );

        const advancement = advancements.find(
            (a) =>
                item?.typeId == a.item
                && item?.amount >= a.requiredAmount
                && !player.hasTag(a.tag)
        );

        if (advancement) {
            world.sendMessage(
                "[§2" + player.nameTag + "§f] Made The Advancement: " + (advancement.epic ? "§5" : "§e") + advancement.name
            );

            player.playSound(advancement.epic ? "epic_quest" : "normal_quest");
            player.addTag(advancement.tag);
            player.onScreenDisplay.setTitle(advancement.title);
        };
        if (
            item?.typeId == "better_on_bedrock:record_stardust"
            && !item.getLore().length
        ) {
            item.setLore(["§r§7PatchyTheFox - Stardust"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:record_9"
            && !item.getLore().length
        ) {
            item.setLore(["§r§7Poggy - 9"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:coconut"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eBreak open on stone"]);
            inventory.setItem(slot, item);
        };

        if (
            item?.typeId == "better_on_bedrock:fixed_ghost_necklace"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eGives a 10 second ghost effect"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:ghost_necklace_fragment"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eCombine 4 to make a Ghost Necklace"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:stardust_nugget"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eSmelt in a furnace/blast furnace"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:amethyst_helmet"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eFull set grants knockback to attacking mob"]);
            inventory.setItem(slot, item);
        };

        if (
            item?.typeId == "better_on_bedrock:amethyst_chestplate"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eFull set grants knockback to attacking mob"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:amethyst_leggings"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eFull set grants knockback to attacking mob"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:amethyst_boots"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eFull set grants knockback to attacking mob"]);
            inventory.setItem(slot, item);
        };


        if (
            item?.typeId == "better_on_bedrock:stardust_helmet"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eFull set grants health boost III"]);
            inventory.setItem(slot, item);
        };

        if (
            item?.typeId == "better_on_bedrock:stardust_chestplate"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eFull set grants health boost III"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:stardust_leggings"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eFull set grants health boost III"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:stardust_boots"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eFull set grants health boost III"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:nether_amulet_3_stone_yellow_red_green"
            && !item.getLore().length
        ) {
            item.setLore(["§r§eSneak + Use to swap modes."]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:unactivated_default_rune"
            && !item.getLore().length
        ) {
            item.setLore(["§r§7Can be activated by a Cured Villager"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:unactivated_rune_of_mining"
            && !item.getLore().length
        ) {
            item.setLore(["§r§7Can be activated by a Cured Villager"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:unactivated_rune_of_protection"
            && !item.getLore().length
        ) {
            item.setLore(["§r§7Can be activated by a Cured Villager"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:unactivated_rune_of_strength"
            && !item.getLore().length
        ) {
            item.setLore(["§r§7Can be activated by a Cured Villager"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:unactivated_rune_of_vitality"
            && !item.getLore().length
        ) {
            item.setLore(["§r§7Can be activated by a Cured Villager"]);
            inventory.setItem(slot, item);
        };
        if (
            item?.typeId == "better_on_bedrock:unactivated_rune_of_the_seas"
            && !item.getLore().length
        ) {
            item.setLore(["§r§7Can be activated by a Cured Villager"]);
            inventory.setItem(slot, item);
        };

        //Quests Start here
        const quests = JSON.parse(player.getDynamicProperty("quests"));
        if (
            item?.typeId.includes('log') && item?.amount >= 3
            && quests.find((q) => q.id == Quests.Metallis).s == QuestStatus.Busy
        ) {
            quests.find((q) => q.id == Quests.Metallis).s = QuestStatus.Completed;
            quests.find((q) => q.id == Quests.LightMyDay).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("ironQuestDone") //this is used for our hud_screen.json to call toast
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests",
                JSON.stringify(quests),
            );
        } else if (
            item?.typeId == "minecraft:cobblestone" && item?.amount >= 14
            && quests.find((q) => q.id == Quests.LightMyDay).s == QuestStatus.Busy
        ) {
            quests.find((q) => q.id == Quests.LightMyDay).s = QuestStatus.Completed;
            quests.find((q) => q.id == Quests.WitchcraftBlue).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("coalQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests",
                JSON.stringify(quests),
            );
        } else if (
            item?.typeId === "better_on_bedrock:stone_pickaxe"
            && item?.amount >= 1
            && quests.find((q) => q.id == Quests.WitchcraftBlue).s == QuestStatus.Busy
        ) {
            quests.find((q) => q.id == Quests.WitchcraftBlue).s = QuestStatus.Completed;
            quests.find((q) => q.id == Quests.Amethysts).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("lapisQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests",
                JSON.stringify(quests),
            );
        } else if (
            item?.typeId === "better_on_bedrock:pickaxe_head"
            && item?.amount >= 1
            && quests.find((q) => q.id == Quests.Amethysts).s == QuestStatus.Busy
        ) {
            quests.find((q) => q.id == Quests.Amethysts).s = QuestStatus.Completed;
            quests.find((q) => q.id == Quests.Diamonds).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("amethystQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests",
                JSON.stringify(quests),
            );
        } else if (
            item?.typeId === "minecraft:diamond"
            && item?.amount >= 9
            && quests.find((q) => q.id == Quests.Diamonds).s == QuestStatus.Busy
        ) {
            quests.find((q) => q.id == Quests.Diamonds).s = QuestStatus.Completed;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("tierTest")
            player.sendMessage("§9Tier Complete! Time To Mine.");
            player.playSound("epic_quest");
            player.runCommandAsync("give @p better_on_bedrock:adventure_hat")

            player.setDynamicProperty(
                "quests",
                JSON.stringify(quests),
            );
            player.setDynamicProperty(
                "tiersCompleted",
                1,
            );
        };

        //Tier 2
        const quests2 = JSON.parse(player.getDynamicProperty("quests2"));
        if (
            item?.typeId === "better_on_bedrock:quest" && item?.amount >= 1
            && quests2.find((q) => q.id == Quests.sadEnderman).s == QuestStatus.Busy
        ) {
            quests2.find((q) => q.id == Quests.sadEnderman).s = QuestStatus.Completed;
            quests2.find((q) => q.id == Quests.bountyTime).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("enderTearQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests2",
                JSON.stringify(quests2),
            );
        } else if (
            item?.typeId === "better_on_bedrock:quest_scroll_closed" && item?.amount >= 1
            && quests2.find((q) => q.id == Quests.bountyTime).s == QuestStatus.Busy
        ) {
            quests2.find((q) => q.id == Quests.bountyTime).s = QuestStatus.Completed;
            quests2.find((q) => q.id == Quests.logCollector).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!")
            player.onScreenDisplay.setTitle("questScrollQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests2",
                JSON.stringify(quests2),
            );
        } else if (
            item?.typeId == "better_on_bedrock:scroll_of_the_nether" && item?.amount >= 1
            && quests2.find((q) => q.id == Quests.logCollector).s == QuestStatus.Busy
        ) {
            quests2.find((q) => q.id == Quests.logCollector).s = QuestStatus.Completed;
            quests2.find((q) => q.id == Quests.oreCollector).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("logQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests2",
                JSON.stringify(quests2),
            );
        } else if (
            item?.typeId === "better_on_bedrock:waystone_item" && item?.amount >= 1
            && quests2.find((q) => q.id == Quests.oreCollector).s == QuestStatus.Busy
        ) {
            quests2.find((q) => q.id == Quests.oreCollector).s = QuestStatus.Completed;
            quests2.find((q) => q.id == Quests.evokerSpells).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("oreCollectorQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests2",
                JSON.stringify(quests2),
            );
        } else if (
            item?.typeId === "better_on_bedrock:scroll_of_the_netherlvl2" && item?.amount >= 1 && quests2.find((q) => q.id == Quests.evokerSpells).s == QuestStatus.Busy
        ) {
            quests2.find((q) => q.id == Quests.evokerSpells).s = QuestStatus.Completed;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("tierTest2")
            player.sendMessage("§9Tier Complete! Time to Mine!.");
            player.playSound("epic_quest");
            player.setDynamicProperty(
                "quests2",
                JSON.stringify(quests2),
            );
            player.setDynamicProperty(
                "tiersCompleted",
                2,
            );
        };

        const quests3 = JSON.parse(player.getDynamicProperty("quests3"));
        if (
            item?.typeId === "better_on_bedrock:corstinite_ingot" && item?.amount >= 1
            && quests3.find((q) => q.id == Quests.DeepBelow).s == QuestStatus.Busy
        ) {
            quests3.find((q) => q.id == Quests.DeepBelow).s = QuestStatus.Completed;
            quests3.find((q) => q.id == Quests.Friends).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("deepbelowQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests3",
                JSON.stringify(quests3),
            );
        } else if (
            item?.typeId === "better_on_bedrock:quetzacaw_egg" && item?.amount >= 1
            && quests3.find((q) => q.id == Quests.Friends).s == QuestStatus.Busy
        ) {
            quests3.find((q) => q.id == Quests.Friends).s = QuestStatus.Completed;
            quests3.find((q) => q.id == Quests.Money).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("friendsrQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests3",
                JSON.stringify(quests3),
            );
        } else if (
            item?.typeId === "better_on_bedrock:blackstone_crumb" && item?.amount >= 6
            && quests3.find((q) => q.id == Quests.Money).s == QuestStatus.Busy
        ) {
            quests3.find((q) => q.id == Quests.Money).s = QuestStatus.Completed;
            quests3.find((q) => q.id == Quests.Wildfire).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("moneyQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests3",
                JSON.stringify(quests3),
            );
        }

        //Tier 3
        const quests4 = JSON.parse(player.getDynamicProperty("quests4"));
        if (
            item?.typeId === "minecraft:rotten_flesh" && item?.amount >= 32
            && quests4.find((q) => q.id == Quests.ZombieSlayer).s == QuestStatus.Busy
        ) {
            quests4.find((q) => q.id == Quests.ZombieSlayer).s = QuestStatus.Completed;
            quests4.find((q) => q.id == Quests.CreeperHunter).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("zombieSlayerQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests4",
                JSON.stringify(quests4),
            );
        } else if (
            item?.typeId === "minecraft:gunpowder" && item?.amount >= 16
            && quests4.find((q) => q.id == Quests.CreeperHunter).s == QuestStatus.Busy
        ) {
            quests4.find((q) => q.id == Quests.CreeperHunter).s = QuestStatus.Completed;
            quests4.find((q) => q.id == Quests.StringySituation).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("creeperHunterQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests4",
                JSON.stringify(quests4),
            );
        } else if (
            item?.typeId === "minecraft:string" && item?.amount >= 14
            && quests4.find((q) => q.id == Quests.StringySituation).s == QuestStatus.Busy
        ) {
            quests4.find((q) => q.id == Quests.StringySituation).s = QuestStatus.Completed;
            quests4.find((q) => q.id == Quests.MoreSouls).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("stringySituationQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests4",
                JSON.stringify(quests4),
            );
        } else if (
            item?.typeId === "better_on_bedrock:soul_star" && item?.amount >= 2
            && quests4.find((q) => q.id == Quests.MoreSouls).s == QuestStatus.Busy
        ) {
            quests4.find((q) => q.id == Quests.MoreSouls).s = QuestStatus.Completed;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("tierTest4")
            player.sendMessage("§9Tier Complete! Monster Looter.");
            player.playSound("epic_quest");
            player.setDynamicProperty(
                "quests4",
                JSON.stringify(quests4),
            );
            player.setDynamicProperty(
                "tiersCompleted",
                4,
            );
        };

        //Tier 4
        const quests7 = JSON.parse(player.getDynamicProperty("quests7"));
        if (
            item?.typeId === "minecraft:blaze_rod" && item?.amount >= 5
            && quests7.find((q) => q.id == Quests.ThatsFine).s == QuestStatus.Busy
        ) {
            quests7.find((q) => q.id == Quests.ThatsFine).s = QuestStatus.Completed;
            quests7.find((q) => q.id == Quests.Snowwhite).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("thatsFineQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests7",
                JSON.stringify(quests7),
            );
        } else if (
            item?.typeId === "minecraft:quartz" && item?.amount >= 32
            && quests7.find((q) => q.id == Quests.Snowwhite).s == QuestStatus.Busy
        ) {
            quests7.find((q) => q.id == Quests.Snowwhite).s = QuestStatus.Completed;
            quests7.find((q) => q.id == Quests.Netherite).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("snowwhiteQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests7",
                JSON.stringify(quests7),
            );
        } else if (
            item?.typeId === "minecraft:netherite_ingot" && item?.amount >= 1
            && quests7.find((q) => q.id == Quests.Netherite).s == QuestStatus.Busy
        ) {
            quests7.find((q) => q.id == Quests.Netherite).s = QuestStatus.Completed;
            quests7.find((q) => q.id == Quests.EnderPlayer).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("netheriteQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests7",
                JSON.stringify(quests7),
            );
        } else if (
            item?.typeId === "minecraft:chorus_fruit" && item?.amount >= 64
            && quests7.find((q) => q.id == Quests.EnderPlayer).s == QuestStatus.Busy
        ) {
            quests7.find((q) => q.id == Quests.EnderPlayer).s = QuestStatus.Completed;
            quests7.find((q) => q.id == Quests.NetherBed).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("enderPlayerQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests7",
                JSON.stringify(quests7),
            );
        } else if (
            item?.typeId === "minecraft:respawn_anchor" && item?.amount >= 1
            && quests7.find((q) => q.id == Quests.NetherBed).s == QuestStatus.Busy
        ) {
            quests7.find((q) => q.id == Quests.NetherBed).s = QuestStatus.Completed;
            quests7.find((q) => q.id == Quests.MovableChest).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("netherBedQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests7",
                JSON.stringify(quests7),
            );
        } else if (
            item?.typeId === "minecraft:undyed_shulker_box" && item?.amount >= 1
            && quests7.find((q) => q.id == Quests.MovableChest).s == QuestStatus.Busy
        ) {
            quests7.find((q) => q.id == Quests.MovableChest).s = QuestStatus.Completed;
            quests7.find((q) => q.id == Quests.DragonEgg).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("movableChestQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests7",
                JSON.stringify(quests7),
            );
        } else if (
            item?.typeId === "minecraft:dragon_egg" && item?.amount >= 1
            && quests7.find((q) => q.id == Quests.DragonEgg).s == QuestStatus.Busy
        ) {
            quests7.find((q) => q.id == Quests.DragonEgg).s = QuestStatus.Completed;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("tierTest7")
            player.sendMessage("§9Tier Complete! Beyond The Overworld.");
            player.playSound("epic_quest");
            player.setDynamicProperty(
                "quests7",
                JSON.stringify(quests7),
            );
            player.setDynamicProperty(
                "tiersCompleted",
                7,
            );
        };

        //Tier 5
        const quests6 = JSON.parse(player.getDynamicProperty("quests6"));
        if (
            item?.typeId === "minecraft:arrow" && item?.amount >= 48
            && quests6.find((q) => q.id == Quests.BowMaster).s == QuestStatus.Busy
        ) {
            quests6.find((q) => q.id == Quests.BowMaster).s = QuestStatus.Completed;
            quests6.find((q) => q.id == Quests.StayingHealthy).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("bowMasterQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests6",
                JSON.stringify(quests6),
            );
        } else if (
            item?.typeId === "better_on_bedrock:healthy_carrot_item" && item?.amount >= 16
            && quests6.find((q) => q.id == Quests.StayingHealthy).s == QuestStatus.Busy
        ) {
            quests6.find((q) => q.id == Quests.StayingHealthy).s = QuestStatus.Completed;
            quests6.find((q) => q.id == Quests.ArmoredUp).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("stayingHealthyQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests6",
                JSON.stringify(quests6),
            );
        } else if (
            item?.typeId === "minecraft:diamond_chestplate" && item?.amount >= 1
            && quests6.find((q) => q.id == Quests.ArmoredUp).s == QuestStatus.Busy
        ) {
            quests6.find((q) => q.id == Quests.ArmoredUp).s = QuestStatus.Completed;
            quests6.find((q) => q.id == Quests.WillagerHat).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("armoredUpQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests6",
                JSON.stringify(quests6),
            );
        } else if (
            item?.typeId === "better_on_bedrock:willager_hat_item" && item?.amount >= 1
            && quests6.find((q) => q.id == Quests.WillagerHat).s == QuestStatus.Busy
        ) {
            quests6.find((q) => q.id == Quests.WillagerHat).s = QuestStatus.Completed;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("tierTest5")
            player.sendMessage("§9Tier Complete! The Willager.");
            player.playSound("epic_quest");
            player.setDynamicProperty(
                "quests6",
                JSON.stringify(quests6),
            );
            player.setDynamicProperty(
                "tiersCompleted",
                5,
            );
        };

        //Tier 6
        const quests5 = JSON.parse(player.getDynamicProperty("quests5"));
        if (
            item?.typeId === "better_on_bedrock:broken_open_coconut" && item?.amount >= 1
            && quests5.find((q) => q.id == Quests.ABigNut).s == QuestStatus.Busy
        ) {
            quests5.find((q) => q.id == Quests.ABigNut).s = QuestStatus.Completed;
            quests5.find((q) => q.id == Quests.EggsAsPlants).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("aBigNutQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests5",
                JSON.stringify(quests5),
            );
        } else if (
            item?.typeId === "better_on_bedrock:baked_eggplant" && item?.amount >= 32
            && quests5.find((q) => q.id == Quests.EggsAsPlants).s == QuestStatus.Busy
        ) {
            quests5.find((q) => q.id == Quests.EggsAsPlants).s = QuestStatus.Completed;
            quests5.find((q) => q.id == Quests.AGoodDiet).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("eggsAsPlantsQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests5",
                JSON.stringify(quests5),
            );
        } else if (
            item?.typeId === "better_on_bedrock:salad" && item?.amount >= 8
            && quests5.find((q) => q.id == Quests.AGoodDiet).s == QuestStatus.Busy
        ) {
            quests5.find((q) => q.id == Quests.AGoodDiet).s = QuestStatus.Completed;
            quests5.find((q) => q.id == Quests.WildinFood).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("aGoodDietQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests5",
                JSON.stringify(quests5),
            );
        } else if (
            item?.typeId === "better_on_bedrock:wild_carrot_food" && item?.amount >= 16
            && quests5.find((q) => q.id == Quests.WildinFood).s == QuestStatus.Busy
        ) {
            quests5.find((q) => q.id == Quests.WildinFood).s = QuestStatus.Completed;
            quests5.find((q) => q.id == Quests.GreenHay).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("wildinFoodQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests5",
                JSON.stringify(quests5),
            );
        } else if (
            item?.typeId === "better_on_bedrock:barley_soup" && item?.amount >= 5
            && quests5.find((q) => q.id == Quests.GreenHay).s == QuestStatus.Busy
        ) {
            quests5.find((q) => q.id == Quests.GreenHay).s = QuestStatus.Completed;
            quests5.find((q) => q.id == Quests.CureForTears).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("greenHayQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests5",
                JSON.stringify(quests5),
            );
        } else if (
            item?.typeId === "better_on_bedrock:baked_onion" && item?.amount >= 32
            && quests5.find((q) => q.id == Quests.CureForTears).s == QuestStatus.Busy
        ) {
            quests5.find((q) => q.id == Quests.CureForTears).s = QuestStatus.Completed;
            quests5.find((q) => q.id == Quests.LeBaguette).s = QuestStatus.Unlocked;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("cureForTearsQuestDone")
            player.playSound("normal_quest");
            player.setDynamicProperty(
                "quests5",
                JSON.stringify(quests5),
            );
        } else if (
            item?.typeId === "better_on_bedrock:baguete" && item?.amount >= 1
            && quests5.find((q) => q.id == Quests.LeBaguette).s == QuestStatus.Busy
        ) {
            quests5.find((q) => q.id == Quests.LeBaguette).s = QuestStatus.Completed;
            player.sendMessage("§aQuest Complete! Go claim your reward!");
            player.onScreenDisplay.setTitle("tierTest6")
            player.sendMessage("§9Tier Complete! The Willager.");
            player.playSound("epic_quest");
            player.setDynamicProperty(
                "quests5",
                JSON.stringify(quests5),
            );
            player.setDynamicProperty(
                "tiersCompleted",
                6,
            );
        };
    };
}
