import { useId, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, MessageCircle, Send } from 'lucide-react'

import { cn, mascaraTelefone, telefoneValido } from '@/lib/utils'
import { Botao, LinkBotao } from '@/components/ui/Botao'
import { linkWhatsApp } from '@/lib/whatsapp'
import { especialidades } from '@/data/especialidades'

interface Campos {
  nome: string
  telefone: string
  assunto: string
  mensagem: string
}

type Erros = Partial<Record<keyof Campos, string>>

const assuntos = [
  'Agendar uma avaliação',
  ...especialidades.map((e) => e.nome),
  'Outras dúvidas',
]

const camposVazios: Campos = { nome: '', telefone: '', assunto: '', mensagem: '' }

/** Regras de validação. Devolve a mensagem de erro ou `undefined`. */
function validar(campos: Campos): Erros {
  const erros: Erros = {}

  if (campos.nome.trim().length < 2) {
    erros.nome = 'Informe seu nome para que a equipe saiba como chamar você.'
  }

  if (campos.telefone.trim().length === 0) {
    erros.telefone = 'Informe um telefone para contato.'
  } else if (!telefoneValido(campos.telefone)) {
    erros.telefone = 'Informe um telefone válido com DDD, como (34) 99714-5055.'
  }

  if (campos.assunto.length === 0) {
    erros.assunto = 'Escolha o assunto do seu contato.'
  }

  if (campos.mensagem.trim().length < 10) {
    erros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  }

  return erros
}

// Sem `focus:outline-none`: o contorno de foco definido em `index.css`
// precisa continuar visível para quem navega por teclado.
const estiloCampo =
  'w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-azul-800 ' +
  'transition-colors placeholder:text-neutro-500'

/**
 * Formulário demonstrativo.
 *
 * O projeto é somente front-end: nada é enviado nem armazenado em
 * servidor. Depois da validação, o visitante escolhe continuar a conversa
 * pelo WhatsApp com a mensagem já montada.
 */
export function FormularioContato() {
  const idBase = useId()
  const [campos, setCampos] = useState<Campos>(camposVazios)
  const [erros, setErros] = useState<Erros>({})
  const [validado, setValidado] = useState(false)
  const resumoErros = useRef<HTMLDivElement>(null)
  const areaResultado = useRef<HTMLDivElement>(null)

  const atualizar = (campo: keyof Campos, valor: string) => {
    setCampos((atuais) => ({ ...atuais, [campo]: valor }))
    // Limpa o erro assim que o visitante corrige o campo.
    if (erros[campo]) setErros((atuais) => ({ ...atuais, [campo]: undefined }))
    if (validado) setValidado(false)
  }

  const aoEnviar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const novosErros = validar(campos)
    setErros(novosErros)

    if (Object.keys(novosErros).length > 0) {
      setValidado(false)
      resumoErros.current?.focus()
      return
    }

    setValidado(true)
    // Leva o foco ao resultado para quem usa leitor de tela ou teclado.
    window.requestAnimationFrame(() => areaResultado.current?.focus())
  }

  const mensagemWhatsApp = linkWhatsApp(
    `Olá! Meu nome é ${campos.nome.trim()}.\n` +
      `Assunto: ${campos.assunto}\n` +
      `Telefone: ${campos.telefone}\n\n` +
      `${campos.mensagem.trim()}`,
  )

  const listaErros = (Object.keys(erros) as Array<keyof Campos>).filter((chave) => erros[chave])

  return (
    <form onSubmit={aoEnviar} noValidate className="flex flex-col gap-5">
      {/* Resumo de erros: anunciado por leitores de tela após o envio. */}
      <div
        ref={resumoErros}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={cn(listaErros.length === 0 && 'sr-only')}
      >
        {listaErros.length > 0 && (
          <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold">
                {listaErros.length === 1
                  ? 'Há 1 campo para revisar antes de continuar:'
                  : `Há ${listaErros.length} campos para revisar antes de continuar:`}
              </p>
              <ul className="mt-1.5 list-inside list-disc">
                {listaErros.map((chave) => (
                  <li key={chave}>{erros[chave]}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo
          id={`${idBase}-nome`}
          rotulo="Nome"
          erro={erros.nome}
          obrigatorio
          estilo={estiloCampo}
        >
          {({ id, props }) => (
            <input
              {...props}
              id={id}
              type="text"
              name="nome"
              autoComplete="name"
              placeholder="Como podemos chamar você?"
              value={campos.nome}
              onChange={(e) => atualizar('nome', e.target.value)}
            />
          )}
        </Campo>

        <Campo
          id={`${idBase}-telefone`}
          rotulo="Telefone"
          erro={erros.telefone}
          obrigatorio
          dica="Com DDD, como (34) 99714-5055."
          estilo={estiloCampo}
        >
          {({ id, props }) => (
            <input
              {...props}
              id={id}
              type="tel"
              name="telefone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              value={campos.telefone}
              onChange={(e) => atualizar('telefone', mascaraTelefone(e.target.value))}
            />
          )}
        </Campo>
      </div>

      <Campo
        id={`${idBase}-assunto`}
        rotulo="Assunto"
        erro={erros.assunto}
        obrigatorio
        estilo={estiloCampo}
      >
        {({ id, props }) => (
          <select
            {...props}
            id={id}
            name="assunto"
            value={campos.assunto}
            onChange={(e) => atualizar('assunto', e.target.value)}
            className={cn(props.className, 'appearance-none bg-no-repeat pr-10')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundPosition: 'right 1rem center',
            }}
          >
            <option value="">Selecione um assunto</option>
            {assuntos.map((assunto) => (
              <option key={assunto} value={assunto}>
                {assunto}
              </option>
            ))}
          </select>
        )}
      </Campo>

      <Campo
        id={`${idBase}-mensagem`}
        rotulo="Mensagem"
        erro={erros.mensagem}
        obrigatorio
        dica="Não envie informações de saúde, exames ou fotografias por aqui."
        estilo={estiloCampo}
      >
        {({ id, props }) => (
          <textarea
            {...props}
            id={id}
            name="mensagem"
            rows={5}
            placeholder="Conte brevemente como podemos ajudar."
            value={campos.mensagem}
            onChange={(e) => atualizar('mensagem', e.target.value)}
            className={cn(props.className, 'resize-y')}
          />
        )}
      </Campo>

      <Botao type="submit" variante="secundario" tamanho="lg">
        <Send size={18} aria-hidden="true" />
        Revisar e continuar
      </Botao>

      {/* Resultado da validação: o envio acontece pelo WhatsApp. */}
      <div ref={areaResultado} tabIndex={-1} aria-live="polite">
        {validado && (
          <div className="flex flex-col gap-4 rounded-2xl border border-azul-100 bg-azul-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex gap-3 text-sm leading-relaxed text-azul-800">
              <CheckCircle2 size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-laranja-600" />
              <span>
                <strong className="font-semibold">Mensagem pronta.</strong> Continue pelo WhatsApp
                para falar com a equipe — seus dados não são enviados nem armazenados por este
                site.
              </span>
            </p>

            <LinkBotao href={mensagemWhatsApp} externo className="shrink-0">
              <MessageCircle size={18} aria-hidden="true" />
              Continuar no WhatsApp
            </LinkBotao>
          </div>
        )}
      </div>

      <p className="text-xs leading-relaxed text-neutro-500">
        Este formulário é demonstrativo: as informações ficam apenas no seu navegador e seguem
        para o WhatsApp somente se você escolher continuar a conversa.
      </p>
    </form>
  )
}

interface PropsCampoInterno {
  id: string
  props: {
    className: string
    'aria-invalid': boolean | undefined
    'aria-describedby': string | undefined
    required: boolean
  }
}

interface CampoProps {
  id: string
  rotulo: string
  erro?: string | undefined
  dica?: string
  obrigatorio?: boolean
  estilo: string
  children: (interno: PropsCampoInterno) => React.ReactNode
}

/** Rótulo, dica, mensagem de erro e estado de foco de um campo. */
function Campo({ id, rotulo, erro, dica, obrigatorio, estilo, children }: CampoProps) {
  const idErro = `${id}-erro`
  const idDica = `${id}-dica`
  const descritores = [dica ? idDica : null, erro ? idErro : null].filter(Boolean).join(' ')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-azul-700">
        {rotulo}
        {obrigatorio && (
          <span className="ml-1 text-laranja-600" aria-hidden="true">
            *
          </span>
        )}
        {obrigatorio && <span className="sr-only"> (obrigatório)</span>}
      </label>

      {children({
        id,
        props: {
          className: cn(
            estilo,
            erro
              ? 'border-red-400 focus:border-red-500'
              : 'border-neutro-200 focus:border-azul-400',
          ),
          'aria-invalid': erro ? true : undefined,
          'aria-describedby': descritores || undefined,
          required: Boolean(obrigatorio),
        },
      })}

      {dica && (
        <p id={idDica} className="text-xs text-neutro-500">
          {dica}
        </p>
      )}

      {erro && (
        <p id={idErro} className="flex items-center gap-1.5 text-xs font-medium text-red-700">
          <AlertCircle size={13} aria-hidden="true" />
          {erro}
        </p>
      )}
    </div>
  )
}
