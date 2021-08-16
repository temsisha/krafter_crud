import React, { useState, useEffect } from 'react'

function ContactForm({ currentId, contactObjects, addOrEdit, setSearchTerm }) {
  const [isChecked, setIsChecked] = useState(false)

  const initialFieldValues = {
    productBrand: '',
    productName: '',
    productType: '',
    productVolume: '',
    productPrice: '',
    productDescription: '',
    productState: isChecked,
  }

  const [values, setValues] = useState(initialFieldValues)

  useEffect(() => {
    if (currentId === '')
      setValues({
        ...initialFieldValues,
      })
    else
      setValues({
        ...contactObjects[currentId],
      })
  }, [currentId, contactObjects])

  const handleInputChange = (e) => {
    var { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    addOrEdit(values)
  }

  const handleOnChange = (e) => {
    var { name, value, checked } = e.target
    setValues({
      ...values,
      [name]: checked,
    })
    setIsChecked(!isChecked)
    console.log(name, values)
  }

  return (
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='input-group mb-3'>
        <input
          className='form-control'
          placeholder='Product Brand'
          name='productBrand'
          value={values.productBrand}
          onChange={handleInputChange}
        />
      </div>
      <div className='input-group mb-3'>
        <input
          className='form-control'
          placeholder='Product Name'
          name='productName'
          value={values.productName}
          onChange={handleInputChange}
        />
      </div>
      <div className='input-group mb-3'>
        <input
          className='form-control'
          placeholder='Product Volume'
          name='productVolume'
          value={values.productVolume}
          onChange={handleInputChange}
        />
      </div>
      <div className='input-group mb-3'>
        <input
          className='form-control'
          placeholder='Product Price'
          name='productPrice'
          value={values.productPrice}
          onChange={handleInputChange}
        />
      </div>
      <div className='input-group mb-3'>
        <input
          className='form-control'
          placeholder='Product Type'
          name='productType'
          value={values.productType}
          onChange={handleInputChange}
        />
      </div>

      <div className='input-group mb-3'>
        <textarea
          className='form-control'
          placeholder='Product Description'
          name='productDescription'
          value={values.productDescription}
          onChange={handleInputChange}
        />
      </div>

      <div className='form-check form-switch mb-3'>
        <input
          className='form-check-input'
          type='checkbox'
          id='flexSwitchCheckDefault'
          name='productState'
          checked={values.productState}
          value={values.productState}
          onChange={handleOnChange}
        />
        <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
          Nema na stanju
        </label>
      </div>

      <div className='d-grid gap-2 mb-3'>
        <input
          type='submit'
          value={currentId === '' ? 'Save' : 'Update'}
          className='btn btn-primary btn-block'
        />
      </div>
      <div className='input-group mb-3'>
        <input
          className='form-control'
          placeholder='Search...'
          name='productBrand'
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>
    </form>
  )
}

export default ContactForm
