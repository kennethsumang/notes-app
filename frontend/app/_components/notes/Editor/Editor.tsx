import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import classes from "./Editor.module.css";
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import EditorTheme from './EditorTheme';
import "./styles.css";

interface Props {
  value: string;
  onChange: (newContent: string) => void;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const Editor: React.FC<Props> = function (props) {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    editorState: props.value,
    onError,
  };

  return (
    <div className={classes.container}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={(editorState) => {
              editorState.read(() => {
                props.onChange(JSON.stringify(editorState.toJSON()));
              });
            }} />
          </div>
        </div>
    </LexicalComposer>
    </div>
  );
}

export default Editor;