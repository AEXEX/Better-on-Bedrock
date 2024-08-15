//Hello Poggy <3
//Hey dark <3
//Love u <3

import { world, ItemStack, EntityTypes, ItemTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import "./q_t/t_t_m/quest_list.js";

import { time_to_mine } from "./q_t/t_t_m/quest_list.js";
import { adventure_delight } from "./q_t/a_d/quest_list.js";
import { monster_looter } from "./q_t/m_l/quest_list.js";
import { beyond_the_overworld } from "./q_t/b_t_o/quest_list.js";
import { the_willager } from "./q_t/t_w/quest_list.js";
import { more_food } from "./q_t/m_f/quest_list.js";
import { test } from "./q_t/test/quest_list.js";

import { bought_quests } from "./quest_item.js";
//Love u for doing all this for me <3 <3 <3

import * as Quests from "./constants/Quests.js";
import * as QuestStatus from "./constants/QuestStatus.js";

/*world.afterEvents.worldInitialize.subscribe(
    ({ propertyRegistry }) => {
        const playerCompShowTick = new DynamicPropertiesDefinition();
        playerCompShowTick.defineBoolean( "showButton" );
        
        playerCompShowTick.defineNumber("gettinStarted");
        playerCompShowTick.defineNumber("tiersCompleted");
        playerCompShowTick.defineNumber("betterBedrock");
        
        playerCompShowTick.defineString( "quests", 80 );
        playerCompShowTick.defineString( "quests2", 80 );
        playerCompShowTick.defineString( "quests3", 84 );
        playerCompShowTick.defineString( "quests4", 109 );
        playerCompShowTick.defineString( "quests5", 106 );
        playerCompShowTick.defineString( "quests6", 130 );
        playerCompShowTick.defineString( "quests7", 150 );
        
        propertyRegistry.registerEntityTypeDynamicProperties(
            playerCompShowTick, EntityTypes.get("minecraft:player")
        );
    },
);*/

export const quests = [
    {
        id: Quests.Metallis,
        s: QuestStatus.Unlocked,
    },
    {
        id: Quests.LightMyDay,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.WitchcraftBlue,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.Amethysts,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.Diamonds,
        s: QuestStatus.Locked,
    },
];
export const quests2 = [
    {
        id: Quests.sadEnderman,
        s: QuestStatus.Unlocked,
    },
    {
        id: Quests.bountyTime,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.logCollector,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.oreCollector,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.evokerSpells,
        s: QuestStatus.Locked,
    },
];
export const quests3 = [
    {
        id: Quests.DeepBelow,
        s: QuestStatus.Unlocked,
    },
    {
        id: Quests.Friends,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.Money,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.Wildfire,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.Samurai,
        s: QuestStatus.Locked,
    },
];
export const quests4 = [
    {
        id: Quests.ZombieSlayer,
        s: QuestStatus.Unlocked,
    },
    {
        id: Quests.CreeperHunter,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.StringySituation,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.MoreSouls,
        s: QuestStatus.Locked,
    },
];
export const quests7 = [
    {
        id: Quests.ThatsFine,
        s: QuestStatus.Unlocked,
    },
    {
        id: Quests.Snowwhite,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.Netherite,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.EnderPlayer,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.NetherBed,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.MovableChest,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.DragonEgg,
        s: QuestStatus.Locked,
    },
];
export const quests6 = [
    {
        id: Quests.BowMaster,
        s: QuestStatus.Unlocked,
    },
    {
        id: Quests.StayingHealthy,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.ArmoredUp,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.WillagerHat,
        s: QuestStatus.Locked,
    },
];

export const quests5 = [
    {
        id: Quests.ABigNut,
        s: QuestStatus.Unlocked,
    },
    {
        id: Quests.EggsAsPlants,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.AGoodDiet,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.WildinFood,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.GreenHay,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.CureForTears,
        s: QuestStatus.Locked,
    },
    {
        id: Quests.LeBaguette,
        s: QuestStatus.Locked,
    },
];


world.afterEvents.playerSpawn.subscribe(
    ({ player }) => {
        player.runCommand("function join")
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
        };

        if (player.getDynamicProperty("tiersCompleted") == undefined) {
            player.setDynamicProperty("tiersCompleted", 0)
        }
    },//no no no no no nononononon onnono n
    //We dont need this.
)
//the reason it was logging that error is because the property was returning undefined because it has no value
//Opening another scroll sets all dynamic props. We don't need it to reset when you respawn/reload the world
//it shouldn't reset the quests when you respawn/reload the world, it only does that if the dynamic property is undefined
//Trust me, it did
//Thats why i set it to dfine when u open scroll
//I trust you

const randomXP = Math.floor(Math.random() * 64) + 32;
export const quest_main = (player) => {

    const form = new ActionFormData();
    form.title("§uQuest Menu")
    form.body("Select a quest chapter.");
    form.button("§eMain", "textures/items/raw_iron");
    form.button("§aBought Quests", "textures/items/emerald");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    bounty_tier_page(player);
                    break;
                case 1:
                    bought_quests(player);
                    break;
            }
        },
    );
};
const bounty_tier_page = (player) => {
    const tiersCompleted = player.getDynamicProperty("tiersCompleted");

    const form = new ActionFormData();
    form.title("§uQuest Tiers")
    form.body("These quests are a guide to help you with your journey!");

    if (tiersCompleted >= 0)
        form.button("§uGetting Started\n[§aUnlocked§u]", "textures/items/raw_iron");
    else
        form.button("§tGetting Started\n[§cLocked§t]", "textures/items/raw_iron");

    if (tiersCompleted >= 1)
        form.button("§uMining Time\n[§aUnlocked§u]", "textures/items/diamond_boots");
    else
        form.button("§tMining Time\n[§cLocked§t]", "textures/items/diamond_boots");
    if (tiersCompleted >= 2)
        form.button("§uNether Arise\n[§aUnlocked§u]", "textures/items/firey_ingot");
    else
        form.button("§tGear Up!\n[§cLocked§t]", "textures/items/firey_ingot");
    if (tiersCompleted >= 3)
        form.button("§uMonster Looter!\n[§aUnlocked§u]", "textures/items/rotten_flesh");
    else
        form.button("§tNether Arise!\n[§cLocked§t]", "textures/items/rotten_flesh");

    if (tiersCompleted >= 4)
        form.button("§uThe Willager\n[§aUnlocked§u]", "textures/items/dragons_breath");
    else
        form.button("§tThe Willager\n[§cLocked§t]", "textures/items/dragons_breath");

    if (tiersCompleted >= 5)
        form.button("§uAdventure Time!\n[§aUnlocked§u]", "textures/items/apple");
    else
        form.button("§tAdventure Time!\n[§cLocked§t]", "textures/items/apple");

    if (tiersCompleted >= 6)
        form.button("§uBeyond the Overworld\n[§aUnlocked§u]", "textures/items/end_ingot");
    else
        form.button("§tBeyond the Overworld\n[§cLocked§t]", "textures/items/end_ingot");



    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    if (player.getDynamicProperty("tiersCompleted") >= 0)
                        time_to_mine(player);
                    else player.sendMessage("§cYou need to complete \"Unknown\" in order to unlock this tier.");
                    break;
                case 1:
                    if (player.getDynamicProperty("tiersCompleted") >= 1)
                        adventure_delight(player);
                    else player.sendMessage("§cYou need to complete \"Time to Mine\" in order to unlock this tier.");
                    break;
                case 2:
                    if (player.getDynamicProperty("tiersCompleted") >= 2)
                        test(player);
                    else player.sendMessage("§cYou need to complete \"Time to Mine\" in order to unlock this tier.");
                    break;
                case 3:
                    if (player.getDynamicProperty("tiersCompleted") >= 3)
                        monster_looter(player);
                    else player.sendMessage("§cYou need to complete \"Nether Arise\" in order to unlock this tier.");
                    break;
                case 4:
                    if (player.getDynamicProperty("tiersCompleted") >= 4)
                        the_willager(player);
                    else player.sendMessage("§cYou need to complete \"Monster Looter\" in order to unlock this tier.");
                    break;
                case 5:
                    if (player.getDynamicProperty("tiersCompleted") >= 5)
                        more_food(player);
                    else player.sendMessage("§cYou need to complete \"The Willager\" in order to unlock this tier.");
                    break;
                case 6:
                    if (player.getDynamicProperty("tiersCompleted") >= 6)
                        beyond_the_overworld(player);
                    else player.sendMessage("§cYou need to complete \"More Food\" in order to unlock this tier.");
                    break;
            };
        },
    );
};
world.afterEvents.itemUse.subscribe(data => {
    let { source: player } = data

    let invi = player.getComponent("inventory").container;
    let items = invi.getItem(player.selectedSlotIndex);
    //this spawns the entity with a tag with the player name when the player does not have tag 'backpack1'
    if (items?.typeId == "better_on_bedrock:quest_paper") {
        player.runCommandAsync("replaceitem entity @s slot.weapon.mainhand 0 better_on_bedrock:bounty_paper_open")
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
        };
        if (player.getDynamicProperty("tiersCompleted") == undefined) {
            player.setDynamicProperty("tiersCompleted", 0)
        }
    }
    if (items?.typeId == "better_on_bedrock:bounty_paper_open") {
        quest_main(player)
    }
})
/*
world.beforeEventsitemUse.subscribe(
    ({ source: player, item }) => {
        switch (item?.typeId) {
            case "better_on_bedrock:quest_paper":
                const inventory = player.getComponent( "inventory" ).container;
                const newItem = new ItemStack("better_on_bedrock:bounty_paper_open", 1);
                
                inventory.setItem( player.selectedSlotIndex, newItem );

                if (!player.getDynamicProperty( "quests" )) {
                    player.setDynamicProperty(
                        "quests",
                        JSON.stringify( quests ),
                    );
                };
                if (!player.getDynamicProperty( "quests2" )) {
                    player.setDynamicProperty(
                        "quests2",
                        JSON.stringify( quests2 ),
                    );
                };
                if (!player.getDynamicProperty( "quests3" )) {
                    player.setDynamicProperty(
                        "quests3",
                        JSON.stringify( quests3 ),
                    );
                };
                if (!player.getDynamicProperty( "quests4" )) {
                    player.setDynamicProperty(
                        "quests4",
                        JSON.stringify( quests4 ),
                    );
                };
                if (!player.getDynamicProperty( "quests5" )) {
                    player.setDynamicProperty(
                        "quests5",
                        JSON.stringify( quests5 ),
                    );
                };
                if (!player. getDynamicProperty( "quests6" )) {
                    player.setDynamicProperty(
                        "quests6",
                        JSON.stringify( quests6 ),
                    );
                }
                if(!player.getDynamicProperty("tiersCompleted") || player.getDynamicProperty("tiersCompleted") == undefined){
                    player.setDynamicProperty("tiersCompleted", 0)
                }
            break;
            case "better_on_bedrock:bounty_paper_open": bounty_tier_page( player ); break;
        };
    },
);*/