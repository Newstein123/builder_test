import FrontendLayout from "@/Layouts/FrontendLayout";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, usePage } from "@inertiajs/react";
import CreateFile from "./CreateFile";
import CreateFolder from "./CreateFolder";

const Index = ({ media }) => {
    const [createFolderVisible, setCreateFolderVisible] = useState(false);
    const [createFileVisible, setCreateFileVisible] = useState(false);
    const {old_parent_id, parent_id} = usePage().props;

    return (
        <div className="m-10">
            <Toaster />
            <div className="p-3">
                <div className="flex justify-between">
                    <div className="text-red-700 font-bold">
                        <Link href={route('media.index', {'parent_id' : old_parent_id})}> Back </Link>
                    </div>
                    <div className="text-end">
                        <div className="flex justify-between">
                            <button
                                className="bg-slate-300 p-2 text-slate-950 rounded-md me-3"
                                onClick={() => setCreateFolderVisible(true)}
                            >
                                Create A Folder
                            </button>
                            <button
                                className="bg-slate-300 p-2 text-slate-950 rounded-md"
                                onClick={() => setCreateFileVisible(true)}
                            >
                                Create A File
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-bold"> All Folders  </h3>
                <ul>
                {media.length > 0 ? (
                    media.map((item) => (
                        <li className="border-2 border-green-600 w-full p-2 rounded-md cursor-pointer my-3" key={item.id}>
                            {item.type == "folder" ? 
                            <Link href={route('media.index', {'parent_id' : item.id, 'old_parent_id' : parent_id})}>  
                                {item.name}
                            </Link> : 
                            <>
                                <div className="flex justify-between items-center">
                                    <img src={`/storage/${item.path}`} alt="" style={{height : 50, width : 50}}/>
                                    <div>  
                                        <span
                                           className="p-2 bg-blue-400 text-slate-800 rounded-md me-3" 
                                        >
                                            {item.size} KB
                                        </span>
                                        <span 
                                            className="p-2 bg-pink-400 text-slate-800 rounded-md me-3"> {item.name} </span>
                                        <span 
                                            className="p-2 bg-yellow-400 text-slate-800 rounded-md me-3"
                                        > {item.mimetype}  </span>
                                    </div>
                                </div>
                            </>
                            }
                        </li>
                    ))
                ) : (
                    <li className="text-dange text-red-700">
                        No Folder 
                    </li>
                )}
                </ul>
            </div>
            {/* Create Modal  */}
            <CreateFolder visible={createFolderVisible} setVisible={setCreateFolderVisible} />
            <CreateFile visible={createFileVisible} setVisible={setCreateFileVisible} />
        </div>
    );
};

Index.layout = (page) => <FrontendLayout children={page} />;
export default Index;
