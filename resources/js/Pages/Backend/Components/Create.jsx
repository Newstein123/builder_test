import FrontendLayout from '@/Layouts/FrontendLayout'
import { router, useForm } from '@inertiajs/react'
import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';

const Create = ({cpt}) => {
    const {data, setData} = useForm({
        'name' : "",
        'component_id' : "",
        'content' : "",
    });

    function submit(e) {
        e.preventDefault();
        router.post(route('component.store'), data, {
            onSuccess : (msg) => {
                console.log(msg)
            },
            onError : (e) => {
                console.log(e)
            }
        })
    }

    const codeEditorStyle = {
        fontSize: 12,
        backgroundColor: "#000",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        overflow: 'scroll', // Make it scrollable
        maxHeight: '300px',
    }
  return (
    <div className='m-10'>
      <form onSubmit={submit}>
        <h1 className='text-2xl font-bold'> Create Component</h1>
        {/* name  */}
        <div className="my-3">
            <div className='my-3'>
                <label htmlFor=""> Enter Component Design Name </label>
            </div>
            <input className='p-2 rounded-md w-full' onChange={e => setData('name', e.target.value)} /> 
        </div>
        {/* component  */}
        <div className="my-3">
            <div className='my-3'>
                <label htmlFor=""> Select Component </label>
            </div>
            <select className='p-2 rounded-md w-full' onChange={e => setData('component_id', e.target.value)}> 
                <option value=""> Choose Component</option>
                {
                    cpt.map(item => (
                        <option value={item.id} key={item.id}> {item.name} </option>
                    ))
                }
            </select>
        </div>
        {/* Component Code  */}
        <div className="my-3">
            <div className='mt-3'>
                <label htmlFor=""> Enter Componet Code </label>
            </div>
            <CodeEditor
                value={data.content}
                language="html"
                placeholder="Please JS Code"
                onChange={(evn) => setData('content', evn.target.value)}
                padding={15}
                style={codeEditorStyle}
                className="mt-10 rounded-md"
            />
        </div>
        <div className="text-end my-3">
            <button className='p-2 bg-slate-500 text-white rounded-md'> Submit  </button>
        </div>
      </form>
    </div>
  )
}

Create.layout = page => <FrontendLayout children={page} title="Component" />
export default Create
