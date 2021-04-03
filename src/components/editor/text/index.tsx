import React, { useEffect, useRef, useState } from 'react';
import './TextEditor';

export default function TextEditor(): JSX.Element {
  const [lines, setLines] = useState(<tbody />);
  const typeReceiverRef = useRef<HTMLInputElement>();
  const editorRef = useRef<HTMLDivElement>();
  const refreshContent = (content: string) => {
    const contentLines = content.split('\n');
    const _lines: JSX.Element[] = [];
    contentLines.forEach((line: string, index: number) => {
      _lines.push(
        <tr key={`IndexedLineRow${index}`}>
          <td className="row-num">{index + 1}</td>
          <td className="content">{line}</td>
        </tr>
      );
    });
    setLines(<tbody>{_lines}</tbody>);
  };
  // This will only available until edit is done
  useEffect(() => {
    refreshContent('Nope!\n'.repeat(100));
  }, []);

  useEffect(() => {
    const editorElement = editorRef.current;
    const typeReceiverElement = typeReceiverRef.current;
    editorElement.addEventListener('click', () => {
      typeReceiverElement.focus();
    });
    typeReceiverElement.addEventListener('keydown', (e: KeyboardEvent) => {
      e.preventDefault();
    });
  }, []);

  const settings = JSON.parse(sessionStorage.getItem('settings'));
  const fontStyle: React.CSSProperties = {
    fontSize: settings.font.size,
    fontFamily: settings.font.family,
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div id="editor" style={fontStyle} ref={editorRef}>
        <table>{lines}</table>
      </div>
      <input id="type-receiver" ref={typeReceiverRef} />
    </div>
  );
}
