import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io'
import FILE_ICONS from './FileIcons';


interface FileTabProps {
    file: string;
    selected: Boolean
    handleCloseFile: any
    handleClickFile: any
}

function FileTab({ file, selected, handleCloseFile, handleClickFile }: FileTabProps) {

    let ext = file.split('.')[1]

    if (selected) {
        return (
            <div className={'flex group justify-center items-center pl-3 pr-2 cursor-pointer border-r border-r-zinc-800 bg-zinc-900'} onClick={(e) => {handleClickFile(e, file)}}>
            {FILE_ICONS[ext]}
            <span className="ml-1 pr-1 font-['Consolas', 'Courier New', 'monospace'] text-sm">{file}</span>
            <div onClick={(e) => {handleCloseFile(e, file)}}>
                <IoMdClose className='text-zinc-200 hover:bg-zinc-600 rounded-sm' />
            </div>
        </div>
        )
    }

    return (
        <div className={'flex group justify-center items-center pl-3 pr-2 cursor-pointer border-r border-r-zinc-800 bg-zinc-700'} onClick={(e) => {handleClickFile(e, file)}}>
            {FILE_ICONS[ext]}
            <span className="ml-1 pr-1 font-['Consolas', 'Courier New', 'monospace'] text-sm">{file}</span>
            <div onClick={(e) => {handleCloseFile(e, file)}}>
                <IoMdClose className='text-zinc-700 group-hover:text-zinc-400 hover:bg-zinc-600 rounded-sm' />
            </div>
        </div>
    );
}

export default FileTab;