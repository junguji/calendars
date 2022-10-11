import React, {useEffect, useState} from "react";

import {
    Breadcrumb,
    Button,
    Descriptions,
    Input,
    message,
    Popconfirm,
    Select,
    Upload,
    Radio,
} from "antd";
import PageHeader from "../../../components/PageHeader";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import {Link, useHistory, useParams} from "react-router-dom";
import styled from "@emotion/styled";
import useAxios from "../../../api/api";
import {arrayMove, SortableContainer, SortableElement} from "react-sortable-hoc";
import { PlusOutlined } from "@ant-design/icons";
import useSWR from "swr";
import NumberPoint from "../../../auth/NumberPoint";
import NumberChange from "../../../auth/NumberChange";

const Register = () => {
    const history = useHistory();
    const api = useAxios();

    const id = useParams().id;

    const { Option } = Select;

    const [scheduleId, setScheduleId] = useState("");
    const [name, setName] = useState("");
    const [projectId, setProjectId] = useState("");
    const [managerId, setManagerId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [useDate, setUseDate] = useState("");
    const [status, setStatus] = useState(0);

    const { data, mutate } = useSWR("/admin/user/detail?id=" + params);
    const { data :scheduleData, mutate :scheduleMutate } = useSWR(`/admin/schedules?user_id=${scheduleId}`)

    const { data: teamData } = useSWR(`/admin/team`);
    const teamOriginalData = teamData?.data?.teams;

    const { data: userData } = useSWR(`/admin/user?team_id=${teamId}`);
    const userOriginalData = userData?.data?.users;

    const { data: projectDate } = useSWR(`/admin/project`);
    const projectOriginalData = projectDate?.data?.projects;

    const handleSave = async () => {
        if (name === "" ||
            projectId === "" ||
            managerId === "" ||
            startDate === "" ||
            useDate === "" ||
            endDate === ""
        ) {
            message.warning("필수 값을 모두 입력해주세요.");
            return false;
        }

        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("project_id", projectId);
        formdata.append("manager_id", managerId);
        formdata.append("start_date", startDate);
        formdata.append("use_date", useDate);
        formdata.append("status", status);

        const {
            data: { success, alert, data: data2 },
        } = await api.post("/admin/schedule/modify", formdata);

        if (success) {
            message.success("등록되었습니다");
            history.replace("/schedule/modify");
        } else {
            message.error(alert);
        }
    };

    useEffect(() => {
        if (scheduleData) {
            setName(scheduleData?.name);
            setProjectId(scheduleData?.projectId);
            setManagerId(scheduleData?.managerId);
            setStartDate(scheduleData?.startDate);
            setUseDate(scheduleData?.useDate);
            setStatus(scheduleData?.status);
        }

    }, [scheduleData]);

    return (
        <LayoutContentWrapper>
            <PageHeader>
                <BreadcumbBox>
                    <Breadcrumb.Item>일정</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/schedule/index">일정 목록</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>수정</Breadcrumb.Item>
                </BreadcumbBox>
            </PageHeader>
            <Descriptions title="일정 정보" bordered style={{ width: "100%" }}>
                <Descriptions.Item label="일정 명" span={4}>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="일정명 입력하세요."
                />
                </Descriptions.Item>
                <Descriptions.Item label="프로젝트 설정" span={4}>
                <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="프로젝트를 선택하세요"
                />
                </Descriptions.Item>
                <Descriptions.Item label="담당자 설정" span={4}>
                    <>
                        <Select
                            value={teamId}
                            style={{ width: 200 }}
                            onChange={(value) => { setTeamId(value); setManagerId('') }}
                        >
                            <Option value="">팀 설정</Option>
                            {teamOriginalData?.map((teamOriginalData) => (
                                <Option value={teamOriginalData.id}>{teamOriginalData.name}</Option>
                            ))}
                        </Select>
                        <Select
                            value={managerId}
                            style={{ width: 200, marginLeft: 10 }}
                            onChange={(value) => setManagerId(value)}
                        >
                            <Option value="">담당자 설정</Option>
                            {userOriginalData?.map((userOriginalData) => (
                                <Option value={userOriginalData.id}>{userOriginalData.name}</Option>
                            ))}
                        </Select>
                    </>
                </Descriptions.Item>
                <Descriptions.Item label="일정 소요일" span={4}>
                    <Input
                        value={useDate}
                        onChange={(e) => setUseDate(e.target.value)}
                        placeholder="일정 소요일을 입력하세요"
                    />
                </Descriptions.Item>
                <Descriptions.Item label="일정 시작일" span={4}>
                    <Input
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="제품명을 입력하세요"
                    />
                </Descriptions.Item>
            </Descriptions>
            <ButtonBox>
                <div></div>
                <div>
                    <Button onClick={() => history.goBack()}>취소</Button>
                    <Button type="primary" onClick={handleSave}>
                        등록
                    </Button>
                </div>
            </ButtonBox>
        </LayoutContentWrapper>
    );
};
export default Register;

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
