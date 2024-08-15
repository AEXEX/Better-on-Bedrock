import { world, system } from "@minecraft/server";


world.afterEvents.worldInitialize.subscribe(
    (data) => {
        if (!world.getDynamicProperty("daysCount")) world.setDynamicProperty("daysCount", 1);
        system.runInterval(
            () => {
                if (world.getTimeOfDay() == 5) {
                    world.setDynamicProperty("daysCount", world.getDynamicProperty("daysCount") + 1)
                    let e = system.runInterval(() => {

                        world.sendMessage("§aDay: §u" + world.getDynamicProperty("daysCount"));
                        system.clearRun(e)
                    })
                };


            },
        )
    }
)