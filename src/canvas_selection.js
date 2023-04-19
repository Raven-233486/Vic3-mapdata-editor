import { canvas, full_data } from "./index.js";
import { do_draw } from "./drawing_little.js"


const gethexname = (r,g,b) => "x"+ ((r<<16)+(g<<8)+b).toString(16).padStart(6, '0').toUpperCase()

const select_states = (imgdata,reset_data,x,y,state_name,e) => {
    full_data.ctx.putImageData(reset_data, 0, 0)
    let state_index = (y*canvas.width + x)*4
    if (state_name.has(state_index)){
        state_name.delete(state_index)
    } else if(e.ctrlKey) {
        state_name.add(state_index)
    } else {
        state_name.clear()
        state_name.add(state_index)
    }
    if (state_name.size > 0 ){
        canvas_reset(imgdata,reset_data)
        for (let state of state_name){
            select_states_color(state,imgdata)
        }
        full_data.ctx.putImageData(imgdata, 0, 0);
        do_draw()
    } 
}

const select_states_color = (sindex,imgdata) => {
    for (let keys =  Object.keys(full_data.statepointmap),j=keys.length;j--;){
        let statepoint = keys[j]
        if (full_data.statepointmap[statepoint].includes(sindex)){
            for (let i=0;i<full_data.statepointmap[statepoint].length;i++){ imgdata.data[full_data.statepointmap[statepoint][i]+3] -= 100}
            break
        }
    }
}


const muti_selection = (provs_name,start_x,start_y,end_x,end_y,e) => {
    for (let x=Math.min(start_x,end_x);x<=Math.max(start_x,end_x);x++){
        for (let y=Math.min(start_y,end_y);y<=Math.max(start_y,end_y);y++){
            let sindex = (y*canvas.width + x)*4
            let color = (full_data.reset_data.data[sindex]<<16)+(full_data.reset_data.data[sindex+1]<<8)+(full_data.reset_data.data[sindex+2])
            provs_name.add("x"+ color.toString(16).padStart(6, '0').toUpperCase())
        }
    }
}


const select_prov_pure = (imgdata,reset_data,label,sindex,provs_name,e) => {
    
    full_data.ctx.putImageData(full_data.reset_data, 0, 0)
    if (provs_name.has(label)){
        provs_name.delete(label)
    } else if(e.ctrlKey) {
        provs_name.add(label)
    }  else {
        provs_name.clear()
        provs_name.add(label)
    }

    if (provs_name.size > 0 ){
        canvas_reset(imgdata,full_data.reset_data)
        for (let prov of provs_name){
            select_provs_color(prov,imgdata)
        }
        full_data.ctx.putImageData(imgdata, 0, 0);
    }
    console.log(provs_name)
    console.log(label)
}




const select_provs = (imgdata,state_data,label,sindex,provs_name,e) => {
    
    
    full_data.ctx.putImageData(state_data, 0, 0)
    if (provs_name.has(label)){
        provs_name.delete(label)
    } else if(e.ctrlKey) {
        provs_name.add(label)
    } else if(e.shiftKey){
        provs_name.clear()
        for (let statepointkey=Object.keys(full_data.statepointmap),j = statepointkey.length;j--;){
            let statepoint = statepointkey[j]
            if (full_data.statepointmap[statepoint].includes(sindex)){
                for (let i=full_data.statepointmap[statepoint].length;i--;){ 
                    provs_name.add(gethexname(
                        full_data.reset_data.data[full_data.statepointmap[statepoint][i]],
                        full_data.reset_data.data[full_data.statepointmap[statepoint][i]+1],
                        full_data.reset_data.data[full_data.statepointmap[statepoint][i]+2]
                    ))
                }
                break
            }
        }
    } else {
        provs_name.clear()
        provs_name.add(label)
    }
    
    if (provs_name.size > 0 ){
        canvas_reset(imgdata,full_data.state_data)
        for (let prov of provs_name){
            select_provs_color(prov,imgdata)
        }
        full_data.ctx.putImageData(imgdata, 0, 0);
        do_draw()
        // try{
        //     let select_area = get_select_area(provs_name)

        //     full_data.ctx.beginPath()
        //     full_data.ctx.rect(select_area[0],select_area[1],select_area[2],select_area[3],)
        //     full_data.ctx.stroke()
        //     full_data.ctx.closePath()
        // }
            
        // catch{

        // }
    }

    console.log(provs_name)
}

const get_select_area = (provs_name) => {
    let area = []
    let y_min_area = []
    let y_max_area = []
    let x_min_area = []
    let x_max_area = []
    for (let prov of provs_name){
        y_min_area.push( Math.floor(Math.min.apply(null,full_data.colormap[prov]) / (4*full_data.width)) )
        y_max_area.push( Math.floor(Math.max.apply(null,full_data.colormap[prov]) / (4*full_data.width)) )
        let color_x_area = full_data.colormap[prov].map(sindex => sindex / 4 % full_data.width)
        x_min_area.push( Math.min.apply(null,color_x_area) )
        x_max_area.push( Math.max.apply(null,color_x_area) )
    }
    // area = area.map(sindex => {
    //     let y = Math.floor((sindex/4)/full_data.width)
    //     let x = (sindex/4) - (full_data.width*y)
    //     return [sindex,full_data.width,x,y]
    // })
    // console.log(area)
    // console.log(Math.min.apply(null,area))
    // let start_y = Math.floor(Math.min.apply(null,area) / (4*full_data.width))
    // let select_height = Math.floor(Math.max.apply(null,area) / (4*full_data.width)) - start_y

    // area = area.map(sindex => sindex / 4 % full_data.width)
    // console.log(area)
    // let res = [Math.min.apply(null,area),start_y,Math.max.apply(null,area) - Math.min.apply(null,area),select_height]
    
    // return res
    let start_x = Math.min.apply(null,x_min_area)
    let start_y = Math.min.apply(null,y_min_area)
    let width = Math.max.apply(null,x_max_area) - start_x
    let height = Math.max.apply(null,y_max_area) - start_y
    let res = [start_x,start_y,width,height]
    console.log(res)
    return res
}

const select_provs_color = (hexname,imgdata) => {
    let points = full_data.colormap[hexname]
    if (!points){
        console.log(points,hexname)
    }
    for(let i = 0; i < points.length; i++){
        imgdata.data[points[i]+3] -= 100
    }
}

const canvas_reset = (imgdata,reset_data) => {
    imgdata.data.set(reset_data.data)
}

export { select_provs ,select_states,muti_selection,select_prov_pure }