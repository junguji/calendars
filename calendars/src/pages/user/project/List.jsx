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
import useAxios from "../../../api/api";

const List = () => {
    const api = useAxios();

    const { Option } = Select;

    const [page, setPage] = useState(1);

    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("");
    const [projectId, setProjectId] = useState("");

    const { data : data, mutate: mutate } = useSWR(`/admin/project?page=${page}&status=${status}&keyword=${keyword}`);
    const originalData = data?.data?.users;

    const columns = [
        {
            title: "프로젝트 코드",
            render: (data) => <>{data?.id ? data?.id : '-'}</>,
        },
        {
            title: "프로젝트명",
            render: (data) =><>{data?.name ? data?.name : '-'}</>,
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
            render: (data) => <>{data?.status ? data?.status : '-'}</>,
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
