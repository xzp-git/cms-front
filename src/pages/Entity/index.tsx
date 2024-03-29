import { request, useRequest } from "@/.umi/plugin-request";
import {history} from "@umijs/max"
import { PageContainer } from "@ant-design/pro-components";
import { Button, Col, Pagination, Row, Space, Table } from "antd";
import { useState } from "react";
import {useToggle} from 'ahooks'
import Qs from 'query-string';
import { SearchOutlined } from "@ant-design/icons";










const Entity: React.FC = () => {

    const [{current, pageSize}, setPageConfig] = useState({current:1, pageSize:10})
    const [sorter, setSorter] = useState<any>()
    const [searchVisible, {toggle}] = useToggle()
    const [selectedRowKeys, setSelectedRowkeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const loadQuery = useRequest((params = {}) => request('/api/entity', {
        params:{
            current,
            pageSize,
            sort:sorter?.field,
            order:sorter?.order?.slice(0, -3),
            ...params
        },
        paramsSerializer(params){
            return Qs.stringify(params,{
                arrayFormat:'comma',
                skipEmptyString:true,
                skipNull:true
            })
        }
    }),
        {
            refreshDeps:[current, pageSize, sorter]
        }
    )















    const columns = [
        {title:'ID', dataIndex:'id', key:'id', sorter:true},
        {title:'名称', dataIndex:'name', key:'name'},
        {title:'标题', dataIndex:'title', key:'title'},
        {title:'操作', dataIndex:'operation', key:'operation', render(_, row){
            return(
                <Space>
                    <Button type='default'>更新</Button>
                    <Button type='primary' >删除</Button>
                </Space>
            )
        }},
    
    ]







    return (
        <PageContainer>


            <Row>
                <Col xs={24} style={{textAlign: 'right', padding:'10px'}}>
                    <Space>
                        <Button shape="circle" icon={<SearchOutlined />} onClick={toggle} type={searchVisible ? 'primary' : 'dashed'} />
                        <Button type="primary" onClick={() => history.push('/entity/edit')}>添加</Button>

                    </Space>
                </Col>
            </Row>
            <Table 
                dataSource={loadQuery.data?.list}
                columns={columns}
                rowKey='id'
                pagination={false}
                loading={loadQuery.loading}
                onChange={(_, __, sorter) => setSorter(sorter)}
            />
            <Row>
                <Col xs={24} style={{textAlign:'right', padding:'10px'}}>
                    <Pagination 
                    total={loadQuery.data?.total || 0}
                    current={loadQuery.data?.current || 1}
                    pageSize={loadQuery.data?.pageSize || 10}
                    showSizeChanger
                    showQuickJumper
                    showTotal={total => `总计${total}条`}
                    onChange={(current, pageSize) => setPageConfig({current, pageSize})}
                    />    
                </Col>
            </Row>
        </PageContainer>
        
    );
  };
  
  export default Entity;