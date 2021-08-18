import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import fireDb from '../firebase'

const Contacts = () => {
  const [contactObjects, setContactObjects] = useState({})
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    fireDb.child('flasirana_piva').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        })
      else setContactObjects({})
    })
  }, [])
  const addOrEdit = (obj) => {
    if (currentId === '')
      fireDb.child('flasirana_piva').push(obj, (err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
    else
      fireDb.child(`flasirana_piva/${currentId}`).set(obj, (err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
  }

  const onDelete = (key) => {
    if (window.confirm('Are you sure to delete this record')) {
      fireDb.child(`flasirana_piva/${key}`).remove((err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
    }
  }

  return (
    <>
      <div className='jumbotron jumbotron-fluid'>
        <div className='container'>
          <h1 className='display-4 text-center'>Flasirana Piva</h1>
        </div>
      </div>
      <div className='row'>
        <div className=''>
          <ContactForm
            {...{ currentId, contactObjects, addOrEdit }}
          ></ContactForm>
        </div>
      </div>
      <div className='row'>
        <div className=''>
          <table className='table table-borderless table-stripped'>
            <thead className='thead-light'>
              <tr>
                <th>Product Brand</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Product Volume</th>
                <th>Product Price</th>
                <th>Product Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td>{contactObjects[id].productBrand}</td>
                    <td>{contactObjects[id].productName}</td>
                    <td>{contactObjects[id].productType}</td>
                    <td>{contactObjects[id].productVolume}</td>
                    <td>{contactObjects[id].productPrice}</td>
                    <td>{contactObjects[id].productDescription}</td>
                    <td>
                      <button
                        className='btn text-promary'
                        onClick={() => {
                          setCurrentId(id)
                        }}
                      >
                        <i className='fas fa-pencil-alt'></i>
                      </button>
                      <button
                        className='btn text-danger'
                        onClick={() => onDelete(id)}
                      >
                        <i className='fas fa-trash-alt'></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Contacts
