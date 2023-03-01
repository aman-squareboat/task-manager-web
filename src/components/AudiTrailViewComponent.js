import { Button, Modal,Input } from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space,DatePicker,Tabs } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined,HistoryOutlined } from '@ant-design/icons';
import { etaUpdateHistory, statusUpdateHistory } from '../utilities/apiCalls';

function EtaUpdateHistory(props){
    
    useEffect(()=>{
        
    },[])
    return(
        <div className='history-container'>
            {
                (props.etaHistory||[]).map(item=>{
                    return (
                        <div className='history-flex'>
                            <span>
                                {item.updatedAt}
                            </span>
                            <span>
                                {item.updatedToEta.split("T")[0]}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
const statusMap = ["Pending","InProgress","InReview","Completed"]
function StatusUpdateHistory(props){
    
    useEffect(()=>{
        
    },[])
    return(
        <div className='history-container'>
            {
                (props.statusHistory||[]).map(item=>{
                    return (
                        <div className='history-flex'>
                            <span>
                                {item.updatedAt}
                            </span>
                            <span>
                                {statusMap[item.updatedToStatus]}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

const AuditTrailViewComponent = (props) => {
  let [statusHistory,setStatusHistory] = useState([])
  let [etaHistory,setEtaHistory] = useState([])
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {

    statusUpdateHistory(props.id).then(res=>{
    setStatusHistory(res)}).catch(err=>console.log(err))
    
    etaUpdateHistory(props.id).then(res=>
    setEtaHistory(res)).catch(err=>console.log(err))
    setOpen(true);
  };
  const onChange = (key) => {
  console.log(key);
};
  const handleOk = () => {
    setOpen(false)
  };
  const items = [
  {
    key: '0',
    label: `Status Update History`,
    children: <StatusUpdateHistory {...props} statusHistory={statusHistory} />,
  },
  {
    key: '1',
    label: `ETA Update History`,
    children: <EtaUpdateHistory {...props} etaHistory={etaHistory}/>,
  },
  
];
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      {/* <Button type="primary" > */}
        <HistoryOutlined key="edit" onClick={showModal}/>
      {/* </Button> */}
      <Modal
        open={open}
        title="Audit Trail History"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Ok
          </Button>,
          
        ]}
      >
        <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
        
      </Modal>
    </>
  );
};
export default AuditTrailViewComponent;