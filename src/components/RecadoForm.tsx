import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { NOME_MAX_LENGTH, MENSAGEM_MAX_LENGTH } from '../data/recados'
import './RecadoForm.css'

type Status = 'idle' | 'enviando' | 'enviado' | 'erro'

function RecadoForm() {
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [empresa, setEmpresa] = useState('') // honeypot — deve ficar sempre vazio
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const nomeLimpo = nome.trim()
    const mensagemLimpa = mensagem.trim()

    if (!nomeLimpo || !mensagemLimpa) return

    // Campo honeypot preenchido = provavelmente um bot. Fingimos sucesso
    // sem gravar nada, para não dar dica de que existe validação.
    if (empresa.trim() !== '') {
      setStatus('enviado')
      return
    }

    setStatus('enviando')

    const { error } = await supabase.from('recados').insert({
      nome: nomeLimpo.slice(0, NOME_MAX_LENGTH),
      mensagem: mensagemLimpa.slice(0, MENSAGEM_MAX_LENGTH),
    })

    if (error) {
      setStatus('erro')
      return
    }

    setStatus('enviado')
  }

  if (status === 'enviado') {
    return (
      <div className="recado-form recado-form--sucesso">
        <p>
          Obrigado pelo carinho! Sua mensagem foi enviada e vai aparecer aqui
          assim que for aprovada 💛
        </p>
      </div>
    )
  }

  return (
    <form className="recado-form" onSubmit={handleSubmit}>
      <div className="recado-form__field">
        <label htmlFor="recado-nome">Nome completo</label>
        <input
          id="recado-nome"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          maxLength={NOME_MAX_LENGTH}
          required
        />
      </div>

      <div className="recado-form__field">
        <label htmlFor="recado-mensagem">Mensagem</label>
        <textarea
          id="recado-mensagem"
          value={mensagem}
          onChange={(event) => setMensagem(event.target.value)}
          maxLength={MENSAGEM_MAX_LENGTH}
          rows={4}
          required
        />
        <span className="recado-form__contador">
          {mensagem.length}/{MENSAGEM_MAX_LENGTH}
        </span>
      </div>

      {/* Honeypot: escondido de pessoas via CSS, mas bots costumam preencher tudo */}
      <div className="recado-form__honeypot" aria-hidden="true">
        <label htmlFor="recado-empresa">Empresa</label>
        <input
          id="recado-empresa"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={empresa}
          onChange={(event) => setEmpresa(event.target.value)}
        />
      </div>

      <button
        className="recado-form__submit"
        type="submit"
        disabled={status === 'enviando'}
      >
        {status === 'enviando' ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      {status === 'erro' && (
        <p className="recado-form__erro">
          Não conseguimos enviar sua mensagem agora. Tente novamente em
          alguns instantes.
        </p>
      )}
    </form>
  )
}

export default RecadoForm
