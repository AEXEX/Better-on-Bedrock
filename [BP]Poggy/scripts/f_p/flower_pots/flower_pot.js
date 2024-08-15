const isInRange = (value, min, max) => value >= min && value <= max;

export default class SelectionBoxes {
  /**
   * Allows you to define 3D areas in a block and get the box which the face selection lies within.
   *
   * @param {Object[]} boxes Array defining the 3D areas within a block which may be selected.
   * @param {[number, number, number]} boxes[].origin [X, Y, Z] array defining the offset of the box from the block's horizontal middle and vertical bottom in pixels, extending from the north-east.
   * @param {[number, number, number]} boxes[].size [X, Y, Z] array defining the size of the box in pixels, extending from the north-east.
   * @param {string} [boxes[].name] Custom name to easily identify this box when it is selected.
   */
  constructor(...boxes) {
    this.boxes = boxes;
  }
  /**
   * Get the box which the `faceLocation` lies within.
   *
   * @param {Record<"x" | "y" | "z", number>} faceLocation Selection location relative to the bottom north-west corner of the block.
   *
   * @param {Object} [options] Optionally configure how the selected box is calculated.
   * @param {boolean} [options.invertX] X axis extends `west -> east` rather than `east -> west` if true, following [Blockbench](https://blockbench.net)'s displayed positions.
   * @param {boolean} [options.invertY] Y axis extends `up -> down` rather than `down -> up` if true.
   * @param {boolean} [options.invertZ] Z axis extends `south -> north` rather than `north -> south` if true.
   *
   * @returns {(string|number|undefined)} Selected box name, or box index if a name is not provided. If no boxes apply to the selection, `undefined` is returned.
   */
  getSelected(faceLocation, options) {
    // Create a new object so the original is not mutated
    let location = { ...faceLocation };

    // X is inverted to ensure measurements are relative to the bottom north-east.
    if (!options?.invertX) location.x = 1 - location.x;
    if (options?.invertY) location.y = 1 - location.y;
    if (options?.invertZ) location.z = 1 - location.z;

    for (let i = 0; i < this.boxes.length; i++) {
      const box = this.boxes[i];

      const origin = {
        x: box.origin[0] + 8,
        y: box.origin[1],
        z: box.origin[2] + 8,
      };

      const inXRange = isInRange(location.x, origin.x / 16, (origin.x + box.size[0]) / 16);
      const inYRange = isInRange(location.y, origin.y / 16, (origin.y + box.size[1]) / 16);
      const inZRange = isInRange(location.z, origin.z / 16, (origin.z + box.size[2]) / 16);

      if (inXRange && inYRange && inZRange) return box.name ?? i;
    }
  }
}



import { world, ItemStack } from "@minecraft/server";

// Support orientation along both horizontal axes
export const pots = {
  x: new SelectionBoxes({ origin: [-4.5, 0, -4.5], size: [9, 16, 9] }, { origin: [-4.5, 0, -4.5], size: [9, 16, 9] }),
  z: new SelectionBoxes({ origin: [-4.5, 0, -4.5], size: [9, 16, 9] }, { origin: [-4.5, 0, -4.5], size: [9, 16, 9] }),
};

// The state value and sound associated with each plant
export const plants = {
  "better_on_bedrock:rose_bush": {
    value: "rose_bush",
    sound: "dig.grass_block",
  },
  "better_on_bedrock:sunflower": {
    value: "sunflower",
    sound: "dig.gravel",
  },
  "better_on_bedrock:syringa": {
    value: "syringa",
    sound: "dig.gravel",
  },
  "better_on_bedrock:paeonia": {
    value: "paeonia",
    sound: "dig.gravel",
  },

  "minecraft:allium": {
    value: "allium",
    sound: "dig.gravel",
  },
  "minecraft:cornflower": {
    value: "cornflower",
    sound: "dig.gravel",
  },
  "minecraft:blue_orchid": {
    value: "flower_blue",
    sound: "dig.gravel",
  },
  "minecraft:azure_bluet": {
    value: "houstinia",
    sound: "dig.gravel",
  },
  "minecraft:lily_of_the_valley": {
    value: "lilly",
    sound: "dig.gravel",
  },
  "minecraft:orange_tulip": {
    value: "orange_tulip",
    sound: "dig.gravel",
  },
  "minecraft:poppy": {
    value: "blue_rose",
    sound: "dig.gravel",
  },
  "minecraft:oxeye_daisy": {
    value: "oxeye",
    sound: "dig.gravel",
  },
  "minecraft:red_tulip": {
    value: "red_tulip",
    sound: "dig.gravel",
  },
  "minecraft:pink_tulip": {
    value: "red_tulip",
    sound: "dig.gravel",
  },
  "minecraft:syringa": {
    value: "syringa",
    sound: "dig.gravel",
  },
  "minecraft:white_tulip": {
    value: "white_tulip",
    sound: "dig.gravel",
  },
};

// Get the selected pot for the appropriate axis
export const pot = 0
export const getSelectedPot = (e) => pots[e.block.permutation.getState("wiki:axis")].getSelected(e.faceLocation);

export const isPotOccupied = (block, pot) => block.permutation.getState(`wiki:pot_0_plant`) !== "none";

export const setPotPlant = (block, pot, plant) => block.setPermutation(block.permutation.withState(`wiki:pot_0_plant`, plant));

// Our flower pots even have sound effects!
export const playPlantSound = (dimension, location, sound) => dimension.runCommand(`playsound ${sound} @a ${location.x} ${location.y} ${location.z} 0.5`);

// If a pot is not selected (the inbetween area is targeted) or is already filled, the item use is cancelled.
world.beforeEvents.itemUseOn.subscribe((e) => {
  if (e.block.typeId !== "better_on_bedrock:hanging_pot_base" || !plants[e.itemStack.typeId]) return;

  const selectedPot = getSelectedPot(e);

  if (selectedPot === undefined || isPotOccupied(e.block, selectedPot)) e.cancel = true;
});

// -------------------------------
//    Plant in the selected pot
// -------------------------------
world.afterEvents.itemUseOn.subscribe((e) => {

  if (e.block.typeId !== "better_on_bedrock:hanging_pot_base" || !plants[e.itemStack.typeId] || e.source.isSneaking) return;

  const selectedPot = getSelectedPot(e);
  const plant = plants[e.itemStack.typeId];

  setPotPlant(e.block, selectedPot, plant.value);
  playPlantSound(e.block.dimension, e.block.location, plant.sound);
});

// -------------------------------
//  Release plants on destruction
// -------------------------------
function releaseOnUse(block) {
  const states = block.permutation.getAllStates();

  // Array of plant state values e.g. ["cactus", "dandelion"]
  const storedPlants = Object.entries(states)
    .filter(([state, value]) => state.startsWith("wiki:pot") && value !== "none")
    .map(([state, value]) => value);



  if (storedPlants.length === 0) return;

  // Centre loot in block
  const lootLocation = {
    x: block.location.x + 0.5,
    y: block.location.y + 0.5,
    z: block.location.z + 0.5,
  };

  // Create an item entity for every potted plant
  for (const plant of storedPlants) {
    const plantId = Object.keys(plants).find((key) => plants[key].value === plant);

    block.dimension.spawnItem(new ItemStack(plantId), lootLocation);
  }
}
function releasePlants(e) {
  const states = (e.brokenBlockPermutation ?? e.explodedBlockPermutation).getAllStates();

  // Array of plant state values e.g. ["cactus", "dandelion"]
  const storedPlants = Object.entries(states)
    .filter(([state, value]) => state.startsWith("wiki:pot") && value !== "none")
    .map(([state, value]) => value);



  if (storedPlants.length === 0) return;

  // Centre loot in block
  const lootLocation = {
    x: e.block.location.x + 0.5,
    y: e.block.location.y + 0.5,
    z: e.block.location.z + 0.5,
  };

  // Create an item entity for every potted plant
  for (const plant of storedPlants) {
    const plantId = Object.keys(plants).find((key) => plants[key].value === plant);

    e.dimension.spawnItem(new ItemStack(plantId), lootLocation);
    playPlantSound(e.dimension, e.block.location, plants[plantId].sound);
  }


}

world.afterEvents.playerBreakBlock.subscribe((e) => {
  if (e.brokenBlockPermutation.type.id === "better_on_bedrock:hanging_pot_base") releasePlants(e);
});
world.afterEvents.blockExplode.subscribe((e) => {
  if (e.explodedBlockPermutation.type.id === "better_on_bedrock:hanging_pot_base") releasePlants(e);
});

world.afterEvents.itemUseOn.subscribe(({ block, source, itemStack }) => {
  if (block.type.id === "better_on_bedrock:hanging_pot_base" && itemStack.typeId == 'minecraft:shears') {
    releaseOnUse(block)
    block.setPermutation(block.permutation.withState(`wiki:pot_0_plant`, 'none'))
    source.playSound("mob.sheep.shear", { location: block.location })
  }
})
