import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Rodal from "rodal";

const CreateFolder = ({ visible, setVisible }) => {
    const [name, setName] = useState("");
    const {parent_id} = usePage().props;
    function submit(e) {
        e.preventDefault();
        router.post(route('media.store'), {name : name, parent_id : parent_id, type : 'folder'}, {
            onSuccess : () => {
                setVisible(false);
                toast.success("Folder created successfully");
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
    return (
        <div>
            <Rodal
                visible={visible}
                onClose={() => setVisible(false)}
                width={400}
                height={300}
            >
                <form onSubmit={submit}>
                    <div className="my-3">
                        <label htmlFor="name" className="text-xl font-bold">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="p-2 w-full rounded-md my-3"
                            onChange={e => setName(e.target.value)}
                        />
                        <div className="text-end my-3">
                            <button type="submit" className="p-2 bg-slate-900 text-white rounded-md"> Save </button>
                        </div>
                    </div>
                </form>
            </Rodal>
        </div>
    );
};

export default CreateFolder;
