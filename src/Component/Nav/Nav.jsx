import React from 'react'

export default function Nav({ title, image, alt, className, href }) {
  return (
    <>
      <a rel='noopener noreferrer' target='_blank' className={className} href={href}>
        <p title='Doanh nghiệp' class='truncate'>
          {title}
        </p>
        {image && (
          <div class='relative h-4 w-8'>
            <img class='object-cover' src={image} alt={alt} loading='lazy' sizes='(max-width: 768px) 6rem, 6rem' />
          </div>
        )}
      </a>
    </>
  )
}
