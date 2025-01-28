import styled from "styled-components"


export default function Odissey(){
    
    return <Tela>
  <article class="logo">
    <article class="title">Code Odyssey</article>
    <article class="subtitle">Embark on your coding journey</article>
    <article class="orbit">
      <article class="planet"></article>
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
      background: #0d1117;
      font-family: 'Roboto', sans-serif;
.logo {
      text-align: center;
      color: #ffffff;
    }
    .logo .title {
      font-size: 2.8rem;
      font-weight: bold;
      background: linear-gradient(90deg, #ff6f61, #fddb3a);
      -webkit-background-clip: text;
      color: transparent;
    }
    .logo .subtitle {
      font-size: 1.2rem;
      font-style: italic;
      color: #c9d1d9;
      margin-top: -10px;
    }
    .orbit {
      width: 120px;
      height: 120px;
      margin: 1.5rem auto 0;
      border: 2px dashed rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      position: relative;
      animation: rotate 5s linear infinite;
    }
    .planet {
      width: 20px;
      height: 20px;
      background: linear-gradient(90deg, #ff6f61, #fddb3a);
      border-radius: 50%;
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
`
