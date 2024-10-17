import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Image } from 'antd'
import { ArrowRight2, Edit } from 'iconsax-react'
import { useState, useEffect, useRef } from 'react'
import './ViewProduct.css'
let currentSlide = 0
const ViewProduct = () => {
  const { productID } = useParams()
  const [productName, setProductName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDiscount, setProductDiscount] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [productSold, setProductSold] = useState('')
  const [productPackage, setProductPackage] = useState('')
  const [productIngredient, setProductIngredient] = useState('')
  const [productDosageForm, setProductDosageForm] = useState('')
  const [productSpecification, setProductSpecification] = useState('')
  const [productManufacturer, setProductManufacturer] = useState('')
  const [productPlaceOfManufacture, setProductPlaceOfManufacture] = useState('')
  const [productIsDelete, setProductIsDelete] = useState()
  const [productCreatedAt, setProductCreatedAt] = useState('')
  const [productUpdatedAt, setProductUpdatedAt] = useState('')
  const [uploadImages, setUploadImages] = useState([])
  const thumbnailRef = useRef()
  const [showThumbnailLeft, setShowThumbnailLeft] = useState(false)
  const [showThumbnailRight, setShowThumbnailRight] = useState(true)
  const [productUses, setProductUses] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const DateFormat = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', DateFormat)
  }
  const fetchProducts = async () => {
    const response = await fetch(`https://lucifernsz.com/PBL6_Pharmacity/PBL6-BE/public/api/products/${productID}`)
    const data = await response.json()
    const product = data['data']
    setProductName(product.product_name !== null ? product.product_name : '...')
    setCategory(product.category_id !== null ? product.category_name : '...')
    setBrand(product.brand_id !== null ? product.brand_name : '...')
    setProductPrice(product.product_price !== null ? parseFloat(product.product_price).toString() : '...')
    setProductDiscount(product.product_discount !== null ? parseFloat(product.product_discount).toString() : '...')
    setProductQuantity(product.product_quantity !== null ? parseFloat(product.product_quantity).toString() : '...')
    setProductSold(product.product_sold !== null ? parseFloat(product.product_sold).toString() : '...')
    setProductPackage(product.package !== null ? product.package : '...')
    setProductIngredient(product.ingredient !== null ? product.ingredient : '...')
    setProductDosageForm(product.dosage_form !== null ? product.dosage_form : '...')
    setProductSpecification(product.specification !== null ? product.specification : '...')
    setProductManufacturer(product.manufacturer !== null ? product.manufacturer : '...')
    setProductPlaceOfManufacture(product.place_of_manufacture !== null ? product.place_of_manufacture : '...')
    setUploadImages(product.product_images !== null ? product.product_images.map((image) => `${image}`) : [])
    setProductUses(product.product_uses !== null ? product.product_uses : '...')
    setProductDescription(product.product_description !== null ? product.product_description : '...')
    setProductIsDelete(product.product_is_delete !== null ? product.product_is_delete : '...')
    setProductCreatedAt(product.product_created_at !== null ? product.product_created_at : '...')
    setProductUpdatedAt(product.product_updated_at !== null ? product.product_updated_at : '...')
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

  useEffect(() => {
    fetchProducts()
    const container = thumbnailRef.current
    container.addEventListener('scroll', checkThumbnailTranslate)
    return () => {
      container.removeEventListener('scroll', checkThumbnailTranslate)
    }
  }, [])

  return (
    <section className='max-w-[100%] h-max flex flex-col mb-6'>
      <header className='flex justify-between animate-[slideDown_1s_ease]'>
        <div className='Breadcrumb'>
          <h1>
            <Breadcrumb
              separator={<ArrowRight2 size='15' color='#1D242E' />}
              className='font-bold text-[#848A91]'
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
                    <Link to={`/admin/products/${productID}`} tabIndex={-1}>
                      <span>{productName}</span>
                    </Link>
                  )
                }
              ]}
            />
          </h1>
        </div>
        <div className='flex gap-x-3 max-w-[50%]'>
          <button className='cursor-pointer h-[46px] px-[18px] py-[16px] bg-[#db3545] rounded-[4px] text-[#FFFFFF] flex items-center font-bold text-[14px] gap-x-2'>
            <Edit className='text-[20px]' />
            <Link to={`/admin/products/update/${productID}`} tabIndex={-1}>
              <span>Update Product</span>
            </Link>
          </button>
        </div>
      </header>
      <div className='container mt-6 w-full flex h-max flex-col bg-[#ffffff] rounded-xl border-[2px] border-solid border-[#e7ebee] animate-[slideUp_1.5s_ease]'>
        <div className='flex gap-x-10 h-max border-b-[2px] border-b-solid border-b-[#e3e3e3] px-7 pt-7'>
          <div className='w-[60%] max-w-[60%]'>
            <div className='container__group'>
              <div className='group__content'>
                <h2 className='text-[16px] font-bold border-b-[2px] border-b-solid border-b-[#e7ebee] px-[30px] py-[15px] w-[100%] flex justify-between'>
                  <span className='flex-1'>Product overview</span>
                  <span className='flex-1'>
                    Status:{' '}
                    <span className={`text-[${productIsDelete === 0 ? 'green' : 'red'}]`}>
                      {productIsDelete === 0 ? 'Active' : 'Deleted'}
                    </span>
                  </span>
                </h2>
                <div className='group__row'>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Product Name</span>
                    <span className='text-[#1D242E]'>{productName}</span>
                  </div>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Product Price</span>
                    <span className='text-[#1D242E]'>{productPrice}</span>
                  </div>
                </div>
                <div className='group__row'>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Product Quantity</span>
                    <span className='text-[#1D242E]'>{productQuantity}</span>
                  </div>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Product Sold</span>
                    <span className='text-[#1D242E]'>{productSold}</span>
                  </div>
                </div>
                <div className='group__row'>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Product Group</span>
                    <span className='text-[#1D242E]'>{category}</span>
                  </div>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Product Brand</span>
                    <span className='text-[#1D242E]'>{brand}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='container__group'>
              <div className='group__content'>
                <h2 className='text-[16px] font-bold border-b-[2px] border-b-solid border-b-[#e7ebee] px-[30px] py-[15px] w-[100%]'>
                  Product Timestamps
                </h2>
                <div className='group__row'>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Product Create At</span>
                    <span className='text-[#1D242E]'>{formatDateTime(productCreatedAt)}</span>
                  </div>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Product Update At</span>
                    <span className='text-[#1D242E]'>{formatDateTime(productUpdatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='container__group'>
              <div className='group__content'>
                <h2 className='text-[16px] font-bold border-b-[2px] border-b-solid border-b-[#e7ebee] px-[30px] py-[15px] w-[100%]'>
                  Product Specifications
                </h2>
                <div className='group__row'>
                  <div className='group__detail'>
                    <p className='text-[#1D242E] font-medium'>Product Package</p>
                    <p className='text-[#1D242E]'>{productPackage}</p>
                  </div>
                  <div className='group__detail'>
                    <p className='text-[#1D242E] font-medium'>Product Dosage Form</p>
                    <p className='text-[#1D242E]'>{productDosageForm}</p>
                  </div>
                </div>
                <div className='group__row'>
                  <div className='group__detail'>
                    <p className='text-[#1D242E] font-medium'>Product Ingredient</p>
                    <p className='text-[#1D242E]'>{productIngredient}</p>
                  </div>
                </div>
                <div className='group__row'>
                  <div className='group__detail'>
                    <p className='text-[#1D242E] font-medium'>Product Specification</p>
                    <p className='text-[#1D242E] font-medium'></p>
                  </div>
                </div>
              </div>
            </div>
            <div className='container__group'>
              <div className='group__content'>
                <h2 className='text-[16px] font-bold border-b-[2px] border-b-solid border-b-[#e7ebee] px-[30px] py-[15px] w-[100%]'>
                  Manufacturer Information
                </h2>
                <div className='group__row'>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Manufacturer</span>
                    <span className='text-[#1D242E]'>{productManufacturer}</span>
                  </div>
                </div>
                <div className='group__row'>
                  <div className='group__detail'>
                    <span className='text-[#1D242E] font-medium'>Place Of Manufacturer</span>
                    <span className='text-[#1D242E]'>{productPlaceOfManufacture}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[40%] max-w-[40%] '>
            <div className='bg-[transparent] grow flex flex-col gap-y-1 h-[500px] sticky top-0 right-0'>
              <div className='slider__container'>
                <div className='slides'>
                  {uploadImages.length === 0 ? (
                    <div className='slide flex justify-center items-center relative w-full'>
                      <Image
                        src='/assets/images/default-image.jpg'
                        alt='Default Preview'
                        width='100%'
                        height='100%'
                        preview={false}
                      />
                    </div>
                  ) : (
                    <Image.PreviewGroup items={uploadImages.map((image) => ({ src: image }))}>
                      {uploadImages.map((image, index) => (
                        <div key={index} className='slide flex justify-center'>
                          <Image src={image} alt='Preview' className='object-cover' width='100%' height='100%' />
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
                    <button className='thumbnail__arrow thumbnail__right' onClick={scrollThumbnailRight} type='button'>
                      &gt;
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[100%] max-[100%] bg-[#ffffff] rounded-xl px-7 pt-7'>
          <div className='container__group'>
            <div className='group__content'>
              <h2 className='text-[16px] font-bold border-b-[2px] border-b-solid border-b-[#e7ebee] px-[30px] py-[15px] w-[100%]'>
                Product Description
              </h2>
              <div className='group__row'>
                <div className='group__detail'>
                  <p className='text-[#1D242E] font-medium'>Product Uses</p>
                  <p className='text-[#1D242E]'>{productUses}</p>
                </div>
              </div>
              <div className='group__row'>
                <div className='group__detail'>
                  <p className='text-[#1D242E] font-medium'>Product Description</p>
                  <p className='text-[#1D242E]'>{productDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewProduct
