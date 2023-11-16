import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";
import "./style.css";

interface Props {
  readOnly?: boolean;
  value: string;
  setValue: (value: string) => void | undefined;
}

export function CodeEditor({ value, setValue, readOnly }: Props) {
  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <CodeMirror
      value={value}
      className="code-editor"
      readOnly={readOnly}
      height="300px"
      theme={darcula}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
}
