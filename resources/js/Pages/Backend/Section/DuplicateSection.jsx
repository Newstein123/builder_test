import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Rodal from "rodal";

const DuplicateSection = ({setDupSecVisible, dupSecVisible}) => {
    const [errors, setErrors] = useState([])
    const [sections, setSections] = useState([])
    const {templates, template_id} = usePage().props;
    const {data, setData, reset} = useForm({
        'template_id' : template_id,
        'section_id' : '',
    });

    const hanldeTemplateChange = (id) => {
        const filteredResults = templates.filter(item => item.id == id);
        setSections(filteredResults[0].sections)
    }

    function submit (e) {
        e.preventDefault()
        router.post(route('section.duplicate'), data, {
            onSuccess : () => {
                toast.success('Section Duplicate Successfully');
                setDupSecVisible(false)
                reset()
            },
            onError : (err) => {
                setErrors(err)
            }
        })
    }

    return (
        <div>
            <Rodal
                visible={dupSecVisible}
                onClose={() => setDupSecVisible(false)}
                width={400}
                height={300}
            >
                <form onSubmit={submit}>
                    {/* Template Id  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Select Template  
                        </p>
                        <select
                            onChange={(e) => hanldeTemplateChange(e.target.value)}
                            className="w-full p-2 rounded-md "
                        > 
                            <option value=""> Choose Template </option>
                            {
                                templates.map(item => (
                                    <option key={item.id} value={item.id}> {item.name} </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Section Id  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Select Sections  
                        </p>
                        <select
                            onChange={(e) => setData('section_id', e.target.value)}
                            className="w-full p-2 rounded-md "
                            value={data.section_id}
                        > 
                            <option value=""> Choose Section </option>
                            {
                                sections.length > 0 &&
                                sections.map(item => ( 
                                    <option value={item.id} key={item.id}> {item.name} </option>
                                ))
                            }
                        </select>
                    </div>
                    {errors.section_id && (
                        <div className="text-red-700 my-3"> {errors.section_id} </div>
                    )}
                    
                    <div className="text-end">
                        <button
                            type="submit"
                            className="p-2 bg-black text-white rounded-md"
                        >
                            Duplicate
                        </button>
                    </div>
                </form>
            </Rodal>
        </div>
    );
};

export default DuplicateSection;
