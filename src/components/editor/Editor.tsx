import React from 'react';
import FunctionEditor from './function';
import AdvancementEditor from './advancement';

interface IEditorProps {
  type: string;
  id: string;
}

export default function Editor(props: IEditorProps): JSX.Element {
  const { type, id } = props;
  switch (type) {
    case 'advancements':
      return <AdvancementEditor fileIdentifier={id} />;
    case 'functions':
      return <FunctionEditor fileIdentifier={id} />;
  }
}
