import styled from "@emotion/styled";
import {
    Breadcrumb,
    Button,
    Input,
    Modal,
    Select,
    Table,
    Descriptions,
    message,
    Popconfirm
} from "antd";
import React, { useState } from "react";
import useSWR from "swr";
import Box from "../../../components/Box";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import PageHeader from "../../../components/PageHeader";
import useAxios from "../../../api/api";
import {useHistory} from "react-router-dom";

const List = () => {
    const history = useHistory();
    const api = useAxios();

    const { Option } = Select;

    const [positionId, setPositionId] = useState("");
    const [name, setName] = useState("");
    const [modal, setModal] = useState(false);
    const [modifyModal, setModifyModal] = useState(false);

    const { data: data, mutate: mutate } = useSWR(`/admin/position`);
    const originalData = data?.data?.positions;

    const handleDelete = async () => {
        const params = {
            position_id: positionId
        }
        const {
            data: { success, alert, data: data2 },
        } = await api.delete(`/admin/position/delete`, {params: params})

        if (success) {
            message.success("처리되었습니다");
            mutate();
        } else {
            message.error(alert);
        }
        console.log(params);
    };

    const handleRegister = async () => {
        const formdata = new FormData();
        formdata.append("name", name);

        const {
            data: { success, alert, data: data2 },
        } = await api.post("/admin/position/register", formdata);

        if (success) {
            mutate()
            setModal(false)
            message.success('처리되었습니다');
        } else {
            setModal(false)
            message.error(alert);
        }
    };

    const handleModify = async () => {
        const formdata = new FormData();
        formdata.append("position_id", positionId);
        formdata.append("name", name);

        const {
            data: { success, alert, data: data2 },
        } = await api.post("/admin/position/modify", formdata);

        if (success) {
            mutate()
            setModifyModal(false)
            message.success('처리되었습니다');
        } else {
            setModifyModal(false)
            message.error(alert);
        }
    };

    const columns = [
        {
            title: "직책 코드",
            render: (data) => <>{data?.id ? data?.id : '-'}</>,
        },
        {
            title: "직책",
            render: (data) =>
                <a
                    style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}
                    href={`/user/position/detail/${data?.id}`}
                >
                    {data?.name ? data?.name : '-'}
                </a>

        },
        {
            title: "직책 수정/삭제",
            render: (data) => <>
                <Button
                    type="primary"
                    style={{ margin: "0 0 20px 10px", width: "150" }}
                    onClick={() => {setModifyModal(true); setName(data?.name); setPositionId(data?.id)}}
                    ghost
                >
                    직책 수정
                </Button>
                <Popconfirm
                    placement="leftBottom"
                    title="직책을 삭제하시겠습니까?"
                    onConfirm={() => handleDelete()}
                    onCancel={() => mutate()}
                    okText="확인"
                    cancelText="취소"
                >
                    <Button
                        type="primary"
                        danger
                        style={{ margin: "0 0 20px 10px", width: "150" }}
                        onClick={() => {setPositionId(data?.id)}}
                    >
                        직책 삭제
                    </Button>
                </Popconfirm>
            </>,
        },
    ];
    
    return (
        <LayoutContentWrapper>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <PageHeader>
                    <BreadcumbBox>
                        <Breadcrumb.Item>회원 관리</Breadcrumb.Item>
                        <Breadcrumb.Item>직책 목록</Breadcrumb.Item>
                    </BreadcumbBox>
                </PageHeader>
                <Button
                    type="primary"
                    style={{ margin: "0 0 20px 10px", width: "150" }}
                    onClick={() => {setModal(true)}}
                >
                    직책 등록
                </Button>
            </div>
            <Box>
                <Table
                    columns={columns}
                    rowKey="id"
                    dataSource={originalData}
                    pagination={false}
                />
                <div
                    style={{
                        width: "100%",
                        margin: "30px 0 0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                </div>
            </Box>

            <Modal
                title="직책 등록"
                visible={modal}
                onCancel={() => {
                    setModal(false);
                }}
                onOk={() => {
                    handleRegister();
                }}
            >
                <Descriptions title="" bordered style={{ width: "100%" }}>
                    <Descriptions.Item label="직책" span={4}>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            placeholder="직책을 입력하세요"
                        />
                    </Descriptions.Item>
                </Descriptions>
            </Modal> 
            <Modal
                title="직책 수정"
                visible={modifyModal}
                onCancel={() => {
                    setModifyModal(false);
                }}
                onOk={() => {
                    handleModify();
                }}
            >
                <Descriptions title="" bordered style={{ width: "100%" }}>
                    <Descriptions.Item label="직책" span={4}>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="직책을 입력하세요"
                        />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </LayoutContentWrapper>
    );
};

export default List;

const BreadcumbBox = styled(Breadcrumb)`
  & ol {
    flex-wrap: nowrap;
  }
`;
