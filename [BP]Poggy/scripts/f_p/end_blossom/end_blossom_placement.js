import { world, system } from "@minecraft/server"

world.afterEvents.itemUseOn.subscribe(ev => {
    const block = ev.block
    const item = ev.itemStack
    const up = ev.blockFace
    if (up == 'Up' && item.typeId == 'better_on_bedrock:end_blossom_spore_head_item') {
        if (block.typeId === 'better_on_bedrock:upward_blossom_head' || block.typeId === 'better_on_bedrock:upward_blossom_stem') {
            block.above(1).setType('better_on_bedrock:upward_blossom_head')
            block.setType('better_on_bedrock:upward_blossom_stem')
        } else if (block.typeId !== 'better_on_bedrock:upward_blossom_head' || block.typeId !== 'better_on_bedrock:upward_blossom_stem') {
            block.above().setType('better_on_bedrock:upward_blossom_base')
            block.above(2).setType('better_on_bedrock:upward_blossom_head')
        }
    }
})