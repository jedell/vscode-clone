import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import FILE_ICONS from './FileIcons';

interface Children {
    children: React.ReactNode;
}

interface ChildrenName {
    children: React.ReactNode;
    name: string;
    padding: string;
    bold: boolean
}

interface Name {
    name: string;
    padding: string;
    handleFileSelect: any
    selected: boolean
}

function Tree({ children }: Children) {
    return (
        <div className='leading-6 w-64'>
            {children}
        </div>
    )
}

function File({ name, padding, handleFileSelect, selected }: Name) {

    let ext = name.split('.')[1]

    const handleClick = () => {
        handleFileSelect(name);
    }

    if (selected) {
        return (
            <div className={'flex items-center cursor-pointer bg-zinc-600 ' + padding} onClick={handleClick}>
                {FILE_ICONS[ext] || <RiArrowRightSLine />}
                <span className="ml-1 font-['Consolas', 'Courier New', 'monospace'] text-sm">{name}</span>
            </div>
        )
    }

    return (
        <div className={'flex items-center cursor-pointer hover:bg-zinc-700 ' + padding} onClick={handleClick}>
            {FILE_ICONS[ext] || <RiArrowRightSLine />}
            <span className="ml-1 font-['Consolas', 'Courier New', 'monospace'] text-sm">{name}</span>
        </div>
    )
}

function Folder({ children, name, padding, bold }: ChildrenName) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (e: any) => {
        e.preventDefault();
        setIsOpen(!isOpen);

    }

    let nameElement = <h1>{name}</h1>
    if (bold) {
        nameElement = <h1><b>{name}</b></h1>
    }
    
    return (
        <div className=''>
            <div className={'flex items-center cursor-pointer hover:bg-zinc-700 ' + padding} onClick={handleToggle}>
                {isOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
                <span className="ml-1 font-['Consolas', 'Courier New', 'monospace'] text-sm">{nameElement}</span>
            </div>
            <div className={isOpen ? "h-auto overflow-hidden" : 'h-0 overflow-hidden'}>{children}</div>
        </div>
    )
}

Tree.File = File;
Tree.Folder = Folder;

interface FilesProps {
    selectedFile: string
    handleFileSelect: any
}

const FILES = [
    "portfolio-vscode", "src",
    "Education", "Oberlin.js", "NYU.css",
    "Experience", "GoldmanSachs.java", "Contenda.py", "Deloitte.css", "Oberlin.py",
    "Other", "Skills.cpp", "Excos.jsx", "IDK.css",
    "index.js", "index.html", "package.json"
]

function Files({ selectedFile, handleFileSelect }: FilesProps) {

    return (
        <div className="flex flex-col w-fit h-screen text-white bg-zinc-800">
            <div className='flex flex-row h-8 justify-start items-center'>
                <h1 className='text-sm pl-5'>EXPLORER</h1>
            </div>
            <Tree>
                <Tree.Folder name={FILES[0]} bold={true} padding={"pl-0"}>
                    <Tree.Folder name={FILES[1]} bold={false} padding={"pl-2"}>
                        <Tree.Folder name={FILES[2]} bold={false} padding={"pl-4"}>
                            <Tree.File name={FILES[3]} selected={selectedFile === FILES[3]} padding={"pl-6"} handleFileSelect={handleFileSelect} />
                            <Tree.File name={FILES[4]} selected={selectedFile === FILES[4]} padding={"pl-6"} handleFileSelect={handleFileSelect} />
                        </Tree.Folder>
                        <Tree.Folder name={FILES[5]} bold={false} padding={"pl-4"}>
                            <Tree.File name={FILES[6]} selected={selectedFile === FILES[6]} padding={"pl-6"} handleFileSelect={handleFileSelect} />
                            <Tree.File name={FILES[7]} selected={selectedFile === FILES[7]} padding={"pl-6"} handleFileSelect={handleFileSelect} />
                            <Tree.File name={FILES[8]} selected={selectedFile === FILES[8]} padding={"pl-6"} handleFileSelect={handleFileSelect} />
                        </Tree.Folder>
                        <Tree.Folder name={FILES[10]} bold={false} padding={"pl-4"}>
                            <Tree.File name={FILES[11]} selected={selectedFile === FILES[11]} padding={"pl-6"} handleFileSelect={handleFileSelect} />
                            <Tree.File name={FILES[12]} selected={selectedFile === FILES[12]} padding={"pl-6"} handleFileSelect={handleFileSelect} />
                            <Tree.File name={FILES[13]} selected={selectedFile === FILES[13]} padding={"pl-6"} handleFileSelect={handleFileSelect} />
                        </Tree.Folder>
                        <Tree.File name={FILES[14]} selected={selectedFile === FILES[14]} padding={"pl-4"} handleFileSelect={handleFileSelect} />
                        <Tree.File name={FILES[15]} selected={selectedFile === FILES[15]} padding={"pl-4"} handleFileSelect={handleFileSelect} />
                    </Tree.Folder>
                    <Tree.File name={FILES[16]} selected={selectedFile === FILES[16]} padding={"pl-2"} handleFileSelect={handleFileSelect} />
                </Tree.Folder>
            </Tree>
        </div>
    );
}

export default Files;

// https://anuraghazra.dev/blog/building-a-react-folder-tree-component
