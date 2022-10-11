import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import { Typography } from "antd";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxios from "../api/api";

const Editor = ({ value, handleContents }) => {
  const api = useAxios();
  const QuillRef = useRef();

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
        } = await api.post("/admin/editor/image", fd);

        if (success) {
          //추가부분
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src="${dd?.image_url}" alt="이미지 태그가 삽입됩니다." />`
            );
          }
          return;
        } else {
          // message.error(alert);
        }
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <EditorBox>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        theme="snow"
        value={value || ""}
        onChange={handleContents}
        modules={modules}
        formats={formats}
        bounds={".app"}
        placeholder="내용을 입력해주세요."
      />
    </EditorBox>
  );
};

export default Editor;

const EditorBox = styled.div`
  & b,
  & strong {
    font-weight: bold;
  }

  & .ql-editor {
    height: 550px;
  }
`;
