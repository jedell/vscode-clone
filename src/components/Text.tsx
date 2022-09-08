import React, { ReactElement, useEffect, useState } from 'react';
import FileTab from './FileTab';
import Topbar from './Topbar';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-css";
import "../resources/prism-vsc-dark.css";
import { files2strings } from '../resources/files2strings';


interface TextProps {
  files: Set<string>
  selectedFile: string
  handleCloseFile: any
  handleClickFile: any
}

const getLanguage = (ext: string) => {
  if (ext === "js" || ext === "jsx")
    return languages.js
  else if (ext === "py")
    return languages.py
  else if (ext === "java")
    return languages.java
  else if (ext === "css")
    return languages.css
  else if (ext === "clike")
    return languages.cpp
  else if (ext === "json")
    return languages.json
  else return languages.js
}

function Text({ files, selectedFile, handleCloseFile, handleClickFile }: TextProps) {
  const [code, setCode] = React.useState(
    (files2strings as any)[selectedFile]  // hacky, this needs a better way
  );
  const [lang, setLang] = useState(getLanguage(selectedFile.split('.')[1]))

  useEffect(() => {
    setCode((files2strings as any)[selectedFile])
    setLang(getLanguage(selectedFile.split('.')[1]))

    return () => {
      //cleanup
    }
  }, [selectedFile])


  const hightlightWithLineNumbers = (input: any, language: any) => {
    return highlight(input, language)
      .split("\n")
      .map((line: any, i: any) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");
  }

  let windows: React.ReactElement[] = []

  Array.from(files).forEach((file, i) => {
    let selected = false
    if (file === selectedFile)
      selected = true
    windows.push(<FileTab key={i} file={file} selected={selected} handleCloseFile={handleCloseFile} handleClickFile={handleClickFile} />)
  })

  // TODO make this code editor work and add numbers

  return (
    <div className="flex flex-col justify-items-start bg-zinc-900 max-w-full h-screen">
      {files.size > 0 ? <Topbar>
        {windows.map((window) => {
          return window;
        })}
      </Topbar> : <div></div>}
      {/* <div className='text-white flex flex-start w-screen'>
        <h1>breadcrumb</h1>
      </div> */}
      <div className='h-full overflow-auto'>
        {selectedFile !== 'none' ?
          <div className='flex flex-row h-full'>
            <Editor
              value={code}
              onValueChange={code => setCode(code)} // add way to save edits locally?
              highlight={code => hightlightWithLineNumbers(code, lang)}
              padding={10}
              style={{
                fontFamily: "Monaco, Menlo, Consolas, 'Droid Sans Mono', 'Inconsolata' 'Courier New', monospace",
                fontSize: 14,
                backgroundColor: '#18181b',
                outline: 0,
                overflow: 'scroll'
              }}
              className='editor h-full w-full text-white'
              textareaId="codeArea"

            />
          </div>
          : <></>}
      </div>
    </div>
  );
}

export default Text;