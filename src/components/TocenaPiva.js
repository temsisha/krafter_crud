import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import fireDb from '../firebase'

const Contacts = () => {
  const [contactObjects, setContactObjects] = useState({})
  const [currentId, setCurrentId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fireDb.child('tocena_piva').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        })
      else setContactObjects({})
    })
  }, [])
  const addOrEdit = (obj) => {
    if (currentId === '')
      fireDb.child('tocena_piva').push(obj, (err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
    else
      fireDb.child(`tocena_piva/${currentId}`).set(obj, (err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
  }

  const onDelete = (key) => {
    if (window.confirm('Are you sure to delete this record')) {
      fireDb.child(`tocena_piva/${key}`).remove((err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
    }
  }

  return (
    <>
      <div className='jumbotron jumbotron-fluid'>
        <div className='container'>
          <h1 className='display-4 text-center'>TOČENA PIVA</h1>
        </div>
      </div>

      <div className=''>
        <ContactForm
          {...{ currentId, contactObjects, addOrEdit, setSearchTerm }}
        ></ContactForm>
      </div>

      <div className=''>
        <table className='table table-striped'>
          <thead className='table-dark'>
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
            {Object.keys(contactObjects)
              .filter((id) => {
                if (searchTerm == '') {
                  return contactObjects[id]
                } else if (
                  contactObjects[id].productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  contactObjects[id].productBrand
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return contactObjects[id]
                }
              })
              .map((id, index) => {
                return (
                  <tr
                    key={index}
                    className={`align-middle ${
                      contactObjects[id].productState === true
                        ? 'table-danger'
                        : ''
                    }`}
                  >
                    <td>{contactObjects[id].productBrand}</td>
                    <td>{contactObjects[id].productName}</td>
                    <td>{contactObjects[id].productType}</td>
                    <td>{contactObjects[id].productVolume}</td>
                    <td>{contactObjects[id].productPrice}</td>
                    <td>{contactObjects[id].productDescription}</td>
                    <td>
                      <a
                        className='btn text-primary'
                        onClick={() => {
                          setCurrentId(id)
                        }}
                      >
                        <i className='fas fa-pencil-alt'></i>
                      </a>
                      <a
                        className='btn text-danger'
                        onClick={() => onDelete(id)}
                      >
                        <i className='fas fa-trash-alt'></i>
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Contacts
