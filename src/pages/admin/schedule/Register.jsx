import React, {useEffect, useState} from "react";

import {
    Breadcrumb,
    Button,
    Descriptions,
    Input,
    message,
    Popconfirm,
    DatePicker,
    Select,
    Upload,
    Radio,
    ConfigProvider,
} from "antd";
import PageHeader from "../../../components/PageHeader";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import {Link, useHistory, useParams} from "react-router-dom";
import styled from "@emotion/styled";
import useAxios from "../../../api/api";
import useSWR from "swr";
import moment from "moment";
import locale from "antd/lib/locale/ko_KR";
import "moment/locale/ko";

moment.locale("ko");

const Register = () => {
    const history = useHistory();
    const api = useAxios();

    const { Option } = Select;

    const [name, setName] = useState("");
    const [projectId, setProjectId] = useState("");
    const [managerId, setManagerId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [useDate, setUseDate] = useState("");
    const [status, setStatus] = useState(0);

    const [teamId, setTeamId] = useState("");

    const { data: teamData } = useSWR(`/admin/team`);
    const teamOriginalData = teamData?.data?.teams;

    const { data: userData } = useSWR(`/admin/user?team_id=${teamId}&info=1`);
    const userOriginalData = userData?.data?.users;

    const { data: projectDate } = useSWR(`/admin/project?info=1`);
    const projectOriginalData = projectDate?.data?.projects;

    function onChange(date, dateString) {
        setStartDate(dateString)
    }

    const handleSave = async () => {
        if (name === "" ||
            projectId === "" ||
            managerId === "" ||
            startDate === "" ||
            useDate === ""
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
        } = await api.post("/admin/schedule/register", formdata);

        if (success) {
            message.success("등록되었습니다");
            history.replace("/schedule");
        } else {
            message.error(alert);
        }
    };

    return (
        <LayoutContentWrapper>
            <PageHeader>
                <BreadcumbBox>
                    <Breadcrumb.Item>일정</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/schedule/index">일정 목록</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>등록</Breadcrumb.Item>
                </BreadcumbBox>
            </PageHeader>
            <Descriptions title="일정 정보" bordered style={{ width: "100%" }}>
                <Descriptions.Item label="프로젝트 설정" span={4}>
                    <Select
                        value={projectId}
                        style={{ width: 200 }}
                        onChange={(value) => setProjectId(value)}
                    >
                        <Option value="">프로젝트 선택</Option>
                        {projectOriginalData?.map((projectData) => (
                            <Option value={projectData.id}>{projectData.name}</Option>
                        ))}
                    </Select>
                </Descriptions.Item>
                <Descriptions.Item label="일정명" span={4}>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="일정명을 입력하세요"
                />
                </Descriptions.Item>
                <Descriptions.Item label="담당자 설정" span={4}>
                    <>
                        <Select
                            value={teamId}
                            style={{ width: 200 }}
                            onChange={(value) => {setTeamId(value); setManagerId('') }}
                        >
                            <Option value="">팀 선택</Option>
                            {teamOriginalData?.map((teamData) => (
                                <Option value={teamData.id}>{teamData.name}</Option>
                            ))}
                        </Select>
                        <Select
                            value={managerId}
                            style={{ width: 200, marginLeft: 10 }}
                            onChange={(value) => setManagerId(value)}
                        >
                            <Option value="">담당자 선택</Option>
                            {userOriginalData?.map((userData) => (
                                <Option value={userData.id}>{userData.name}</Option>
                            ))}
                        </Select>
                    </>
                </Descriptions.Item>
                <Descriptions.Item label="일정 일자" span={4}>
                    <Input
                        value={useDate}
                        onChange={(e) => setUseDate(e.target.value)}
                        placeholder="일정 일자를 입력하세요"
                    />
                </Descriptions.Item>
                <Descriptions.Item label="일정 시작일" span={4}>
                    <ConfigProvider locale={locale}>
                        <div className="App">
                            <DatePicker
                                onChange={onChange}
                            />
                        </div>
                    </ConfigProvider>
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
