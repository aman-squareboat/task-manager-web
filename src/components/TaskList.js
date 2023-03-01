import TaskCard from "./TaskCard"
import { Button, DatePicker, Space, version,Card ,Pagination} from "antd";
import { useEffect, useState } from "react";
import { getPageItems } from "../utilities/apiCalls";
function TaskList(props){
    let [currentPage,setCurrentPage] = useState(1)
    useEffect(()=>{

    },[])
    function handlePaginationOnChange(e){
        props.loadTasks(e)
        setCurrentPage(e)
    }
    return(
        <div>
             
            <div className="task-list">
            {
                props.tasks.map(task=>{
                    return <TaskCard key={task.id} {...task} loadTasks={props.loadTasks}/>
                })
            }
            </div>
            <Pagination defaultCurrent={1} total={props.pagination.total} defaultPageSize={6} onChange={handlePaginationOnChange} />
        </div>
        
    )
}
export default TaskList