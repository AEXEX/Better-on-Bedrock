import { world, system, Player, EquipmentSlot } from "@minecraft/server";
import * as Utils from "./backpack_utils.js";
/**
 * @param { Player } player 
 * @param { string } backpackId 
 * @param { number } size 
 */
export const backpack = (player, backpackId, size = 0) => {
	try {
		const backpacks = player.dimension.getEntities({ tags: ["backpack:" + backpackId] });
		if (backpacks.length > 2) backpacks.forEach((b) => b.triggerEvent("despawn_backpack"));

		const [entity] = player.dimension.getEntities({ tags: ["backpack:" + backpackId] });
		if (Utils.portalNearby(player)) {
			if (entity) entity.triggerEvent("despawn_backpack");
			return;
		};

		if (entity) Utils.backpackInventoryCheck(player, entity);

		if (
			player.lastBackpackId
			&& player.lastBackpackId != backpackId
		) {
			const [entity] = player.dimension.getEntities({ tags: ["backpack:" + player.lastBackpackId] });
			Utils.saveBackpack(entity, player.lastBackpackId);
		};

		player.lastBackpackId = backpackId;
		const velocity = ({ x: player.getVelocity().x, y: player.getVelocity().y, z: player.getVelocity().z })

		if (
			velocity.x > 0.005 || velocity.x < -0.005
			|| !player.isOnGround
			|| Utils.isRiding(player)
		) {
			Utils.saveBackpack(entity, backpackId);
			return;
		};

		const { x, y, z } = player.getHeadLocation();
		const [newEntity] = player.dimension.getEntities({ tags: ["backpack:" + backpackId] });
		if (!newEntity) {
			player.runCommandAsync(`structure load "${backpackId}" ~ ~ ~`).then(() => {
				if (player.dimension.getEntities({ tags: ["backpack:" + backpackId] }).length < 1) {
					const e = player.dimension.spawnEntity(
						(
							size == 0
								? "better_on_bedrock:backpack"
								: (
									size == 1
										? "better_on_bedrock:backpack_medium"
										: "better_on_bedrock:backpack_large"
								)
						), { x, y, z },
					);
					e.addTag("backpack:" + backpackId);
					e.nameTag = (
						size == 0
							? "Backpack"
							: (size == 1 ? "Medium Backpack" : "Large Backpack")
					);
				};
			});
		} else newEntity?.teleport({ x, y, z }, player.dimension);
	} catch { };
};


system.runInterval(

	() => world.getAllPlayers().filter(
		(player) => {
			const equipment = player.getComponent("equippable");
			const handItem = equipment.getEquipment(EquipmentSlot.Mainhand);


			if (player.lastBackpackId) {
				const [entity] = player.dimension.getEntities({ tags: ["backpack:" + player.lastBackpackId] });
				if (entity) {
					Utils.backpackInventoryCheck(player, entity);
					Utils.saveBackpack(entity, player.lastBackpackId);
				};

				player.lastBackpackId = null;
			};
		},
	),
);