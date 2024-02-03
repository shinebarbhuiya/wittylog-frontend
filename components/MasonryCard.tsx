import React from 'react'



interface MasonryCardProps {
  title: string
  content: string
}

const MasonryCard = ({ title, content } : MasonryCardProps) => {
  return (
    <div className=' py-6'>
          <div className=''>
            <div className='columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-6'>
              <div className=' p-8 rounded-3xl border border-gray-100 bg-emerald-200/60 shadow-lg '> 
                 <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold text-gray-800 '>{title}</h3>
                    <p className='text-gray-700 font-md '>{content}</p>

                 </div>

              </div>
              <div className='aspect-video p-8 rounded-3xl border border-gray-100 bg-white '> 
                 <div className='flex flex-col gap-4'>
                    <h3>xyx</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus enim quidem nobis autem asperiores minus quisquam molestiae eveniet, molestias voluptatum commodi, mollitia at, inventore consequuntur illum? Quibusdam quasi dolor officia!</p>

                 </div>

              </div>
              <div className='aspect-video p-8 rounded-3xl border border-gray-100 bg-white '> 
                 <div className='flex flex-col gap-4'>
                    <h3>xyx</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus enim quidem nobis autem asperiores minus quisquam molestiae eveniet, molestias voluptatum commodi, mollitia at, inventore consequuntur illum? Quibusdam quasi dolor officia!</p>

                 </div>

              </div>
              <div className='aspect-video p-8 rounded-3xl border border-gray-100 bg-white '> 
                 <div className='flex flex-col gap-4'>
                    <h3>xyx</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus enim quidem nobis autem asperiores minus quisquam molestiae eveniet, molestias voluptatum commodi, mollitia at, inventore consequuntur illum? Quibusdam quasi dolor officia!</p>

                 </div>

              </div>
              <div className='aspect-video p-8 rounded-3xl border border-gray-100 bg-white '> 
                 <div className='flex flex-col gap-4'>
                    <h3>xyx</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus enim quidem nobis autem asperiores minus quisquam molestiae eveniet, molestias voluptatum commodi, mollitia at, inventore consequuntur illum? Quibusdam quasi dolor officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reprehenderit, saepe pariatur aspernatur repellendus vitae cupiditate a sapiente quis suscipit corrupti voluptatibus quia! Aliquam ipsam mollitia quaerat excepturi dolorem. Accusantium!</p>

                 </div>

              </div>
             
            </div>
                  
          </div>
    </div>
  )
}

export default MasonryCard