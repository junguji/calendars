import styled from "@emotion/styled";
import {
    Breadcrumb,
    Button,
    Input,
    Modal,
    Pagination,
    Select,
    Table,
    Descriptions,
    Radio,
    message,
    Checkbox,
    Popconfirm
} from "antd";
import React, { useState } from "react";
import useSWR from "swr";
import Box from "../../../components/Box";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import PageHeader from "../../../components/PageHeader";
import NumberChange from "../../../auth/NumberChange";
import useAxios from "../../../api/api";

const List = () => {
    const api = useAxios();

    const { Option } = Select;

    const [page, setPage] = useState(1);

    const [keyword, setKeyword] = useState("");
    const [teamId, setTeamId] = useState("");
    const [userId, setUserId] = useState("");

    const { data : data, mutate: mutate } = useSWR(`/admin/user?page=${page}&team_id=${teamId}&keyword=${keyword}`);
    const originalData = data?.data?.users;

    const { data: teamData } = useSWR(`/admin/team`);
    const teamOriginalData = teamData?.data?.data;

    const handleDelete = async () => {
        const params = {
            user_ids: userId
        }
        const {
            data: { success, alert, data: data2 },
        } = await api.delete(`/admin/user/delete`, {params: params})

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
            title: "회원코드",
            render: (data) => <>{data?.id ? data?.id : '-'}</>,
        },
        {
            title: "이름",
            render: (data) =>
                <a
                    style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}
                    href={`/user/detail/${data?.id}`}
                >
                    {data?.name ? data?.name : '-'}
                </a>
        },
        {
            title: "소속 팀",
            render: (data) => <>{data?.team ? data?.team : '-'}</>,
        },
        {
            title: "직책",
            render: (data) => <>{data?.position ? data?.position : '-'}</>,
        },
        {
            title: "회원 삭제",
            render: (data) => <>
                <Popconfirm
                    placement="leftBottom"
                    title="회원의 데이터를 삭제하시겠습니까?"
                    onConfirm={() => handleDelete()}
                    onCancel={() => mutate()}
                    okText="확인"
                    cancelText="취소"
                    onChange={() => setUserId(data?.id)}
                >
                    <Button
                        type="primary"
                        style={{ margin: "0 0 20px 10px", width: "200px" }}
                    >
                        회원 삭제
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
                        <Breadcrumb.Item>회원 목록</Breadcrumb.Item>
                    </BreadcumbBox>
                </PageHeader>
            </div>
            <Input
                placeholder="회원 ID, 회원명, 회원 코드"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: 400 }}
            />
            <Select
                value={teamId}
                style={{ width: 200, marginLeft: 10 }}
                onChange={(value) => setTeamId(value)}
            >
                <Option value="">팀 선택</Option>
                {teamOriginalData?.map((teamData) => (
                    <Option value={teamData.id}>{teamData.name}</Option>
                ))}
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
