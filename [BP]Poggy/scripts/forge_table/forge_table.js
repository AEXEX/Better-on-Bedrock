import { world, system, Player, ItemStack, ItemTypes, ItemComponentTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";



export const forgeBaseUI = (player) => {
	const form = new ActionFormData();
	form.title("What would you like to forge?");
	form.body(
		"Welcome to the Forger! This block will allow you to craft specific resources for crafting unique items!"
	);
	form.button("Forge Iron Tool Head");
	form.button("Close");
	form.show(player).then(
		(response) => {
			const inventory = player.getComponent("inventory").container;
			const item = inventory.getItem(player.selectedSlotIndex);
			switch (response?.selection) {
				case 0:
					forgeToolHeadUI(player)
					break;
			};
		},
	);
};

const forgeToolHeadUI = (player) => {
	const form = new ActionFormData();
	form.title("Would you like to forge?");
	form.body(
		"You require 2x Iron Ingots to forge an Iron Tool Head. Continue?"
	);
	form.button("Forge Iron Tool Head");
	form.button("Close");
	form.show(player).then(
		(response) => {
			const inventory = player.getComponent("inventory").container;
			const item = inventory.getItem(player.selectedSlotIndex);
			switch (response?.selection) {
				case 0:
					if (getItemCount(player, "minecraft:iron_ingot") > 0) {
						player.runCommandAsync("give @p better_on_bedrock:pickaxe_head");
						player.runCommandAsync("clear @p minecraft:iron_ingot 0 2");
						player.playSound("random.anvil_use", player.location)
					} else {
						player.sendMessage("§cYou don't have the required amount of Iron Ingots");
					};
					break;
			};
		},
	);
};

const getItemCount = (player, itemId) => {
	let itemCount = 0;
	const inventory = player.getComponent("inventory").container;
	for (let slot = 0; slot < inventory.size; slot++) {
		const item = inventory.getItem(slot);
		if (
			item
			&& item.typeId == itemId
		) itemCount += item.amount;
	};

	return itemCount;
};