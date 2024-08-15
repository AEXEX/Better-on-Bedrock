import { world } from "@minecraft/server"

world.afterEvents.itemCompleteUse.subscribe(ev => {
    if (ev.itemStack.typeId == 'better_on_bedrock:enchanted_golden_carrot') {
        ev.source.runCommand('effect @p night_vision 30 2 true')
    }
    if (ev.itemStack.typeId == 'better_on_bedrock:resistance_potion') {
        ev.source.runCommand('effect @p resistance 60 3 true')
    }
})