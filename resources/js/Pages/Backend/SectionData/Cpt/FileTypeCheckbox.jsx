import React from "react";

const FileTypeCheckbox = ({name, value, data, setData}) => {
    return (
        <div className="me-3">
            <div className="my-3">
                <input
                    id={value}
                    type="checkbox"
                    className="p-2 rounded-md me-3"
                    defaultChecked={false}
                    value={value}
                    onChange={(e) => setData("loopable", e.target.checked)}
                />
                <label htmlFor={value}> {name} </label>
            </div>
        </div>
    );
};

export default FileTypeCheckbox;
