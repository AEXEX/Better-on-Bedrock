import { world, system, EquipmentSlot } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { quest_main } from "./bounty_ui.js";
import { createDistribution, randomItem } from "./quest_utils.js";
import {
	quest_test,
	quest_test_claim,
	ench,
	ench_claim,
	goblin,
	goblin_claim,
	wisdom,
	wisdom_claim,
	dragon,
	dragon_claim,
	relics,
	relics_claim,
	treasure,
	treasure_claim,
	cursed,
	cursed_claim,
	celest,
	celest_claim,
	eternal,
	eternal_claim,
	ghostly,
	ghostly_claim,
	miner,
	miner_claim,
	phoenix,
	phoenix_claim,
	enig,
	enig_claim,
	spectral,
	spectral_claim,
	lost,
	lost_claim,
	titan,
	titan_claim,
} from "./b_q_u/bought.js";
import "./b_q_u/bought.js"

const rarities = {
	0: "§8Common",
	1: "§aUncommon",
	2: "§uRare",
	3: "§6Legendary",
};

export const quests = [
	{ id: 0, rarity: 2, completed: 0, name: "Ench. Expedition", icon: "textures/items/amethyst_shard" },
	{ id: 1, rarity: 0, completed: 0, name: "Goblin Menace", icon: "textures/items/raw_iron" },
	{ id: 2, rarity: 1, completed: 0, name: "Wisdom Elixir", icon: "textures/items/emerald" },
	{ id: 3, rarity: 3, completed: 0, name: "Dragon's Hoard", icon: "textures/items/raw_gold" },
	{ id: 4, rarity: 2, completed: 0, name: "Mystical Relics", icon: "textures/items/amethyst_shard" },
	{ id: 5, rarity: 1, completed: 0, name: "Treasure Hunter", icon: "textures/items/emerald" },
	{ id: 6, rarity: 0, completed: 0, name: "Cursed Crypt", icon: "textures/items/raw_iron" },
	{ id: 7, rarity: 3, completed: 0, name: "Celestial", icon: "textures/items/raw_gold" },
	{ id: 8, rarity: 2, completed: 0, name: "Eternal Flame", icon: "textures/items/amethyst_shard" },
	{ id: 9, rarity: 1, completed: 0, name: "Ghostly Tears", icon: "textures/items/emerald" },
	{ id: 10, rarity: 0, completed: 0, name: "Miner's Dilemma", icon: "textures/items/raw_iron" },
	{ id: 11, rarity: 3, completed: 0, name: "Phoenix Rising", icon: "textures/items/raw_gold" },
	{ id: 12, rarity: 2, completed: 0, name: "Enig. Artifacts", icon: "textures/items/amethyst_shard" },
	{ id: 13, rarity: 1, completed: 0, name: "Spectral Hunt", icon: "textures/items/emerald" },
	{ id: 14, rarity: 0, completed: 0, name: "Lost Scroll", icon: "textures/items/raw_iron" },
	{ id: 15, rarity: 3, completed: 0, name: "Titan's Gauntlet", icon: "textures/items/raw_gold" },
	{ id: 16, rarity: 3, completed: 0, name: "Abyssal Enigma", icon: "textures/items/raw_gold" }
];

export const bought_quests = (player) => {
	const unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
	const form = new ActionFormData();
	form.title("§aBought Quests");

	let buttons = [];
	for (const quest of quests) {
		const rarityUnlockedQuests = unlockedQuests.filter((q) => q[1] == quest.rarity);
		const result = unlockedQuests.find(array => array[2] === 20) !== undefined;

		const isUnlocked = rarityUnlockedQuests.find((q) => q[0] == quest.id && q[1] == quest.rarity) !== undefined;
		const completed = unlockedQuests.find((q) => q[0] == quest.id && q[2] == quest.completed) !== undefined;


		form.button(quest.name + " - " + rarities[quest.rarity] + (isUnlocked ? "" : "\n§c[Requires Bought Quest]") + (completed ? "" : "\n§a§l[Done]"), quest.icon);
		buttons.push(quest);
	};

	form.button("§c< Go back");
	form.show(player).then(
		(response) => {
			if (response.canceled) return;
			switch (response.selection) {
				case buttons.length: quest_main(player); break;
				default:
					let unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
					const quest = buttons[response.selection];
					const isUnlocked = unlockedQuests.find((q) => q[0] == quest.id && q[1] == quest.rarity) !== undefined;
					if (!isUnlocked) {
						player.sendMessage("§cThis quest is currently locked.");
						return;
					};

					switch (response.selection) {
						case 0:
							if (!player.hasTag("ench") && !player.hasTag("enchc")) {
								ench(player);
								return;
							};

							ench_claim(player);
							break;
						case 1:
							if (!player.hasTag("goblin") && !player.hasTag("goblinc")) {
								goblin(player);
								return;
							};

							goblin_claim(player);
							break;
						case 2:
							if (!player.hasTag("wisdom") && !player.hasTag("wisdomc")) {
								wisdom(player);
								return;
							};

							wisdom_claim(player);
							break;
						case 3:
							if (!player.hasTag("dragon") && !player.hasTag("dragonc")) {
								dragon(player);
								return;
							};

							dragon_claim(player);
							break;
						case 4:
							if (!player.hasTag("relics") && !player.hasTag("relicsc")) {
								relics(player);
								return;
							};

							relics_claim(player);
							break;
						case 5:
							if (!player.hasTag("treasure") && !player.hasTag("treasurec")) {
								treasure(player);
								return;
							};

							treasure_claim(player);
							break;
						case 6:
							if (!player.hasTag("cursed") && !player.hasTag("cursedc")) {
								cursed(player);
								return;
							};

							cursed_claim(player);
							break;
						case 7:
							if (!player.hasTag("celest") && !player.hasTag("celestc")) {
								celest(player);
								return;
							};

							celest_claim(player);
							break;
						case 8:
							if (!player.hasTag("eternal") && !player.hasTag("eternalc")) {
								eternal(player);
								return;
							};

							eternal_claim(player);
							break;
						case 9:
							if (!player.hasTag("ghostly") && !player.hasTag("ghostlyc")) {
								ghostly(player);
								return;
							};

							ghostly_claim(player);
							break;
						case 10:
							if (!player.hasTag("miner") && !player.hasTag("minerc")) {
								miner(player);
								return;
							};

							miner_claim(player);
							break;
						case 11:
							if (!player.hasTag("phoenix") && !player.hasTag("phoenixc")) {
								phoenix(player);
								return;
							};

							phoenix_claim(player);
							break;
						case 12:
							if (!player.hasTag("enig") && !player.hasTag("enigc")) {
								enig(player);
								return;
							};

							enig_claim(player);
							break;
						case 13:
							if (!player.hasTag("spectral") && !player.hasTag("spectralc")) {
								spectral(player);
								return;
							};

							spectral_claim(player);
							break;
						case 14:
							if (!player.hasTag("lost") && !player.hasTag("lostc")) {
								lost(player);
								return;
							};

							lost_claim(player);
							break;
						case 15:
							if (!player.hasTag("titan") && !player.hasTag("titanc")) {
								titan(player);
								return;
							};

							titan_claim(player);
							break;
						case 16:
							if (!player.hasTag("abbys") && !player.hasTag("abbysc")) {
								quest_test(player);
								return;
							};

							quest_test_claim(player);
							break;
					};

					player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests));
					break;
			};
		},
	);
};

system.runInterval(() => {
	const players = world.getAllPlayers();
	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		if (player.getDynamicProperty("unlockedQuests") == undefined) {
			player.setDynamicProperty("unlockedQuests", JSON.stringify([]));
		};

		const inventory = player.getComponent("inventory").container;
		for (let i = 0; i < inventory.size; i++) {
			const item = inventory.getItem(i);
			if (item?.typeId !== "better_on_bedrock:quest") continue;
			if (item.getLore().length > 0) continue;

			const unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests")); //[[id, rarity],[id, rarity]]
			const rarities = [0, 1, 2, 3]; //0 = Common, 1 = Uncommon, 2 = Rare, 3 = Legendary
			const weights = [0.45, 0.3, 0.125, 0.125];
			const distribution = createDistribution(weights);
			const rarity = randomItem(rarities, distribution);
			const rarityQuests = quests.filter((q) => q.rarity == rarity);
			const data = {
				rarity,
				quest: rarityQuests[Math.floor(Math.random() * rarityQuests.length)].id,
			};

			item.setLore([JSON.stringify(data)]);
			inventory.setItem(i, item);
		};
	};
}, 20);

world.afterEvents.itemUse.subscribe(({ source: player, itemStack }) => {
	if (itemStack.typeId !== "better_on_bedrock:quest" || !itemStack.getLore().length) return;
	const data = JSON.parse(itemStack.getLore());
	const quest = quests.find((q) => q.id == data.quest && q.rarity == data.rarity);
	if (!quest) return;

	const unlockedQuests = JSON.parse(player.getDynamicProperty("unlockedQuests"));
	const isUnlocked = unlockedQuests.find((q) => q[0] == quest.id && q[1] == quest.rarity) !== undefined;

	if (isUnlocked) {
		player.sendMessage("§cYou already unlocked this quest.");
		player.addExperience(50)
		player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand);
		return;
	};

	unlockedQuests.push([quest.id, quest.rarity, quest.completed]);
	player.setDynamicProperty("unlockedQuests", JSON.stringify(unlockedQuests));
	player.sendMessage("§a§lQUEST UNLOCKED §r§8- §fYou have unlocked the §7" + quest.name + " §7- " + rarities[quest.rarity]);
	player.getComponent("equippable").setEquipment(EquipmentSlot.Mainhand);
});