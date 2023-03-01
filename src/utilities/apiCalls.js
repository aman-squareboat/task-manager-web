import axios from 'axios';
let BASE_URL = "http://localhost:3001"

export async function getPageItems(pageNumber,perPage){
    try{

        let data = await axios.get(BASE_URL+`/tasks?tasksPerPage=${perPage}&pageNumber=${pageNumber}`)
        return data.data.data
    }
    catch(err){
        console.log(err)
    }
    
}
export async function createTask(title,eta,status){
    let res = await axios.post(BASE_URL+"/tasks",{
        title,
        eta,
        status
    })
}
export async function updateTask(id,eta,status){
    await axios.put(BASE_URL+"/tasks/"+id,{
        status,
        eta
    })
}
export async function etaUpdateHistory(id){
    try{
        let data = await axios.get(BASE_URL+`/history/eta/${id}`)

        return data.data.data
    }
    catch(err){
        console.log(err)
    }
}
export async function statusUpdateHistory(id){
    try{
        let data = await axios.get(BASE_URL+`/history/status/${id}`)

        return data.data.data
    }
    catch(err){
        console.log(err)
    }
}