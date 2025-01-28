import styled from "styled-components"


export default function Nexus(){
    
    return <Tela>
        <article class="logo">
    <span>Code</span>
    <span class="nexus">Nexus</span>
    <article class="lines">
      <article></article>
      <article></article>
      <article></article>
    </article>
  </article>
    </Tela>
}
const Tela=styled.div`
display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;width:100%;
      margin: 0;
      background: #1b1b1b;
      font-family: 'Courier New', Courier, monospace;

    .logo {
      text-align: center;
      color: #fff;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .logo span {
      font-size: 2rem;
      color: #00ff88;
    }
    .nexus {
      font-size: 2.5rem;
      background: linear-gradient(90deg, #ff00c8, #00d4ff);
      -webkit-background-clip: text;
      color: transparent;
    }
    .lines {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
    .lines article {
      width: 50px;
      height: 4px;
      margin: 0 5px;
      background: #00ff88;
      border-radius: 2px;
      animation: pulse 1.5s infinite;
    }
    .lines article:nth-child(2) {
      animation-delay: 0.3s;
    }
    .lines article:nth-child(3) {
      animation-delay: 0.6s;
    }
    @keyframes pulse {
      0%, 100% {
        transform: scaleX(1);
        opacity: 1;
      }
      50% {
        transform: scaleX(0.6);
        opacity: 0.7;
      }
    }
`
