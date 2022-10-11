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
    const [scheduleId, setScheduleId] = useState("");

    const { data : data, mutate: mutate } = useSWR(`/admin/schedule?page=${page}&status=${status}&keyword=${keyword}`);
    const originalData = data?.data?.users;

    const handleDelete = async () => {
        const params = {
            schedule_id: scheduleId
        }
        const {
            data: { success, alert, data: data2 },
        } = await api.delete(`/admin/schedule/delete`, {params: params})

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
            title: "일정 코드",
            render: (data) => <>{data?.id ? data?.id : '-'}</>,
        },
        {
            title: "프로젝트 명",
            render: (data) =><>{data?.name ? data?.name : '-'}</>,
        },
        {
            title: "일정명",
            render: (data) =><>{data?.name ? data?.name : '-'}</>,
        },
        {
            title: "일정",
            render: (data) => <>{data?.client ? data?.client : '-'}</>,
        },
        {
            title: "일정 시작일",
            render: (data) => <>{data?.contract_date ? data?.contract_date : '-'}</>,
        },
        {
            title: "일정 마감일",
            render: (data) => <>{data?.status ? data?.status : '-'}</>,
        },
        {
            title: "일정 마감일",
            render: (data) => <>{data?.status ? data?.status : '-'}</>,
        },
        {
            title: "일정 삭제",
            render: (data) => <>
                <Popconfirm
                    placement="leftBottom"
                    title="프로젝트 데이터를 삭제하시겠습니까?"
                    onConfirm={() => handleDelete()}
                    onCancel={() => mutate()}
                    okText="확인"
                    cancelText="취소"
                    onChange={() => setScheduleId(data?.id)}
                >
                    <Button
                        type="primary"
                        style={{ margin: "0 0 20px 10px", width: "200px" }}
                    >
                        일정 삭제
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
                        <Breadcrumb.Item>일정 관리</Breadcrumb.Item>
                        <Breadcrumb.Item>일정 목록</Breadcrumb.Item>
                    </BreadcumbBox>
                </PageHeader>
            </div>
            <Input
                placeholder="프로젝트명, 일정명, 담당자명"
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
