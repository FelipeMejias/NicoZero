import styled from "styled-components"


export default function Portal(){
    
    return <Tela>
 <article class="logo">
    <article class="title">CodeSphere</article>
    <article class="sphere"></article>
    <article class="tagline">Your universe of code</article>
  </article>
    </Tela>
}
const Tela=styled.div`
 display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;width:100%;
      margin: 0;
      background: radial-gradient(circle, #1a1a2e, #16213e);
      font-family: 'Arial', sans-serif;
 .logo {
      text-align: center;
      color: #ffffff;
      position: relative;
    }
    .logo .title {
      font-size: 3rem;
      font-weight: bold;
      letter-spacing: 2px;
      background: linear-gradient(90deg, #00d4ff, #00ff88);
      -webkit-background-clip: text;
      color: transparent;
    }
    .sphere {
      width: 100px;
      height: 100px;
      margin: 1rem auto;
      background: linear-gradient(145deg, #00d4ff, #00ff88);
      border-radius: 50%;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
      position: relative;
    }
    .sphere::before {
      content: '';
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      position: absolute;
      top: 15px;
      left: 20px;
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.3);
    }
    .tagline {
      font-size: 1.2rem;
      color: #c9d1d9;
      margin-top: -10px;
    }
`
