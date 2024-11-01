import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Select, ConfigProvider, Image, Tooltip, message, Spin, TreeSelect } from 'antd'
import { ArrowRight2, DocumentUpload, ProgrammingArrows } from 'iconsax-react'
import { DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import ProductsAPI from '../../Api/admin/products'
import CategoriesAPI from '../../Api/admin/categories'
import BrandsAPI from '../../Api/admin/brands'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/app.context'
import BreadCrumbs from '../AdminBreadCrumbs'
const customThemeSelect = {
  token: {
    colorTextQuaternary: '#1D242E',
    colorTextPlaceholder: '#1D242E',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
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
const EditProduct = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()
  const handleUnauthorized = () => {
    toast.error('Unauthorized access or token expires, please login again!', {
      autoClose: { time: 3000 }
    })
    localStorage.removeItem('accesstoken')
    setIsAuthenticated(false)
    navigate('/admin/login')
  }
  const { productID } = useParams()
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
  const [productQuantity, setProductQuantity] = useState('')
  const [errorProductQuantity, setErrorProductQuantity] = useState('')
  const [productSold, setProductSold] = useState('')
  const [errorProductSold, setErrorProductSold] = useState('')
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
  const [messageApi, contextHolder] = message.useMessage()
  const [messageResult, setMessageResult] = useState('')
  const [status, setStatus] = useState(0)
  const [submitLoading, setSubmitLoading] = useState(false)

  const fetchProducts = async () => {
    const response = await ProductsAPI.getProductByID(productID)
    if (!response.ok) {
      const { messages } = await response.json()
      setStatus(response.status)
      setMessageResult('Error fetching product:', messages)
      return
    }
    const data = await response.json()
    const product = data['data']
    setProductName(product.product_name !== null ? product.product_name : '')
    setCategory(product.category_id !== null ? product.category_id : '')
    setBrand(product.brand_id !== null ? product.brand_name : '')
    setProductPrice(product.product_price !== null ? parseFloat(product.product_price).toString() : '')
    setProductDiscount(product.product_discount !== null ? parseFloat(product.product_discount).toString() : '')
    setProductQuantity(product.product_quantity !== null ? parseFloat(product.product_quantity).toString() : '')
    setProductSold(product.product_sold !== null ? parseFloat(product.product_sold).toString() : '')
    setProductPackage(product.package !== null ? product.package : '')
    setProductIngredient(product.ingredient !== null ? product.ingredient : '')
    setProductDosageForm(product.dosage_form !== null ? product.dosage_form : '')
    setProductSpecification(product.specification !== null ? product.specification : '')
    setProductManufacturer(product.manufacturer !== null ? product.manufacturer : '')
    setProductPlaceOfManufacture(product.place_of_manufacture !== null ? product.place_of_manufacture : '')
    setUploadImages(product.product_images !== null ? product.product_images.map((image) => `${image}`) : [])
    setProductUses(product.product_uses !== null ? product.product_uses : '')
    setProductDescription(product.product_description !== null ? product.product_description : '')
  }

  const fetchExistingNames = async () => {
    const response = await fetch('https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/products')
    const data = await response.json()
    return data['data'].map((product) => product.product_name)
  }

  const handleErrorProductName = async (value) => {
    if (value === '') {
      setErrorProductName('This field cannot be empty.')
      return false
    } else if (
      !/^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/.test(
        value
      )
    ) {
      setErrorProductName('Name must start with a letter.')
      return false
    } else if (
      !/^[A-Za-z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/.test(
        value
      )
    ) {
      setErrorProductName('Name can only contain letters, numbers, and spaces.')
      return false
    } else if (value.length < 3 || value.length > 50) {
      setErrorProductName('Name must be between 3 and 50 characters long.')
      return false
    }
    const existingNames = await fetchExistingNames()
    if (existingNames.includes(value) && value !== productName) {
      setErrorProductName('This name already exists.')
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

  const handleErrorProductQuantity = (value) => {
    if (value === '') {
      setErrorProductQuantity('This field cannot be empty.')
      return false
    } else if (!/^[1-9]\d*$/.test(value)) {
      setErrorProductQuantity('Please enter a positive number')
      return false
    }
    return true
  }

  const handleErrorProductSold = (value) => {
    if (value === '') {
      setErrorProductSold('This field cannot be empty.')
      return false
    } else if (!/^[0-9]\d*$/.test(value)) {
      setErrorProductSold('Please enter a positive number')
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

  const handleErrorFileUpload = (values) => {
    if (values.length === 0) {
      setErrorFiles('Please upload at least one image')
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
      setErrorProductDescription('This field cannot be empty')
      return false
    }
    return true
  }

  const handleUploadImages = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      const filesArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file))
      setUploadImages((prevImages) => prevImages.concat(filesArray))
      setFiles((prevFiles) => prevFiles.concat(files))
      event.target.value = null
    }
  }

  const handleChangeUpload = (e) => {
    if (e.target.files) {
      const file = e.target.files[0]
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

  const handleSubmit = async (e) => {
    setSubmitLoading(true)
    e.preventDefault()
    const isValidProductName = await handleErrorProductName(productName)
    const isValidCategory = handleErrorCategory(category)
    const isValidBrand = handleErrorBrand(brand)
    const isValidProductPrice = handleErrorProductPrice(productPrice)
    const isValidProductDiscount = handleErrorProductDiscount(productDiscount)
    const isValidProductQuantity = handleErrorProductQuantity(productQuantity)
    const isValidProductSold = handleErrorProductSold(productSold)
    const isValidFileUpload = handleErrorFileUpload(uploadImages)
    const isValidProductDosageForm = handleErrorDosageForm(productDosageForm)
    const isValidProductSpecification = handleErrorSpecification(productSpecification)
    const isValidProductManufacturer = handleErrorManufacturer(productManufacturer)
    const isValidProductPlaceOfManufacture = handleErrorPlaceOfManufacture(productPlaceOfManufacture)
    const isValidProductUses = handleErrorProductUses(productUses)
    const isValidProductDescription = handleErrorProductDescription(productDescription)
    if (
      !isValidProductName ||
      !isValidCategory ||
      !isValidBrand ||
      !isValidProductPrice ||
      !isValidProductDiscount ||
      !isValidProductQuantity ||
      !isValidProductSold ||
      !isValidFileUpload ||
      !isValidProductDosageForm ||
      !isValidProductSpecification ||
      !isValidProductManufacturer ||
      !isValidProductPlaceOfManufacture ||
      !isValidProductUses ||
      !isValidProductDescription
    ) {
      setSubmitLoading(false)
      setStatus(422)
      setMessageResult('Invalid data, please check your input')
      return
    }
    const form = e.target
    const formData = new FormData(form)
    const product_images = Array.from(new Set(files.map((file) => file.name))).map((name) =>
      files.find((file) => file.name === name)
    )
    product_images.forEach((file) => {
      formData.append('product_images[]', file)
    })
    // Append fields, converting empty strings to null and ensuring no duplicates
    const fields = {
      product_name: formData.get('product_name') || '',
      category_id: formData.get('category_id') || '',
      brand_id: formData.get('brand_id') || '',
      product_price: formData.get('product_price') || '',
      product_discount: formData.get('product_discount') || '',
      product_quantity: formData.get('product_quantity') || '',
      product_sold: formData.get('product_sold') || '',
      package: formData.get('package') || '',
      ingredient: formData.get('ingredient') || '',
      dosage_form: formData.get('dosage_form') || '',
      specification: formData.get('specification') || '',
      manufacturer: formData.get('manufacturer') || '',
      place_of_manufacture: formData.get('place_of_manufacture') || '',
      product_uses: formData.get('product_uses') || '',
      product_description: formData.get('product_description') || ''
    }
    Object.keys(fields).forEach((key) => {
      formData.delete(key) // Ensure no duplicates
      formData.append(key, fields[key])
    })
    try {
      const response = await ProductsAPI.updateProducts(productID, formData, token)
      if (!response.ok) {
        setSubmitLoading(false)
        const { messages } = await response.json()
        if (response.status === 401) {
          handleUnauthorized()
        } else if (response.status === 422) {
          setStatus(422)
          setMessageResult(`Invalid data: ${messages}`)
        } else {
          setStatus(response.status)
          setMessageResult('Error update product:', messages)
        }
        return
      }
      const result = await response.json()
      const { messages, status } = result
      setStatus(status)
      setMessageResult(messages)
    } catch (e) {
    } finally {
      setSubmitLoading(false)
    }
  }
  const convertDataToTree = (data) => {
    const map = {}
    const tree = []

    data.forEach((item) => {
      map[item.category_id] = { ...item, children: [] }
    })

    data.forEach((item) => {
      if (item.category_parent_id !== null) {
        map[item.category_parent_id].children.push(map[item.category_id])
      } else {
        tree.push(map[item.category_id])
      }
    })

    return tree
  }

  const convertToTreeData = (data) => {
    return data.map((item) => ({
      title: item.category_name,
      value: item.category_id,
      children: item.children ? convertToTreeData(item.children) : []
    }))
  }

  useEffect(() => {
    try {
      fetchProducts()
      CategoriesAPI.getAllCategories(token)
        .then((response) => response.json())
        .then(({ data }) => {
          if (data) {
            let categories = []
            categories = convertToTreeData(
              convertDataToTree(data.filter((category) => category.category_is_delete === 0))
            )
            setCategories(categories)
          }
        })
      BrandsAPI.getBrands()
        .then((response) => response.json())
        .then(({ data }) => {
          let brands = data.map((brand) => ({
            title: brand.brand_id,
            value: brand.brand_name
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
      toast.success('Update product success', { autoClose: 2000 })
      window.history.back()
    } else if (status >= 400) {
      toast.error(messageResult, { autoClose: 3000 })
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
                  <Link to={`/admin/products/update/${productID}`} tabIndex={-1}>
                    <span>Update Product</span>
                  </Link>
                )
              }
            ]}
          />
          <p className='mt-2'>
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
        <form action='#' className='AddForm mt-6 w-[100%]' autoComplete='off' onSubmit={handleSubmit}>
          <div className='mb-5 flex w-full justify-between gap-x-12 animate-[slideUp_1s_ease]'>
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
                    className='AddForm__input'
                    readOnly
                  />
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
                  <ConfigProvider theme={customThemeSelect}>
                    <TreeSelect
                      allowClear
                      showSearch
                      placeholder='- Choose Category -'
                      placement='bottomLeft'
                      treeData={categories}
                      treeDefaultExpandAll
                      value={category || undefined}
                      dropdownStyle={{ overflow: 'auto' }}
                      onDropdownVisibleChange={() => setErrorCategory('')}
                      className='AddForm__select'
                      onChange={(value) => {
                        setCategory(value)
                      }}
                    />
                    <input type='hidden' name='category_id' value={category || ''} />
                  </ConfigProvider>
                  <p className='error_message'>{errorCategory}</p>
                </div>
                <div className='AddForm__group'>
                  <label htmlFor='Brand'>
                    <span className='text-[red]'>* </span>Brand
                  </label>
                  <ConfigProvider theme={customThemeSelect}>
                    <Select
                      id='Brand'
                      options={brands}
                      placeholder='-Choose brand-'
                      className='AddForm__select'
                      value={brand || undefined}
                      allowClear
                      onDropdownVisibleChange={() => setErrorBrand('')}
                      onChange={(value) => {
                        const selectedBrand = brands.find((brand) => brand.value === value)
                        if (selectedBrand) {
                          setBrand(selectedBrand.value)
                        } else {
                          setBrand('')
                        }
                      }}
                    />
                    <input type='hidden' name='brand_id' value={brands.find((b) => b.value === brand)?.title || ''} />
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
                  <label htmlFor='product_quantity'>
                    <span className='text-[red]'>* </span>Quantity
                  </label>
                  <input
                    type='text'
                    id='product_quantity'
                    name='product_quantity'
                    placeholder='40'
                    className='AddForm__input'
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    onFocus={() => setErrorProductQuantity('')}
                  />
                  <p className='error_message'>{errorProductQuantity}</p>
                </div>
                <div className='AddForm__group'>
                  <label htmlFor='product_sold'>
                    <span className='text-[red]'>* </span>Sold
                  </label>
                  <input
                    type='text'
                    id='product_sold'
                    name='product_sold'
                    placeholder='20'
                    className='AddForm__input'
                    value={productSold}
                    onChange={(e) => setProductSold(e.target.value)}
                    onFocus={() => setErrorProductSold('')}
                  />
                  <p className='error_message'>{errorProductSold}</p>
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
            </div>
            <Tooltip
              title={errorFiles}
              open={errorFiles === '' ? false : true}
              placement='topCenter'
              align={{
                offset: [0, -20]
              }}
            >
              <div className='max-w-[48%] bg-[transparent] grow flex flex-col gap-y-1'>
                <label htmlFor=''>
                  <span className='text-[red]'>* </span>Image (.jpg, .jpeg, .png)
                </label>
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
                      <button
                        className='thumbnail__arrow thumbnail__right'
                        onClick={scrollThumbnailRight}
                        type='button'
                      >
                        &gt;
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type='file'
                  id='imageUpload'
                  accept='image/jpg, image/jpeg, image/png'
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleUploadImages}
                />
                <input
                  type='file'
                  id='imageChangeUpload'
                  accept='image/jpg, image/jpeg, image/png'
                  style={{ display: 'none' }}
                  onChange={handleChangeUpload}
                />
              </div>
            </Tooltip>
          </div>
          <div className='flex gap-x-12 justify-between flex-col'>
            <div className='AddForm__row manufacture__info'>
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
            <div className='AddForm__row w-full'>
              <div className='relative w-full'>
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
              <div className='relative w-full'>
                <label htmlFor='product_description'>
                  <span className='text-[red]'>* </span>Product Description
                </label>
                <textarea
                  id='product_description'
                  name='product_description'
                  rows={6}
                  placeholder='<div class="pmc-content-html [&amp;_a:not(.ignore-css_a)]:text-hyperLink max-w-[calc(100vw-32px)] overflow-auto md:w-[calc(var(--width-container)-312px-48px)] md:max-w-none"><p><strong>Thành phần </strong></p><p>ACETYLCYSTEINE 100mg Tá dược bao gồm Vitamin C, Saccharose, Natri saccharin, Kollidon K30, Mùi cam   </p><p></p><p><strong>Chỉ định (Thuốc dùng cho bệnh gì?) </strong></p><p>Thuốc Acehasan 100 làm loãng đờm trong các bệnh phế quản - phổi cấp và mãn tính kèm theo sự tăng tiết chất nhầy'
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
          <div className='AddForm__row button__group'>
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

export default EditProduct
