import { useEffect , useState } from 'react';
import './Style.css'
import { URL } from './Url';
import Answer from './Answer';
const ChatB=()=>{
const [result,setResult] = useState([])       //message
const [question,setQuestion] = useState(" ")  // input
  

useEffect(()=>{
  

},[])


const load={
   "contents": [{
        "parts": [{
            "text": question
          }]
      }]
  }

const Askquestion=async()=>{
  
  let res = await fetch(URL,{
    method:'POST',
    body:JSON.stringify(load)
  })

  res = await res.json()
  // console.log(res.candidates[0].content.parts[0].text)
  let resstr = res.candidates[0].content.parts[0].text
      resstr = resstr.split(" ")
      resstr = resstr.map((item)=>item.trim())
console.log(resstr)
setResult(res.candidates[0].content.parts[0].text)

// Add user message
    const userMessage = { text: question, type: 'user' };
    setResult(prev => [...prev, userMessage]);

// Auto reply after 1 second
    setTimeout(() => {
      const botReply = { text: resstr, type: 'bot' };
      setResult(prev => [...prev, botReply]);
    }, 1000);
    
    setQuestion("")

}


  return(
    <>
        
      <div className="container">
        <div className="message_box">
          {result.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.type === 'user' ? '#DCF8C6' : '#EAEAEA',
              }}
            >
              {msg.text}
            </div>
          ))}
           
          </div>
          <br/>
          <input  value={question} className="input_text" type="text" placeholder="enter text" 
          onChange={(event)=>setQuestion(event.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && Askquestion()}/>
          <button onClick={()=>{Askquestion()}}>submit</button>
          
        </div>
        <div className="history" > hello</div>
        
                
        </>
  )
}
export default ChatB


