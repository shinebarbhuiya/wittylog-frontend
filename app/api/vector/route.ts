import axios from 'axios';
import { NextResponse } from 'next/server';

// export async function POST(req, res) {
//   const { text } = req.body;

//   const url = "https://api.deepinfra.com/v1/inference/BAAI/bge-large-en-v1.5";
//   const headers = {
//     "Content-Type": "application/json",
//     "Authorization": "Bearer cWdwwQiCJIL6SoODOcHMYAyW5S99InVF"
//   };

//   const data = { "inputs": [text] };

//   try {
//     const response = await axios.post(url, data, { headers });
//     const vector = response.data.embeddings[0];
//     res.status(200).json({ vector });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }



export async function POST(request: Request) {
    const { text } = await request.json();

    const url = "https://api.deepinfra.com/v1/inference/BAAI/bge-large-en-v1.5";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer cWdwwQiCJIL6SoODOcHMYAyW5S99InVF"
    };

    try {
        const response = await axios.post(url, { "inputs": [text] }, { headers });
        const vector = response.data.embeddings[0];

        return new NextResponse(JSON.stringify({ vector }), {
            status: 200,
        });
        
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
        })
    }





    // return new NextResponse(JSON.stringify({ text }), {
    //   status: 200,
    // });



  
}