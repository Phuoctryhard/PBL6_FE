import { Link, useParams } from 'react-router-dom'
import { Select, ConfigProvider, Image, Tooltip, message, Spin, Modal, TreeSelect } from 'antd'
import { ArrowDown2, DocumentUpload, ProgrammingArrows } from 'iconsax-react'
import { CloseOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import { ProductsAPI, CategoriesAPI, BrandsAPI } from '../../Api/admin'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminEditor, BreadCrumbs } from '../'
import { useAdminMainLayoutFunction } from '../../Layouts/Admin/MainLayout/MainLayout'
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
      selectorBg: '#f7f8fa',
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
  const { setIsLogin } = useAdminMainLayoutFunction()
  const [messageApi, contextHolder] = message.useMessage()
  const openMessage = (type, content, duration) => {
    messageApi.open({
      type: type,
      content: content,
      duration: duration
    })
  }
  const [openModalView, setOpenModalView] = useState(false)
  const [editorSelect, setEditorSelect] = useState('')
  const [editorFocus, setEditorFocus] = useState(false)
  const handleCancelPreview = () => {
    setOpenModalView(false)
  }

  const { productID } = useParams()
  const [productName, setProductName] = useState('')
  const [errorProductName, setErrorProductName] = useState('')
  const [productSlug, setProductSlug] = useState('')
  const [errorProductSlug, setErrorProductSlug] = useState('')
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
  const [productSpecification, setProductSpecification] = useState('')
  const [productManufacturer, setProductManufacturer] = useState('')
  const [productPlaceOfManufacture, setProductPlaceOfManufacture] = useState('')
  const [uploadImages, setUploadImages] = useState([])
  const thumbnailRef = useRef()
  const [showThumbnailLeft, setShowThumbnailLeft] = useState(false)
  const [showThumbnailRight, setShowThumbnailRight] = useState(true)
  const [files, setFiles] = useState([])
  const [errorFiles, setErrorFiles] = useState('')
  const [productUses, setProductUses] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const token = localStorage.getItem('accesstoken')
  const [messageResult, setMessageResult] = useState('')
  const [status, setStatus] = useState(0)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [treeData, setTreeData] = useState([])

  const fetchProducts = async () => {
    try {
      const res = await ProductsAPI.getProductByID(productID)
      const product = res?.data
      if (!product) {
        throw new Error(`results in fetchProduct not have key data`)
      }
      setProductName(product.product_name !== null ? product.product_name : '')
      setProductSlug(product.product_slug !== null ? product.product_slug : '')
      setCategory(product.category_id !== null ? product.category_id : '')
      setBrand(product.brand_id !== null ? product.brand_id : '')
      setProductPrice(product.product_price !== null ? parseFloat(product.product_price).toString() : '')
      setProductDiscount(product.product_discount !== null ? parseFloat(product.product_discount).toString() : '')
      setProductPackage(product.package !== null ? product.package : '')
      setProductIngredient(product.ingredient !== null ? product.ingredient : '')
      setProductDosageForm(product.dosage_form !== null ? product.dosage_form : '')
      setProductSpecification(product.specification !== null ? product.specification : '')
      setProductManufacturer(product.manufacturer !== null ? product.manufacturer : '')
      setProductPlaceOfManufacture(product.place_of_manufacture !== null ? product.place_of_manufacture : '')
      const imageUrls = product.product_images !== null ? product.product_images.map((image) => `${image}`) : []
      setUploadImages(imageUrls)
      setProductUses(product.product_uses !== null ? product.product_uses : '')
      setProductDescription(product.product_description !== null ? product.product_description : '')
    } catch (error) {
      setStatus(400)
      setMessageResult(error.message)
    }
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

  const handleErrorSlug = (value) => {
    if (value === '') {
      setErrorProductSlug('This field cannot be empty.')
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
    } else if (!/^\d+(\.\d+)?$/.test(value) || parseFloat(value) <= 0) {
      setErrorProductPrice('Please enter a positive number.')
      return false
    }
    return true
  }

  const handleErrorProductDiscount = (value) => {
    if (value === '') return true
    if (!/^[0-9]\d*$/.test(value)) {
      setErrorProductDiscount('Please enter a positive number')
      return false
    } else if (parseFloat(value) > 100) {
      setErrorProductDiscount('Please enter a number less than or equal to 100')
      return false
    }
    return true
  }

  const handleErrorFileUpload = (values) => {
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
      setUploadImages([])
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
          errorMessages.push(`${file.name} is not a valid image file`)
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

  const handleValidation = () => {
    const isValidProductName = handleErrorProductName(productName)
    const isValidCategory = handleErrorCategory(category)
    const isValidProductSlug = handleErrorSlug(productSlug)
    const isValidBrand = handleErrorBrand(brand)
    const isValidProductPrice = handleErrorProductPrice(productPrice)
    const isValidProductDiscount = handleErrorProductDiscount(productDiscount)
    const isValidFileUpload = handleErrorFileUpload(uploadImages)
    if (
      !isValidProductName ||
      !isValidCategory ||
      !isValidBrand ||
      !isValidProductPrice ||
      !isValidProductDiscount ||
      !isValidFileUpload ||
      !isValidProductSlug
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

    formData.append('product_name', productName)
    formData.append('product_slug', productSlug)
    formData.append('category_id', category)
    formData.append('brand_id', brand)
    formData.append('product_price', productPrice)
    if (productDiscount) formData.append('product_discount', productDiscount)
    if (productPackage) formData.append('package', productPackage)
    if (productIngredient) formData.append('ingredient', productIngredient)
    if (productDosageForm) formData.append('dosage_form', productDosageForm)
    if (productSpecification) formData.append('specification', productSpecification)
    if (productManufacturer) formData.append('manufacturer', productManufacturer)
    if (productPlaceOfManufacture) formData.append('place_of_manufacture', productPlaceOfManufacture)
    if (productUses) formData.append('product_uses', productUses)
    if (productDescription) formData.append('product_description', productDescription)

    try {
      const response = await ProductsAPI.updateProducts(productID, formData, token)
      setStatus(200)
      setMessageResult('Update product success')
    } catch (e) {
      if (e.message.includes('401')) {
        setIsLogin(false)
        return
      }
      setStatus(400)
      setMessageResult(e.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  const convertToTreeData = (data) => {
    const filterData = data.filter((item) => item.category_type === 'medicine')
    return filterData.map((item) => ({
      title: item.category_name,
      label: item.category_name,
      value: item.category_id,
      children: item.children ? convertToTreeData(item.children) : []
    }))
  }

  useEffect(() => {
    try {
      fetchProducts()
      CategoriesAPI.getAllCategories(token)
        .then(({ data }) => {})
        .catch((err) => {
          setStatus(400)
          setMessageResult(err.message)
        })

      const fetchCategory = async () => {
        try {
          const res = await CategoriesAPI.getCategories()
          const data = res.data
          const categories = convertToTreeData(data.filter((category) => category.category_is_delete === 0))
          setTreeData(categories)
        } catch (err) {
          setStatus(400)
          setMessageResult(err.message)
        }
      }

      fetchCategory()
      BrandsAPI.getBrands()
        .then(({ data }) => {
          let brands = data.map((brand) => ({
            label: brand.brand_name,
            value: brand.brand_id
          }))
          setBrands(brands)
        })
        .catch((err) => {
          setStatus(400)
          setMessageResult(err.message)
        })
    } catch (err) {
      setStatus(400)
      setMessageResult(err.message)
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
        <div className='flex flex-col'>
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
          <p className='mt-1'>
            All fields marked with (<span className='text-[red]'>*</span>) are required, except those that are optional.
          </p>
        </div>
        {/* <div className='flex gap-x-3 max-w-[50%]'>
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
        </div> */}
      </header>
      <div className='my-8 p-8 bg-[#fff] rounded-xl border border-solid border-[#e8ebed]'>
        <Spin spinning={submitLoading} tip='Loading...' size='large' fullscreen />
        <form
          action='#'
          className='AddForm w-[100%] text-base flex flex-col'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <div className='flex w-full justify-between gap-8 animate-[slideUp_1s_ease]'>
            <div className='w-full max-w-[50%] flex-[1_1_50%] flex flex-col gap-8'>
              <div className='w-full flex flex-col p-8 border border-[#e8ebed] border-solid rounded-xl bg-[#fff]'>
                <h2 className='text-lg text-black font-medium pb-8 text-center'>Product basic information</h2>
                <div className='flex flex-col gap-8'>
                  <div className='AddForm__row'>
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
                      <label htmlFor='product_slug'>
                        <span className='text-[red]'>* </span>Slug
                      </label>
                      <input
                        type='text'
                        id='product_slug'
                        name='product_slug'
                        value={productSlug}
                        placeholder='thuoc-cam-cum'
                        className='AddForm__input'
                        onChange={(e) => setProductSlug(e.target.value)}
                        onFocus={() => setErrorProductSlug('')}
                      />
                      <p className='error_message'>{errorProductSlug}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-col p-8 border border-[#e8ebed] border-solid rounded-xl bg-[#fff]'>
                <h2 className='text-lg text-black font-medium pb-8 text-center'>Category and brand</h2>
                <div className='flex flex-col gap-8'>
                  <div className='AddForm__row'>
                    <div className='AddForm__group'>
                      <label htmlFor='Category'>
                        <span className='text-[red]'>* </span>Category
                      </label>
                      <ConfigProvider theme={filterTheme}>
                        <TreeSelect
                          suffixIcon={<ArrowDown2 size='15' color='#1D242E' />}
                          allowClear
                          showSearch
                          placeholder='Select Category'
                          placement='bottomLeft'
                          filterTreeNode={(input, node) => node.title.toLowerCase().includes(input.toLowerCase())}
                          treeData={treeData}
                          treeDefaultExpandAll
                          value={category || undefined}
                          className='AddForm__select'
                          onChange={(value) => {
                            setCategory(value)
                          }}
                        />
                      </ConfigProvider>
                      <p className='error_message'>{errorCategory}</p>
                    </div>
                  </div>
                  <div className='AddForm__row'>
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
                          value={brand || undefined}
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
                </div>
              </div>
              <div className='w-full flex flex-col p-8 border border-[#e8ebed] border-solid rounded-xl bg-[#fff]'>
                <h2 className='text-lg text-black font-medium pb-8 text-center'>Price and discount</h2>
                <div className='flex flex-col gap-8'>
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
                  </div>
                  <div className='AddForm__row'>
                    <div className='AddForm__group'>
                      <label htmlFor='product_discount'>Discount</label>
                      <input
                        type='text'
                        id='product_discount'
                        name='product_discount'
                        placeholder='20'
                        className='AddForm__input'
                        value={productDiscount || ''}
                        onChange={(e) => setProductDiscount(e.target.value)}
                        onFocus={() => setErrorProductDiscount('')}
                      />
                      <p className='error_message'>{errorProductDiscount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full max-w-[50%] bg-[transparent]'>
              <div className='flex flex-col gap-2 sticky top-0 w-full'>
                <div className='flex justify-between items-center w-full'>
                  <label htmlFor='imageUpload'>Image (.jpg, .jpeg, .png, .gif, .svg)</label>
                  <div className='flex gap-4'>
                    <label
                      htmlFor='imageUpload'
                      className='cursor-pointer h-[46px] px-[18px] py-[16px] bg-[#16a2b8] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px]'
                      onClick={() => setErrorFiles('')}
                    >
                      <span className='flex items-center justify-center'>
                        <DocumentUpload />
                      </span>
                    </label>
                    <button
                      type='button'
                      onClick={() => {
                        handleDeleteImage(currentSlide)
                      }}
                      className='cursor-pointer h-[46px] px-[18px] py-[16px] bg-[#db3545] rounded-[4px] text-[#FFFFFF] flex items-center font-bold text-[14px] gap-x-2'
                    >
                      <DeleteOutlined className='text-[20px]' />
                    </button>
                    <label
                      htmlFor='imageChangeUpload'
                      className='cursor-pointer h-[46px] px-[18px] py-[16px] bg-[#007bff] rounded-[4px] text-[#FFFFFF] flex gap-x-[10px] font-bold items-center text-[14px]'
                      onClick={() => setErrorFiles('')}
                    >
                      <span className='flex items-center justify-center gap-x-2 whitespace-nowrap'>
                        <ProgrammingArrows />
                      </span>
                    </label>
                  </div>
                </div>
                <div className='flex flex-col gap-1 '>
                  <Tooltip title={errorFiles} open={errorFiles === '' ? false : true} placement='top' align='center'>
                    <div className='slider__container'>
                      <div className='slides'>
                        {uploadImages.length === 0 ? (
                          <div className='slide flex justify-center items-center relative w-full'>
                            <Image
                              src='/assets/images/default-image.png'
                              alt='Default Preview'
                              width='100%'
                              height='350px'
                              className='object-cover'
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
                        <button
                          className='thumbnail__arrow thumbnail__left'
                          onClick={scrollThumbnailLeft}
                          type='button'
                        >
                          &lt;
                        </button>
                      )}
                      {uploadImages.length === 0 ? (
                        <img
                          src='/assets/images/default-image.png'
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
          <div className='w-full flex flex-col p-8 border border-[#e8ebed] border-solid rounded-xl bg-[#fff] my-8'>
            <h2 className='text-lg text-black font-medium pb-8 text-center'>Product Detail</h2>
            <div className='flex flex-col gap-8'>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='package'>Package</label>
                  <input
                    type='text'
                    id='package'
                    name='package'
                    placeholder='Package 1'
                    className='AddForm__input'
                    value={productPackage || ''}
                    onChange={(e) => setProductPackage(e.target.value)}
                  />
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='ingredient'>Ingredient</label>
                  <input
                    type='text'
                    id='ingredient'
                    name='ingredient'
                    placeholder='Azithromycin 200mg'
                    className='AddForm__input'
                    onChange={(e) => setProductIngredient(e.target.value)}
                    value={productIngredient || ''}
                  />
                </div>
              </div>
              <div className='AddForm__row '>
                <div className='AddForm__group'>
                  <label htmlFor='dosage_form'>Dosage form</label>
                  <input
                    type='text'
                    id='dosage_form'
                    name='dosage_form'
                    placeholder='Bột pha hỗn dịch uống'
                    className='AddForm__input'
                    onChange={(e) => setProductDosageForm(e.target.value)}
                    value={productDosageForm || ''}
                  />
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='specification'>Specification</label>
                  <input
                    type='text'
                    id='specification'
                    name='specification'
                    placeholder='Điều trị nhiễm khuẩn'
                    className='AddForm__input'
                    onChange={(e) => setProductSpecification(e.target.value)}
                    value={productSpecification || ''}
                  />
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='manufacturer'>Manufacturer</label>
                  <input
                    type='text'
                    id='manufacturer'
                    name='manufacturer'
                    placeholder='Công ty cổ phần dược phẩm Việt Nam'
                    className='AddForm__input'
                    onChange={(e) => setProductManufacturer(e.target.value)}
                    value={productManufacturer || ''}
                  />
                </div>
              </div>
              <div className='AddForm__row'>
                <div className='AddForm__group'>
                  <label htmlFor='place_of_manufacture'>Place of manufacture</label>
                  <input
                    type='text'
                    id='place_of_manufacture'
                    name='place_of_manufacture'
                    placeholder='Việt Nam'
                    className='AddForm__input'
                    onChange={(e) => setProductPlaceOfManufacture(e.target.value)}
                    value={productPlaceOfManufacture || ''}
                  />
                </div>
              </div>
              <div className='AddForm__row w-full'>
                <div className='relative w-full flex flex-col'>
                  <label htmlFor='product_uses'>Product Uses</label>
                  <textarea
                    id='product_uses'
                    name='product_uses'
                    rows={6}
                    placeholder='Mọi thông tin trên đây chỉ mang tính chất tham khảo. Vui lòng đọc kĩ thông tin chi tiết ở tờ hướng dẫn sử dụng của sản phẩm.'
                    className='AddForm__textarea'
                    onChange={(e) => setProductUses(e.target.value)}
                    value={productUses || ''}
                  />
                </div>
              </div>
              <Modal title='' centered open={openModalView} width={'100vw'} footer={false} closeIcon={null}>
                <div className='w-full flex flex-col gap-3'>
                  <h1 className='text-black text-2xl font-semibold mx-auto'>Preview Product Description</h1>
                  <div
                    className='ql-editor flex flex-col gap-4 w-full'
                    dangerouslySetInnerHTML={{
                      __html: productDescription
                    }}
                  ></div>
                  <button
                    type='button'
                    onClick={handleCancelPreview}
                    className='p-2 w-16 h-16 rounded-[50%] bg-[#66b5a2] sticky bottom-8 animate-bounce ml-auto'
                  >
                    <CloseOutlined className='text-white text-2xl' />
                  </button>
                </div>
              </Modal>
              <div className='AddForm__row w-full'>
                <div className='relative w-full flex flex-col gap-2'>
                  <div className='w-full flex justify-between items-center'>
                    <label htmlFor='product_description'>Product Description</label>
                    <button
                      type='button'
                      className='h-[46px] px-4 py-3 bg-[rgb(0,143,153)] rounded-lg text-[#FFFFFF] flex gap-2 font-semibold items-center text-sm hover:bg-opacity-80'
                      onClick={() => setOpenModalView(true)}
                    >
                      View Description
                    </button>
                  </div>
                  <div
                    className='h-[400px] w-full'
                    id='product_description'
                    tabIndex={0}
                    onFocus={() => {
                      setEditorSelect('product_description')
                      setEditorFocus(true)
                    }}
                    onBlur={() => {
                      setEditorFocus(false)
                      setEditorSelect(null)
                    }}
                  >
                    <AdminEditor
                      defaultValue={productDescription}
                      idEditor='product_description'
                      onChange={setProductDescription}
                      placeHolder='Thành phần
Hoạt chất: Levocetirizin dihydroclorid 10mg
Tá dược: Lactose monohydrat, cellulose vi tinh thi (M101), povidon (kollidon 30), croscarmelose natri, magnesi stearat, HPMC E6, talc, titan dioxyd, PEG 4000, polysorbat 80, dầu thầu dầu.'
                      editorSelect={editorSelect}
                      editorFocus={editorFocus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-end gap-4 button__group mt-2'>
            <button
              type='submit'
              className='px-4 py-3 bg-[rgb(0,143,153)] rounded-lg text-[#FFFFFF] flex gap-2 font-semibold items-center text-sm hover:bg-opacity-80'
            >
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
