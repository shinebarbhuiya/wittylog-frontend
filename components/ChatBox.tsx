"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Message } from 'ai'
import React from 'react'

import { useChat } from "ai/react"
import { cn } from '@/lib/utils'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Bot, Trash } from 'lucide-react'

const ChatBox = () => {

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading,
        error
    } = useChat();

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);


    useEffect(() => {
        inputRef.current?.focus();
        
    }, [])

    const lasMessageIsUser = messages[messages.length - 1]?.role === 'user';



    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault()
    //   console.log(e)
    // }

    return (
        <div className='h-full w-full '>
            <div className='chatbot-h  h-full w-full    rounded-md '>
                <div ref={scrollRef} className='h-full pb-32 fixed bottom-0 top-24  right-4 left-4 md:left-80 md:right-8 md:pb-36 scrollbar-hide  overflow-y-auto  bg-[#D9FFF5] rounded-md'> 
                    {/* <div className='text-center py-2 bg-[#358e80] mb-2 font-semibold text-xl text-white/90'>WittyLog Chat </div> */}
                    <div className='mt-4'></div>
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}

                    { isLoading && lasMessageIsUser && (
                        <ChatMessage message={{ role: 'assistant', content: 'Witty is thinking...' }} />
                    )

                    }

                    {error && (
                        <ChatMessage message={{ role: 'assistant', content: 'Sorry! Witty is having some issues right now. Please try again after some time.' }} />
                    )}


                    {
                        !error && messages.length === 0 && (
                            <div className='flex items-center justify-center h-full gap-1'>
                                <Bot className='text-gray-800 mb-1' />
                                <p className='text-gray-800'>Ask Witty anything about your entries</p>
                            </div>
                        )
                    }


                </div>

                <form onSubmit={handleSubmit} className='absolute bottom-0  right-4 left-4 md:right-8 md:left-80  z-10'>
                    <div className='flex w-full items-center    '>
                        <Button disabled={isLoading} onClick={() => setMessages([])} className='py-6 px-4 rounded-none rounded-bl-md' variant='outline' type='button'><Trash   /></Button>
                        <Input ref={inputRef} value={input} onChange={handleInputChange} className=' py-6 px-4 w-full rounded-none rounded-bl-md' placeholder='Ask anything. . .' type='text' />
                        <Button type='submit' className='py-6 px-6 rounded-none rounded-br-md' disabled={isLoading}>Send</Button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default ChatBox


function ChatMessage({ message: { role, content } }: { message: Pick<Message, "role" | "content"> }) {

    const isAiMessage = role === 'assistant'

    return (
        <div className={cn('mb-3 flex items-center px-6 ', isAiMessage ? 'justify-start ' : 'justify-end ')}>
            {/* <div className=''>{role} </div> */}
            <p className={cn('whitespace-pre-line rounded-md border px-3 py-2 ', isAiMessage ? 'bg-background' : 'bg-blue-200')}>
                {content}
            </p>
        </div>
    )
}

