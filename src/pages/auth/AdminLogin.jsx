import React from "react";
import { useHistory } from "react-router";
import { Button, Form, Input, message } from "antd";
import styled from "styled-components";
import useAxios from "../../api/api";
import Background from "../../assets/login-background.png";

const Login = () => {
  const history = useHistory();

  const axios = useAxios();

  const handleFinish = async (values) => {
    try {
      const {
        data: { data, success, alert },
      } = await axios.post("/admin/login", { ...values });

      if (success) {
        localStorage.setItem("token", data?.token?.access_token);
        localStorage.setItem("refresh_token", data?.token?.refresh_token);
        localStorage.setItem("admin_type", data?.admin_type);

        if (localStorage.getItem("token")) {
          if (data?.admin_type === 1) {
            history.push("admin/project/index");
          } else {
            history.push("/admin/index");
          }
          window.location.reload();
        }
      } else {
        message.error(alert);
      }
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      message.error(errorMessage);
    }
  };

  return (
    <LoginContainer>
      <LoginAbsolute />
      <LoginBox>
        <StyledForm onFinish={handleFinish}>
          <StyledFormItem
            name="login_id"
            rules={[{ required: true, message: "아이디를 입력해주세요." }]}
          >
            <Input placeholder="이메일" size="large" />
          </StyledFormItem>
          <StyledFormItem
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
          >
            <Input.Password placeholder="비밀번호" size="large" />
          </StyledFormItem>
          <Button type="primary" htmlType="submit" style={{ height: 40 }}>
            로그인
          </Button>
        </StyledForm>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${Background}) no-repeat center/cover;
`;

//반투명 배경
const LoginAbsolute = styled.div`
  display: block;
  position: absolute;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 50px;
  box-sizing: border-box;
  z-index: 200;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px;
`;
