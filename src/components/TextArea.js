import React , { useRef }from 'react'
import Editor from '@monaco-editor/react';

export default function TextArea() {

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
      editor.updateOptions({ wordWrap: "on" })// this enables line wrap
    }
  
    function showValue() {
      alert(editorRef.current.getValue());
    }
  
  
  function debounce(fn,time){
   
    var timer;
    return function(){
      clearTimeout(timer);
      timer=setTimeout(()=>{fn.apply(this,arguments)},time);
    }
   
  }
    
  
  function handleChange(){
  
    let txt=editorRef.current.getValue();
    console.log(txt);
  }
  return (
    <div>
<Editor
        height="120vh"
        width="70%"
        theme= "vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        loading="Lauding..."
        onMount={handleEditorDidMount}//calls the functiom after mounting 
        //use onMount for function based component and didMout for class based
        onChange={debounce(handleChange,1500)}
        options={{
          fontSize:16,
          minimap:{
            enabled:false
          }
        }}
      />

    </div>
  )
}
