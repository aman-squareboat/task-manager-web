import TaskCard from "../components/TaskCard"
import TaskCreateComponent from "../components/TaskCreateComponent"
import TaskList from "../components/TaskList"
import {Layout} from 'antd';
import { useEffect, useState } from "react";
import { getPageItems } from "../utilities/apiCalls";
const { Header, Content, Footer,Menu } = Layout;

function HomeScreen(props){
    let [tasks,setTasks] = useState([])
    let [pagination,setPagination] = useState({})
    const loadTasks = (pageNumber) =>{
        
        if(!pageNumber)
            pageNumber = pagination.currentPage
        if(!pageNumber)
            pageNumber = 1
        getPageItems(pageNumber,6).then(res=>{
            setPagination(res.pagination)
            setTasks(res.data)
        })
    }
    useEffect(()=>{
        loadTasks()
    },[])
    

    return(     <div >
                        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                                <div className="header-title">
                                Task Manager
                                </div>
                            </Header>

       
                <div id="tasks-container">
                    <div className="create-task-button">
                        <TaskCreateComponent loadTasks={loadTasks}/>
                    </div>
                    <TaskList loadTasks={loadTasks} tasks={tasks} pagination={pagination} setPagination={setPagination}/>
                    <break/>
                </div>
</div>
            
    )
}
export default HomeScreen