import { Player, Entity } from "@minecraft/server";
export const generateSnowflake = () => ((Date.now() - 1420070400000) * Math.pow(2, 22)).toString();
/** @param { Player } player */
export const isRiding = (player) => {
	return (
		player.getComponent("minecraft:riding")?.entityRidingOn ? true : false
	);
};

/**
 * @param { Entity } entity 
 * @param { string } backpackId
 */
export const saveBackpack = (entity, backpackId) => {
	if (entity) {
		entity.runCommand(`structure save "${backpackId}" ~ ~2 ~ ~ ~3 ~ true disk false`);
		entity.triggerEvent("despawn_backpack");
	};
};

/** @param { string } typeId */
export const getBackpackSize = (typeId) => {
	switch (typeId) {
		case "better_on_bedrock:backpack": return 0;
		case "better_on_bedrock:backpack_medium": return 1;
		case "better_on_bedrock:backpack_large": return 2;
	};
};

/**
 * @param { Player } player 
 * @param { Entity } entity 
 */
export const backpackInventoryCheck = (player, entity) => {
	const inventory = player.getComponent("minecraft:inventory").container;
	const entityInventory = entity.getComponent("minecraft:inventory").container;
	for (let i = 0; i < entityInventory.size; i++) {
		const item = entityInventory.getItem(i);
		if (
			item?.typeId == "better_on_bedrock:backpack"
			|| item?.typeId == "better_on_bedrock:backpack_medium"
			|| item?.typeId == "better_on_bedrock:backpack_large"
		) {
			entityInventory.setItem(i);
			if (inventory.emptySlotsCount == 0)
				player.dimension.spawnItem(item, player.location);
			else inventory.addItem(item);
		};
	};
};

export const portalNearby = (player) => {
	const { x, y, z } = player.location;

	// Define the check area corners
	const corner1 = { x: x + 1, y: y + 1, z: z + 1 };
	const corner2 = { x: x - 1, y, z: z - 1 };

	// Iterate through individual block positions within the area
	for (let checkX = corner1.x; checkX >= corner2.x; checkX--) {
		for (let checkY = corner1.y; checkY >= corner2.y; checkY--) {
			for (let checkZ = corner1.z; checkZ >= corner2.z; checkZ--) {
				const location = { x: checkX, y: checkY, z: checkZ };
				const block = player.dimension.getBlock(location);

				if (
					block?.typeId === "minecraft:portal" ||
					block?.typeId === "minecraft:end_portal" ||
					block?.typeId === "better_on_bedrock:waystone" ||
					player.hasTag("inUI2")
				) return true;
			}
		}
	}

	return false;
};