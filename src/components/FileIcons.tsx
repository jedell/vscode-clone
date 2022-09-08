import { DiJavascript1, DiCss3Full, DiHtml5, DiReact, DiJava, DiPython } from 'react-icons/di';
import { VscJson } from 'react-icons/vsc';
import { SiCplusplus } from 'react-icons/si';
import { BiCode } from 'react-icons/bi';
import { RiHashtag } from 'react-icons/ri'

type FileIconOptions = {
  [key: string]: JSX.Element
}

const FILE_ICONS: FileIconOptions = {
  "js": <DiJavascript1 className='text-yellow-200'/>,
  "css": <RiHashtag className='text-blue-400'/>,
  "html": <BiCode className='text-orange-500'/>,
  "jsx": <DiReact className='text-cyan-400'/>,
  "java": <DiJava className='text-red-400'/>,
  "json": <VscJson className='text-yellow-200'/>,
  "py": <DiPython className='text-sky-400'/>,
  "cpp": <SiCplusplus className='text-sky-500'/>

};

export default FILE_ICONS;