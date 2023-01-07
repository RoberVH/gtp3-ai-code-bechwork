import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { callGenerateEndpoint } from '../utils/getsoftware'

const MyApp = () => {
  const [input, setInput] = useState('')
  const [radioOption, setRadioOption] = useState({name:'Code'})
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)



  const handleRadioOptionChange = (event, idx, prompt) => {
    setRadioOption({name: event.target.value, id:idx, prompt: prompt})
  }

  const handleExecute = async () => {
    if (!input) return
    setIsGenerating(true)
    const prompt = radioOption.prompt + ' ' + input
    const resp= await callGenerateEndpoint(prompt)
    setInput(resp)
    setIsGenerating(false)
  }

  const options = [
    {idx:0, name: "Code", prompt:"Generate code to implement this functionality:"},
    {idx:1, name: "Testcase",  prompt:"Generate a test code funtion for this code:"},
    {idx:2, name: "Documentation",  prompt:"Generate head comment style JDOC and inlilne comments here appropriate to this code:"},
    {idx:3, name: "Formating", prompt:"Format the following code:"},
    {idx:4, name: "Review", prompt:"Pinpoint any defect for the following code:"},
    {idx:5, name: "Optimize",  prompt:"Optimize the the following code:"},
  ]   
  return (
   <div className="mt-8 h-screen" >
    <div className="mx-auto flex flex-col items-center  ">
     <h1 className="text-2xl text-stone-700 font-bold mb-4">AI Code Generator</h1>
     {/* Only show the subtitle on desktop */}
     <h2 className="text-lg font-semibold mb-4 text-stone-500">Select from category what you want, insert
           code or specificacion and hit Execute</h2>
    </div>
    <div className=" mx-12 flex"> 
     {/* Options Panel Sidebar on the left */}
     <div className="flex flex-col">
        <div className="mx-2 border-2 border-blue-400 rounded-xl h-full bg-gray-100">
        <label className="m-2 block font-bold ">Select SW Category</label>
        <div className="m-2 ml-4 w-[12em]">
          {
            options.map ( option =>(
            <label key={option.idx} className="flex items-center mt-2">
              <input
                type="radio"
                className="form-radio"
                name="radioOption"
                value={option.name}
                checked={radioOption.name === option.name}
                onChange={(e)=>handleRadioOptionChange(e, option.idx, option.prompt)}
                />
                <span className="ml-2">{option.prompt}</span>
            </label> ))  
          }
        </div>
        </div>   
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleExecute}
            disabled={isGenerating}
            className="flex py-2 mt-2 w-[12em] cursor-pointer select-none appearance-none items-center justify-center space-x-2 rounded border  rounded-lg
            border-blue-700 bg-blue-700 px-3  text-sm font-medium text-white transition hover:border-blue-800 hover:bg-blue-800 focus:border-blue-300 
            focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75">
            { isGenerating &&       <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
              <path
                className="fill-blue-800"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
              <path
                className="fill-blue-100"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
            </svg>}
            {isGenerating ? <span> &nbsp; Loading... </span> : <span>Execute</span>}
          </button>
        </div>
      </div>

    <div className="w-full ">
      <textarea
        className={`${isGenerating ? 'text-stone-500' : ''} w-full h-[32rem]  p-4 border-2 border-blue-400 rounded-lg`}
        value={input}
        disabled={isGenerating}
        placeholder={`
        Select an option and paste a piece of software for the system to 
          Generate a Test 
          
          Document it
          Explained
        or
        * Describe functionality and language to be generated 
        
        Examples:
             Write a routine in Javascript to query an SQL Database and get customer Id, name, lastname, 
             age, birthdate and address order by lastName where age is < 16 and > 30, add error treatment
             and use Axios
         `}
        onChange={(event) => setInput(event.target.value)}
      />
      <div className="flex ">
        <button 
        onClick={()=>setInput('')}
          className= "ml-8 flex py-2 mt-2 w-[12em] cursor-pointer items-center justify-center rounded-lg bg-gray-700 px-2 text-sm  text-white transition hover:border-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75">
              Clean Area
        </button>
        <button 
          onClick = {()=>{navigator.clipboard.writeText(input); console.log(input)}}
          className= "ml-8  flex py-2 mt-2 w-[12em] cursor-pointer items-center justify-center rounded-lg bg-gray-700 px-2 text-sm  text-white transition hover:border-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75">
              Copy Clipboard
        </button>
        </div>
      </div>
     </div>        
   </div>)
}

export default MyApp                         
