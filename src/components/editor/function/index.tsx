import React, { useEffect, useState } from 'react';
import './TextEditor';
import $ from 'jquery';

interface ITextEditorProps {
  fileIdentifier?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FunctionEditor(props: ITextEditorProps): JSX.Element {
  const settings = JSON.parse(sessionStorage.getItem('settings'));
  const [editorLines, setEditorLines] = useState([
    <div key="EditorLineDefault" className="editor-line">
      1
    </div>,
  ]);
  const [editorContent, setEditorContent] = useState([
    <div key="EditorContentDefault" className="editor-content">
      Def
    </div>,
  ]);

  const updateContent = (content: string) => {
    const _lines: JSX.Element[] = [];
    const _content: JSX.Element[] = [];
    content.split(/\n/g).forEach((line, index) => {
      _lines.push(
        <div key={`EditorLine${index}`} className="editor-line">
          {index + 1}
        </div>
      );
      _content.push(
        <div key={`EditorContent${index}`} className="editor-content">
          {line}
        </div>
      );
    });
    setEditorLines(_lines);
    setEditorContent(_content);
  };

  const updateLine = (line: number, content: string) => {
    const _content = editorContent;
    _content[line] = (
      <div key={`EditorContent${line}`} className="editor-line">
        {content}
      </div>
    );
    setEditorContent(_content);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const insertLine = (line: number) => {
    const _content = editorContent;
    const lines = editorLines.length;
    // Add a empty line
    _content.splice(line, 0, <div key={`EditorContent${line}`} className="editor-line" />);
    // Update number at last
    setEditorLines([
      ...editorLines,
      <div key={`EditorLine${lines}`} className="editor-line">
        {lines + 1}
      </div>,
    ]);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateLines = () => {
    const _lines: JSX.Element[] = [];
    editorContent.forEach((_, index) => {
      _lines.push(
        <div key={`EditorLine${index}`} className="editor-line">
          {index + 1}
        </div>
      );
    });
    setEditorLines(_lines);
  };

  useEffect(() => {
    // TEST
    updateContent('one\ntwo\nthree\nAnd here is the fourth line');
  }, []);

  useEffect(() => {
    $('.editor-content,.editor-line').css({
      fontFamily: settings.font.family,
      fontSize: settings.font.size,
      height: settings.font.size * 1.2,
    });
  }, [editorLines, editorContent]);

  useEffect(() => {
    if (editorContent.length !== editorLines.length) {
      updateLines();
    }
  }, [editorContent]);

  return (
    <>
      <div className="editor">
        <div id="editor-lines">{editorLines}</div>
        <div id="editor-content">{editorContent}</div>
      </div>
    </>
  );
}
