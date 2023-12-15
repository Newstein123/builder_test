import React from "react";
import FileTypeCheckbox from "./FileTypeCheckbox";

const FileTypeAccept = ({ data, setData }) => {
    return (
        <div>
            <div className="flex items-center">
                {/* pdf  */}
                <FileTypeCheckbox
                    name="PDF"
                    value="pdf"
                    setData={setData}
                    data={data}
                />
                <FileTypeCheckbox
                    name="Image"
                    value="img"
                    setData={setData}
                    data={data}
                />
                <FileTypeCheckbox
                    name="Video"
                    value="video"
                    setData={setData}
                    data={data}
                />
                <FileTypeCheckbox
                    name="Audio"
                    value="audio"
                    setData={setData}
                    data={data}
                />
                <FileTypeCheckbox
                    name="Plain Text"
                    value="plain_text"
                    setData={setData}
                    data={data}
                />
            </div>
            <div className="my-3">
                <p className="text-slate-800 font-bold text-xl">
                    Custom Message
                </p>
                <input
                    type="text"
                    className="p-2 w-full rounded-md my-2"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
            </div>
        </div>
    );
};

export default FileTypeAccept;
