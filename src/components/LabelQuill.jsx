import styled from "@emotion/styled";
import React, { useMemo, useRef } from "react";

////
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxios from "../api/api";
import { LabelText } from "./CommonStyle";

const LabelQuill = ({ title, value, handleContents }) => {
  const QuillRef = useRef();
  const api = useAxios();

  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");

    let url = "";

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;

      if (file !== null) {
        const fd = new FormData();
        fd.append("image", file[0]);

        const {
          data: { success, alert, data: dd },
        } = await api.post("/edit/upload", fd);

        if (success) {
          //추가부분
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src="${dd?.link}" alt="이미지 태그가 삽입됩니다." />`
            );
          }
          return;
        } else {
          // message.error(alert);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      // imageResize: {
      //   displaySize: true,
      // },
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video", "link"],
        ],

        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <EditorBox>
      {title && <LabelText>{title}</LabelText>}
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={value || ""}
        onChange={handleContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </EditorBox>
  );
};

export default LabelQuill;

const EditorBox = styled.div`
  margin-bottom: 30px;
  width: 100%;
  & > p {
    margin-bottom: 25px;
  }

  & .ql-editor {
    height: 550px;
  }
`;
