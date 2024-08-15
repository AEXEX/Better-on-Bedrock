import { world, ItemStack, EntityTypes, ItemTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import * as Bounties from "./constants/Bounties.js";
import * as BountyStatus from "./constants/BountyStatus.js";

const getFormattedStatus = (status) => {
    if (status == 0) return "§dOpen";
    else if (status == 1) return "§cSearching Bounty...";
    else if (status == 2) return "§aBounty Found!";
    else if (status == 3) return "§dClaimed";
};

const bounties = [
    {
        id: Bounties.cowSlayer,
        progress: 0,
        status: BountyStatus.Open,
    }
];

const quests = [
    {
        id: Bounties.cowSlayer,
        name: "cow Slayer",
        functions: {
            start: (player) => {
                const savedBounties = JSON.parse(player.getDynamicProperty("bounties"));
                const form = new ActionFormData();
                form.title("cow Slayer");
                form.body("Hunt down 3 cows.\n§dRewards: 22 Coal and 20 XP");
                form.button("Start Hunt");
                form.button("Not Now");
                form.show(player).then(
                    (response) => {
                        switch (response?.selection) {
                            case 0:
                                player.sendMessage("§aQuest Started!");
                                savedBounties.find((b) => b.id == Bounties.cowSlayer).status = BountyStatus.Busy;
                                player.setDynamicProperty(
                                    "bounties",
                                    JSON.stringify(savedBounties),
                                );
                                break;
                        };
                    },
                );
            },
            about: (player) => {
                const form = new ActionFormData();
                form.title("cow Slayer");
                form.body("Hunt down 3 cows.\n§dRewards: 22 Coal and 20 XP");
                form.button("Got It!");
                form.show(player);
            },
            claim: (player) => {
                const savedBounties = JSON.parse(player.getDynamicProperty("bounties"));
                const form = new ActionFormData();
                form.title("cow Slayer");
                form.body("You hunted down 3 cows, claim your reward!\n/7Rewards: 22 Coal and 20 XP");
                form.button("Claim!");
                form.show(player).then(
                    (response) => {
                        switch (response?.selection) {
                            case 0:
                                const bounty = savedBounties.find((b) => b.id == Bounties.cowSlayer);
                                if (bounty.status != BountyStatus.Claimed) {
                                    player.runCommandAsync("xp 20");
                                    player.runCommandAsync("give @s coal 22");
                                    bounty.status = BountyStatus.Claimed;
                                    player.setDynamicProperty(
                                        "bounties",
                                        JSON.stringify(savedBounties),
                                    );
                                };
                                break;
                        };
                    },
                );
            },
        },
    },
];


export const bounty_tier_page = (player) => {
    let savedBounties = JSON.parse(player.getDynamicProperty("bounties"));
    for (const savedBounty of savedBounties) {
        if (!quests.find((q) => q.id == savedBounty.id)) {
            savedBounties = savedBounties.filter((q) => q.id != savedBounty.id);
        };
    };

    player.setDynamicProperty(
        "bounties",
        JSON.stringify(savedBounties),
    );

    const form = new ActionFormData();
    form.title("§uBounties");
    form.body("Welcome to the bounty screen. Select an exisitng bounty, or a newly unlocked bounty and follow the instructions. Each bounty will have a difficulty indicated by 'I, II, III, IV, V'.");

    for (const questO of quests) {
        const quest = savedBounties.find((b) => b.id == questO.id);
        const questStatus = getFormattedStatus(quest.status);

        form.button(
            (
                quest.status == BountyStatus.Open
                    || quest.status == BountyStatus.Claimed
                    ? "§d"
                    : "§u"
            )
            + questO.name + " - " + questStatus,
            questO.icon
        );
    };

    form.show(player).then(
        (response) => {
            if (response.canceled) return;
            const bounty = savedBounties.find((b) => b.id == response.selection);
            const b = quests.find((b) => b.id == response.selection);

            if (bounty.status == BountyStatus.Open) b.start(player);
            else if (bounty.status == BountyStatus.Busy) b.info(player);
            else if (bounty.status == BountyStatus.Completed) b.claim(player);
        },
    );
};

world.beforeEvents.itemUse.subscribe(
    ({ source: player, item }) => {

        if (item?.typeId == "better_on_bedrock:quest_scroll_closed") {
            player.addTag("cow_bounty_open")
            const inventory = player.getComponent("inventory").container;
            const newItem = new ItemStack(ItemTypes?.get("better_on_bedrock:quest_scroll_opened"));

            inventory.setItem(player.selectedSlotIndex, newItem);
        }

        if (item?.typeId == "better_on_bedrock:quest_scroll_opened") {

            if (!player.getDynamicProperty("bounties")) {
                player.setDynamicProperty(
                    "bounties",
                    JSON.stringify(bounties),
                );
            };

            bounty_tier_page(player);

        };
    },
);