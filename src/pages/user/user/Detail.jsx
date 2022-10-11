import React, { useEffect, useState } from "react";

import {
  Breadcrumb,
  Button,
  Descriptions,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Radio,
  Table,
} from "antd";

import PageHeader from "../../../components/PageHeader";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import useSWR from "swr";

import useAxios from "../../../api/api";
import moment from "moment";
import NumberChange from "../../../auth/NumberChange";
import Box from "../../../components/Box";

const Detail = () => {
  const params = useParams().id;
  const history = useHistory();
  const api = useAxios();

  const { TextArea } = Input;

  const [userId, setUserId] = useState("");
  const [schedulePage, setSchedulePage] = useState(1);
  const [memo, setMemo] = useState("");

  const { data, mutate } = useSWR("/admin/user/detail?id=" + params);
  const { data :scheduleData, mutate :scheduleMutate } = useSWR(`/admin/schedules?user_id=${userId}`)

  const userData = data?.data?.user;
  const UserScheduleData = scheduleData?.data?.schedules;

    const handleDelete = async () => {
        const params = {
            user_id: userId
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

  return (
      <LayoutContentWrapper>
        <PageHeader>
          <BreadcumbBox>
            <Breadcrumb.Item>
              <Link to="/user">회원 관리</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>회원 상세</Breadcrumb.Item>
          </BreadcumbBox>
        </PageHeader>
        <Descriptions title="회원정보" bordered style={{ width: "100%" }}>
          <Descriptions.Item label="회원 코드" span={2} style={{ width: 250 }}>
            {userData?.id ? userData?.id : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="회원 ID" span={2}>
            <div style={{ width: 250 }}>
              {userData?.email ? userData?.email : '-'}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="이름" span={2}>
            {userData?.name ? userData?.name : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="소속 팀" span={2}>
            {userData?.team ? userData?.team : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="직책" span={2}>
            {userData?.position ? userData?.position : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="입사 일자" span={2}>
            {userData?.join_date ? moment(userData?.join_date).format("YYYY-MM-DD") : "-"}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="기타" bordered style={{ width: "100%", marginTop: 20 }}>
          <Descriptions.Item label="회원 강제탈퇴" span={4} style={{ width: 250 }}>
            <Popconfirm
                placement="leftBottom"
                title={() => (<>
                  강제탈퇴시 해당 회원정보로 접근이 불가합니다.
                </>)}
                onConfirm={() => handleDelete()}
                onCancel={() => mutate()}
                okText="확인"
                cancelText="취소"
            >
              <Button type="danger" ghost>
                강제탈퇴
              </Button>
            </Popconfirm>
          </Descriptions.Item>
        </Descriptions>
        <ButtonBox>
          <div/>
          <Button onClick={() => history.push('/user')}>목록</Button>
        </ButtonBox>
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

function getGender(gender)
{
  if (gender === 'f') {
    return '여자'
  } else if (gender === 'm') {
    return '남자'
  } else {
    return '-'
  }
}
