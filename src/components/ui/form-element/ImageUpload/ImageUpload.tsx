import Image from 'next/image'
import { useUpload } from './useUpload'
import { Button } from '../../Button'
import { cn } from '@/lib/utils'
import { ImagePlus } from 'lucide-react'

interface IImageUploadProps {
  isDisabled: boolean
  onChange: (value: string[]) => void
  value: string[]
}

export function ImageUpload({
  isDisabled,
  onChange,
  value
}: IImageUploadProps) {
  const {
    fileInputRef,
    handleButtonClick,
    handleFileChange,
    isLoadingUploadFiles
  } = useUpload(onChange)

  return (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5'>
        {value.map(url => {
          console.log('url:', url)
          return (
            <div
              key={url}
              className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
            >
              <Image
                className='object-contain'
                src={
                  url.includes('/uploads/products/')
                    ? url
                    : `/uploads/products/${url}`
                }
                alt='Картинка'
                fill
              />
            </div>
          )
        })}
      </div>
      <Button
        type='button'
        disabled={isDisabled || isLoadingUploadFiles}
        variant='secondary'
        onClick={handleButtonClick}
        className={cn('flex items-center gap-x-4 size-4 mr-2 w-[200px] p-4', {
          'mt-4': value.length
        })}
      >
        <ImagePlus /> Загрузить картинку
      </Button>
      <input
        className='hidden'
        type='file'
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isDisabled}
      />
    </div>
  )
}
