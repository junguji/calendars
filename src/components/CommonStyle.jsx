import styled from "@emotion/styled";

export const SubTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

//icon : 아이콘보다 큰사이즈로 설정 : 터치영역
export const IconButton = styled.button`
  min-width: 24px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PaginationBox = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  & .MuiPaginationItem-page.Mui-disabled {
    background: none;
  }
  & .MuiPaginationItem-root {
    opacity: 1;
    color: #888;
    background: none;
  }
  .MuiPaginationItem-icon {
    color: #222;
  }
  & .MuiPaginationItem-page.Mui-selected {
    background: none;
    font-size: 14px;
    font-weight: 500;
    opacity: 1;
    color: #0086e5;
    &:hover {
      background: none;
    }
  }

  & .MuiPaginationItem-page:hover {
    background: none;
  }
`;

export const LabelText = styled.p`
  font-size: 14px;
  font-weight: 500;
  min-width: 100px;
  width: 100px;
  margin-right: 8px;

  &.w_140 {
    min-width: 140px;
    width: 140px;
  }
  
  & > span {
    color: #0086e5;
    display: block;
    font-size: 12px;
    font-weight: 400;
  }
`;

export const InputSection = styled.div`
  margin-top: 24px;

  &.small {
    margin-top: 16px;
  }
`;

export const FilterBox = styled.div`
  margin: 16px 0 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  padding: 24px;
`;

export const InputFlexBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  & > div {
    margin-right: 4px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 12px 0;

  &.large {
    margin: 24px 0;
  }

  &.black {
    background: #222;
  }
`;

export const ContentsArea = styled.div`
  padding: 32px 24px 0;
`;

export const DatePicker = styled.div`
  display: flex;

  &.normal_datepicker span {
    height: 40px;
  }

  & > span {
    border-top: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    width: 16px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const RegisterButtonArea = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;

  & button:nth-of-type(2) {
    margin-left: 8px;
  }
`;
//settings > banner
export const FileArea = styled.div`
  margin-top: 52px;
`;

export const InfoBox = styled.div`
  padding: 4px 8px;
  & > p {
    color: #555;
    font-size: 12px;

    &.right {
      text-align: right;
    }
    &.bold {
      font-weight: 500;
    }

    &.blue {
      color: #0086e5;
    }
    &.gray {
      color: #888;
      & > span {
        color: #0086e5;
        margin-right: 10px;
      }
    }
    &.black {
      color: #222;
    }
    &.red {
      color: #dd3333;
    }
  }
`;
export const SearchNameList = styled.div`
  width: 320px;
  padding: 8px 0 24px;
  background: #ffffff;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  top: 50px;
  left: 108px;
  max-height: 190px;
  overflow-y: auto;
  overflow-x: hidden;

  &.w_240 {
    width: 240px;
  }

  & > button {
    white-space: nowrap;
    width: 100%;
    padding: 13px 0 13px 16px;
    text-align: left;
    & span {
      color: #0086e5;
    }
  }
`;
