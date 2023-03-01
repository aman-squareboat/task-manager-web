import { Button, Modal,Input } from 'antd';
import { useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space,DatePicker } from 'antd';
import dayjs from 'dayjs'
import { createTask } from '../utilities/apiCalls';
import {notification} from 'antd';
const TaskCreateComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [title,setTitle] = useState("")
  const [status,setStatus] = useState(0)
  const [eta,setEta] = useState((new Date().toISOString()).split("T")[0])
  const dateFormat = "YYYY-MM-DD"
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setLoading(true);
    try{
        await createTask(title,eta,status)
        notification.success({
            message:"Task Created"
        })
        props.loadTasks()
    }
    catch(err){
        notification.error({
            message:"Task Failed"
        })
    }
    setLoading(false)
    setOpen(false)
  };

  const handleTitleOnChange = (e) =>{
    let val = e.target.value;
    setTitle(val)
  }
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
      <Button type="primary" onClick={showModal}>
        Create Task
      </Button>
      <Modal
        open={open}
        title="Create New Task"
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
        
        <div className='modal-label'>Title</div>
        <Input placeholder='Title' onChange={handleTitleOnChange}/>
        
        
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
export default TaskCreateComponent;