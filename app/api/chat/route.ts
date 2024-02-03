import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'


import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { ChatCompletion, ChatCompletionMessage, Embeddings } from 'openai/resources/index.mjs'




// export const runtime = 'edge'

const anyscaleAI = new OpenAI({
  baseURL: 'https://api.endpoints.anyscale.com/v1',
  apiKey: process.env.ANYSCALE_API_KEY
})





export async function POST(req: Request) {

  
  const session = await getServerSession(authOptions)
  console.log(session?.me?.access);
  
  const userId = session?.me?.id;
  const access_token = session?.access;


  


  try {

    

    const body = await req.json();
    const messages= body.messages

    let entriesString;

    const messagesTruncated = messages.slice(-1);

    // Todo - Can take last 6 messages and give LLM to make more optimized question the embbed it

    // TODO convert this to vecor Embeddings
    const lastMessages = messagesTruncated.map((message) => message.content).join('\n');


    // Create vector and search it on Django end just return the entries here.
    

    try {
      const url = `${process.env.BACKEND_URL}/vector/`;
      const data = { text: lastMessages };
    
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const entries = await response.json();
      console.log(entries);

      entriesString = entries.entries.map(entry => `${entry.title} - ${entry.content}\n`).join(', ');
      console.log(entriesString)
    
    } catch (error) {
      console.error(error);
    }
    

     

    
    // console.log(lastMessages)


    // Todo - query the pgvector database with embeddings and get top 4 results that match the query
    // const mainString = entries.entries.map(entry => `${entry.title} ${entry.content}`).join(', ');
    // const entriesString = JSON.stringify(entries);

    // console.log(mainString)

    const systemMessage = {
      role: "system",
      content: 'Your name is WittyLog and you are a smart Journaling assistant. You will reply based on the notes given to you. \nYou will be given all notes but only reply with what is asked only.\n' + entriesString
    }



    const response = await anyscaleAI.chat.completions.create({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      stream: true,
      messages : [systemMessage, ...messagesTruncated]
    })


    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)

    // return new Response(JSON.stringify(response), {
    //   status: 200
    // })

    
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
