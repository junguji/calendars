import { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default (initialValue) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (initialValue) {
      const blocksFromHtml = htmlToDraft(initialValue);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorStates = EditorState.createWithContent(contentState);

      setEditorState(editorStates);
    }
  }, [initialValue]);

  const setEditorValue = (changeValue) => {
    const editorToHtml = draftToHtml(
      convertToRaw(changeValue.getCurrentContent())
    );
    setEditorState(changeValue);

    return editorToHtml;
  };

  return { editorValue: editorState, setEditorValue };
};
