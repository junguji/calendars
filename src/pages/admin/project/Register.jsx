import React, {useEffect, useState} from "react";

import {
    Breadcrumb,
    Button,
    Descriptions,
    DatePicker,
    Input,
    message,
    Select,
    ConfigProvider,
} from "antd";

import PageHeader from "../../../components/PageHeader";
import LayoutContentWrapper from "../../../components/LayoutContentWrapper";
import {Link, useHistory, useParams} from "react-router-dom";
import styled from "@emotion/styled";
import useAxios from "../../../api/api";
import NumberPoint from "../../../auth/NumberPoint";
import NumberChange from "../../../auth/NumberChange";
import moment from "moment";
import locale from "antd/lib/locale/ko_KR";
import "moment/locale/ko";

moment.locale("ko");

const Register = () => {
    const history = useHistory();
    const api = useAxios();

    const { Option } = Select;

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [client, setClient] = useState("");
    const [contractDate, setContractDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    function onChangeContract(date, dateString) {
        setContractDate(dateString)
    }

    function onChangeStart(date, dateString) {
        setStartDate(dateString)
    }

    function onChangeEnd(date, dateString) {
        setEndDate(dateString)
    }

    const handleSave = async () => {
        if (name === "" ||
            price === "" ||
            client === "" ||
            contractDate === "" ||
            startDate === "" ||
            endDate === ""
        ) {
            message.warning("필수 값을 모두 입력해주세요.");
            return false;
        }

        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("price", price);
        formdata.append("client", client);
        formdata.append("contract_date", contractDate);
        formdata.append("start_date", startDate);
        formdata.append("end_date", endDate);

        const {
            data: { success, alert, data: data2 },
        } = await api.post("/admin/project/register", formdata);

        if (success) {
            message.success("등록되었습니다");
            history.replace("/project");
        } else {
            message.error(alert);
        }
    };

    return (
        <LayoutContentWrapper>
            <PageHeader>
                <BreadcumbBox>
                    <Breadcrumb.Item>프로젝트</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/product/index">프로젝트 목록</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>등록</Breadcrumb.Item>
                </BreadcumbBox>
            </PageHeader>
            <Descriptions title="프로젝트 정보" bordered style={{ width: "100%" }}>
                <Descriptions.Item label="프로젝트명" span={4}>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="프로젝트명을 입력하세요"
                />
                </Descriptions.Item>
                <Descriptions.Item label="견적" span={4}>
                    <Input
                        value={NumberPoint(price)}
                        onChange={(e) => setPrice(NumberChange(e.target.value))}
                        placeholder="프로젝트 견적을 입력하세요"
                    />
                </Descriptions.Item>
                <Descriptions.Item label="클라이언트" span={4}>
                <Input
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="클라이언트를 입력하세요"
                />
                </Descriptions.Item>
                <Descriptions.Item label="계약일자" span={4}>
                    <ConfigProvider locale={locale}>
                        <div className="App">
                            <DatePicker
                                onChange={onChangeContract}
                            />
                        </div>
                    </ConfigProvider>
                </Descriptions.Item>
                <Descriptions.Item label="프로젝트 시작일" span={4}>
                    <ConfigProvider locale={locale}>
                        <div className="App">
                            <DatePicker
                                onChange={onChangeStart}
                            />
                        </div>
                    </ConfigProvider>
                </Descriptions.Item>
                <Descriptions.Item label="프로젝트 마감일" span={4}>
                    <ConfigProvider locale={locale}>
                        <div className="App">
                            <DatePicker
                                onChange={onChangeEnd}
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
