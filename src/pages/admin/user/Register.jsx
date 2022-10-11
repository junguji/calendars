import React, {useEffect, useState} from "react";

import {
    Breadcrumb,
    Button,
    Descriptions,
    Input,
    message,
    Select,
    Radio,
    DatePicker,
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
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [teamId, setTeamId] = useState("");
    const [positionId, setPositionId] = useState("");
    const [password, setPassword] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [isAdmin, setIsAdmin] = useState(0);

    const { data: teamData } = useSWR(`/admin/team`);
    const teamOriginalData = teamData?.data?.teams;

    const { data: positionData } = useSWR(`/admin/position`);
    const positionOriginalData = positionData?.data?.positions;

    const handleSave = async () => {
        if (name === "" ||
            email === "" ||
            password === "" ||
            teamId === "" ||
            positionId === "" ||
            joinDate === "" ||
            isAdmin === ""
        ) {
            message.warning("필수 값을 모두 입력해주세요.");
            return false;
        }

        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("team_id", teamId);
        formdata.append("position_id", positionId);
        formdata.append("join_date", joinDate);
        formdata.append("is_admin", isAdmin);

        const {
            data: { success, alert, data: data2 },
        } = await api.post("/admin/user/register", formdata);

        if (success) {
            message.success("등록되었습니다");
            history.replace("/user");
        } else {
            message.error(alert);
        }
    };

    function onChange(date, dateString) {
        setJoinDate(dateString)
    }

    return (
        <LayoutContentWrapper>
            <PageHeader>
                <BreadcumbBox>
                    <Breadcrumb.Item>회원</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/user">회원 목록</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>등록</Breadcrumb.Item>
                </BreadcumbBox>
            </PageHeader>
            <Descriptions title="회원 정보" bordered style={{ width: "100%" }}>
                <Descriptions.Item label="이메일" span={4}>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력하세요"
                />
                </Descriptions.Item>
                <Descriptions.Item label="비밀번호" span={4}>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                />
                </Descriptions.Item>
                <Descriptions.Item label="회원명" span={4}>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="회원명을 입력하세요"
                />
                </Descriptions.Item>
                <Descriptions.Item label="연락처" span={4}>
                <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="연락처 입력하세요"
                />
                </Descriptions.Item>
                <Descriptions.Item label="소속 팀 선택" span={4}>
                    <Select
                        style={{ width: 300 }}
                        placeholder="소속 팀을 선택해 주세요."
                        onChange={(value) => setTeamId(value)}
                    >
                        {teamOriginalData?.map((teamData) => (
                            <Option value={teamData?.id}>{teamData?.name}</Option>
                        ))}
                    </Select>
                </Descriptions.Item>
                <Descriptions.Item label="직책 선택" span={4}>
                    <Select
                        style={{ width: 300 }}
                        placeholder="직책을 선택해 주세요."
                        onChange={(value) => setPositionId(value)}
                    >
                        {positionOriginalData?.map((positionData) => (
                            <Option value={positionData?.id}>{positionData?.name}</Option>
                        ))}
                    </Select>
                </Descriptions.Item>
                <Descriptions.Item label="입사 일자" span={4}>
                    <ConfigProvider locale={locale}>
                        <div className="App">
                            <DatePicker
                                onChange={onChange}
                            />
                        </div>
                    </ConfigProvider>
                </Descriptions.Item>
                <Descriptions.Item label="관리자 여부" span={4}>
                    <Radio.Group onChange={(e) => setIsAdmin(e.target.value)} value={isAdmin}>
                        <Radio value={0}>OFF</Radio>
                        <Radio value={1}>ON</Radio>
                    </Radio.Group>
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
