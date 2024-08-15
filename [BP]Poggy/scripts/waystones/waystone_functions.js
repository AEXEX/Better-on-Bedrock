import { world, system, Player, EntityTypes, Block } from '@minecraft/server'
import { ActionFormData, ModalFormData } from '@minecraft/server-ui'

export function UI2(player, entity) {
   let level = player.runCommandAsync('xp 0 @s').level
   const warpMenu = new ActionFormData()

      .title('§l§5Waystone Menu')
      .body('To add another waystone, crouch and interact on the waystone.\n')
   const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
   for (let tag of warpTags) {
      warpMenu.button(`Waystone: §6${tag.match(/(?<=Warp:).*?(?=-)/)[0]}`);
   } if (warpTags.length > 0) {
      player.addTag('inUI');
      warpMenu.show(player).then((r) => {
         player.removeTag("inUI");
         if (r.canceled) return;
         let selectedWarp = warpTags[r.selection];
         let warpName = selectedWarp.match(/(?<=Warp:).*?(?=-)/)[0];
         const [entity] = player.dimension.getEntities({ tags: [`player:${player.name}`] })
         const form = new ActionFormData()
         form.title(`Waystone: §6${warpName}`)
         form.body('You are about to teleport to this Waystone. \n\nTeleporting to this waystone requires §e3 xp levels§r. \n\nIf you are teleporting across dimensions, it will cost §c6 xp levels.')
         form.button('§uTeleport to this Waystone')
         form.button('§6Remove this Waystone')
         player.addTag('inUI');
         form.show(player).then((r) => {
            player.removeTag('inUI');
            if (r.canceled) return;
            if (r.selection == 0 && !selectedWarp.includes('minecraft:')) {
               UI5(player)
            }


            if (r.selection == 0 && player.level >= 3) {

               if (selectedWarp.includes('minecraft:nether')) {
                  player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§anether!"}]}`);
                  let [, warpName, xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)

                  /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                    let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                    let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                 let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/

                  let d = 200;


                  player.teleport({ x: Number(xCord), y: Number(yCord), z: Number(zCord) }, { dimension: world.getDimension(waystoneDim) })
                  player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                  player.runCommandAsync('playsound block.waystone.teleport @p')
                  player.runCommandAsync(`effect @s nausea 0 255 true`);
                  player.runCommandAsync(`xp -3l @s`);
                  player.startItemCooldown('marker', 600);
                  //world.afterEvents.tick.unsubscribe(e);
               } else if (r.selection == 0 && player.level < 3) {
                  player.sendMessage("§cYou don't have enough levels");

               }
               else if (!selectedWarp.includes('minecraft:nether')) {
                  let [, warpName, xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)

                  /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                    let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                    let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                 let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/

                  let d = 200;


                  player.teleport({ x: Number(xCord), y: Number(yCord), z: Number(zCord) }, { dimension: world.getDimension(waystoneDim) })
                  player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                  player.runCommandAsync('playsound block.waystone.teleport @p')
                  player.runCommandAsync(`effect @s nausea 0 255 true`);
                  player.runCommandAsync(`xp -3l @s`);
                  player.startItemCooldown('marker', 600);
                  //world.afterEvents.tick.unsubscribe(e);
               } else if (r.selection == 0 && player.level < 3) {
                  player.sendMessage("§cYou don't have enough levels");

               }
            }

            else if (r.selection == 0 && level < 3) {
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have enough levels!"}]}`);
            }
            if (r.selection == 1) {
               player.removeTag(selectedWarp);
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aRemoved Waystone ${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
            }
         })
      })
   } else {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have no Waystones set! Add a Waystone by crouching and do not hold any items."}]}`);
      player.runCommandAsync(`playsound beacon.activate @s ~~~ 1 0.5`);
   }
}
export function UI4(player, entity) { //I think this is for the waystone menu
   player.addTag('inUI');
   let level = player.runCommandAsync('xp 0 @s').level
   const warpMenu = new ActionFormData()

      .title('§l§5Waystone Menu')
      .body('To add another waystone, crouch and interact on the waystone.\n')
   const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))
   for (let tag of warpTags) {
      warpMenu.button(`Waystone: §6${tag.match(/(?<=Warp:).*?(?=-)/)[0]}`);
   } if (warpTags.length > 0) {
      warpMenu.show(player).then((r) => {
         player.removeTag('inUI');
         if (r.canceled) return;
         let selectedWarp = warpTags[r.selection];
         let warpName = selectedWarp.match(/(?<=Warp:).*?(?=-)/)[0];
         const [entity] = player.dimension.getEntities({ tags: [`player:${player.name}`] })
         const form = new ActionFormData()
         form.title(`Waystone: §6${warpName}`)
         form.body('You are about to teleport to this Waystone. \n\nTeleporting to this waystone requires §e3 xp levels§r. \n\nIf you are teleporting across dimensions, it will cost §c6 xp levels.')
         form.button('§uTeleport to this Waystone')
         form.button('§6Remove this Waystone')
         player.addTag('inUI');
         form.show(player).then((r) => {
            player.removeTag('inUI');
            if (r.selection == 0 && !selectedWarp.includes('minecraft:')) {
               UI5(player)
            }


            if (r.selection == 0 && player.level >= 3) {

               if (selectedWarp.includes('minecraft:')) {
                  let [, warpName, xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)

                  /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                    let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                    let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                 let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/

                  let d = 200;


                  player.teleport({ x: Number(xCord), y: Number(yCord), z: Number(zCord) }, { dimension: world.getDimension(waystoneDim) })
                  player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                  player.runCommandAsync('playsound block.waystone.teleport @p')
                  player.runCommandAsync(`effect @s nausea 0 255 true`);
                  player.runCommandAsync(`xp -3l @s`);
                  player.startItemCooldown('marker', 600);
                  //world.afterEvents.tick.unsubscribe(e);
               } else if (r.selection == 0 && player.level < 3) {
                  player.sendMessage("§cYou don't have enough levels");

               }
               else if (!selectedWarp.includes('minecraft')) {
                  let [, warpName, xCord, yCord, zCord, waystoneDim] = selectedWarp.match(/(?:Warp:)(.*?)-((?:-|)\d+)\|((?:-|)\d+)\|((?:-|)\d+)\|(minecraft:.+)/)

                  /*let xCord = selectedWarp.match(/(?<=-).*?(?=\|)/)[0];
                    let yCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                    let zCord = selectedWarp.match(/(?<=\|).*?(?=\|)/)[0];
                 let waystoneDim = selectedWarp.match(/[^\|]*$/)[0];*/

                  let d = 200;


                  player.teleport({ x: Number(xCord), y: Number(yCord), z: Number(zCord) }, { dimension: world.getDimension(waystoneDim) })
                  player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aTeleported to Waystone §e${warpName}!"}]}`);
                  player.runCommandAsync('playsound block.waystone.teleport @p')
                  player.runCommandAsync(`effect @s nausea 0 255 true`);
                  player.runCommandAsync(`xp -3l @s`);
                  player.startItemCooldown('marker', 600);
                  //world.afterEvents.tick.unsubscribe(e);
               } else if (r.selection == 0 && player.level < 3) {
                  player.sendMessage("§cYou don't have enough levels");

               }
            }

            else if (r.selection == 0 && player.level < 3) {
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have enough levels!"}]}`);
            }
            if (r.selection == 1) {
               player.runCommand('tag @a remove "' + selectedWarp + '"')
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aRemoved Waystone ${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
            }
         })
      })
   } else {
      UI3(player)
   }
}

function UI5(player, entity) { //This is the confirm screen
   let level = player.runCommandAsync('xp 0 @s').level
   const warpMenu = new ActionFormData()
      .title('§l§cError')
      .body('§cCould not teleport to the waystone. Reason:\n\n§eThe waystone uses the old system.\n\n§cTo update the waystone to the new system, go to its location and remove the waystone and save it again! You can find the waystone location in the player tag list via §e/tag @s add, §cand looking for "Warp:".\n\n§lDO NOT REMOVE ANY TAGS AS IT WILL BREAK THE ADD-ON!')
      .button('Ok')
      .show(player).then((r) => {
         if (r.selection == 0) {
         }
      })
}
/**
 * @param { Player } player 
 * @param { Block } block 
 */
export function UI3(player, block) { //This UI is used to prompt the Add Waystone UI

   const addStone = new ModalFormData()
   const getBlockLocation = player.getBlockFromViewDirection()?.block;;
   const warpTags = player.getTags().filter(v => v.startsWith('Warp:'))

   addStone.title('§l§aAdd a Waystone')
   addStone.textField('§6§6Enter the name of your Waystone\n\n§7If this field is not filled, the name of the Waystone will be "Default".\n\nIf a name is the same as a current Waystone, the old Waystone will be overwritten.\n\n§7You have §c' + warpTags.length + '/25 Waystones set.', '   ')
   addStone.toggle("Global Waystone")
   addStone.show(player).then((r) => {
      let [textField, toggle
      ] = r.formValues
      player.removeTag('inUI');
      if (r.canceled) return;

      let warpName = r?.formValues[0];
      var test = `Warp:${warpName}-${getBlockLocation.x}|${getBlockLocation.y}|${getBlockLocation.z}|${player.dimension.id}`
      var test_above = `Warp:${warpName}-${getBlockLocation.x}|${getBlockLocation.y - 1}|${getBlockLocation.z}|${player.dimension.id}`

      if (warpName == '') warpName = 'Default';
      if (warpName.toLowerCase() == 'warp') warpName += 'ing';
      if (toggle == false) {
         if (warpTags.find(v => v.includes(warpName))) {
            if (getBlockLocation.permutation.getState('pog:tobBit') == false) {
               player.removeTag(warpTags.find(v => v.includes(warpName)));
               player.addTag(test)
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.setPermutation(getBlockLocation.permutation.withState("pog:activated", true))
               getBlockLocation.above(1).setPermutation(getBlockLocation.permutation.withState("pog:activated", true))
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate ${getBlockLocation.location.x} ${getBlockLocation.location.y - 1} ${getBlockLocation.location.z}`)
            }

         } else if (warpTags.length >= 25) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have the max amount of Waystones set already!"}]}`);
            player.runCommandAsync(`playsound beacon.activate @s ~~~ 1 0.5`);
         } else {

            if (getBlockLocation.permutation.getState('pog:tobBit') == true) {
               getBlockLocation.setPermutation(getBlockLocation.permutation.withState("pog:activated", true))
               getBlockLocation.below(1).setPermutation(getBlockLocation.permutation.withState("pog:activated", true))
               getBlockLocation.below(1).setPermutation(getBlockLocation.permutation.withState("pog:tobBit", false))
               player.addTag(test_above)
               console.log('particle spawned')
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate ${getBlockLocation.location.x} ${getBlockLocation.location.y - 1} ${getBlockLocation.location.z}`)
            } else if (getBlockLocation.permutation.getState('pog:tobBit') == false) {
               getBlockLocation.setPermutation(getBlockLocation.permutation.withState("pog:activated", true))
               getBlockLocation.above(1).setPermutation(getBlockLocation.permutation.withState("pog:activated", true))
               getBlockLocation.above(1).setPermutation(getBlockLocation.permutation.withState("pog:tobBit", true))
               console.log('particle spawned')
               player.addTag(test)
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate ${getBlockLocation.location.x} ${getBlockLocation.location.y} ${getBlockLocation.location.z}`)
            }
            if (getBlockLocation.typeId == "better_on_bedrock:waystone") {
               getBlockLocation.setPermutation(getBlockLocation.permutation.withState("pog:activated", true))
               console.log('particle spawned')
               player.addTag(test)
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate ${getBlockLocation.location.x} ${getBlockLocation.location.y} ${getBlockLocation.location.z}`)
            }
         }
      }
      if (toggle == true) {

         if (warpTags.find(v => v.includes(warpName))) {
            if (getBlockLocation.permutation.getState('pog:tobBit') == false) {
               player.removeTag(warpTags.find(v => v.includes(warpName)));
               player.runCommand('tag @a add "' + test + '"')
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.setPermutation(getBlockLocation.permutation.withState("pog:activatedAsGlobal", true))
               getBlockLocation.above(1).setPermutation(getBlockLocation.permutation.withState("pog:activatedAsGlobal", true))
               getBlockLocation.above(1).setPermutation(getBlockLocation.permutation.withState("pog:tobBit", false))
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate_global ${getBlockLocation.location.x} ${getBlockLocation.location.y + 1} ${getBlockLocation.location.z}`)
            }

         } else if (warpTags.length >= 25) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have the max amount of Waystones set already!"}]}`);
            player.runCommandAsync(`playsound beacon.activate @s ~~~ 1 0.5`);
         } else {

            if (getBlockLocation.permutation.getState('pog:tobBit') == true) {
               getBlockLocation.setPermutation(getBlockLocation.permutation.withState("pog:activatedAsGlobal", true))
               getBlockLocation.below(1).setPermutation(getBlockLocation.permutation.withState("pog:activatedAsGlobal", true))
               getBlockLocation.below(1).setPermutation(getBlockLocation.permutation.withState("pog:tobBit", false))
               player.runCommand('tag @a add "' + test_above + '"')
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate_global ${getBlockLocation.location.x} ${getBlockLocation.location.y - 1} ${getBlockLocation.location.z}`)
               player.runCommand('tag @a add "' + test + '"')
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate_global ${getBlockLocation.location.x} ${getBlockLocation.location.y - 1} ${getBlockLocation.location.z}`)
            }
            if (getBlockLocation.permutation.getState('pog:tobBit') == false) {
               getBlockLocation.setPermutation(getBlockLocation.permutation.withState("pog:activatedAsGlobal", true))
               getBlockLocation.above(1).setPermutation(getBlockLocation.permutation.withState("pog:activatedAsGlobal", true))
               getBlockLocation.above(1).setPermutation(getBlockLocation.permutation.withState("pog:tobBit", true))
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate_global ${getBlockLocation.location.x} ${getBlockLocation.location.y} ${getBlockLocation.location.z}`)
               player.runCommand('tag @a add "' + test + '"')
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate_global ${getBlockLocation.location.x} ${getBlockLocation.location.y} ${getBlockLocation.location.z}`)
            }
            if (getBlockLocation.typeId == "better_on_bedrock:waystone") {
               getBlockLocation.setPermutation(getBlockLocation.permutation.withState("pog:activatedAsGlobal", true))
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate_global ${getBlockLocation.location.x} ${getBlockLocation.location.y} ${getBlockLocation.location.z}`)
               player.runCommand('tag @a add "' + test + '"')
               player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aSet Waystone to: §e${warpName}!"}]}`);
               player.playSound(`block.waystone.activate`, { location: getBlockLocation.location })
               getBlockLocation.dimension.runCommandAsync(`particle pog:waystone_activate_global ${getBlockLocation.location.x} ${getBlockLocation.location.y} ${getBlockLocation.location.z}`)
            }
         }

      }
   })
}