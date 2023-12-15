import React from "react";

const CharCount = ({data, setData}) => {
    return (
        <div>
            <div className="flex items-center">
                <div className="w-3/10">
                    <div className="my-3 me-3">
                        <select className="w-full rounded-md">
                            <option value="between"> Between </option>
                            <option value="atLeast"> At Least </option>
                            <option value="notMoreThan"> Not More Than </option>
                        </select>
                    </div>
                </div>
                <div className="w-3/10">
                    <div className="my-3 me-3">
                        <input
                            type="number"
                            value="min"
                            placeholder="Min"
                            className="w-full rounded-md"
                        />
                    </div>
                </div>
                <div className="w-1/10">
                    <div className="my-3 me-3">
                        <p className="text-center"> And </p>
                    </div>
                </div>
                <div className="w-3/10">
                    <div className="my-3">
                        <input
                            type="number"
                            value="max"
                            placeholder="Max"
                            className="w-full rounded-md"
                        />
                    </div>
                </div>
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

export default CharCount;
