import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import Files from './Files';
import Search from './Search';
import Git from './Git';
import Extensions from './Extensions';
import Settings from './Settings';

const WHITE = "#FFFFFF"
const CURRENTCOLOR = "currentColor"

interface SidebarProps {
    selectedFile: string
    handleFileSelect: any
}

function Sidebar({selectedFile, handleFileSelect}: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected_parent, setSelected] = useState([0, 0, 0, 0])
    const [elements, setElements] = useState([0, 1, 2, 3])

    const handleClickSidebarItem = (selected: number[], i: number) => {
        if (!isOpen) {
            setIsOpen(true)
        } else if (isOpen && selected[i] === selected_parent[i]) {
            setIsOpen(false)
            setSelected([0, 0, 0, 0])
            return;
        } else if (isOpen && selected[i] !== selected_parent[i]) {
            setIsOpen(true)
        }
        setSelected(selected);

    }

    return (
        <div className='flex flex-row'>
            <div className="w-16 h-screen flex flex-col justify-between bg-zinc-50 dark:bg-zinc-700">
                <div className=''>

                    {elements.map((i) => {
                        if (selected_parent[i] === 1)
                            return <SidebarItem key={i} i={i} onClick={handleClickSidebarItem} currentColor={WHITE} />

                        return <SidebarItem key={i} i={i} onClick={handleClickSidebarItem} currentColor={CURRENTCOLOR} />
                    })}

                </div>

                <div className=''>
                    {/* make SETTINGS seperate with diff functionality */}
                    <SidebarItem key={4} onClick={handleClickSidebarItem} i={4} currentColor={CURRENTCOLOR} />
                </div>
            </div>
            <div className={isOpen ? 'w-64' : 'w-0 bg-zinc-800'}>
                {(selected_parent.indexOf(1) === 0 && <Files selectedFile={selectedFile} handleFileSelect={handleFileSelect} />) ||
                 (selected_parent.indexOf(1) === 1 && <Search />) ||
                 (selected_parent.indexOf(1) === 2 && <Git />) ||
                 (selected_parent.indexOf(1) === 3 && <Extensions />) ||
                 (selected_parent.indexOf(1) === 4 && <Settings />)
                }
                {/* conditionally render via func, drill down to get i, return i form func and
                render specific exploerer element */}
            </div>
        </div>
    );
}

export default Sidebar;