import React, { useEffect, useState } from "react";

import {
  Breadcrumb,
  Descriptions,
  Input, Pagination, Table,
} from "antd";

import PageHeader from "../../../components/PageHeader";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import useSWR from "swr";

import useAxios from "../../../api/api";
import Box from "../../../components/Box";

const Detail = () => {
  const params = useParams().id;
  const history = useHistory();
  const api = useAxios();

  const { TextArea } = Input;

  const { data, mutate } = useSWR("/admin/position/detail?position_id=" + params);

  const positionData = data?.data?.position;

  const columns = [
    {
      title: "회원 코드",
      render: (data) => <>{data?.id ? data?.id : '-'}</>,
    },
    {
      title: "회원명",
      render: (data) => <>
        <a
            style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}
            href={`/user/detail/${data?.id}`}
        >
          {data?.name ? data?.name : '-'}
        </a></>,
    },
    {
      title: "회원 직책",
      render: (data) => <>{data?.position ? data?.position : '-'}</>,
    },
    {
      title: "회원 입사일",
      render: (data) => <>{data?.join_date ? data?.join_date : '-'}</>,
    },
  ];

  return (
    <LayoutContentWrapper>
      <PageHeader>
        <BreadcumbBox>
          <Breadcrumb.Item>
            <Link to="/team">팀 관리</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>팀 상세</Breadcrumb.Item>
        </BreadcumbBox>
      </PageHeader>
      <Descriptions title="직책 정보" bordered style={{ width: "100%" }}>
        <Descriptions.Item label="직책 코드" span={2} style={{ width: 250 }}>
            {positionData?.id ? positionData?.id : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="직책명" span={2}>
          {positionData?.name ? positionData?.name : '-'}
        </Descriptions.Item>
      <Descriptions.Item label="직책 회원수" span={2}>
          {positionData?.user_count ? positionData?.user_count : '-'}
      </Descriptions.Item>
        <Descriptions.Item label="직책 상태" span={2}>
          {getStatus(positionData?.status)}
        </Descriptions.Item>
        <Descriptions.Item label="직책 생성일" span={2}>
          {positionData?.created_at ? positionData?.created_at : '-'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="직책 회원 정보" bordered style={{ width: "100%", marginTop: 20 }}>
        <Box>
          <Table
              columns={columns}
              rowKey="id"
              dataSource={positionData?.users}
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
            <span>Total : {positionData?.users?.total ? positionData?.users?.total : 0}</span>
          </div>
        </Box>
      </Descriptions>
    </LayoutContentWrapper>
  );
};
export default Detail;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  & > div > button {
    margin-left: 10px;
  }
`;

const BreadcumbBox = styled(Breadcrumb)`
  & ol {
    flex-wrap: nowrap;
  }
`;

function getStatus(status)
{
  if (status === 0) {
    return '정상';
  } else if (status === 1) {
    return '준비중';
  } else if (status === 2) {
    return '기타';
  }
}