import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { especialidades } from '@/data/especialidades'
import { dadosEstruturados } from '@/lib/seo'
import { Cabecalho } from '@/components/layout/Cabecalho'
import { Rodape } from '@/components/layout/Rodape'
import { BotaoWhatsApp } from '@/components/layout/BotaoWhatsApp'
import { PularParaConteudo } from '@/components/layout/PularParaConteudo'
import Home from '@/paginas/Home'
import PoliticaPrivacidade from '@/paginas/PoliticaPrivacidade'
import NaoEncontrada from '@/paginas/NaoEncontrada'

/** Volta ao topo a cada troca de rota, preservando âncoras da mesma página. */
function RolarAoTrocarRota() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

/** Dados estruturados da clínica, injetados uma única vez. */
function DadosEstruturados() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(
      dadosEstruturados(especialidades.map((item) => item.nome)),
    )
    document.head.appendChild(script)
    return () => script.remove()
  }, [])

  return null
}

export default function App() {
  return (
    <>
      <PularParaConteudo />
      <RolarAoTrocarRota />
      <DadosEstruturados />

      <Cabecalho />

      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Rodape />
      <BotaoWhatsApp />
    </>
  )
}
