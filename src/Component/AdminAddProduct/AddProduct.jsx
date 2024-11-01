import { Link } from 'react-router-dom'
import { Select, ConfigProvider, Image, Tooltip, message, Spin, TreeSelect } from 'antd'
import { DocumentUpload, ProgrammingArrows } from 'iconsax-react'
import { DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/app.context'
import './AddProduct.css'
import { ProductsAPI, CategoriesAPI, BrandsAPI } from '../../Api/admin'
import BreadCrumbs from '../AdminBreadCrumbs'
const filterTheme = {
  token: {
    colorTextQuaternary: '#1D242E',
    colorTextPlaceholder: '#9da4b0',
    fontFamily: 'Poppins, sans-serif',
    controlOutline: 'rgba(0, 0, 0, 0.4)',
    controlOutlineWidth: '1px',
    colorBorder: '#bcbec1',
    borderRadius: '4px'
  },
  components: {
    Select: {
      selectorBg: '#e3ebf3',
      activeBorderColor: '#1D242E',
      hoverBorderColor: '#1D242E',
      optionActiveBg: 'rgb(0, 143, 153, 0.3)',
      optionSelectedBg: 'rgb(0, 143, 153, 0.3)'
    },
    TreeSelect: {
      nodeHoverBg: 'rgb(0, 143, 153, 0.3)',
      nodeSelectedBg: 'rgb(0, 143, 153, 0.3)'
    }
  }
}
let currentSlide = 0
const AddProduct = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    logout()
    navigate('/admin/login')
  }
  const [productID, setProductID] = useState('')
  const [errorProductID, setErrorProductID] = useState('')
  const [productName, setProductName] = useState('')
  const [errorProductName, setErrorProductName] = useState('')
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [errorCategory, setErrorCategory] = useState('')
  const [brands, setBrands] = useState([])
  const [brand, setBrand] = useState('')
  const [errorBrand, setErrorBrand] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [errorProductPrice, setErrorProductPrice] = useState('')
  const [productDiscount, setProductDiscount] = useState('')
  const [errorProductDiscount, setErrorProductDiscount] = useState('')
  const [productPackage, setProductPackage] = useState('')
  const [productIngredient, setProductIngredient] = useState('')
  const [productDosageForm, setProductDosageForm] = useState('')
  const [errorProductDosageForm, setErrorProductDosageForm] = useState('')
  const [productSpecification, setProductSpecification] = useState('')
  const [errorProductSpecification, setErrorProductSpecification] = useState('')
  const [productManufacturer, setProductManufacturer] = useState('')
  const [errorProductManufacturer, setErrorProductManufacturer] = useState('')
  const [productPlaceOfManufacture, setProductPlaceOfManufacture] = useState('')
  const [errorProductPlaceOfManufacture, setErrorProductPlaceOfManufacture] = useState('')
  const [uploadImages, setUploadImages] = useState([])
  const thumbnailRef = useRef()
  const [showThumbnailLeft, setShowThumbnailLeft] = useState(false)
  const [showThumbnailRight, setShowThumbnailRight] = useState(true)
  const [files, setFiles] = useState([])
  const [errorFiles, setErrorFiles] = useState('')
  const [productUses, setProductUses] = useState('')
  const [errorProductUses, setErrorProductUses] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [errorProductDescription, setErrorProductDescription] = useState('')

  const token = localStorage.getItem('accesstoken')
  const [messageResult, setMessageResult] = useState()
  const [status, setStatus] = useState()
  const [submitLoading, setSubmitLoading] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }

  const fetchExistingIDs = async () => {
    const response = await ProductsAPI.getProductsNames()
    const res = await response.json()
    return res['data'].map((product) => product.product_id)
  }

  const handleErrorProductID = async (value) => {
    if (value === '') {
      setErrorProductID('This field cannot be empty.')
      return false
    } else if (!/^[0-9]\d*$/.test(value)) {
      setErrorProductID('Please enter a positive integer')
      return false
    }
    const existingIDs = await fetchExistingIDs()
    if (existingIDs.includes(parseInt(value, 10))) {
      setErrorProductID('This ID already exists.')
      return false
    }
    return true
  }

  const handleErrorProductName = async (value) => {
    if (value === '') {
      setErrorProductName('This field cannot be empty.')
      return false
    } else if (value.length < 3 || value.length > 100) {
      setErrorProductName('Name must be between 3 and 100 characters long.')
      return false
    }
    return true
  }

  const handleErrorCategory = (Category) => {
    if (!Category) {
      setErrorCategory('Please choose a category')
      return false
    }
    return true
  }

  const handleErrorBrand = (brand) => {
    if (!brand) {
      setErrorBrand('Please choose a brand')
      return false
    }
    return true
  }

  const handleErrorProductPrice = (value) => {
    if (value === '') {
      setErrorProductPrice('This field cannot be empty.')
      return false
    } else if (!/^[1-9]\d*$/.test(value)) {
      setErrorProductPrice('Please enter a positive number')
      return false
    }
    return true
  }

  const handleErrorProductDiscount = (value) => {
    if (value === '') {
      setErrorProductDiscount('This field cannot be empty.')
      return false
    } else if (!/^[0-9]\d*$/.test(value)) {
      setErrorProductDiscount('Please enter a positive number')
      return false
    } else if (parseFloat(value) > 100) {
      setErrorProductDiscount('Please enter a number less than or equal to 100')
      return false
    }
    return true
  }

  const handleErrorDosageForm = (value) => {
    if (value === '') {
      setErrorProductDosageForm('This field cannot be empty.')
      return false
    }
    return true
  }

  const handleErrorSpecification = (value) => {
    if (value === '') {
      setErrorProductSpecification('This field cannot be empty.')
      return false
    }
    return true
  }

  const handleErrorManufacturer = (value) => {
    if (value === '') {
      setErrorProductManufacturer('This field cannot be empty.')
      return false
    }
    return true
  }

  const handleErrorPlaceOfManufacture = (value) => {
    if (value === '') {
      setErrorProductPlaceOfManufacture('This field cannot be empty.')
      return false
    }
    return true
  }

  const handleErrorProductUses = (value) => {
    if (value === '') {
      setErrorProductUses('This field cannot be empty.')
      return false
    }
    return true
  }

  const handleErrorProductDescription = (value) => {
    if (value === '') {
      setErrorProductDescription('This field cannot be empty.')
      return false
    }
    return true
  }

  const handleErrorFileUpload = (values) => {
    if (values.length === 0) {
      setErrorFiles('Please upload at least one image')
      return false
    }
    if (values.length > 3) {
      setErrorFiles('You can only upload up to 3 images')
      return false
    }
    for (let i = 0; i < values.length; i++) {
      if (values[i].size >= 2048 * 1024) {
        setErrorFiles('Each image must be less than 2048KB')
        return false
      }
    }
    return true
  }

  const handleUploadImages = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg']
      const validFiles = []
      const filesArray = []
      const errorMessages = []
      files.forEach((file) => {
        if (validExtensions.includes(file.type)) {
          validFiles.push(file)
          filesArray.push(URL.createObjectURL(file))
        } else {
          errorMessages.push(`File ${file.name} is not a valid image file`)
        }
      })
      if (errorMessages.length > 1) {
        setStatus(422)
        setMessageResult('Found invalid image files. System will only keep the valid ones.')
      } else if (errorMessages.length === 1) {
        setStatus(422)
        setMessageResult(errorMessages[0])
      }
      setUploadImages((prevImages) => prevImages.concat(filesArray))
      setFiles((prevFiles) => prevFiles.concat(validFiles))
      event.target.value = null
    }
  }

  const handleChangeUpload = (e) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const validExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg']
      if (!validExtensions.includes(file.type)) {
        setStatus(422)
        setMessageResult(`File ${file.name} is not a valid image file`)
        return
      }
      const image = URL.createObjectURL(file)

      const currentIndex = currentSlide

      // Remove the current image and add the new image at the same index
      uploadImages.splice(currentIndex, 1, image)

      // Update the state with the new array of images
      setUploadImages([...uploadImages])

      const currentFiles = [...files]
      currentFiles.splice(currentIndex, 1, file)
      setFiles([...currentFiles])
    }
  }

  function moveSlide(n) {
    const slides = document.querySelector('.slides')
    const totalSlides = slides.children.length
    // Calculate the new slide index
    let newSlide = currentSlide + n
    // Ensure the new slide index is within the valid range
    if (newSlide < 0) {
      newSlide = 0 // Don't go past the first slide
    } else if (newSlide >= totalSlides) {
      newSlide = totalSlides - 1 // Don't go past the last slide
    }
    currentSlide = newSlide
    // Apply the transition effect
    slides.style.transition = 'transform 0.5s ease-in-out'
    slides.style.transform = `translateX(-${currentSlide * 100}%)`

    // Focus on the corresponding thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail')
    if (thumbnails[currentSlide]) {
      thumbnails[currentSlide].focus()
    }
  }

  function moveToSlide(index) {
    currentSlide = index
    moveSlide(0)
  }

  function handleDeleteImage(index) {
    const slides = document.querySelector('.slides')
    const totalSlides = slides.children.length
    // Remove the image from the uploadImages array
    uploadImages.splice(index, 1)
    files.splice(index, 1)
    // Adjust the currentSlide based on the position of the deleted image
    if (index === 0 && totalSlides > 1) {
      currentSlide = 0 // Stay at the first slide if there are still images left
    } else if (index === totalSlides - 1) {
      currentSlide = totalSlides - 2 // Move to the previous slide if the last slide is deleted
    } else {
      currentSlide = currentSlide - 1 // Move to the previous slide if in the middle
    }

    // Update the state or re-render the component as needed

    setFiles([...files])
    setUploadImages([...uploadImages])
    // Temporarily disable the transition
    slides.style.transition = 'none'

    // Move to the current slide without transition
    slides.style.transform = `translateX(-${currentSlide * 100}%)`
  }

  const checkThumbnailTranslate = () => {
    const container = thumbnailRef.current
    setShowThumbnailLeft(container.scrollLeft > 0)
    setShowThumbnailRight(Math.ceil(container.scrollLeft + container.clientWidth) < container.scrollWidth)
  }

  const scrollThumbnailLeft = () => {
    const container = thumbnailRef.current
    const containerWidth = container.clientWidth
    container.scrollBy({ left: -containerWidth, behavior: 'smooth' })
  }

  const scrollThumbnailRight = () => {
    const container = thumbnailRef.current
    const containerWidth = container.clientWidth
    container.scrollBy({ left: containerWidth, behavior: 'smooth' })
  }

  const handleValidation = () => {
    const isValidProductID = handleErrorProductID(productID)
    const isValidProductName = handleErrorProductName(productName)
    const isValidCategory = handleErrorCategory(category)
    const isValidBrand = handleErrorBrand(brand)
    const isValidProductPrice = handleErrorProductPrice(productPrice)
    const isValidProductDiscount = handleErrorProductDiscount(productDiscount)
    const isValidFileUpload = handleErrorFileUpload(uploadImages)
    const isValidProductDosageForm = handleErrorDosageForm(productDosageForm)
    const isValidProductSpecification = handleErrorSpecification(productSpecification)
    const isValidProductManufacturer = handleErrorManufacturer(productManufacturer)
    const isValidProductPlaceOfManufacture = handleErrorPlaceOfManufacture(productPlaceOfManufacture)
    const isValidProductUses = handleErrorProductUses(productUses)
    const isValidProductDescription = handleErrorProductDescription(productDescription)
    if (
      !isValidProductID ||
      !isValidProductName ||
      !isValidCategory ||
      !isValidBrand ||
      !isValidProductPrice ||
      !isValidProductDiscount ||
      !isValidFileUpload ||
      !isValidProductDosageForm ||
      !isValidProductSpecification ||
      !isValidProductManufacturer ||
      !isValidProductPlaceOfManufacture ||
      !isValidProductUses ||
      !isValidProductDescription
    ) {
      setStatus(422)
      setMessageResult('Invalid data. Please check your input.')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    setSubmitLoading(true)
    e.preventDefault()
    if (!handleValidation()) {
      setSubmitLoading(false)
      return
    }
    const formData = new FormData()
    const product_images = Array.from(new Set(files.map((file) => file.name))).map((name) =>
      files.find((file) => file.name === name)
    )
    product_images.forEach((file) => {
      formData.append('product_images[]', file)
    })

    formData.append('product_id', productID)
    formData.append('product_name', productName)
    formData.append('category_id', category)
    formData.append('brand_id', brand)
    formData.append('product_price', productPrice)
    formData.append('product_discount', productDiscount)
    if (productPackage) formData.append('package', productPackage)
    if (productIngredient) formData.append('ingredient', productIngredient)
    formData.append('dosage_form', productDosageForm)
    formData.append('specification', productSpecification)
    formData.append('manufacturer', productManufacturer)
    formData.append('place_of_manufacture', productPlaceOfManufacture)
    formData.append('product_uses', productUses)
    formData.append('product_description', productDescription)

    try {
      const response = await ProductsAPI.addProducts(formData, token)
      if (!response.ok) {
        setSubmitLoading(false)
        const res = await response.json()
        let { messages } = res
        if (Array.isArray(messages)) {
          messages = messages.join(', ')
        }
        if (response.status === 401) {
          handleUnauthorized()
        } else if (response.status === 422) {
          setStatus(422)
          setMessageResult(`Invalid data: ${messages}`)
        } else {
          setStatus(response.status)
          setMessageResult(`Add product failed: ${messages}`)
        }
        return
      }
      setStatus(response.status)
      setMessageResult('Add product successfully')
    } catch (e) {
    } finally {
      setSubmitLoading(false)
    }
  }

  const getDeepestChildren = (tree) => {
    const deepestChildren = []
    const traverse = (node) => {
      if (!node.children || node.children.length === 0) {
        deepestChildren.push(node)
      } else {
        node.children.forEach((child) => traverse(child))
      }
    }
    tree.forEach((node) => traverse(node))
    return deepestChildren
  }

  const convertDataToTree = (data) => {
    const map = {}
    const tree = []
    data.forEach((item) => {
      map[item.category_id] = { ...item, children: [] }
    })
    data.forEach((item) => {
      if (item.category_parent_id !== null && map[item.category_parent_id]) {
        map[item.category_parent_id].children.push(map[item.category_id])
      } else if (item.category_parent_id === null) {
        tree.push(map[item.category_id])
      }
    })
    return tree
  }

  const convertToTreeSelectData = (data) => {
    return data.map((item) => ({
      label: item.category_name,
      value: item.category_id
    }))
  }

  useEffect(() => {
    try {
      CategoriesAPI.getAllCategories(token)
        .then((response) => {
          if (response.status === 401) {
            handleUnauthorized()
          }
          return response.json()
        })
        .then(({ data }) => {
          try {
            if (data) {
              let categories = convertToTreeSelectData(
                getDeepestChildren(
                  convertDataToTree(
                    data.filter(
                      (category) =>
                        category.category_is_delete === 0 && !category.category_type.toLowerCase().includes('disease')
                    )
                  )
                )
              )
              setCategories(categories)
            }
          } catch (err) {
            setStatus(400)
            setMessageResult('Error fetching category:', err.message)
          }
        })
      BrandsAPI.getBrands()
        .then((response) => response.json())
        .then(({ data }) => {
          let brands = data.map((brand) => ({
            label: brand.brand_name,
            value: brand.brand_id
          }))
          setBrands(brands)
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    const container = thumbnailRef.current
    container.addEventListener('scroll', checkThumbnailTranslate)
    return () => {
      container.removeEventListener('scroll', checkThumbnailTranslate)
    }
  }, [])
  useEffect(() => {
    if ([200, 201, 202, 204].includes(status)) {
      toast.success(messageResult, { autoClose: 3000 })
      setStatus(null)
      setMessageResult(null)
      window.history.back()
    } else if (status >= 400) {
      openMessage('error', messageResult, 4)
      setStatus(null)
      setMessageResult(null)
    }
  }, [status, messageResult])

  return (
    <section className='max-w-[100%] h-full flex flex-col'>
      {contextHolder}
      <header className='flex justify-between animate-[slideDown_1s_ease]'>
        <div className='flex flex-col gap-3'>
          <BreadCrumbs
            items={[
              { title: 'Inventory' },
              {
                title: (
                  <Link to='/admin/products' tabIndex={-1}>
                    List of products
                  </Link>
                )
              },
              {
                title: (
                  <Link to='/admin/products/add-product' tabIndex={-1}>
                    Add new product
                  </Link>
                )
              }
            ]}
          />
          <p>
            All fields marked with (<span className='text-[red]'>*</span>) are required, except those that are optional.
          </p>
        </div>
        <div className='flex gap-x-3 max-w-[50%]'>
          <label
            htmlFor='imageUpload'
            className='cursor-pointer h-[46px] px-[18px] py-[16px] bg-[#16a2b8] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px]'
            onClick={() => setErrorFiles('')}
          >
            <span className='flex items-center justify-center gap-x-2 whitespace-nowrap'>
              <DocumentUpload />
              upload
            </span>
          </label>
          <button
            onClick={() => {
              handleDeleteImage(currentSlide)
            }}
            className='cursor-pointer h-[46px] px-[18px] py-[16px] bg-[#db3545] rounded-[4px] text-[#FFFFFF] flex items-center font-bold text-[14px] gap-x-2'
          >
            <DeleteOutlined className='text-[20px]' />
            <span className='whitespace-nowrap'>Delete Current Image</span>
          </button>
          <label
            htmlFor='imageChangeUpload'
            className='cursor-pointer h-[46px] px-[18px] py-[16px] bg-[#007bff] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px]'
            onClick={() => setErrorFiles('')}
          >
            <span className='flex items-center justify-center gap-x-2 whitespace-nowrap'>
              <ProgrammingArrows />
              Change Current Image
            </span>
          </label>
        </div>
      </header>
      <div className='Container'>
        <Spin spinning={submitLoading} tip='Loading...' size='large' fullscreen />
        <form
          action='#'
          className='AddForm mt-6 w-[100%] text-base flex flex-col'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <div className='flex w-full justify-between gap-x-12 animate-[slideUp_1s_ease]'>
            <div className='max-w-[48%] grow'>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='product_id'>
                    <span className='text-[red]'>* </span>ID
                  </label>
                  <input
                    type='text'
                    id='product_id'
                    name='product_id'
                    value={productID}
                    placeholder='1234'
                    className='AddForm__input'
                    onChange={(e) => setProductID(e.target.value)}
                    onFocus={() => setErrorProductID('')}
                  />
                  <p className='error_message'>{errorProductID}</p>
                </div>
                <div className='AddForm__group'>
                  <label htmlFor='product_name'>
                    <span className='text-[red]'>* </span>Name
                  </label>
                  <input
                    type='text'
                    id='product_name'
                    name='product_name'
                    placeholder='Minh dep trai'
                    className='AddForm__input'
                    onFocus={() => setErrorProductName('')}
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                  />
                  <p className='error_message'>{errorProductName}</p>
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='Category'>
                    <span className='text-[red]'>* </span>Category
                  </label>
                  <ConfigProvider theme={filterTheme}>
                    <Select
                      suffixIcon={null}
                      allowClear
                      showSearch
                      placeholder='Select Category'
                      placement='bottomLeft'
                      options={categories}
                      filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                      onDropdownVisibleChange={() => setErrorCategory('')}
                      className='AddForm__select'
                      onChange={(value) => {
                        setCategory(value)
                      }}
                    />
                  </ConfigProvider>
                  <p className='error_message'>{errorCategory}</p>
                </div>
                <div className='AddForm__group'>
                  <label htmlFor='Brand'>
                    <span className='text-[red]'>* </span>Brand
                  </label>
                  <ConfigProvider theme={filterTheme}>
                    <Select
                      suffixIcon={null}
                      id='Brand'
                      options={brands}
                      placeholder='Select brand'
                      className='AddForm__select'
                      allowClear
                      showSearch
                      filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                      onDropdownVisibleChange={() => setErrorBrand('')}
                      onChange={(value) => {
                        setBrand(value)
                      }}
                    />
                  </ConfigProvider>
                  <p className='error_message'>{errorBrand}</p>
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='product_price'>
                    <span className='text-[red]'>* </span>Price
                  </label>
                  <input
                    type='text'
                    id='product_price'
                    name='product_price'
                    placeholder='4000000'
                    className='AddForm__input'
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    onFocus={() => setErrorProductPrice('')}
                  />
                  <p className='error_message'>{errorProductPrice}</p>
                </div>
                <div className='AddForm__group'>
                  <label htmlFor='product_discount'>
                    <span className='text-[red]'>* </span>Discount
                  </label>
                  <input
                    type='text'
                    id='product_discount'
                    name='product_discount'
                    placeholder='20'
                    className='AddForm__input'
                    value={productDiscount}
                    onChange={(e) => setProductDiscount(e.target.value)}
                    onFocus={() => setErrorProductDiscount('')}
                  />
                  <p className='error_message'>{errorProductDiscount}</p>
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='package'>Package</label>
                  <input
                    type='text'
                    id='package'
                    name='package'
                    placeholder='Package 1'
                    className='AddForm__input'
                    value={productPackage}
                    onChange={(e) => setProductPackage(e.target.value)}
                  />
                </div>
                <div className='AddForm__group'>
                  <label htmlFor='ingredient'>Ingredient</label>
                  <input
                    type='text'
                    id='ingredient'
                    name='ingredient'
                    placeholder='Azithromycin 200mg'
                    className='AddForm__input'
                    onChange={(e) => setProductIngredient(e.target.value)}
                    value={productIngredient}
                  />
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='dosage_form'>
                    <span className='text-[red]'>* </span>Dosage form
                  </label>
                  <input
                    type='text'
                    id='dosage_form'
                    name='dosage_form'
                    placeholder='Bột pha hỗn dịch uống'
                    className='AddForm__input'
                    onChange={(e) => setProductDosageForm(e.target.value)}
                    onFocus={() => setErrorProductDosageForm('')}
                    value={productDosageForm}
                  />
                  <p className='error_message'>{errorProductDosageForm}</p>
                </div>
                <div className='AddForm__group'>
                  <label htmlFor='specification'>
                    <span className='text-[red]'>* </span>Specification
                  </label>
                  <input
                    type='text'
                    id='specification'
                    name='specification'
                    placeholder='Điều trị nhiễm khuẩn'
                    className='AddForm__input'
                    onChange={(e) => setProductSpecification(e.target.value)}
                    onFocus={() => setErrorProductSpecification('')}
                    value={productSpecification}
                  />
                  <p className='error_message'>{errorProductSpecification}</p>
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='manufacturer'>
                    <span className='text-[red]'>* </span>Manufacturer
                  </label>
                  <input
                    type='text'
                    id='manufacturer'
                    name='manufacturer'
                    placeholder='Công ty cổ phần dược phẩm Việt Nam'
                    className='AddForm__input'
                    onChange={(e) => setProductManufacturer(e.target.value)}
                    onFocus={() => setErrorProductManufacturer('')}
                    value={productManufacturer}
                  />
                  <p className='error_message'>{errorProductManufacturer}</p>
                </div>
                <div className='AddForm__group'>
                  <label htmlFor='place_of_manufacture'>
                    <span className='text-[red]'>* </span>Place of manufacture
                  </label>
                  <input
                    type='text'
                    id='place_of_manufacture'
                    name='place_of_manufacture'
                    placeholder='Việt Nam'
                    className='AddForm__input'
                    onChange={(e) => setProductPlaceOfManufacture(e.target.value)}
                    onFocus={() => setErrorProductPlaceOfManufacture('')}
                    value={productPlaceOfManufacture}
                  />
                  <p className='error_message'>{errorProductPlaceOfManufacture}</p>
                </div>
              </div>
            </div>
            <div className='max-w-[48%] bg-[transparent] grow flex flex-col gap-y-1'>
              <label htmlFor=''>
                <span className='text-[red]'>* </span>Image (.jpg, .jpeg, .png, .gif, .svg)
              </label>
              <Tooltip title={errorFiles} open={errorFiles === '' ? false : true} placement='top' align='center'>
                <div className='slider__container'>
                  <div className='slides'>
                    {uploadImages.length === 0 ? (
                      <div className='slide flex justify-center items-center relative w-full'>
                        <Image
                          src='/assets/images/default-image.jpg'
                          alt='Default Preview'
                          width='100%'
                          height='350px'
                          preview={false}
                        />
                      </div>
                    ) : (
                      <Image.PreviewGroup items={uploadImages.map((image) => ({ src: image }))}>
                        {uploadImages.map((image, index) => (
                          <div key={index} className='slide flex justify-center'>
                            <Image src={image} alt='Preview' className='object-cover' width='100%' height='350px' />
                          </div>
                        ))}
                      </Image.PreviewGroup>
                    )}
                  </div>
                  <button type='button' className='prev' onClick={() => moveSlide(-1)}>
                    &#10094;
                  </button>
                  <button type='button' className='next' onClick={() => moveSlide(1)}>
                    &#10095;
                  </button>
                </div>
              </Tooltip>
              <div className='thumbnail__container'>
                <div className='thumbnails' ref={thumbnailRef}>
                  {showThumbnailLeft && (
                    <button className='thumbnail__arrow thumbnail__left' onClick={scrollThumbnailLeft} type='button'>
                      &lt;
                    </button>
                  )}
                  {uploadImages.length === 0 ? (
                    <img
                      src='/assets/images/default-image.jpg'
                      alt='Thumbnail'
                      className='thumbnail max-w-[85px] h-[85px] object-cover'
                    />
                  ) : (
                    uploadImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt='Thumbnail'
                        className='thumbnail max-w-[85px] h-[85px] object-cover'
                        onClick={() => moveToSlide(index)}
                      />
                    ))
                  )}
                  {showThumbnailRight && (
                    <button className='thumbnail__arrow thumbnail__right' onClick={scrollThumbnailRight} type='button'>
                      &gt;
                    </button>
                  )}
                </div>
              </div>
              <input
                type='file'
                id='imageUpload'
                accept='image/jpg, image/jpeg, image/png, image/gif, image/svg'
                multiple
                style={{ display: 'none' }}
                onChange={handleUploadImages}
              />
              <input
                type='file'
                id='imageChangeUpload'
                accept='image/jpg, image/jpeg, image/png, image/gif, image/svg'
                style={{ display: 'none' }}
                onChange={handleChangeUpload}
              />
            </div>
          </div>
          <div className='flex gap-x-12 justify-between flex-col'>
            <div className='AddForm__row w-full'>
              <div className='relative w-full flex flex-col'>
                <label htmlFor='product_uses'>
                  <span className='text-[red]'>* </span>Product Uses
                </label>
                <textarea
                  id='product_uses'
                  name='product_uses'
                  rows={6}
                  placeholder='Mọi thông tin trên đây chỉ mang tính chất tham khảo. Vui lòng đọc kĩ thông tin chi tiết ở tờ hướng dẫn sử dụng của sản phẩm.'
                  className='AddForm__textarea'
                  onChange={(e) => setProductUses(e.target.value)}
                  onFocus={() => setErrorProductUses('')}
                  value={productUses}
                />
                <p className='error_message'>{errorProductUses}</p>
              </div>
            </div>
            <div className='AddForm__row w-full'>
              <div className='relative w-full flex flex-col'>
                <label htmlFor='product_description'>
                  <span className='text-[red]'>* </span>Product Description
                </label>
                <textarea
                  id='product_description'
                  name='product_description'
                  rows={6}
                  placeholder='Mọi thông tin trên đây chỉ mang tính chất tham khảo. Vui lòng đọc kĩ thông tin chi tiết ở tờ hướng dẫn sử dụng của sản phẩm.'
                  className='AddForm__textarea'
                  onChange={(e) => {
                    setProductDescription(e.target.value)
                  }}
                  onFocus={() => setErrorProductDescription('')}
                  value={productDescription}
                />
                <p className='error_message'>{errorProductDescription}</p>
              </div>
            </div>
          </div>
          <div className='AddForm__row button__group mt-2'>
            <button type='submit' className='AddForm__SubmitButton'>
              Submit
            </button>
            <button type='button' className='AddForm__CancelButton' onClick={() => window.history.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddProduct
