import { full_map_data,full_data } from "../index.js"
import { terrain_mode } from "../mode_map_render.js"

let terrain_panelboard = document.getElementById("terrain_panelboard")
let btn = document.getElementById("terrain_save")
let init_btn = document.getElementById("terrain_initialize")
let terrain = null
let inp = terrain_panelboard.querySelectorAll("input[name='terrain']")

let check = function (e){
    terrain = document.querySelector("input[name='terrain']:checked").value
    // console.log(terrain)
}

for ( let radio of inp){
    radio.onchange = check
}



let terrain_color = {
    desert: [255,255,0],
    plains: [0,255,0],
    wetland: [218,112,214],
    mountain: [255,125,64],
    ocean:[0,0,255],
    lakes:[0,255,255],
    snow:[255,255,255],
    tundra:[255,192,203],
    savanna:[210,180,140],
    jungle:[0,255,127],
    hills:[188,143,143],
    forest:[61,145,64],
    
}

export {terrain_color,terrain}


btn.onclick = async function(e) {

    let text = "# Idk what and how it works, it just generated.\n"

    let terrain_map = full_map_data.terrain_map

    for ( let u=0,len=Object.keys(terrain_map).length;u<len;u++){
        let ter = Object.keys(terrain_map)[u]
        let provs = terrain_map[ter]
        for (let n=0,len=provs.length;n<len;n++)
            text += `${provs[n]}="${ter}"\n`
    }

    await fetch(
        "./upload",{
            method:"POST",
            body: JSON.stringify({
                "src":"outputs",
                "data":{
                    "province_terrains.txt":text
                }
            })
        }
    )
}

console.log(init_btn)

init_btn.onclick = function(e){
    full_map_data.terrain_map = {"plains":Object.keys(full_data.colormap)}
    full_map_data.terrain_map = {"plains":Object.keys(full_data.colormap),desert: [],
    wetland: [],
    mountain: [],
    ocean:[],
    lakes:[],
    snow:[],
    tundra:[],
    savanna:[],
    jungle:[],
    hills:[],
    forest:[]}
    console.log(full_map_data.terrain_map)
    full_map_data.terrain_data_lock = false
    terrain_mode()
}