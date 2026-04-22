import { ArrowRight, TrendingDown, ChevronLeft, ChevronRight, Wallet, Banknote, Building2, Car, Heart, Home, Users, TrendingUp, ShoppingCart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const contasBancarias = [
  { nome: 'Swille', saldoPrevisto: 322.71, cor: '#14b8a6', icone: Wallet },
  { nome: 'Flash', saldoPrevisto: 0.00, cor: '#14b8a6', icone: Banknote },
  { nome: 'Pick Pay', saldoPrevisto: 983.67, cor: '#ef4444', icone: Building2 }
];

const cartoesCredito = [
  {
    nome: 'C6 Card',
    numero: '**** **** **** 4829',
    bandeira: 'Mastercard',
    limiteDisponivel: 1151.25,
    faturaAtual: 1554.49,
    vencimento: '05/28',
    gradiente: 'from-purple-600 via-purple-500 to-pink-500'
  },
  {
    nome: 'Nubank',
    numero: '**** **** **** 7234',
    bandeira: 'Visa',
    limiteDisponivel: 2340.00,
    faturaAtual: 892.15,
    vencimento: '03/27',
    gradiente: 'from-violet-600 via-purple-600 to-purple-700'
  },
  {
    nome: 'Inter',
    numero: '**** **** **** 1892',
    bandeira: 'Mastercard',
    limiteDisponivel: 580.50,
    faturaAtual: 245.80,
    vencimento: '11/26',
    gradiente: 'from-orange-500 via-orange-600 to-red-600'
  }
];

const despesasData = [
  { name: 'Transporte', value: 72, valor: 1141.48, icone: Car,    cor: '#ef4444', corGradiente: '#dc2626' },
  { name: 'Casal',      value: 21, valor: 323.01,  icone: Heart,  cor: '#f87171', corGradiente: '#ef4444' },
  { name: 'Moradia',    value: 7,  valor: 110.00,  icone: Home,   cor: '#fca5a5', corGradiente: '#f87171' },
];

const totalDespesas = despesasData.reduce((sum, d) => sum + d.valor, 0);

const planejamentos = [
  { categoria: 'Transporte', icone: Car,         valor: 1141.48, planejado: 992.00,  percentual: 115 },
  { categoria: 'Casal',      icone: Heart,        valor: 323.01,  planejado: 1200.00, percentual: 27  },
  { categoria: 'Moradia',    icone: Home,         valor: 110.00,  planejado: 531.00,  percentual: 21  },
  { categoria: 'Receita',    icone: TrendingUp,   valor: 567.26,  planejado: 7238.00, percentual: 8   },
  { categoria: 'Família',    icone: Users,        valor: 0.00,    planejado: 1029.45, percentual: 0   },
];

const CircularProgress = ({ percentual, size = 80 }: { percentual: number; size?: number }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percentual, 100) / 100) * circumference;

  const getColor = () => {
    if (percentual > 100) return '#ef4444';
    if (percentual > 80) return '#f59e0b';
    return '#14b8a6';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="6" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={getColor()} strokeWidth="6" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold" style={{ color: getColor() }}>{percentual}%</span>
      </div>
    </div>
  );
};

export default function App() {
  const saldoGeral = 12580.34;
  const [cartaoAtualIndex, setCartaoAtualIndex] = useState(0);

  const proximoCartao = () => setCartaoAtualIndex((prev) => (prev + 1) % cartoesCredito.length);
  const cartaoAnterior = () => setCartaoAtualIndex((prev) => (prev - 1 + cartoesCredito.length) % cartoesCredito.length);

  const cartaoAtual = cartoesCredito[cartaoAtualIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-teal-100 mb-2 text-sm tracking-wide">Olá, Ana & Júlio</p>
          <h1 className="text-5xl font-bold mb-1">
            {saldoGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h1>
          <p className="text-teal-100 text-sm">Saldo geral</p>
          <div className="flex gap-3 mt-6">
            <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-all backdrop-blur-sm">Pagar</button>
            <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-all backdrop-blur-sm">Receber</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Minhas Contas */}
          <div>
            <h2 className="text-gray-500 text-sm mb-4 font-medium">Minhas contas</h2>
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
              {contasBancarias.map((conta, index) => {
                const IconeComponent = conta.icone;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${conta.cor}15` }}>
                        <IconeComponent className="w-5 h-5" style={{ color: conta.cor }} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{conta.nome}</p>
                        <p className="text-xs text-gray-500 mt-1">Saldo previsto R$ {conta.saldoPrevisto.toFixed(2).replace('.', ',')}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${conta.saldoPrevisto < 0 ? 'text-red-500' : 'text-teal-500'}`}>
                      {conta.saldoPrevisto < 0 ? '(' : ''}R$ {Math.abs(conta.saldoPrevisto).toFixed(2).replace('.', ',')}{conta.saldoPrevisto < 0 ? ')' : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cartão de Crédito */}
          <div>
            <h2 className="text-gray-500 text-sm font-medium mb-4">Cartão de crédito</h2>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              {/* Cartão com botões internos */}
              <div className={`relative w-full h-48 bg-gradient-to-br ${cartaoAtual.gradiente} rounded-2xl shadow-xl overflow-hidden mb-4 transition-all duration-300`}>
                {/* Padrão de fundo */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full -ml-20 -mb-20"></div>
                </div>

                {/* Botão anterior — dentro do cartão, lado esquerdo */}
                {cartoesCredito.length > 1 && (
                  <button
                    onClick={cartaoAnterior}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                )}

                {/* Botão próximo — dentro do cartão, lado direito */}
                {cartoesCredito.length > 1 && (
                  <button
                    onClick={proximoCartao}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                )}

                {/* Conteúdo do cartão */}
                <div className="relative h-full p-5 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded shadow-md"></div>
                    <span className="text-xs font-medium opacity-90">{cartaoAtual.bandeira}</span>
                  </div>

                  <div>
                    <p className="text-lg tracking-wider mb-3 font-mono">{cartaoAtual.numero}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] opacity-70 mb-0.5">Nome do titular</p>
                        <p className="text-sm font-medium">ANA & JÚLIO</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] opacity-70 mb-0.5">Válido até</p>
                        <p className="text-sm font-medium">{cartaoAtual.vencimento}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicadores de pontos na parte inferior do cartão */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {cartoesCredito.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCartaoAtualIndex(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === cartaoAtualIndex ? '16px' : '6px',
                        height: '6px',
                        backgroundColor: i === cartaoAtualIndex ? 'white' : 'rgba(255,255,255,0.45)'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Informações da fatura */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Fatura atual</span>
                  <span className="font-semibold text-red-500">R$ {cartaoAtual.faturaAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Limite disponível</span>
                  <span className="font-semibold text-teal-600">R$ {cartaoAtual.limiteDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full py-2 text-sm font-medium transition-colors mt-2">
                  Ver fatura completa
                </button>
              </div>
            </div>
          </div>

          {/* Top Despesas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-500 text-sm font-medium">Top despesas do mês</h2>
              <button className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-xs font-semibold transition-colors group">
                Dashboard Completo
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 overflow-hidden">
              {/* Gráfico semicircular */}
              <div className="relative flex justify-center mb-6">
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="grad-red-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id="grad-red-2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f87171" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="grad-red-3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#f87171" stopOpacity="0.7" />
                    </linearGradient>
                    <filter id="drop-shadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                      <feOffset dx="0" dy="2" result="offsetblur"/>
                      <feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer>
                      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                </svg>
                <div className="relative">
                  <PieChart width={240} height={200}>
                    <Pie
                      data={despesasData}
                      cx="50%" cy="85%"
                      startAngle={180} endAngle={0}
                      innerRadius={70} outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      animationBegin={0} animationDuration={800}
                      style={{ filter: 'url(#drop-shadow)' }}
                    >
                      {despesasData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#grad-red-${index + 1})`} strokeWidth={0} />
                      ))}
                    </Pie>
                  </PieChart>
                  {/* Total monetário no centro */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                    <p className="text-lg font-bold text-gray-900">
                      {totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Total gasto</p>
                  </div>
                </div>
              </div>

              {/* Legenda com ícones e valor monetário */}
              <div className="space-y-3.5">
                {despesasData.map((item, index) => {
                  const IconeCategoria = item.icone;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-red-50 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        {/* Ícone da categoria */}
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${item.cor}20` }}
                        >
                          <IconeCategoria className="w-4 h-4" style={{ color: item.cor }} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${item.value}%`, backgroundColor: item.cor }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contas a Pagar */}
          <div>
            <h2 className="text-gray-500 text-sm mb-4 font-medium">Contas a pagar</h2>
            <div className="flex flex-col gap-5 bg-white rounded-2xl shadow-sm p-6">
              {[{ nome: 'Supermercado', data: '21/04/2026', valor: 132.96 }, { nome: 'Supermercado', data: '21/04/2026', valor: 132.96 }].map((conta, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{conta.nome}</p>
                      <p className="text-xs text-gray-500 mt-1">{conta.data}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 min-w-[110px]">
                    <p className="font-semibold text-red-500 whitespace-nowrap">(R$ {conta.valor.toFixed(2).replace('.', ',')})</p>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-1 text-xs font-medium transition-colors">Pagar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contas a Receber */}
          <div>
            <h2 className="text-gray-500 text-sm mb-4 font-medium">Contas a receber</h2>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-4 h-4 text-teal-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Outros</p>
                    <p className="text-xs text-gray-500 mt-1">15/04/2026</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[110px]">
                  <p className="font-semibold text-teal-500 whitespace-nowrap">R$ 1.029,47</p>
                  <button className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full py-1 text-xs font-medium transition-colors">Receber</button>
                </div>
              </div>
            </div>
          </div>

          {/* Top Planejamentos */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-500 text-sm font-medium">Top planejamentos do mês</h2>
              <button className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-xs font-semibold transition-colors group">
                Planejamento Completo
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
              {planejamentos.map((item, index) => {
                const IconePlano = item.icone;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 mr-4">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <IconePlano className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm mb-1">{item.categoria}</p>
                        <p className="text-xs text-gray-500 mb-0.5">R$ {item.valor.toFixed(2).replace('.', ',')}</p>
                        <p className="text-xs text-gray-400">Planejado R$ {item.planejado.toFixed(2).replace('.', ',')}</p>
                      </div>
                    </div>
                    <CircularProgress percentual={item.percentual} size={70} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
