import React, { useEffect, useState } from "react";

import {
  Breadcrumb,
  Descriptions,
  Input,
  Pagination,
  Table,
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

  const [schedulePage, setSchedulePage] = useState(1);

  const { data, mutate } = useSWR("/admin/project/detail?project_id=" + params);

  const projectData = data?.data?.project;
  const scheduleData = data?.data?.schedules;

  const columns = [
    {
      title: "스케줄 코드",
      render: (data) => <>{data?.id ? data?.id : '-'}</>,
    },
    {
      title: "프로젝트명",
      render: (data) => <>
          {data?.name ? data?.name : '-'}
       </>,
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
      title: "일정 소요일",
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
      title: "일정 현상태",
      render: (data) => <>{data?.status ? data?.status : '-'}</>,
    },
  ];

  return (
    <LayoutContentWrapper>
      <PageHeader>
        <BreadcumbBox>
          <Breadcrumb.Item>
            <Link to="/user">프로젝트 관리</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>프로젝트 상세</Breadcrumb.Item>
        </BreadcumbBox>
      </PageHeader>
      <Descriptions title="프로젝트 정보" bordered style={{ width: "100%" }}>
        <Descriptions.Item label="프로젝트 코드" span={2} style={{ width: 250 }}>
            {projectData?.id ? projectData?.id : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="회원명" span={2}>
          {projectData?.name ? projectData?.name : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="클라이언트" span={2}>
          {projectData?.client ? projectData?.client : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="계약일자" span={2}>
          {projectData?.contract_date ? projectData?.contract_date : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="프로젝트 시작일" span={2}>
          {projectData?.start_date ? projectData?.start_date : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="프로젝트 마감일" span={2}>
          {projectData?.end_date ? projectData?.end_date : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="프로젝트 현상태" span={2}>
          {projectData?.status ? projectData?.status : '-'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="프로젝트 일정 목록" bordered style={{ width: "100%", marginTop: 20 }}>
        <Box>
          <Table
              columns={columns}
              rowKey="id"
              dataSource={scheduleData?.data}
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
            <span>Total : {scheduleData?.total ? scheduleData?.total : 0}</span>
            <Pagination
                showQuickJumper
                current={schedulePage}
                total={scheduleData?.total}
                onChange={(pageNumber) => setSchedulePage(pageNumber)}
                onShowSizeChange={(current) => {
                  setSchedulePage(1);
                }}
            />
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
