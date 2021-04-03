import React, { useEffect, useState } from 'react';
import './TextEditor';

export default function TextEditor(): JSX.Element {
  const [lines, setLines] = useState(<tbody />);
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

  const settings = JSON.parse(sessionStorage.getItem('settings'));
  const fontStyle: React.CSSProperties = {
    fontSize: settings.font.size,
    fontFamily: settings.font.family,
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div id="type-receiver-parent">
        <textarea id="type-receiver" style={fontStyle} />
      </div>
      <div id="editor" style={fontStyle}>
        <table>{lines}</table>
      </div>
    </div>
  );
}
