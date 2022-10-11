import React from "react";
import loadable from "@loadable/component";
//antd에서 아이콘 가져오기
import {
  UserOutlined,
  ShopOutlined,
  PictureOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
  FundProjectionScreenOutlined,
  ReadOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
//회원 전용 루트
import { PUBLIC_ROUTE } from "./routes.constants";
import { Redirect } from "react-router";

//로그인 없이 이용가능 페이지
export const publicRoutes = [
  //첫시작 로그인으로 설정 => ('/' 해당 url 사용 안함)
  {
    exact: true,
    path: PUBLIC_ROUTE.ROOT,
    component: () => {
      if (localStorage.getItem("token")) {
        return <Redirect to="/user" />
      } else {
        return <Redirect to="/login" />
      }
    },
  },
  {
    exact: true,
    path: PUBLIC_ROUTE.LOGIN,
    component: loadable(() => import("../pages/auth/Login")),
  },
];

//로그인 시에만 이용가능 페이지
export const privateRoutes = [
  {
    exact: true,
    path: "/user",
    sidebar: {
      icon: <UserOutlined />,
      label: "회원 관리",
    },
    children: [
      {
        exact: true,
        path: "",
        sidebar: {
          label: "회원 목록",
        },
        component: loadable(() => import("../pages/admin/user/List")),
      },
      {
        exact: true,
        visible: false,
        path: "/detail/:id",
        component: loadable(() => import("../pages/admin/user/Detail")),
      },
      {
        exact: true,
        visible: false,
        path: "/register",
        component: loadable(() => import("../pages/admin/user/Register")),
      },
      {
        exact: true,
        visible: false,
        path: "/modify/:id",
        component: loadable(() => import("../pages/admin/user/Modify")),
      },
      {
        exact: true,
        path: "/team",
        sidebar: {
          label: "팀 목록",
        },
        component: loadable(() => import("../pages/admin/team/List")),
      },
      {
        exact: true,
        visible: false,
        path: "/team/detail/:id",
        component: loadable(() => import("../pages/admin/team/Detail")),
      },
      {
        exact: true,
        path: "/position",
        sidebar: {
          label: "직책 목록",
        },
        component: loadable(() => import("../pages/admin/position/List")),
      },

      {
        exact: true,
        visible: false,
        path: "/position/detail/:id",
        component: loadable(() => import("../pages/admin/position/Detail")),
      },
    ]
  },
  {
    exact: true,
    path: "/project",
    sidebar: {
      icon: <ReadOutlined />,
      label: "프로젝트",
    },
    children: [
      {
        exact: true,
        path: "",
        sidebar: {
          label: "프로젝트 목록",
        },
        component: loadable(() => import("../pages/admin/project/List")),
      },
      {
        exact: true,
        visible: false,
        path: "/detail/:id",
        component: loadable(() => import("../pages/admin/project/Detail")),
      },
      {
        exact: true,
        visible: false,
        path: "/modify/:id",
        component: loadable(() => import("../pages/admin/project/Modify")),
      },
      {
        exact: true,
        visible: false,
        path: "/register",
        component: loadable(() => import("../pages/admin/project/Register")),
      },
    ]
  },
  {
    exact: true,
    path: "/schedule",
    sidebar: {
      icon: <ContactsOutlined />,
      label: "일정",
    },
    children: [
      {
        exact: true,
        path: "",
        sidebar: {
          label: "일정 목록",
        },
        component: loadable(() => import("../pages/admin/schedule/List")),
      },
      {
        exact: true,
        visible: false,
        path: "/detail/:id",
        component: loadable(() => import("../pages/admin/schedule/Detail")),
      },
      {
        exact: true,
        visible: false,
        path: "/modify/:id",
        component: loadable(() => import("../pages/admin/schedule/Modify")),
      },
      {
        exact: true,
        visible: false,
        path: "/register",
        component: loadable(() => import("../pages/admin/schedule/Register")),
      },
    ],
  },
];
