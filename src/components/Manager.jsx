import React, { use } from 'react'
import { useRef, useState, useEffect } from 'react'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {

  const passRef = useRef()
  const imgref = useRef()
  const [data, setdata] = useState({ username: "", password: "", site: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }


  }, [])
  console.log(passwordArray)


  const showPass = () => {

    if (imgref.current.src.includes("/hide.png")) {

      passRef.current.type = "text"
      imgref.current.src = "/open.png"

    }
    else {
      passRef.current.type = "password"
      imgref.current.src = "/hide.png"
    }

  }

  const savePass = () => {

    if(data.username.length>3 && data.site.length>6 && data.password.length>3){

      toast('Saved Password!', {
  
        theme: "dark"
      })
  
      setpasswordArray([...passwordArray,{...data, id : uuidv4()}])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...data, id : uuidv4()}]))
       setdata({ username: "", password: "", site: "" })
  
    }
    else{
      toast.error("Invalid Crediantials",{
        theme:"dark"
      })
    }
    }

  const handleChange = (e) => {

    setdata({ ...data, [e.target.name]: e.target.value })

  }

  const copyText = (text) => {


    toast('Copied to clipBoard!', {

      theme: "dark",

    });

    navigator.clipboard.writeText(text)
  }

  const deletePassword = (id)=>{
     toast.success("Password Deleted!", {

      theme: "dark"
    })
   
    setpasswordArray(passwordArray.filter((item)=>item.id!=id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id!=id)))
     
  }

  const editPassword=(id)=>{
    toast.info("Edit Password",
      {

      theme: "dark"
    })
    
    setdata(passwordArray.find(i=>i.id===id))
    setpasswordArray(passwordArray.filter((item)=>item.id!=id))
    
  }
console.log("data",data)
  return (

    <div className='father min-h-screen'>
      <ToastContainer
      />


      <div class=" inset-0 -z-10 min-h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className='md:container mx-auto lg:px-40 text-white min-h-fit'>
          <h1 className='text-5xl first-letter:text-red-500 font-bold'>XPASS</h1>
          <div className='text-neutral-400'>Your own password manager.</div>
          <div className='inputs text-white flex flex-col p-6 gap-12 mt-15  rounded-lg' >
            <input type="text" placeholder='Enter website url' className='bg-white rounded-md text-black shadow-[-1px_0px_25px_8px_#035eef] border-0 outline-0 placeholder:font-bold placeholder:text-blue-900 p-2' name='site' value={data.site} onChange={handleChange} />
            <div className="small flex flex-col md:flex-row gap-10 justify-around  ">
              <input type="text" className='bg-white text-black shadow-[-1px_0px_25px_8px_#035eef] rounded-lg md:w-1/2 outline-0 placeholder:font-bold placeholder:text-blue-900 p-2' name="username" value={data.username} id="user" placeholder='Enter username' onChange={handleChange} />
              <div className='relative md:w-1/2 flex items-center'>
                <input type="password" ref={passRef} className='bg-white text-black shadow-[-1px_0px_25px_8px_#035eef] w-full rounded-lg  outline-0 placeholder:font-bold placeholder:text-blue-900 p-2' name="password" id="pass" placeholder='Enter password' value={data.password} onChange={handleChange} />
                <span className='absolute  z-100 w-8 right-2 cursor-pointer' onClick={showPass} >
                  <img ref={imgref} src="/hide.png" alt="eyeclosed" srcset="" className='h-6' />
                </span>
              </div>

            </div>
            <button className='max-w-fit p-2 rounded-4xl font-bold  text-blue-400 ring-3 ring-cyan-700 mx-auto flex justify-center items-center gap-3 hover:bg-blue-800 transition ease-in delay-100' onClick={savePass}>Save Password <lord-icon
              src="https://cdn.lordicon.com/tsrgicte.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#30c9e8,secondary:#3080e8"
            >
            </lord-icon></button>
          </div>
          <div className="passwords mt-10 w-full">
            {passwordArray.length === 0 && <div>NO PASSWORDS</div>}
            {passwordArray.length !== 0 && <> <h1 className='text-3xl font-bold'>YOUR PASSWORDS</h1>
              <table class="table-auto m-auto  w-full rounded-xl mt-15 md:text-[20px] text-[12px]  lg:text-lg block  overflow-auto hide-scrollbar">
                <thead className='bg-gradient-to-t   from-purple-700 '>
                  <tr>
                    <th className='py-3 w-[25%] ' >SITE</th>
                    <th className='py-3 pr-10 w-[25%]' >USERNAME</th>
                    <th className='py-3 w-[25%]' >PASSWORD</th>
                    <th className='py-3 w-[25%] md:pl-3 md:pr-3' >ACTIONS</th>
                  </tr>
                </thead>
                <tbody className='bg-gradient-to-br
   from-blue-700 to to-blue-900 '>
                  {passwordArray.map((item, index) => {

                    return <tr key={index}>
                      <td className='text-center w-full pb-3 ' >
                        <div className='copyicon flex justify-around items-center   '>
                          <a href={item.site} className='truncate w-[40px] sm:w-[100px] md:w-[20vw] lg:w-[15vw] pl-2 h-[75px] whitespace-normal' target='_blank' >{item.site}</a>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>

                          <span onClick={() => { copyText(item.site) }}>

                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              colors="primary:#a39cf4"
                              className="h-5 md:h-20"
                            >
                            </lord-icon>
                          </span>
                        </div>

                      </td>
                      <td className='text-center w-full pb-2' >
                        <div className='copyicon flex justify-around items-center gap-3  sm:w-[180px]] md:w-[14vw]'>
                          <span className='truncate w-[40px] sm:w-[100px] md:w-[181px] h-[75px] whitespace-normal '>

                          {item.username}
                          </span>
                          <span onClick={() => { copyText(item.username) }}>

                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              colors="primary:#a39cf4"
                              className="h-5 md:h-20"
                            >
                            </lord-icon>
                          </span>
                        </div>
                      </td>
                      <td className='text-center w-full pb-2' >
                        <div className='copyicon flex justify-around items-center gap-3 sm:w-[180px] pl-3 md:w-[14vw]'>
                           <span className='truncate w-[50px]  md:w-[181px] sm:w-[100px] h-[75px] whitespace-normal '>

                          {item.password}
                           </span>
                          <span onClick={() => { copyText(item.password) }}>

                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              colors="primary:#a39cf4"
                              className="h-5 md:h-20"
                            >
                            </lord-icon>
                          </span>
                        </div>
                      </td>
                      <td className='text-center pl-3 pr-3 sm:pl-0  pb-2' >
                        <div className='copyicon  w-[40px] md:w-[8vw] md:pl-5  flex justify-center items-center sm:gap-3 sm:w-[180px]  '>


                          <span className='cursor-pointer' onClick={()=>{editPassword(item.id)}} >

                       

                            <lord-icon
                              src="https://cdn.lordicon.com/ibckyoan.json"
                              trigger="hover"
                              colors="primary:#c69cf4"
                              className="h-5 md:h-20"
                              >
                            </lord-icon>
                          </span>

                          <span className='cursor-pointer' onClick={()=>{deletePassword(item.id)}} >
                           
                           <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="morph"
                              state="morph-trash-full"
                              colors="primary:#c69cf4"
                              className="h-5 md:h-20"
                            >
                            </lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  })}

                </tbody>
              </table>
            </>}

          </div>
        </div>




      </div>

    </div>
  )
}

export default Manager
