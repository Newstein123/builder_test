import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";



const MyCodeEditor = ({name, value, setData, data, lang}) => {
    console.log(name);
    const codeEditorStyle = {
        fontSize: 12,
        backgroundColor: "#000",
        fontFamily:"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        overflow: "scroll", // Make it scrollable
    };

    return (
        <div>
            <p className="text-slate-800 font-bold text-xl"> {name} </p>
            <CodeEditor
                value={value}
                language={lang}
                placeholder="Please Enter Layout Html Code"
                onChange={(evn) => setData(data, evn.target.value)}
                padding={15}
                style={codeEditorStyle}
                className="mt-10 rounded-md"
            />
        </div>
    );
};

export default MyCodeEditor;
