import React, { useState, useEffect } from 'react'
import fireDb from '../firebase'

function PivaTocena() {
  const [contactObjects, setContactObjects] = useState({})
  const [grupaName, setGrupaName] = useState('')

  useEffect(() => {
    fireDb.child('tocena_piva').on('value', (snapshot) => {
      const keyName = snapshot.key
      setGrupaName(keyName)

      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        })
      else setContactObjects({})
    })
  }, [])

  return (
    <div className='flex justify-center items-center flex-col max-w-screen-sm m-auto'>
      <div className='header'>
        <div className='flex flex-col items-center justify-center'>
          <img className='w-40 p-8' src='./images/logo2.svg' alt='' />
          <h1 className='font-bold text-lg leading-5 my-2.5'>
            BAR MENI / BAR MENU
          </h1>
        </div>
      </div>
      <div className='flex justify-center items-center flex-col w-full'>
        <h2 className='py-3 px-5 w-full z-10 mt-5 shadow-sm sticky top-0 bg-black z-10 text-white uppercase font-normal tracking-widest'>
          {grupaName}
        </h2>
        {Object.keys(contactObjects).map((id) => {
          if (contactObjects[id].productState !== true) {
            return (
              <div
                key={id}
                className='flex justify-center items-center flex-col w-full'
              >
                <div class='py-8 px-8 border-b border-gray-300 w-11/12'>
                  <div className='flex justify-between'>
                    <div className='flex flex-col'>
                      <p className='pr-1.5'>
                        {contactObjects[id].productBrand}
                      </p>
                      <p className='font-bold'>
                        {contactObjects[id].productName}
                      </p>
                      <p className='flex flex-col'>
                        {contactObjects[id].productType}
                      </p>
                      <p className='text-base text-black mt-1.5'>
                        {`VOL: ${contactObjects[id].productVolume}`}
                      </p>
                    </div>
                    <div className='price'>
                      <p className='font-bold'>
                        {`${contactObjects[id].productPrice}.00 RSD`}
                      </p>
                    </div>
                  </div>
                  <div className='description'>
                    <p className='mt-1 text-base leading-6 text-black'>
                      {contactObjects[id].productDescription}
                    </p>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default PivaTocena
