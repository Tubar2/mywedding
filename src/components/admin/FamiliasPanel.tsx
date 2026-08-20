import { useEffect, useState, type FormEvent } from 'react'
import QRCode from 'qrcode'
import { supabase } from '../../lib/supabase'
import {
  gerarCodigoFamilia,
  linkRsvp,
  type Convidado,
  type FamiliaComConvidados,
  type StatusConvidado,
} from '../../data/rsvp'
import './FamiliasPanel.css'

const LABEL_STATUS: Record<StatusConvidado, string> = {
  pendente: 'Pendente',
  confirmado: 'Confirmado',
  recusado: 'Recusado',
}

function resumo(convidados: Convidado[]) {
  const confirmados = convidados.filter((c) => c.status === 'confirmado').length
  const recusados = convidados.filter((c) => c.status === 'recusado').length
  const pendentes = convidados.length - confirmados - recusados
  return { confirmados, recusados, pendentes }
}

type Visao = 'agrupada' | 'lista'

const FILTROS_STATUS: { valor: 'todos' | StatusConvidado; label: string }[] = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'pendente', label: 'Pendente' },
  { valor: 'confirmado', label: 'Confirmado' },
  { valor: 'recusado', label: 'Recusado' },
]

function FamiliasPanel() {
  const [familias, setFamilias] = useState<FamiliaComConvidados[]>([])
  const [carregando, setCarregando] = useState(true)
  const [expandidaId, setExpandidaId] = useState<string | null>(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nomeFamilia, setNomeFamilia] = useState('')
  const [nomesConvidados, setNomesConvidados] = useState('')
  const [qrCodigoId, setQrCodigoId] = useState<string | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [linkCopiadoId, setLinkCopiadoId] = useState<string | null>(null)
  const [visao, setVisao] = useState<Visao>('agrupada')
  const [filtroStatus, setFiltroStatus] = useState<'todos' | StatusConvidado>(
    'todos',
  )

  useEffect(() => {
    carregarFamilias()
  }, [])

  async function carregarFamilias() {
    setCarregando(true)
    const { data: familiasData } = await supabase
      .from('familias')
      .select('id, nome, codigo, created_at')
      .order('nome')

    const { data: convidadosData } = await supabase
      .from('convidados')
      .select('id, nome, status, familia_id')

    const lista: FamiliaComConvidados[] = (familiasData ?? []).map((f) => ({
      ...f,
      convidados: (convidadosData ?? [])
        .filter((c) => c.familia_id === f.id)
        .map((c) => ({ id: c.id, nome: c.nome, status: c.status })),
    }))

    setFamilias(lista)
    setCarregando(false)
  }

  async function criarFamilia(event: FormEvent) {
    event.preventDefault()

    const nomes = nomesConvidados
      .split('\n')
      .map((linha) => linha.trim())
      .filter(Boolean)

    if (!nomeFamilia.trim() || nomes.length === 0) return

    const codigo = gerarCodigoFamilia()

    const { data: familia, error } = await supabase
      .from('familias')
      .insert({ nome: nomeFamilia.trim(), codigo })
      .select('id')
      .single()

    if (error || !familia) return

    await supabase
      .from('convidados')
      .insert(nomes.map((nome) => ({ familia_id: familia.id, nome })))

    setNomeFamilia('')
    setNomesConvidados('')
    setMostrarForm(false)
    carregarFamilias()
  }

  async function excluirFamilia(familia: FamiliaComConvidados) {
    if (
      !confirm(
        `Excluir a família "${familia.nome}" e seus ${familia.convidados.length} convidados?`,
      )
    )
      return
    await supabase.from('familias').delete().eq('id', familia.id)
    carregarFamilias()
  }

  async function alterarStatus(convidadoId: string, status: StatusConvidado) {
    await supabase.from('convidados').update({ status }).eq('id', convidadoId)
    carregarFamilias()
  }

  async function removerConvidado(convidadoId: string) {
    await supabase.from('convidados').delete().eq('id', convidadoId)
    carregarFamilias()
  }

  async function adicionarConvidado(familiaId: string, nome: string) {
    if (!nome.trim()) return
    await supabase
      .from('convidados')
      .insert({ familia_id: familiaId, nome: nome.trim() })
    carregarFamilias()
  }

  async function regenerarCodigo(familia: FamiliaComConvidados) {
    if (
      !confirm(
        `Gerar um novo link para "${familia.nome}"? O link antigo deixa de funcionar.`,
      )
    )
      return
    const novoCodigo = gerarCodigoFamilia()
    await supabase
      .from('familias')
      .update({ codigo: novoCodigo })
      .eq('id', familia.id)
    carregarFamilias()
  }

  async function copiarLink(familia: FamiliaComConvidados) {
    await navigator.clipboard.writeText(linkRsvp(familia.codigo))
    setLinkCopiadoId(familia.id)
    setTimeout(() => setLinkCopiadoId(null), 2000)
  }

  async function mostrarQrCode(familia: FamiliaComConvidados) {
    const url = await QRCode.toDataURL(linkRsvp(familia.codigo), {
      width: 480,
      margin: 2,
    })
    setQrDataUrl(url)
    setQrCodigoId(familia.id)
  }

  const convidadosLista = familias
    .flatMap((familia) =>
      familia.convidados.map((convidado) => ({
        ...convidado,
        familiaNome: familia.nome,
      })),
    )
    .filter((c) => filtroStatus === 'todos' || c.status === filtroStatus)
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

  return (
    <div className="familias-panel">
      <div className="familias-panel__topo">
        <button
          className="familias-panel__nova-btn"
          onClick={() => setMostrarForm((v) => !v)}
        >
          {mostrarForm ? 'Cancelar' : '+ Nova família'}
        </button>

        <div className="familias-panel__visao-toggle">
          <button
            className={visao === 'agrupada' ? 'familias-panel__visao-ativa' : ''}
            onClick={() => setVisao('agrupada')}
          >
            Agrupada por família
          </button>
          <button
            className={visao === 'lista' ? 'familias-panel__visao-ativa' : ''}
            onClick={() => setVisao('lista')}
          >
            Lista completa
          </button>
        </div>
      </div>

      {mostrarForm && (
        <form className="familias-panel__form" onSubmit={criarFamilia}>
          <label>
            Nome da família
            <input
              type="text"
              value={nomeFamilia}
              onChange={(event) => setNomeFamilia(event.target.value)}
              placeholder="Ex: Família Santiago"
              required
            />
          </label>
          <label>
            Convidados (um nome por linha)
            <textarea
              value={nomesConvidados}
              onChange={(event) => setNomesConvidados(event.target.value)}
              rows={5}
              placeholder={'Cezar Santiago\nElisandra Nardi\nLuana Nardi'}
              required
            />
          </label>
          <button type="submit">Criar família</button>
        </form>
      )}

      {carregando && <p>Carregando...</p>}

      {visao === 'lista' && (
        <div className="familias-panel__filtros-status">
          {FILTROS_STATUS.map((item) => (
            <button
              key={item.valor}
              className={
                filtroStatus === item.valor
                  ? 'familias-panel__filtro-ativo'
                  : ''
              }
              onClick={() => setFiltroStatus(item.valor)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {visao === 'lista' && (
        <ul className="familias-panel__lista-flat">
          {convidadosLista.length === 0 && <p>Nenhum convidado encontrado.</p>}
          {convidadosLista.map((convidado) => (
            <li key={convidado.id}>
              <div>
                <span className="familias-panel__lista-flat-nome">
                  {convidado.nome}
                </span>
                <span className="familias-panel__lista-flat-familia">
                  {convidado.familiaNome}
                </span>
              </div>
              <select
                value={convidado.status}
                onChange={(event) =>
                  alterarStatus(
                    convidado.id,
                    event.target.value as StatusConvidado,
                  )
                }
              >
                {Object.entries(LABEL_STATUS).map(([valor, label]) => (
                  <option key={valor} value={valor}>
                    {label}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}

      {visao === 'agrupada' && (
      <div className="familias-panel__lista">
        {familias.map((familia) => {
          const { confirmados, recusados, pendentes } = resumo(
            familia.convidados,
          )
          const expandida = expandidaId === familia.id

          return (
            <article key={familia.id} className="familias-panel__card">
              <button
                className="familias-panel__card-header"
                onClick={() =>
                  setExpandidaId(expandida ? null : familia.id)
                }
              >
                <div>
                  <h3>{familia.nome}</h3>
                  <p className="familias-panel__resumo">
                    {familia.convidados.length} convidados · {confirmados}{' '}
                    confirmados · {recusados} recusados · {pendentes}{' '}
                    pendentes
                  </p>
                </div>
                <span>{expandida ? '▲' : '▼'}</span>
              </button>

              {expandida && (
                <div className="familias-panel__detalhe">
                  <div className="familias-panel__link-acoes">
                    <button onClick={() => copiarLink(familia)}>
                      {linkCopiadoId === familia.id
                        ? 'Copiado!'
                        : 'Copiar link'}
                    </button>
                    <button onClick={() => mostrarQrCode(familia)}>
                      Ver QR code
                    </button>
                    <button onClick={() => regenerarCodigo(familia)}>
                      Novo link
                    </button>
                    <button
                      className="familias-panel__excluir"
                      onClick={() => excluirFamilia(familia)}
                    >
                      Excluir família
                    </button>
                  </div>

                  {qrCodigoId === familia.id && (
                    <div className="familias-panel__qr">
                      <img src={qrDataUrl} alt={`QR code de ${familia.nome}`} />
                      <a
                        href={qrDataUrl}
                        download={`rsvp-${familia.nome.replace(/\s+/g, '-').toLowerCase()}.png`}
                      >
                        Baixar QR code
                      </a>
                    </div>
                  )}

                  <ul className="familias-panel__convidados">
                    {familia.convidados.map((convidado) => (
                      <li key={convidado.id}>
                        <span>{convidado.nome}</span>
                        <div className="familias-panel__convidado-acoes">
                          <select
                            value={convidado.status}
                            onChange={(event) =>
                              alterarStatus(
                                convidado.id,
                                event.target.value as StatusConvidado,
                              )
                            }
                          >
                            {Object.entries(LABEL_STATUS).map(
                              ([valor, label]) => (
                                <option key={valor} value={valor}>
                                  {label}
                                </option>
                              ),
                            )}
                          </select>
                          <button
                            className="familias-panel__remover"
                            onClick={() => removerConvidado(convidado.id)}
                          >
                            Remover
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <FormAdicionarConvidado
                    onAdicionar={(nome) =>
                      adicionarConvidado(familia.id, nome)
                    }
                  />
                </div>
              )}
            </article>
          )
        })}
      </div>
      )}
    </div>
  )
}

function FormAdicionarConvidado({
  onAdicionar,
}: {
  onAdicionar: (nome: string) => void
}) {
  const [nome, setNome] = useState('')

  return (
    <form
      className="familias-panel__add-convidado"
      onSubmit={(event) => {
        event.preventDefault()
        onAdicionar(nome)
        setNome('')
      }}
    >
      <input
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        placeholder="Adicionar convidado..."
      />
      <button type="submit">Adicionar</button>
    </form>
  )
}

export default FamiliasPanel
