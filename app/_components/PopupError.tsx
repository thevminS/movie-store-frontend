import React from 'react'

function PopupError({message} : any) {
  return (
    <div className='absolute right-2 top-2 w-60 h-30 rounded-xl bg-gray-50 p-5 text-black'>
        {message}
    </div>
  )
}

export default PopupError
