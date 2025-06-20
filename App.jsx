
import { URL } from "./Url"
import { useState , useEffect } from "react";
import './Style.css'; // CSS import
import { marked } from "marked";
import Answer from "./Weather";
import { IoChatboxEllipses  } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";




const App = () => {
  const [messages, setMessages] = useState([]);
  const [input , setInput] = useState('');
  const [loading , setLoading] = useState(false)
  const [his , setHis] = useState([])

  const load={
    "contents": [{
        "parts": [{
            "text": input
          }]
      }]
  }

  const handleSend = async(event) => {
    // event.preventDefault()
    let res = await fetch(URL,{
      method:"POST",
      body:JSON.stringify(load)
    })

    res = await res.json()
    res = res.candidates[0].content.parts[0].text
    // res = res.toLowerCase()
    res = res.replaceAll("Google","Aditya")
    // res = res.split(" ")
    // res = res.map((item)=>item.trim())
    setMessages(res)

   if (input.trim() === '') return;

    
    // Add user message (right side)
    const userMessage = { text: input, type: 'user' };
    setMessages((prev) => [...prev, userMessage]);

   // loading message //
    const loadingMessage={text: 'loading...', type: 'bot', isLoading: true}
    setMessages((prev) => [...prev, loadingMessage]);

    setInput('');
    setLoading(true)


    // System reply (left side)
      setTimeout(() => {
        setMessages((prev)=>{
          const newMessages = [...prev]
          newMessages.pop()
        
      const botReply = { text: res, type: 'bot' ,isLoading:false};
      return[...newMessages, botReply];
        })
      setLoading(false)
    }, 1000);
    
  };

  return(
    <>
    <div className="chat-container">
      <h1>ChatB <IoChatboxEllipses style={{fontSize:'18px'}}/></h1>
      <div className="chat-box">
        {
        messages.map((msg, index) => (
          <div id="chat-message"
          key={index}
            className= {msg.type === 'user' ? 'user' : 'bot'}
            dangerouslySetInnerHTML={{__html:marked.parse(msg.isLoading ? msg.text : msg.text||'')}}>
          </div>
        ))
        }
        
      </div>
      <div className="chat-input-box">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key == 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button className="chat-button" onClick={handleSend}><RiSendPlaneFill /></button>
      </div>
    </div>
    <br/>
    
  </>
  )
    
};


export default App;