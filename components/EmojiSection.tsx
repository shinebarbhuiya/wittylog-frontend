import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EmojiSection = () => {
  return (
    <div className=' flex flex-col md:flex-row py-8'>
                <div className='basis-3/4   bg-gray-200 px-6 rounded-md'>
                    <div className='flex flex-col py-3'>
                        <div className='pb-3'>
                            <h3 className='text-2xl font-bold'>How are you feeling today?</h3>

                        </div>
                        
                        
                        <div className=' h-full flex items-center justify-between '>
                            <Link href="/home" className='flex flex-col items-center justify-center gap-2 hover:bg-gray-300 p-4 transition rounded-md'>
                                <Image className='' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Bomb.png" alt="Excited" width="80" height="80" />
                                <span>Excited</span>
                                
                            </Link>
                            
                            <Link href="/home" className='flex flex-col items-center justify-center gap-2'>
                                <Image className='' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png" alt="Happy" width="80" height="80" />
                                <span>Happy</span>
                            </Link>
                            <Link href="/home " className='flex flex-col items-center justify-center gap-2'>
                                <Image className='' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Neutral%20Face.png" width="80" height="80" alt="Neutral" />
                                <span>Neutral</span>
                            </Link>
                            <Link href="/home" className='flex flex-col items-center justify-center gap-2'>
                                <Image className='' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Confused%20Face.png" alt="Confused" width="80" height="80" />
                                <span>Confused</span>
                            </Link>
                            <Link href="/home" className='flex flex-col items-center justify-center gap-2'>
                                <Image className='' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Persevering%20Face.png" alt="Sad" width="80" height="80" />
                                <span>Sad</span>
                            </Link>
                            <Link href="/home" className='flex flex-col items-center justify-center gap-2'>
                                <Image className='' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Symbols%20on%20Mouth.png" alt="Angry" width="80" height="80" />
                                <span>Angry</span>
                            </Link>

                          
                            
                        </div>
                    </div>
                </div>

                <div className='basis-2/4  gap-5 mx-2 '>
                    <div className='flex flex-col space-y-2'>
                        <div className='rounded-md bg-gray-500 py-8'>

                            Total writing time

                        </div>
                        <div className='rounded-md bg-gray-500 py-8'>
                            Current Streak
                        </div>
                    </div>

                </div>


            </div>
  )
}

export default EmojiSection