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
import {useHistory} from "react-router-dom";

const List = () => {
    const api = useAxios();
    const history = useHistory();

    const { Option } = Select;

    const [page, setPage] = useState(1);

    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("");
    const [scheduleId, setScheduleId] = useState("");

    const { data : data, mutate: mutate } = useSWR(`/admin/schedule?page=${page}&status=${status}&keyword=${keyword}`);
    const originalData = data?.data?.schedules;

    const columns = [
        {
            title: "일정 코드",
            render: (data) => <>{data?.id ? data?.id : '-'}</>,
        },
        {
            title: "프로젝트 명",
            render: (data) => <>
                <a
                    style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}
                    href={`/project/detail/${data?.project_id}`}
                >
                    {data?.project_name ? data?.project_name : '-'}
                </a></>,
        },
        {
            title: "일정명",
            render: (data) => <>
                <a
                    style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}
                    href={`/schedule/detail/${data?.id}`}
                >
                    {data?.name ? data?.name : '-'}
                </a></>,
        },
        {
            title: "클라이언트",
            render: (data) => <>{data?.client ? data?.client : '-'}</>,
        },
        {
            title: "일정",
            render: (data) => <>{data?.use_date ? data?.use_date : '-'}</>,
        },
        {
            title: "일정 시작일",
            render: (data) => <>{data?.start_date ? data?.start_date : '-'}</>,
        },
        {
            title: "일정 마감일",
            render: (data) => <>{data?.end_date ? data?.end_date : '-'}</>,
        },
        {
            title: "일정 상태",
            render: (data) => <>{getStatus(data?.status)}</>,
        },
        {
            title: "일정 수정/삭제",
            render: (data) => <>
                <Button
                    type="primary"
                    style={{ marginRight: 5, width: "100px" }}
                    ghost
                    onClick={() => {
                        history.push(`/schedule/modify/${data?.id}`)
                    }}
                >
                    수정
                </Button>

                <Popconfirm
                    placement="leftBottom"
                    title="일정 데이터를 삭제하시겠습니까?"
                    onConfirm={() => {
                        api
                            .delete('/admin/schedule/delete', {
                                params: {
                                    schedule_id: data.id,
                                },
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    mutate();
                                    message.success('삭제되었습니다.');
                                } else {
                                    message.error(alert);
                                }
                            });
                    }}
                    onCancel={() => mutate()}
                    okText="확인"
                    cancelText="취소"

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
                <Button
                    type="primary"
                    style={{ margin: "0 0 20px 10px", width: "150" }}
                    onClick={() => {
                        history.push(`/schedule/register`)
                    }}
                >
                    일정 등록
                </Button>
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