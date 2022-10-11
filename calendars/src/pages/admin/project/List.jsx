import styled from "@emotion/styled";
import {
    Breadcrumb,
    Button,
    Input,
    Pagination,
    Select,
    Table,
    message,
    Popconfirm
} from "antd";
import React, { useState } from "react";
import useSWR from "swr";
import Box from "../../../components/Box";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import PageHeader from "../../../components/PageHeader";
import NumberChange from "../../../auth/NumberChange";
import useAxios from "../../../api/api";
import {useHistory} from "react-router-dom";

const List = () => {
    const history = useHistory();
    const api = useAxios();

    const { Option } = Select;

    const [page, setPage] = useState(1);

    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("");
    const [projectId, setProjectId] = useState("");

    const { data : data, mutate: mutate } = useSWR(`/admin/project?page=${page}&status=${status}&keyword=${keyword}`);
    const originalData = data?.data?.projects;

    const handleDelete = async () => {
        const params = {
            project_id: projectId
        }
        const {
            data: { success, alert, data: data2 },
        } = await api.delete(`/admin/project/delete`, {params: params})

        if (success) {
            message.success("처리되었습니다");
            mutate();
        } else {
            message.error(alert);
        }
        console.log(params);
    };

    const columns = [
        {
            title: "프로젝트 코드",
            render: (data) => <>{data?.id ? data?.id : '-'}</>,
        },
        {
            title: "프로젝트명",
            render: (data) => <>
                <a
                    style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}
                    href={`/project/detail/${data?.id}`}
                >
                    {data?.name ? data?.name : '-'}
                </a></>,
        },
        {
            title: "클라이언트",
            render: (data) => <>{data?.client ? data?.client : '-'}</>,
        },
        {
            title: "계약일자",
            render: (data) => <>{data?.contract_date ? data?.contract_date : '-'}</>,
        },
        {
            title: "현상태",
            render: (data) => <>{getStatus(data?.status)}</>,
        },
        {
            title: "프로젝트 수정/삭제",
            render: (data) => <>
                <Button
                    type="primary"
                    style={{ marginRight: 5, width: "100px" }}
                    ghost
                    onClick={() => {
                        history.push(`/project/modify/${data?.id}`)
                    }}
                >
                    수정
                </Button>
                <Popconfirm
                    placement="leftBottom"
                    title="프로젝트 데이터를 삭제하시겠습니까?"
                    onConfirm={() => handleDelete()}
                    onCancel={() => mutate()}
                    okText="확인"
                    cancelText="취소"
                    onChange={() => setProjectId(data?.id)}
                >
                    <Button
                        type="primary"
                        style={{ margin: "0 0 20px 10px", width: "150" }}
                        danger
                    >
                        프로젝트 삭제
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
                        <Breadcrumb.Item>프로젝트 관리</Breadcrumb.Item>
                        <Breadcrumb.Item>프로젝트 목록</Breadcrumb.Item>
                    </BreadcumbBox>
                </PageHeader>

                <Button
                    type="primary"
                    style={{ margin: "0 0 20px 10px", width: "150" }}
                    onClick={() => {
                        history.push(`/project/register`)
                    }}
                >
                    프로젝트 등록
                </Button>
            </div>
            <Input
                placeholder="프로젝트명, 클라이언트, 담당자명"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: 400 }}
            />
            <Select
                value={status}
                style={{ width: 200, margin: "0 10px" }}
                onChange={(value) => setStatus(value)}
            >
                <Option value="">전체</Option>
                <Option value="0">대기</Option>
                <Option value="1">진행중</Option>
                <Option value="2">완료</Option>
                <Option value="3">기타</Option>
            </Select>
            <Box>
                <Table
                    columns={columns}
                    rowKey="id"
                    dataSource={originalData?.data}
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
                    <span>Total : {originalData?.total ? originalData?.total : 0}</span>
                    <Pagination
                        showQuickJumper
                        current={page}
                        total={originalData?.total}
                        onChange={(pageNumber) => setPage(pageNumber)}
                        onShowSizeChange={(current) => {
                            setPage(1);
                        }}
                    />
                </div>
            </Box>
        </LayoutContentWrapper>
    );
};

export default List;

const BreadcumbBox = styled(Breadcrumb)`
  & ol {
    flex-wrap: nowrap;
  }
`;

function getStatus(status)
{
    if (status === 0) {
        return '대기';
    } else if (status === 1) {
        return '진행중';
    } else if (status === 2) {
        return '기타';
    }
}
