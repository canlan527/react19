import { createContext, useState, useContext, use } from "react"

// 创建上下文
const LangContext = createContext('zh')

const message = {
  zh: {
    lang: '切换语言',
    text: '你好~'
  },
  en: {
    lang: 'switch language',
    text: 'greeting~'
  }
}

function ShowText() {
  // 1. 通过use获取context
  const text = use(LangContext)
  // 2. 通过 useContext获取context
  const text2 = useContext(LangContext)
  return (
    <div>
      <p>{text}</p>
      <p>{text2}</p>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState('zh')

  const handleClick = () => {
    setLang(lang === 'zh' ? 'en' : 'zh')
  }

  return (
    // 也可以使用<Language.Provider></Language.Provider>
    <LangContext value={message[lang].text}>
      <h1>语言国际化</h1>
      <ShowText />
      <button onClick={handleClick}>{message[lang].lang}</button>
    </LangContext>
  )
}
/**
 * react19关于contexy的变化
 * 1. 不需要再写 Language.Provider,直接使用 Language
 * 2. 可以通过use使用context对象，比useContext更灵活
 */