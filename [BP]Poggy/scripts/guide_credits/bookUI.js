import { world, system } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

world.afterEvents.itemUse.subscribe(ev => {
    if (ev.itemStack.typeId == 'better_on_bedrock:lost_journal') {
        infoBookUI(ev.source)
    }
})


export function infoBookUI(player) {
    const form = new ActionFormData();
    form.title("Info Boosk!")
    form.body("Welcome to the info book! Here you will find important information regarding Better on Bedrock");
    form.button("Contributions", "textures/items/emerald");
    form.button("Progression", "textures/items/iron_pickaxe");
    form.button("End Eyes", "textures/items/ender_eye");
    form.button("Staffs", "textures/items/staffs/staff_of_the_seas");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    credits(player)
                    break;
                case 1:
                    progression(player)
                    break;
                case 2:
                    eyes(player)
                    break;
                case 3:
                    staffs(player)
                    break;
            }
        },
    );
}

export function credits(player) {
    const form = new ActionFormData();
    form.title("Info Book!")
    form.body("--Music--\n- J. Rivers\n- Patchy the fox\n\n--Trees--\n- exsilit\n- Poggy\n\n--Sfx--\n- Patchy the fox\n\n--Animations--\n- Patchy the fox\n\n--Textures and Models--\n- Zifix\n- ToilsomeGotat\n- Izagam1\n- PenguinThold\n- Grimm\n- Yannasakanna\n- Poggy\n- Creepager16\n- Hachuden\n\n--World Generation Help--\n- Xorkent\n- Elektrika\n- Ciosciaa\n\n--UI--\n- LeGend077\n\n--Bug Hunter--\n- HeyIt'sBugs\n\n--Script Fixes--\n- DJ Stomp\n- xKingDark\n\n--Structures--\n- Poggy\n- Patchy the fox\n- Cude\n- JacktheWolf\n- Pan\n- BugTonyMC (YT)\n- KingZee (YT)\n- Mechitecy (YT)\n- KoalaBuilds (YT)\n- Nanaroid (YT)\n\n--Encyhanted Mobs--\n- Xorkent\n\n--Code & Dev--\n- Poggy\n\nBetter on Bedrock is proudly owned by Poggy (XxPoggyisLitxX)");
    form.button("Ok");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
}

export function progression(player) {
    const form = new ActionFormData();
    form.title("Info Book!")
    form.body("--Tool Progression--\nBetter on Bedrock has changed vanilla's progression, mainly for tools like the axe and pickaxe. This was done for players to spend more time early game and prevent players from rushing straight to iron or diamond.\n\nThe progression isn't that complex. For instance, you need a stone pickaxe to mine copper ore, and a copper pickaxe to mine iron ore.\n\nThis ensure the player goes through every pickaxe or axe tier. With this, your first set of quests will guide you on this change!\n\nThe Forger is require for tool progression.");
    form.button("Ok");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
}

export function eyes(player) {
    const form = new ActionFormData();
    form.title("Info Book!")
    form.body("--End Progression--\nBetter on Bedrock changed the way player obtain Eyes of Ender. Players require to defeat every boss within the Overworld and Nether. These bosses will drop their eye upon defeat. Player require 5 of these eyes to craft 16 Eyes of Ender.\n\nThis change forces players to explore and to preapre themselves for each boss because they ain't easy!\n\nPlayers will be rewarded with a trophy and sometimes a usefull boss item.\n\nThe following Bosses drops their eye: Willager, Enchantaegis, Flender, Inferior, and Withered Samurai.\n\n --Where do they spawn?--\n\n Well, the Willagerm Flender and Enchantaegis all spawn in the Overworld, but they are really rare to find, but not too rare!\n\nThe 2 Nether bosses spawn all over the Nether, also a bit rare, but was made a bit common to find! They won't go down easy without a fight!");
    form.button("Ok");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
}

export function staffs(player) {
    const form = new ActionFormData();
    form.title("Info Book!")
    form.body("--Staffs--\nBetter on Bedrock adds a few magic staffs which can help players in combat. These staffs are craftabale, but they require a rune. These runes can be bought from a wizard somewhere in the Taiga biome.\n\n--§cWARNING§f--\n§cWhen wanting to use the Ice Breath attack, you have to be at least 4 blocks away from the target you're looking at due to bedrock limitations.§f\n\n--How to use--\nIn order for a staff to work, the player has to have a rune in their offhand. The rune has to match the staff.\n\nThe player can use the staff by using it like a bow.\n\n--Upgraded Runes--\nThey work the same as regular runes, but they grant an extra main attack. For the Ice Staff, it has a second attack when the player sneaks.");
    form.button("Ok");

    form.show(player).then(
        (response) => {
            switch (response?.selection) {
                case 0:
                    break;
                case 1:
                    break;
            }
        },
    );
}