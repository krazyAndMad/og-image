import { sanitizeHtml } from './sanitizer'
import { ParsedRequest } from './types'
import images from '../../config'

function getCss() {
  return `
    * {
        box-sizing: border-box;
    }

    :root {
        --background: black;

        --primary: #ff1ead;
        --secondary: #1effc3;
        
        --card-size: 300px;
    }

    body {
        height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        padding: 1rem;
        background: linear-gradient(45deg, #343434, #000000);
        font-family: 'Source Code Pro', monospace;
    
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .pfp {
        width: calc(var(--card-size) * 1.586);
        height: var(--card-size);
        object-fit: cover;
        object-position: 30% 40%;
    }

    .card {
        transform: rotate(-5deg);
        overflow: hidden;
        width: calc(var(--card-size) * 1.586);
        height: var(--card-size);
    
        border-radius: 0.75rem;
        box-shadow:  0 22px 70px 4px rgba(0,0,0,0.56), 0 0 0 1px rgba(0, 0, 0, 0.3);
        
        background: black;
    
        display: grid;
        grid-template-columns: 40% auto;
        color: white;
        
        align-items: center;
        
        will-change: transform;
        transition: transform 0.25s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0.0, 0.2, 1);
        
        &:hover {
            transform: scale(1.1);
            box-shadow:  0 32px 80px 14px rgba(0,0,0,0.36), 0 0 0 1px rgba(0, 0, 0, 0.3);
        }
    }
`
}

export function getHtml(parsedReq: ParsedRequest) {
  const { collection, token } = parsedReq
  const collectionImages = images[collection as keyof typeof images] || {}
  const imageUrl = collectionImages[token as keyof typeof collectionImages]

  if (!imageUrl) {
    throw new Error(`No image found for ${collection}/${token}`)
  }

  return `<!DOCTYPE html>
    <html>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500" rel="stylesheet">
        <style>
            ${getCss()}
        </style>
        <body>
            <div class="card">
                ${getImage(imageUrl)}
            </div>
        </body>
    </html>`
}

function getImage(src: string, width = 'auto', height = '225') {
  return `<img
        class="pfp"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}
