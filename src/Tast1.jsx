import { useEffect, useState } from "react"
import { getAllOrders } from "./Requests"
import { Switch, Table } from 'antd';
import moment from "moment";

const Tablee = () => {
    let [orders,setOrders] = useState([])
    useEffect(()=>{
        getAllOrders().then(data=>{
            setOrders(data)
        })
    })
    let [fixedTop, setFixedTop] = useState(false);
    
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width:'50px',
          fixed: 'left',
          filters:
           orders.map((item) => {
            return {
              text: item.id,
              value: item.id,
            }}),
         
           
            filterSearch: true,
            onFilter: (value, record) => record.id.includes(value),
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'shipAddress city', 
            dataIndex: ["shipAddress","country"],
            key: '5',
            width:'100px',
            fixed: 'left',
        },
        {
            title: 'Adress',
            render: (value) =>([...value.shipAddress.country,",",value.shipAddress.city]),
            key: '5',
            width:'100px',
            fixed: 'left',
        },
        {
          title: 'Order Date',
          render: (value) => moment(value.orderDate).format("MMM  Do YY" ),
          key: '1',
          width:'150px',
         
          sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
        },
        {
          title: 'requiredDate',
          render: (value) => moment(value.requiredDate).format("MMM  Do YY" ),
          sorter: (a, b) => new Date(a.requiredDate) - new Date(b.requiredDate),
          key: '2',
          width:'150px',
        },
        {
          title: 'Shipped Date',
          dataIndex: 'shippedDate',
          key: '3',
          width:'150px',
        },
        {
          title: 'City',
          dataIndex: ["shipAddress", "city"],
          key: '4',
          width:'100px',
        },
        {
          title: 'Freight',
          key: 'freight',
          dataIndex:'freight',
          fixed: 'right',
          width: 50,
          sorter: (a, b) => a.freight - b.freight,
        },
      ];
   
  return (
    <Table rowKey='id'
      columns={columns}
      dataSource={orders}
      scroll={{
        x: 1500,
      }}
      summary={() => (
        <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              <Switch
                checkedChildren="Fixed Top"
                unCheckedChildren="Fixed Top"
                checked={fixedTop}
                onChange={() => {
                  setFixedTop(!fixedTop);
                }}
              />
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} colSpan={2}>
              Scroll Context
            </Table.Summary.Cell>
            <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
      sticky
      
    />
  )
}

export default Tablee