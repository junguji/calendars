import React, { useEffect, useState } from "react";

import {
  Breadcrumb,
  Descriptions,
  Input,
} from "antd";

import PageHeader from "../../../components/PageHeader";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import useSWR from "swr";

import useAxios from "../../../api/api";

const Detail = () => {
  const params = useParams().id;
  const history = useHistory();
  const api = useAxios();

  const { TextArea } = Input;

  const { data, mutate } = useSWR("/admin/schedule/detail?schedule_id=" + params);

  const scheduleData = data?.data?.schedule;

  const columns = [
    {
      title: "일정 코드",
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
            <Link to="/schedule">일정 관리</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>일정 상세</Breadcrumb.Item>
        </BreadcumbBox>
      </PageHeader>
      <Descriptions title="일정 정보" bordered style={{ width: "100%" }}>
        <Descriptions.Item label="일정 코드" span={2} style={{ width: 250 }}>
            {scheduleData?.id ? scheduleData?.id : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="프로젝트명" span={2}>
          {scheduleData?.project_name ? scheduleData?.project_name : '-'}
        </Descriptions.Item>
      <Descriptions.Item label="일정명" span={2}>
          {scheduleData?.name ? scheduleData?.name : '-'}
      </Descriptions.Item>
        <Descriptions.Item label="담당자" span={2}>
          <><a
              style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}
              href={`/user/detail/${scheduleData?.manager_id}`}
          >
            {scheduleData?.manager ? scheduleData?.manager : '-'}
          </a></>
        </Descriptions.Item>
        <Descriptions.Item label="일정 소요일" span={2}>
          {scheduleData?.use_date ? scheduleData?.use_date : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="일정 시작일" span={2}>
          {scheduleData?.start_date ? scheduleData?.start_date : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="일정 마감일" span={2}>
          {scheduleData?.end_date ? scheduleData?.end_date : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="일정 현상태" span={2}>
          {getStatus(scheduleData?.status)}
        </Descriptions.Item>
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
    return '대기';
  } else if (status === 1) {
    return '진행중';
  } else if (status === 2) {
    return '기타';
  }
}
