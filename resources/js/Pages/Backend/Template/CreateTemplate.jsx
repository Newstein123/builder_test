import FrontendLayout from "@/Layouts/FrontendLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import CreateSection from "@/Components/Template/CreateSection";

const Create = ({ sections, categories}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);
    const codeEditorStyle = {
        fontSize: 12,
        backgroundColor: "#000",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        overflow: 'scroll', // Make it scrollable
        maxHeight: '300px',
    }
    const {data, setData} = useForm({
        'name' : "",
        'layout' : "",
        'category_id' : "",
        'content' : [],
        'css' : "", 
        'js' : "",
        'sections' : [],
        'links' : "", 
        'scripts' : "", 
    })
   

    const handleSelect = (value, id) => {
        setSelectedItems((prevSelectedItems) => {
            const isValueSelected = prevSelectedItems.includes(value);
        
            if (isValueSelected) {
              return prevSelectedItems.filter((item) => item !== value);
            } else {
              return [...prevSelectedItems, value];
            }
          });

        setSelectedSections((prevData) => {
            const isValueSelected = prevData.includes(id);
            if(isValueSelected) {
                return prevData.filter((item) => item !== id);
            } else {
                return [...prevData, id]
            }
        })
        setData('sections', selectedSections)
    };

    const handleContentChange = (e, item) => {
        setData((prevData) => {
            const newContent = [...prevData.content];
            const index = newContent.findIndex((contentItem) => Object.keys(contentItem)[0] === item);
        
            if (index !== -1) {
              newContent[index][item] = e.target.value;
            } else {
              newContent.push({ [item]: e.target.value });
            }
        
            return {
              ...prevData,
              content: newContent,
            };
          });
    }
    // console.log(selectedItems)
    function submit(e) {
        e.preventDefault();
        router.post(route('template.store'), data)
    }

    return (
        <div className="mx-10 my-10">
            <form onSubmit={submit}>
                <h1 className="text-2xl font-bold "> Add Template </h1>
                {/* Name  */}
                <div className="my-3">
                    <p className="text-slate-800 font-bold text-xl">
                        Add Name
                    </p>
                    <input type="text" className="p-2 w-full rounded-md" onChange={e => setData('name', e.target.value)} />
                </div>
                {/* Categories  */}
                <div className="my-3">
                    <p className="text-slate-800 font-bold text-xl">
                        Add Name
                    </p>
                    <select type="text" className="p-2 w-full rounded-md" onChange={e => setData('category_id', e.target.value)}>
                        <option value=""> Select Category </option>
                        {
                            categories.map(item => (
                                <option value={item.id} key={item.id}> {item.name} </option>
                            ))
                        }
                    </select>
                </div>
                {/* layout  */}
                <div className="my-3">
                    <p className="text-slate-800 font-bold text-xl">
                        Add Layout
                    </p>
                    <CodeEditor
                        value={data.layout}
                        language="html"
                        placeholder="Please Enter Layout Html Code"
                        onChange={(evn) => setData('layout', evn.target.value)}
                        padding={15}
                        style={codeEditorStyle}
                        className="mt-10 rounded-md"
                        />
                </div>
                {/* Section  */}
                {/* <div className="my-3">
                    <p className="text-slate-800 font-bold text-xl">
                        Choose Section
                    </p>
                    <div className="my-5">
                        {sections.map((item) => (
                            <div
                                key={item.id}
                                className={`p-2 ${
                                    selectedItems.includes(item.value)
                                    ? 'bg-green-500'
                                    : 'bg-violet-600'
                                } text-white inline mx-5 rounded-md cursor-pointer`}
                                onClick={() => handleSelect(item.value, item.id)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <div className="my-5">
                        {
                            selectedItems.map((item, index) => (
                                <div key={index}>
                                    <p className="capitalize font-bold my-2"> {item} </p>
                                    <CodeEditor
                                        language="html"
                                        placeholder={`Please Enter ${item} Html Code`}
                                        onChange={(evn) => handleContentChange(env.target.value, item)}
                                        padding={15}
                                        style={codeEditorStyle}
                                        className="mt-10 rounded-md"
                                        />
                                </div>
                            ))
                        }
                    </div>
                </div> */}
                {/* Js  */}
                <div className="my-3">
                    <p className="text-slate-800 font-bold text-xl">
                        Add Javascripts 
                    </p>
                    <CodeEditor
                        value={data.js}
                        language="js"
                        placeholder="Please JS Code"
                        onChange={(evn) => setData('js', evn.target.value)}
                        padding={15}
                        style={codeEditorStyle}
                        className="mt-10 rounded-md"
                        />
                </div>
                {/* css */}
                <div className="my-3">
                    <p className="text-slate-800 font-bold text-xl">
                        Add Css
                    </p>
                    <CodeEditor
                        value={data.js}
                        language="css"
                        placeholder="Please CSS Code"
                        onChange={(evn) => setData('css', evn.target.value)}
                        padding={15}
                        style={codeEditorStyle}
                        className="mt-10 rounded-md"
                        />
                </div>
                {/* css links  */}
                <div className="my-3">
                    <p className="text-slate-800 font-bold text-xl">
                        Add Css Links 
                    </p>
                    <CodeEditor
                        value={data.links}
                        language="css"
                        placeholder="Please CSS Code"
                        onChange={(evn) => setData('links', evn.target.value)}
                        padding={15}
                        style={codeEditorStyle}
                        className="mt-10 rounded-md"
                        />
                </div>
                {/* js scripts  */}
                <div className="my-3">
                    <p className="text-slate-800 font-bold text-xl">
                        Add Scripts
                    </p>
                    <CodeEditor
                        value={data.scripts}
                        language="js"
                        placeholder="Please JS Code"
                        onChange={(evn) => setData('scripts', evn.target.value)}
                        padding={15}
                        style={codeEditorStyle}
                        className="mt-10 rounded-md"
                        />
                    
                </div>
                {/* Add section  */}
                <CreateSection setData={setData} data={data} />
                <div className="text-end">
                    <button type="submit" className="p-2 bg-black text-white rounded-md"> Submit </button>
                </div>
            </form>
        </div>
    );
};

Create.layout = (page) => (
    <FrontendLayout children={page} title="Template Creator" />
);
export default Create;
