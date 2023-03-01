
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import AuditTrailViewComponent from './AudiTrailViewComponent';
import TaskEditComponent from './TaskEditComponent';
const {Meta} = Card
let status = ["Pending","InProgress","InReview","Completed"]
let statusClasses = ["status-pending","status-inprogress","status-inreview","status-completed"]

function TaskCard(props){
    function getDateFormat(time){
        return time.split('T')[0]
    }
    
    return (
        <Card
        style={{
        width: 350,
        }}
    cover={
      <div className={"task-top-padding "+ statusClasses[props.status ?? 3]}>
     </div>
    }
    actions={[
      <TaskEditComponent {...props}/>,
      <AuditTrailViewComponent {...props} />
    ]}
  >
    <div>
        <span className='task-title'>{props.title||"Complete Homework with the help of google"}</span>
        <div className="task-description">
                    <div className='task-status'>
                        <span className="task-description-heading">
                            ID 
                            
                        </span>
                        <span >
                            {props.id || "3gjahsgdjh8"}
                        </span>
                    </div>
                    <div className='task-eta'>
                        <div className='task-description-heading-box'>

                            <h6 class="task-description-heading">
                                ETA &nbsp;
                            </h6>
                        </div>
                        <span className="task-date-input"  >{getDateFormat(props.eta || new Date().toISOString())}</span>
                        
                        
                    
                    </div>
                    
                    <div className='task-status'>
                        <span className="task-description-heading">
                            Status 
                            
                        </span>
                        <span className={statusClasses[props.status ?? 3]}>
                            {status[props.status ?? 3]}
                        </span>
                    </div>
                </div>
    </div>
  
  </Card>
   
   
    )
}
export default TaskCard