import styled from "styled-components"


export default function Sphere(){
    
    return <Tela>
 <article class="logo">
    <span>Portal Code</span>
    <article class="circle"></article>
  </article>
    </Tela>
}
const Tela=styled.div`
  display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;width:100%;
      margin: 0;
      background: #121212;
      font-family: Arial, sans-serif;
.logo {
      text-align: center;
      color: #fff;
      font-weight: bold;
    }
    .logo span {
      display: block;
      font-size: 2.5rem;
      background: linear-gradient(90deg, #00d4ff, #00ff85);
      -webkit-background-clip: text;
      color: transparent;
    }
    .logo::after {
      content: "";
      display: block;
      width: 80px;
      height: 4px;
      margin: 0.5rem auto;
      background: linear-gradient(90deg, #00d4ff, #00ff85);
      border-radius: 2px;
    }
    .circle {
      width: 100px;
      height: 100px;
      margin: 1rem auto;
      border: 3px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .circle::before {
      content: "</>";
      position: absolute;
      color: #fff;
      font-size: 1.2rem;
      font-weight: bold;
    }
`
