import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Col, Image } from 'antd'
import ImageGallery from 'react-image-gallery'
export default function ModalGalary(props) {
  const refGallery = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { isModalOpen, setIsModalOpen, title, items, currentIndex } = props

  useEffect(() => {
    if (isModalOpen) {
      setActiveIndex(currentIndex)
    }
  }, [isModalOpen, currentIndex])
  return (
    <div>
      <Modal
        width={'55vw'}
        title={title}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        className='modal-gallery'
      >
        <div className='grid grid-cols-1 md:grid-cols-9 gap-3'>
          <div className='col-span-6'>
            <ImageGallery
              ref={refGallery}
              items={items}
              showPlayButton={false} //hide play button
              showFullscreenButton={false} //hide fullscreen button
              slideOnThumbnailOver={true} //onHover => auto scroll images
              showThumbnails={false}
              startIndex={activeIndex}
              //               Tóm tắt:
              // onSlide={(i) => setActiveIndex(i)}: Dùng để cập nhật trạng thái chỉ số slide hiện tại khi người dùng thay đổi slide.
              // onClick={() => { refGallery.current.slideToIndex(i) }}: Dùng để điều hướng trực tiếp đến một slide cụ thể khi nhấp chuột.
              onSlide={(i) => setActiveIndex(i)}
              slideDuration={0} //duration between slices
            />
          </div>
          <div className='col-span-3'>
            <div className='grid grid-cols-2 gap-5'>
              {items?.map((item, i) => {
                return (
                  <Col key={`image-${i}`}>
                    <Image
                      wrapperClassName={'img-normal'}
                      width={100}
                      height={100}
                      src={item.original}
                      preview={false}
                      onClick={() => {
                        refGallery.current.slideToIndex(i)
                      }}
                    />
                    <div className={activeIndex === i ? 'active' : ''}></div>
                  </Col>
                )
              })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

// <div className={activeIndex === i ? 'active' : ''}></div>
