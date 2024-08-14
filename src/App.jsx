import React, { useEffect, useState } from 'react'

function App() {
  // jsondan malumot olib kelish
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:3030/users')
    .then(response => response.json())
    .then(res => setData(res))
  },[])
  console.log(data);
  
  // modal ochilib yopilishi
  const [addModal, setAddModal] = useState(false)
  const openAddModal = () => setAddModal(!addModal)

  // info modal ochilib yopilishi
  const [infoModal, setInfoModal] = useState(false)
  const openInfoModal = () => setInfoModal(!infoModal)
  const [itemModal, setItemModal] = useState(null)

  // user qushish
  const [userName, setUserName] =useState('')
  const [ userEmail, setUserEmail] =useState('')
  const [userSurname, setUserSurname] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAge, setUserAge] = useState('')
  const [userAddress, setUserAddress] = useState('')

  const addUseers = () =>{
    const newUsers = {
      "id": data.length + 1,
      "name": userName,
      "surname": userSurname,
      "email": userEmail,
      "phone": userPhone,
      "age": userAge,
      "address": userAddress
    }
    data.push(newUsers)
    openAddModal()
  }

  // delete users
  const deleteUser = (id) =>{
    let arr = data.filter(item => item.id !== id)
    console.log(arr);
    setData([...arr])

  }

  // edit modal ochilib yopilishi
  const [editModal, setEditModal] = useState(false)
  const openEditModal = () => setEditModal(!editModal)
  
  
  return (
    <div>
      <button onClick={openAddModal} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5'>Add +</button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 bg-gray-700 ">
          <thead className="text-xs text-gray-300 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map((item, index) =>
                <tr key={index} className=" text-gray-300 bg-gray-800 border-b border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    {item.email}
                  </td>
                  <td className="px-6 py-4">
                    {item.phone}
                  </td>
                  <button onClick={()=>{openInfoModal(), setItemModal(item)}} type="button" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Info</button>
                  <button onClick={() => openEditModal()} type="button" className=" text-white mt-2 bg-yellow-400 hover:bg-yellow-500  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Edit</button>
                  <button onClick={()=> deleteUser(item.id)} type="button" className=" text-white mt-2 bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                </tr>
              )
            }
            
          </tbody>
        </table>
      </div>
      
      {/* add modal */}
      { addModal &&
        <div id="authentication-modal" tabindex="-1" aria-hidden="true" class=" fixed top-0 right-0 left-0 z-50 justify-center items-center w-[600px] md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative left-[75%] top-[10%] p-4 w-full">
              <div class="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Sign in to our platform
                      </h3>
                      <button onClick={openAddModal} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div class="p-4 md:p-5">
                      <div class="space-y-4 grid grid-cols-2 gap-2" action="#">
                          <div>
                              <label for="name" class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                              <input onChange={(e)=> setUserName(e.target.value)} type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" required />
                          </div>
                          <div>
                              <label for="surname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your surname</label>
                              <input onChange={(e)=> setUserSurname(e.target.value)} type="name" name="surname" id="surname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="surname" required />
                          </div>
                          <div>
                              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input onChange={(e)=> setUserEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                          </div>
                          <div>
                              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                              <input onChange={(e)=> setUserPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                          </div>
                          <div>
                              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                              <input onChange={(e)=> setUserPhone(e.target.value)} type="phone" name="phone" id="phone" placeholder="+7 (999) 999-99-99" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                          </div>
                          <div>
                              <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your age</label>
                              <input onChange={(e)=> setUserAge(e.target.value)} type="number" name="age" id="age" placeholder="age" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                          </div>
                          <div>
                              <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your address</label>
                              <input onChange={(e)=> setUserAddress(e.target.value)} type="text" name="address" id="address" placeholder="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                          </div>
                          <div>
                            <button type="submit" onClick={addUseers} class="mt-7 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">submit</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div> 
      }


      {/* info modal */}
      { infoModal &&
        <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full left-[25%] top-[15%]">
            <div class="relative bg-slate-100  rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Static modal
                    </h3>
                    <button onClick={openInfoModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-4 md:p-5 space-y-4">
                  <p>name: {itemModal.name}</p>
                  <p>surname: {itemModal.surname}</p>
                  <p>email: {itemModal.email}</p>
                  <p>phone: {itemModal.phone}</p>
                  <p>address: {itemModal.address}</p>
                  <p>age: {itemModal.age}</p>
                </div>
            </div>
        </div>
    </div>
      }

      {/* edit modal */}
      { editModal &&
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" class=" fixed top-0 right-0 left-0 z-50 justify-center items-center w-[600px] md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative left-[75%] top-[10%] p-4 w-full">
                <div class="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Sign in to our platform
                        </h3>
                        <button onClick={openEditModal} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-4 md:p-5">
                        <div class="space-y-4 grid grid-cols-2 gap-2" action="#">
                            <div>
                                <label for="name" class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input  onChange={(e) => setUserName(e.target.value)} type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" required />
                            </div>
                            <div>
                                <label for="surname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your surname</label>
                                <input  onChange={(e) => setUserName(e.target.value)} type="name" name="surname" id="surname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="surname" required />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input  onChange={(e) => setUserName(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input onChange={(e) => setUserName(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                                <input onChange={(e) => setUserName(e.target.value)} type="phone" name="phone" id="phone" placeholder="+7 (999) 999-99-99" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your age</label>
                                <input  onChange={(e) => setUserName(e.target.value)} type="number" name="age" id="age" placeholder="age" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your address</label>
                                <input  onChange={(e) => setUserName(e.target.value)} type="text" name="address" id="address" placeholder="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                              <button  type="submit" class="mt-7 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
      }

    </div>
  )
}

export default App





