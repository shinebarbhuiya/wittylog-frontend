"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import React, { useEffect } from 'react'

const ChatPage = () => {

  const [message, setMessage] = React.useState("");


  useEffect(() => {
    try {
      const fetchChat = async () => {
        const API_KEY = "cWdwwQiCJIL6SoODOcHMYAyW5S99InVF";
  
        const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
          method: 'POST',
          body: JSON.stringify({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [{ role: "user", content: "who are you" }],
            max_tokens: 20,
            stream: 'true',
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${API_KEY}`,
          }
        });
  
        const reader = response.body.getReader();
        console.log(reader)


        const decoder = new TextDecoder("utf-8");



        while (true) {
          const chunk = await reader.read();
          const { done, value } = chunk;

          if (done) {
            break;
          }

          const decodedChunk = decoder.decode(value)
          const lines = decodedChunk.split('\n');
          const parsedLines = lines.map(line => line.replace("data: ", "").trim()).filter(line => line !== "" && line !== "[DONE]").map(line => JSON.parse(line));


          for (const parsedLine of parsedLines) {
            const { choices } = parsedLine;
            const { delta } = choices[0];
            const { content } = delta;
            if (content) {
              console.log(content);
              setMessage(message + content);
            }

          }

          // console.log(parsedLines);

        }
  
        // while (true) {
        //   const { done, value } = await reader.read();
        //   if (done) break;
        //   // console.log(value)
        //   console.log(new TextDecoder().decode(value));
        // }


        
      }
  
      fetchChat();
    } catch (error) {
      console.log(error);
    }
  }, []);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <div className='h-full w-full '>
      <div className='chatbot-h relative  bg-gray-200 rounded-md'>
        <div className='h-full'> Messages {message}</div>

        <form onSubmit={handleSubmit} className=''>
          <div className='flex w-full items-center absolute  bottom-0'>
            <Input onChange={() => { }} className=' py-6 px-4 w-full rounded-none rounded-bl-md' placeholder='Ask anything. . .' type='text' />
            <Button type='submit' className='py-6 px-6 rounded-none rounded-br-md'>Send</Button>

          </div>

        </form>

      </div>

    </div>

  )
}

export default ChatPage