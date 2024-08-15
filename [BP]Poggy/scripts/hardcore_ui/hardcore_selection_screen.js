import { world } from "@minecraft/server"
import { ModalFormData } from "@minecraft/server-ui"

function hardcoreUI(player, ui = undefined) {
  if (!ui) ui = uiForHardcore(player);
  ui.show(player).then(response => {

    let [toggle1, toggle2, toggle3, toggle4, slider] = response.formValues

    if (toggle1 == true) {
      player.removeTag("allow_corpse")
      player.sendMessage("§eAllow Corpse: §aEnabled")
    } else if (toggle1 == false) {
      player.sendMessage("§eAllow Corpse: §cDisabled")
      player.addTag("allow_corpse")
    }
    if (toggle2 == true) {
      player.removeTag("toolTip")
      player.sendMessage("§eWhat's That UI: §aEnabled")
    } else if (toggle2 == false) {
      player.sendMessage("§eWhat's That UI: §cDisabled")
      player.addTag("toolTip")
    }
    if (toggle3 == true) {
      player.addTag("endFog")
      player.sendMessage("§eEnd Biome Fog: §aEnabled")
    } else if (toggle3 == false) {
      player.sendMessage("§eEnd Biome Fog: §cDisabled")
      player.removeTag("endFog")
      player.removeTag('abyssal')
      player.removeTag('vacant')
      player.removeTag('shroom')
      player.removeTag('void')
      player.removeTag('chorus')
      player.runCommandAsync(`fog @p remove test`)
    }
    if (toggle4 == true) {
      player.removeTag("fallenLeaves")
      player.sendMessage("§eFalling Leaves: §aEnabled")
    } else if (toggle4 == false) {
      player.sendMessage("§eFalling Leaves: §cDisabled")
      player.addTag("fallenLeaves")
    }
    if (slider == slider) {

      player.sendMessage(`§cPlayers required to sleep: §a${response.formValues[3]}`)
      player.runCommandAsync(`gamerule playerssleepingpercentage ${response.formValues[3]}`)
    }
  });
}

export function uiForHardcore(player) {
  let form = new ModalFormData()
  form.title("Add-On Config")
  form.toggle("Corpse On Death - Enables Player Corpse", !player.hasTag('allow_corpse'))
  form.toggle("What Block Is This? [UI] - Enables the 'WAILA' UI", !player.hasTag('toolTip'))
  form.toggle("End Biome Fog - Enables fog for End biomes", player.hasTag('endFog'))
  form.toggle("Falling Leaves - Disable for low-end devices", !player.hasTag('fallenLeaves'))
  form.slider("Required players to sleep", 1, 10, 1)
  form.show(player).then(response => {
    if (!response.formValues) return
    let [toggle1, toggle2, toggle3, toggle4, slider] = response.formValues

    if (toggle1 == true) {
      player.removeTag("allow_corpse")
      player.sendMessage("§eAllow Corpse: §aEnabled")
    } else if (toggle1 == false) {
      player.sendMessage("§eAllow Corpse: §cDisabled")
      player.addTag("allow_corpse")
    }
    if (toggle2 == true) {
      player.removeTag("toolTip")
      player.sendMessage("§eWhat's That UI: §aEnabled")
    } else if (toggle2 == false) {
      player.sendMessage("§eWhat's That UI: §cDisabled")
      player.addTag("toolTip")
    }
    if (toggle3 == true) {
      player.addTag("endFog")
      player.sendMessage("§eEnd Biome Fog: §aEnabled")
    } else if (toggle3 == false) {
      player.sendMessage("§eEnd Biome Fog: §cDisabled")
      player.removeTag("endFog")
      player.removeTag('abyssal')
      player.removeTag('vacant')
      player.removeTag('shroom')
      player.removeTag('void')
      player.removeTag('chorus')
      player.runCommandAsync(`fog @p remove test`)
    }
    if (toggle4 == true) {
      player.removeTag("fallenLeaves")
      player.sendMessage("§eFalling Leaves: §aEnabled")
    } else if (toggle4 == false) {
      player.sendMessage("§eFalling Leaves: §cDisabled")
      player.addTag("fallenLeaves")
    }
    if (slider == slider) {

      player.sendMessage(`§cPlayers required to sleep: §a${response.formValues[3]}`)
      player.runCommandAsync(`gamerule playerssleepingpercentage ${response.formValues[3]}`)
    }
  });
}

world.afterEvents.itemUse.subscribe((ev) => {
  if (ev.itemStack.typeId == 'better_on_bedrock:config') {
    uiForHardcore(ev.source);
  }
})

world.afterEvents.playerSpawn.subscribe((ev) => {
  if (!ev.initialSpawn) return;
  if (!ev.player.hasTag('gotConfig')) {
    ev.player.runCommandAsync('give @s better_on_bedrock:config')
    ev.player.addTag('gotConfig')
  }
  if (!ev.player.hasTag("selected") && !ev.player.hasTag("selected2")) {
    uiForHardcore(ev.player);
  }
}
);