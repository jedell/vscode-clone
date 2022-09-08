import React, { SyntheticEvent, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Text from '../components/Text';

function Editor() {
  const [currentFiles, setCurrentFiles] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<string>('none')

  const handleClickFile = (e: SyntheticEvent, file: string) => {
    setSelectedFile(file)
  }

  const handleCurrentFileSideBar = (file: string) => {
    let arr = new Set(currentFiles)
    arr.add(file)
    setCurrentFiles(arr)
    setSelectedFile(file)
  }

  const handleCloseFile = (e: SyntheticEvent, file: string) => {
    let arr = new Set(currentFiles)
    arr.delete(file)
    setCurrentFiles(arr)
    // if selected is closed, select another
    if (file === selectedFile) {
      currentFiles.forEach((value) => {
        if (value !== selectedFile && currentFiles.size > 1) {
          setSelectedFile(value);
          return false;
        } else if (currentFiles.size === 1) {
          setSelectedFile("none")
          return false;
        }
      })
    }
    e.stopPropagation()
  }

  return (
    <div className="flex flex-row bg-zinc-900 w-screen h-screen fixed">
      <Sidebar selectedFile={selectedFile} handleFileSelect={handleCurrentFileSideBar} />
      <Text files={currentFiles} selectedFile={selectedFile} handleCloseFile={handleCloseFile} handleClickFile={handleClickFile} ></Text>
    </div>
  );
}

export default Editor;