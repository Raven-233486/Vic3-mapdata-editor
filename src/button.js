import {jomini,full_map_data,full_data,raw_map_data,config} from "./index.js"
import {justwrite} from "./write.js"

let dump_button = document.getElementById("save")
let convert_button = document.getElementById("convert")


const preprocess = (map,header) => {
    let data = map[header]
    for (let state=Object.keys(data),i=state.length;i--;){
        let name = state[i]
        for (let state_region=Object.keys(data[name]),j=state_region.length;j--;){
            if (name == "if") continue
            let full_name = name +"." +state_region[j].replace(":",":c:")
            if (!full_data.statepointmap[full_name]){
                console.log("delete empty scope",header,full_name)
                delete map[header][name][state_region[j]]
            }
        }
        if (!Object.keys(data[name])){
            delete map[header][name]
        }
    }
    return map

}



dump_button.onclick = async function(e) {
    if (!config["mod_name"]){
        await default_upload(e)
    } else {
        await mod_upload(e)
    }
    
}

const default_upload = async function(e) {

    let pops_map = preprocess(full_map_data.pops_map,"POPS")
    let buildings_map = preprocess(full_map_data.buildings_map,"BUILDINGS")
    
    let history_state_write = jomini.write(
        (writer) => {
            justwrite(writer,full_map_data.history_state_dict,["add_claim","create_state","state_type","add_homeland"],[])
        }
    )
    
    let state_regions_map_write = jomini.write(
        (writer) => {
            justwrite(writer,full_map_data.state_regions_map,["resource"],[
                "subsistence_building","provinces",
                "city","port","farm","mine","wood",
                "type","depleted_type"])
        }
    )

    let strategic_regions_map_write = jomini.write(
        (writer) => {
            justwrite(writer,full_map_data.strategic_regions_map,[],["graphical_culture"])
        }
    )

    let buildings_map_write = jomini.write(
        (writer) => {
            justwrite(writer,buildings_map,["create_building","if"],["building","activate_production_methods"])
        }
    )

    let pops_map_write = jomini.write(
        (writer) => {
            justwrite(writer,pops_map,["create_pop","if"])
        }
    )


    

    await fetch(
        "./upload",{
            method:"POST",
            body: JSON.stringify({
                "src":"outputs",
                "data":{
                    "00_states.txt":new TextDecoder().decode(history_state_write).replaceAll("  ","\t").replaceAll("="," = "),
                    "01_state_regions.txt":new TextDecoder().decode(state_regions_map_write).replaceAll("  ","\t").replaceAll("="," = "),
                    "02_strategic_regions.txt":new TextDecoder().decode(strategic_regions_map_write).replaceAll("  ","\t").replaceAll("="," = "),
                    "04_buildings.txt":new TextDecoder().decode(buildings_map_write).replaceAll("  ","\t").replaceAll("="," = "),
                    "05_pops.txt":new TextDecoder().decode(pops_map_write).replaceAll("  ","\t").replaceAll("="," = ")
                }
            })
        }
    )
}

const reverse_dict_map = (dict_map,tree_map,header=null) => {
    let readed_keys = []
    for (let tree_keys=Object.keys(tree_map),i=tree_keys.length;i--;){
        let tree_key = tree_keys[i]
        if (header){
            for (let item_keys=Object.keys(tree_map[tree_key][header]),j=item_keys.length;j--;){
                let item_key = item_keys[j]
                if (dict_map[header][item_key]){
                    tree_map[tree_key][header][item_key] = dict_map[header][item_key]
                    readed_keys.push(item_key)
                } else {
                    delete tree_map[tree_key][header][item_key]
                }
            }
        } else {
            for (let item_keys=Object.keys(tree_map[tree_key]),j=item_keys.length;j--;){
                let item_key = item_keys[j]
                if (dict_map[item_key]){
                    tree_map[tree_key][item_key] = dict_map[item_key]
                    readed_keys.push(item_key)
                } else {
                    delete tree_map[tree_key][item_key]
                }
            }
        }
    }
    if (header){
        for (let rest_keys=Object.keys(dict_map[header]),k=rest_keys.length;k--;){
            let rest_key = rest_keys[k]
            if (readed_keys.indexOf(rest_key)<0){
                if (!tree_map["99 new file.txt"]) tree_map["99 new file.txt"] = {[header]:{}}
                tree_map["99 new file.txt"][header][rest_key] = dict_map[header][rest_key]
            }
        }
    }
    else {
        for (let rest_keys=Object.keys(dict_map),k=rest_keys.length;k--;){
            let rest_key = rest_keys[k]
            if (readed_keys.indexOf(rest_key)<0){
                if (!tree_map["99 new file.txt"]) tree_map["99 new file.txt"] = {}
                tree_map["99 new file.txt"][rest_key] = dict_map[rest_key]
            }
        }
    }
    
    return tree_map
}


const mod_upload = async function(e) {

    let pops_map = preprocess(full_map_data.pops_map,"POPS")
    let buildings_map = preprocess(full_map_data.buildings_map,"BUILDINGS")

    console.log(full_map_data.history_state_dict,raw_map_data.history_state)
    let history_tree = reverse_dict_map(full_map_data.history_state_dict,raw_map_data.history_state,"STATES")
    console.log(history_tree)

    let state_regions_tree = reverse_dict_map(full_map_data.state_regions_map,raw_map_data.state_regions)
    let strategic_regions_tree = reverse_dict_map(full_map_data.strategic_regions_map,raw_map_data.strategic_regions)
    let pops_tree = reverse_dict_map(pops_map,raw_map_data.pops,"POPS")
    let buildings_tree = reverse_dict_map(buildings_map,raw_map_data.buildings,"BUILDINGS")

    
    for (let keys = Object.keys(history_tree), i = keys.length; i--;) {
        let key = keys[i]
        history_tree[key] = new TextDecoder().decode(
            jomini.write((writer) => {
                justwrite(writer, history_tree[key],
                ["add_claim", "create_state", "state_type", "add_homeland"], [])})
        ).replaceAll("  ", "\t").replaceAll("=", " = ")
    }
    
    
    for (let keys = Object.keys(state_regions_tree), i = keys.length; i--;) {
        let key = keys[i]
        state_regions_tree[key] = new TextDecoder().decode(
            jomini.write((writer) => {
                justwrite(writer, state_regions_tree[key],
                ["resource"], [
                "subsistence_building", "provinces",
                "city", "port", "farm", "mine", "wood",
                "type", "depleted_type"])})
        ).replaceAll("  ", "\t").replaceAll("=", " = ")
    }
    
    for (let keys = Object.keys(strategic_regions_tree), i = keys.length; i--;) {
        let key = keys[i]
        strategic_regions_tree[key] = new TextDecoder().decode(
            jomini.write((writer) => {
                justwrite(writer, strategic_regions_tree[key],
                [], ["graphical_culture"])})
        ).replaceAll("  ", "\t").replaceAll("=", " = ")
    }
    
    for (let keys = Object.keys(buildings_tree), i = keys.length; i--;) {
        let key = keys[i]
        buildings_tree[key] = new TextDecoder().decode(
            jomini.write((writer) => {
                justwrite(writer, buildings_tree[key],
                ["create_building","if"], ["building", "activate_production_methods"])})
        ).replaceAll("  ", "\t").replaceAll("=", " = ")
    }
    
    for (let keys = Object.keys(pops_tree), i = keys.length; i--;) {
        let key = keys[i]
        pops_tree[key] = new TextDecoder().decode(
            jomini.write((writer) => {
                justwrite(writer, pops_tree[key],
                ["create_pop","if"])})
        ).replaceAll("  ", "\t").replaceAll("=", " = ")

    }

    await fetch(
        "./upload?mod=yes",{
            method:"POST",
            body: JSON.stringify({
                "src":"common/history/states",
                "data":history_tree
            })
        }
    )

    await fetch(
        "./upload?mod=yes",{
            method:"POST",
            body: JSON.stringify({
                "src":"map_data/state_regions",
                "data":state_regions_tree
            })
        }
    )

    await fetch(
        "./upload?mod=yes",{
            method:"POST",
            body: JSON.stringify({
                "src":"common/strategic_regions",
                "data":strategic_regions_tree
            })
        }
    )

    await fetch(
        "./upload?mod=yes",{
            method:"POST",
            body: JSON.stringify({
                "src":"common/history/buildings",
                "data":buildings_tree
            })
        }
    )

    await fetch(
        "./upload?mod=yes",{
            method:"POST",
            body: JSON.stringify({
                "src":"common/history/pops",
                "data":pops_tree
            })
        }
    )
    
}




const check_impassable = document.getElementById("check_impassable")

check_impassable.onclick = function (e){ // onclick?
    full_data.provs_name
}

let set_mod_path = document.getElementById("set_mod_path")
set_mod_path.onclick = async function(e){
    if (document.getElementById("check_is_mod").checked){
        await window.showDirectoryPicker(
            {startIn:"documents"}
          ).then(async (entry) => {
              config["mod_name"] = entry.name
              document.querySelector(".mod_path").textContent = entry.name
              console.log(config)
              await fetch(
                  "./debug",{
                      method:"POST",
                      body: JSON.stringify({
                          "src":"config.json",
                          "data":config
                      })
                  }
              )
          });
    }

}