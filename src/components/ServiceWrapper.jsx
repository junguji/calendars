import React, { useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Layout, Menu, Popconfirm, Popover } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

import { privateRoutes } from "../routes/routes";
import constant from "../data/constant";
import { useLogout } from "../recoil/auth";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const ServiceWrapper = ({ children }) => {
    const logout = useLogout();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isVisibleProfilePopover, setIsVisibleProfilePopover] = useState(false);

    const pathName = location.pathname;
    const rootPath = pathName.substring(0, pathName.indexOf("/", 2));
    const pathArray = pathName.split("/")

    const openKey = [];
    openKey[0] = pathArray.length > 2 ? rootPath : pathName;
    if (pathArray.length > 3) {
        openKey[1] = '/' + pathArray[1] + '/' + pathArray[2]
    }

    return (
        <Layout>
            <Sider
                collapsed={isCollapsed}
                onCollapse={(collapsedState) => setIsCollapsed(collapsedState)}
                width={260}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    background: "white",
                    borderRight: "1px solid #f0f0f0",
                }}
            >
                {!isCollapsed && (
                    <LogoImage src={require("../assets/logo.png").default} />
                )}
                <Menu
                    mode="inline"
                    activeKey={location.pathname}
                    defaultOpenKeys={openKey}
                    selectedKeys={[location.pathname]}
                >
                    {privateRoutes.map((parentRoute) =>
                        (
                            parentRoute.children ? (
                                <SubMenu
                                    key={parentRoute.path}
                                    icon={Object(parentRoute.sidebar).icon}
                                    title={Object(parentRoute.sidebar).label}
                                    style={{ fontSize: 14 }}
                                >
                                    {parentRoute.children.map(
                                        ({ visible = true, ...childrenRoute }) =>
                                            childrenRoute?.sub ? (<SubMenu
                                                    key={`${parentRoute.path}${childrenRoute.path}`}
                                                    title={Object(childrenRoute.sidebar).label}
                                                    style={{ fontSize: 14 }}
                                                >
                                                    {childrenRoute.sub.map(({ visible = true, ...sub }) =>
                                                            visible && (
                                                                <Menu.Item
                                                                    key={`${parentRoute.path}${childrenRoute.path}${sub.path}`}
                                                                    icon={Object(sub.sidebar).icon}
                                                                >
                                                                    <NavLink
                                                                        to={`${parentRoute.path}${childrenRoute.path}${sub.path}`}
                                                                        className="nav-text"
                                                                        style={{ fontSize: 14 }}
                                                                    >
                                                                        {Object(sub.sidebar).label}
                                                                    </NavLink>
                                                                </Menu.Item>
                                                            )
                                                    )}
                                                </SubMenu>)
                                                : (
                                                    visible && (
                                                        <Menu.Item
                                                            key={`${parentRoute.path}${childrenRoute.path}`}
                                                            icon={Object(childrenRoute.sidebar).icon}
                                                        >
                                                            <NavLink
                                                                to={`${parentRoute.path}${childrenRoute.path}`}
                                                                className="nav-text"
                                                                style={{ fontSize: 14 }}
                                                            >
                                                                {Object(childrenRoute.sidebar).label}
                                                            </NavLink>
                                                        </Menu.Item>
                                                    )
                                                )
                                    )}
                                </SubMenu>
                            )  : (
                                <Menu.Item
                                    key={parentRoute.path}
                                    icon={Object(parentRoute.sidebar).icon}
                                >
                                    <NavLink
                                        to={parentRoute.path}
                                        className="nav-text"
                                        style={{ fontSize: 14 }}
                                    >
                                        {Object(parentRoute.sidebar).label}
                                    </NavLink>
                                </Menu.Item>
                            )
                        )
                    )}
                </Menu>
            </Sider>
            <Layout
                style={{
                    marginLeft: isCollapsed ? 80 : 260,
                    transition: "all 0.2s",
                    minHeight: "100vh",
                    backgroundColor: "white",
                }}
            >
                <Header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0px 15px",
                        backgroundColor: "white",
                        boxShadow: "0 2px 8px #f0f1f2",
                    }}
                >
                    <MenuOutlined
                        style={{ fontSize: 20 }}
                        onClick={() => setIsCollapsed((prevState) => !prevState)}
                    />
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        content={
                            <PopoverContents>
                                <Popconfirm
                                    title="로그아웃 하시겠습니까?"
                                    onConfirm={logout}
                                    okText="확인"
                                    cancelText="취소"
                                >
                  <span style={{ color: "black", cursor: "pointer" }}>
                    로그아웃
                  </span>
                                </Popconfirm>
                            </PopoverContents>
                        }
                        visible={isVisibleProfilePopover}
                        onVisibleChange={(visibleState) =>
                            setIsVisibleProfilePopover(visibleState)
                        }
                    >
                        <UserOutlined />
                    </Popover>
                </Header>
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: "center" }}>{constant.footerText}</Footer>
            </Layout>
        </Layout>
    );
};

const ProfileImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  cursor: pointer;
`;

const PopoverContents = styled.div`
  width: 150px;
`;

const LogoImage = styled.img`
  width: 100%;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  padding: 40px;
`;

export default ServiceWrapper;
