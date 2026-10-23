import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { useMetaPagina } from '@/lib/seo'
import { clinica } from '@/data/clinica'
import { Container } from '@/components/ui/Container'

interface BlocoProps {
  titulo: string
  children: React.ReactNode
}

function Bloco({ titulo, children }: BlocoProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-titulo text-xl font-bold text-azul-600">{titulo}</h2>
      <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-neutro-500">
        {children}
      </div>
    </section>
  )
}

/**
 * Política de privacidade.
 *
 * Descreve exatamente o que este site faz hoje: ele é somente front-end,
 * não envia nem armazena dados em servidor. Razão social, CNPJ e e-mail
 * do encarregado só aparecem depois de preenchidos em
 * `src/data/clinica.ts` — nenhuma informação legal é presumida aqui.
 */
export default function PoliticaPrivacidade() {
  useMetaPagina({
    titulo: 'Política de privacidade | Instituto Odontológico Visage',
    descricao:
      'Como o site do Instituto Odontológico Visage trata as informações dos visitantes.',
    caminho: '/politica-de-privacidade',
  })

  const { razaoSocial, cnpj, email } = clinica.pendentes

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <Link
        to="/"
        className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-azul-600 transition-colors hover:text-laranja-500"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar ao início
      </Link>

      <h1 className="mt-7 text-3xl font-extrabold text-azul-600 sm:text-4xl">
        Política de privacidade
      </h1>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-neutro-500">
        Esta página explica como o site do {clinica.nome} lida com as informações de quem
        navega por ele.
      </p>

      <div className="mt-12 flex flex-col gap-10">
        <Bloco titulo="1. Quem é responsável">
          <p>
            O site é mantido pelo {clinica.nome}, clínica odontológica situada na{' '}
            {clinica.endereco.logradouro}, bairro {clinica.endereco.bairro}, em{' '}
            {clinica.endereco.cidade} — {clinica.endereco.estado}, CEP {clinica.endereco.cep}.
          </p>
          {razaoSocial && cnpj ? (
            <p>
              Razão social: {razaoSocial}. CNPJ: {cnpj}.
            </p>
          ) : null}
          <p>
            Para qualquer assunto relacionado a esta política, fale com a clínica pelo telefone{' '}
            <a
              href={clinica.telefone.linkTelefone}
              className="font-semibold text-azul-600 underline underline-offset-4 hover:text-laranja-500"
            >
              {clinica.telefone.exibicao}
            </a>
            {email ? (
              <>
                {' '}
                ou pelo e-mail{' '}
                <a
                  href={`mailto:${email}`}
                  className="font-semibold text-azul-600 underline underline-offset-4 hover:text-laranja-500"
                >
                  {email}
                </a>
              </>
            ) : null}
            .
          </p>
        </Bloco>

        <Bloco titulo="2. Quais informações este site coleta">
          <p>
            Este site é institucional e funciona inteiramente no seu navegador. Ele{' '}
            <strong className="font-semibold text-azul-700">
              não possui cadastro, login, área do paciente nem banco de dados
            </strong>
            , e não envia informações para servidores próprios da clínica.
          </p>
          <p>
            O formulário da seção de contato é demonstrativo: o que você digita permanece
            apenas na memória do seu navegador enquanto a página está aberta. Nada é gravado,
            transmitido ou guardado por este site. As informações só saem do seu dispositivo se
            você escolher o botão que abre a conversa no WhatsApp.
          </p>
        </Bloco>

        <Bloco titulo="3. Serviços de terceiros">
          <p>
            Alguns recursos da página abrem serviços externos, que possuem políticas de
            privacidade próprias:
          </p>
          <ul className="flex list-inside list-disc flex-col gap-2">
            <li>
              <strong className="font-semibold text-azul-700">WhatsApp</strong> — ao tocar em um
              botão de conversa, você é levado ao aplicativo da Meta com uma mensagem inicial já
              escrita. A conversa passa a acontecer dentro do WhatsApp.
            </li>
            <li>
              <strong className="font-semibold text-azul-700">Google Maps</strong> — o mapa da
              seção de contato só é carregado depois que você toca em “Carregar o mapa”. Até
              então, nenhuma conexão com o Google é feita a partir desta página.
            </li>
          </ul>
        </Bloco>

        <Bloco titulo="4. Cookies e rastreamento">
          <p>
            Este site não utiliza cookies próprios, não exibe anúncios e não instala
            ferramentas de rastreamento ou de análise de audiência.
          </p>
          <p>
            As fontes tipográficas são hospedadas no próprio site, sem chamadas a servidores
            de terceiros.
          </p>
        </Bloco>

        <Bloco titulo="5. Informações de saúde">
          <p>
            Não envie dados de saúde, exames, fotografias clínicas ou pedidos de diagnóstico
            pelo formulário deste site. Avaliações e orientações sobre tratamento acontecem
            exclusivamente no atendimento presencial, com a equipe da clínica.
          </p>
        </Bloco>

        <Bloco titulo="6. Seus direitos">
          <p>
            A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) garante a você, entre outros,
            o direito de confirmar a existência de tratamento de dados, acessar seus dados,
            corrigi-los e solicitar sua eliminação.
          </p>
          <p>
            Como este site não armazena informações, pedidos desse tipo devem ser feitos
            diretamente à clínica, pelos canais de contato indicados acima.
          </p>
        </Bloco>

        <Bloco titulo="7. Alterações desta política">
          <p>
            Esta política pode ser atualizada sempre que o site ganhar novas funcionalidades.
            Recomendamos revisitá-la periodicamente.
          </p>
        </Bloco>
      </div>
    </Container>
  )
}
