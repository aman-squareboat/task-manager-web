import { Button, Modal,Input } from 'antd';
import { useState } from 'react';
import { DownOutlined, SmileOutlined,EditOutlined } from '@ant-design/icons';
import { Dropdown, Space,DatePicker } from 'antd';
import dayjs from 'dayjs'
import { createTask, updateTask } from '../utilities/apiCalls';
import {notification} from 'antd';
const TaskEditComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [title,setTitle] = useState("")
  const [status,setStatus] = useState(props.status )
  const [eta,setEta] = useState(props.eta)
  const dateFormat = "YYYY-MM-DD"
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setLoading(true);
    try{
        await updateTask(props.id,eta,status)
        notification.success({
            message:"Task Updated"
        })
        props.loadTasks()
    }
    catch(err){
        notification.error({
            message:"Task Not Updated"
        })
    }
    setLoading(false)
    setOpen(false)
  };

  
  const changeStatus = (status)=>{
    setStatus(status)
  }
  const handleEtaOnChange = (dates,datestring) =>{
    if(datestring!=="" && datestring)
        setEta(datestring)
    else
        setEta(new Date().toISOString().split("T")[0])

  }

  const statusMap = ["Pending","InProgress","InReview","Completed"]
  const items =[
    {
        key:'0',
        label:(<span className='task-pending' onClick={()=>{changeStatus(0)}}>Pending</span>)
    },{
        key:'1',
        label:(<span className='task-pending' onClick={()=>{changeStatus(1)}}>InProgress</span>)
    },{
        key:'2',
        label:(<span className='task-pending' onClick={()=>{changeStatus(2)}}>InReview</span>)
    },{
        key:'3',
        label:(<span className='task-pending' onClick={()=>{changeStatus(3)}}>Completed</span>)
    }
  ]
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <EditOutlined onClick={showModal}/>
       
      <Modal
        open={open}
        title="Edit Task"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          
        ]}
      >

        
        
        <div>
            <div>

            
            <div className='modal-label'>Status</div>
                <Dropdown menu={{items}}>
                    
                    <span>
                        <Space>
                            {statusMap[status]}
                            <DownOutlined />
                        </Space>
                    </span>
                </Dropdown>
            </div>

            <div>
                
                <div className='modal-label'>ETA</div>
            
            <DatePicker onChange={handleEtaOnChange} value={dayjs(eta)} format={dateFormat}/>
            </div>
        </div>
      </Modal>
    </>
  );
};
export default TaskEditComponent;