import { world, system } from "@minecraft/server"

let vanillaSaturation = {
    "supernatural": 1.2,
    "max": 1.0,
    "good": 0.8,
    "high": 0.7,
    "normal": 0.6,
    "low": 0.3,
    "poor": 0.1
}

let vanillaFoodItems = [
    { typeId: "minecraft:cooked_chicken", nutrition: 6, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:cooked_porkchop", nutrition: 8, vanillaSaturation: vanillaSaturation.good },
    { typeId: "minecraft:cooked_beef", nutrition: 8, vanillaSaturation: vanillaSaturation.good },
    { typeId: "minecraft:cooked_mutton", nutrition: 6, vanillaSaturation: vanillaSaturation.good },
    { typeId: "minecraft:cooked_rabbit", nutrition: 5, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:cooked_cod", nutrition: 5, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:cooked_salmon", nutrition: 6, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:bread", nutrition: 5, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:mushroom_stew", nutrition: 6, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:beetroot_soup", nutrition: 6, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:rabbit_stew", nutrition: 10, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:baked_potato", nutrition: 5, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:cookie", nutrition: 2, vanillaSaturation: vanillaSaturation.poor },
    { typeId: "minecraft:pumpkin_pie", nutrition: 8, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:dried_kelp", nutrition: 1, vanillaSaturation: vanillaSaturation.poor },
    { typeId: "minecraft:honey_bottle", nutrition: 6, vanillaSaturation: vanillaSaturation.poor },
    { typeId: "minecraft:beetroot", nutrition: 1, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:potato", nutrition: 1, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:poisonous_potato", nutrition: 2, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:carrot", nutrition: 1, vanillaSaturation: vanillaSaturation.normal },
    { typeId: "minecraft:golden_carrot", nutrition: 6, vanillaSaturation: vanillaSaturation.supernatural },
    { typeId: "minecraft:apple", nutrition: 4, vanillaSaturation: 0.3 },
    { typeId: "minecraft:golden_apple", nutrition: 4, vanillaSaturation: vanillaSaturation.supernatural },
    { typeId: "minecraft:enchanted_golden_apple", nutrition: 4, vanillaSaturation: vanillaSaturation.supernatural },
    { typeId: "minecraft:melon_slice", nutrition: 2, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:sweet_berries", nutrition: 2, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:glow_berries", nutrition: 2, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:chicken", nutrition: 2, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:porkchop", nutrition: 3, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:beef", nutrition: 3, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:mutton", nutrition: 2, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:rabbit", nutrition: 3, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:cod", nutrition: 2, vanillaSaturation: vanillaSaturation.poor },
    { typeId: "minecraft:salmon", nutrition: 2, vanillaSaturation: vanillaSaturation.poor },
    { typeId: "minecraft:tropical_fish", nutrition: 1, vanillaSaturation: vanillaSaturation.poor },
    { typeId: "minecraft:pufferfish", nutrition: 1, vanillaSaturation: vanillaSaturation.poor },
    { typeId: "minecraft:spider_eye", nutrition: 2, vanillaSaturation: vanillaSaturation.good },
    { typeId: "minecraft:chorus_fruit", nutrition: 4, vanillaSaturation: vanillaSaturation.low },
    { typeId: "minecraft:rotten_flesh", nutrition: 4, vanillaSaturation: vanillaSaturation.poor },
];

function getFoodItemById(typeId) {
    for (const item of vanillaFoodItems) {
        if (item.typeId === typeId) {
            return item;
        }
    }
    return null; // If item not found, return null
}





system.runInterval(() => {
    world.getAllPlayers().filter((player) => {
        const equipmentInventory = player.getComponent("equippable");
        const inventory = player.getComponent("inventory").container;
        for (let slot = 0; slot < inventory.size; slot++) {
            const item = inventory.getItem(slot);
            const desiredFoodItem = getFoodItemById(item?.typeId);
            const loreMapForNutrition = new Map([
                [1, ['']],
                [2, ['']],
                [3, ['']],
                [4, ['']],
                [5, ['']],
                [6, ['']],
                [7, ['']],
                [8, ['']],
                [9, ['']],
            ]);
            const loreMapForSaturation = new Map([
                [1, ['']],
                [2, ['']],
                [0.6000000238418579, ['']],
                [3, ['']],
                [3, ['']],
                [3, ['']],
                [3, ['']],
                [5, ['']],
                [6, ['']],
                [7, ['']],
                [8, ['']],
                [11, ['']],
            ]);

            //\n\n
            function getHungerBarLore(value, fullBarIcon, singleIcon, fullIcon) {
                const fullBars = Math.floor(value); // Use Math.floor() for both nutrition and saturation
                const remainingDecimal = value - fullBars;

                const remainingBarString = remainingDecimal >= 0.5 ? fullIcon : singleIcon.repeat(Math.round(remainingDecimal * 4));

                return fullBarIcon.slice(0, fullBars) + remainingBarString;
            }

            // Define icons for nutrition and saturation
            const fullNutritionIcon = ''; // Replace with your full icon
            const halfNutritionIcon = ''; // Replace with your half icon
            const fullSaturationIcon = ''; // Replace with your full icon
            const halfSaturationIcon = ''; // Replace with your half icon
            const singleIcon = ''; // Define the icon used for individual units (less than 1)
            // Check if the selected item's type matches a vanilla food item
            const vanillaFoodItem = vanillaFoodItems.find(foodItem => foodItem.typeId === item?.typeId);

            if (vanillaFoodItem) {
                const nutrition = vanillaFoodItem.nutrition;
                const saturation = vanillaFoodItem.vanillaSaturation;

                // Convert saturation to a whole number (adjust multiplier if needed)
                const saturationConverted = Math.round(saturation * 10);

                // Calculate the number of full and half icons for saturation
                const fullSaturationIcons = Math.floor(saturationConverted / 2);
                const remainingHalfIcon = saturationConverted % 2 === 1 ? halfSaturationIcon : '';

                // Construct the saturation lore string
                const saturationLoreString = fullSaturationIcon.repeat(fullSaturationIcons) + remainingHalfIcon;

                const nutritionConverted = Math.round(nutrition * 10);

                // Calculate the number of full and half icons for saturation
                const fullNutritionIcons = Math.floor(nutrition / 2);
                const remainingNutritionHalfIcon = nutritionConverted % 2 === 0 ? halfNutritionIcon : '';

                // Construct the saturation lore string
                const nutritionLoreString = fullNutritionIcon.repeat(fullNutritionIcons) + remainingNutritionHalfIcon;


                // Use full or half icon based on the decimal value for nutrition
                const hungerIcon = nutrition >= 1 ? fullNutritionIcon : halfNutritionIcon; // Adjust condition for full icon

                const loreForNutrition = getHungerBarLore(nutritionConverted, nutritionLoreString, '');
                const loreForSaturation = getHungerBarLore(saturationConverted, saturationLoreString, ''); // Use saturationLoreString directly

                item?.setLore([loreForNutrition, loreForSaturation]);
            } else {
                // Check for custom item properties (replace with your custom property names)
                const customNutrition = item?.getComponent('food')?.nutrition;
                const customSaturation = item?.getComponent('food')?.saturationModifier;

                if (customNutrition && customSaturation) {
                    const nutrition = item?.getComponent('food')?.nutrition;
                    const saturation = item?.getComponent('food')?.saturationModifier;

                    // Convert saturation to a whole number (adjust multiplier if needed)
                    const saturationConverted = Math.round(saturation * 10);

                    // Calculate the number of full and half icons for saturation
                    const fullSaturationIcons = Math.floor(saturationConverted / 2);
                    const remainingHalfIcon = saturationConverted % 2 === 1 ? halfSaturationIcon : '';

                    // Construct the saturation lore string
                    const saturationLoreString = fullSaturationIcon.repeat(fullSaturationIcons) + remainingHalfIcon;

                    const nutritionConverted = Math.round(nutrition * 10);

                    // Calculate the number of full and half icons for saturation
                    const fullNutritionIcons = Math.floor(nutrition / 2);
                    const remainingNutritionHalfIcon = nutritionConverted % 2 === 1 ? halfNutritionIcon : '';

                    // Construct the saturation lore string
                    const nutritionLoreString = fullNutritionIcon.repeat(fullNutritionIcons) + remainingNutritionHalfIcon;


                    // Use full or half icon based on the decimal value for nutrition
                    const hungerIcon = nutrition >= 1 ? fullNutritionIcon : halfNutritionIcon; // Adjust condition for full icon

                    const loreForNutrition = getHungerBarLore(nutritionConverted, nutritionLoreString, '');
                    const loreForSaturation = getHungerBarLore(saturationConverted, saturationLoreString, ''); // Use saturationLoreString directly

                    item?.setLore([loreForNutrition, loreForSaturation]);
                }
            }

            inventory.setItem(slot, item);
        }
    })/////////////////
}, 20);