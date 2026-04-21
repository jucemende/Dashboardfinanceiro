import { ArrowRight, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';

const contasBancarias = [
  { nome: 'Swille', saldoPrevisto: 322.71, cor: '#14b8a6' },
  { nome: 'Flash', saldoPrevisto: 0.00, cor: '#14b8a6' },
  { nome: 'Pick Pay', saldoPrevisto: 983.67, cor: '#ef4444' }
];

const despesasData = [
  { name: 'Transporte', value: 72, cor: '#ff6b6b' },
  { name: 'Casal', value: 21, cor: '#ff8787' },
  { name: 'Moradia', value: 7, cor: '#ffa3a3' },
];

const planejamentos = [
  { categoria: 'Transporte', valor: 1141.48, planejado: 992.00, percentual: 115 },
  { categoria: 'Casal', valor: 323.01, planejado: 1200.00, percentual: 27 },
  { categoria: 'Moradia', valor: 110.00, planejado: 531.00, percentual: 21 },
  { categoria: 'Receita', valor: 567.26, planejado: 7238.00, percentual: 8 },
  { categoria: 'Família', valor: 0.00, planejado: 1029.45, percentual: 0 },
];

const CircularProgress = ({ percentual, size = 80 }: { percentual: number; size?: number }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentual / 100) * circumference;

  const getColor = () => {
    if (percentual > 100) return '#ef4444';
    if (percentual > 80) return '#f59e0b';
    return '#14b8a6';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold" style={{ color: getColor() }}>
          {percentual}%
        </span>
      </div>
    </div>
  );
};

export default function App() {
  const saldoGeral = 12580.34;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Saldo Geral */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-teal-100 mb-2 text-sm tracking-wide">Olá, Ana & Júlio</p>
          <h1 className="text-5xl font-bold mb-1">{saldoGeral.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})}</h1>
          <p className="text-teal-100 text-sm">Saldo geral</p>

          <div className="flex gap-3 mt-6">
            <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-all backdrop-blur-sm">
              Pagar
            </button>
            <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-all backdrop-blur-sm">
              Receber
            </button>
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
              {contasBancarias.map((conta, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{conta.nome}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Saldo previsto R$ {conta.saldoPrevisto.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <p className={`font-semibold ${conta.saldoPrevisto < 0 ? 'text-red-500' : 'text-teal-500'}`}>
                    {conta.saldoPrevisto < 0 ? '(' : ''}
                    R$ {Math.abs(conta.saldoPrevisto).toFixed(2).replace('.', ',')}
                    {conta.saldoPrevisto < 0 ? ')' : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cartão de Crédito */}
          <div>
            <h2 className="text-gray-500 text-sm mb-4 font-medium">Cartão de crédito</h2>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">C6 Card</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Limite disponível R$ 1.151,25
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-red-500">(R$ 1.554,49)</p>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full py-2 text-sm font-medium transition-colors">
                Ver fatura
              </button>
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
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-center mb-4">
                <PieChart width={220} height={180}>
                  <Pie
                    data={despesasData}
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {despesasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="space-y-3">
                {despesasData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.cor }}></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contas a Pagar */}
          <div>
            <h2 className="text-gray-500 text-sm mb-4 font-medium">Contas a pagar</h2>
            <div className="flex flex-col gap-5 bg-white rounded-2xl shadow-sm p-6">
              
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-900">Supermercado</p>
                    <p className="text-xs text-gray-500 mt-1">21/04/2026</p>
                  </div>
                  <p className="font-semibold text-red-500">(R$ 132,96)</p>
                </div>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-2 text-sm font-medium transition-colors">
                  Pagar
                </button>
              </div>

              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-900">Supermercado</p>
                    <p className="text-xs text-gray-500 mt-1">21/04/2026</p>
                  </div>
                  <p className="font-semibold text-red-500">(R$ 132,96)</p>
                </div>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-2 text-sm font-medium transition-colors">
                  Pagar
                </button>
              </div>
            </div>
          </div>

          {/* Contas a Receber */}
          <div>
            <h2 className="text-gray-500 text-sm mb-4 font-medium">Contas a receber</h2>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium text-gray-900">Outros</p>
                  <p className="text-xs text-gray-500 mt-1">15/04/2026</p>
                </div>
                <p className="font-semibold text-teal-500">R$ 1.029,47</p>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full py-2 text-sm font-medium transition-colors">
                Receber
              </button>
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
              {planejamentos.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <p className="font-medium text-gray-900 text-sm mb-1">{item.categoria}</p>
                    <p className="text-xs text-gray-500 mb-1">
                      R$ {item.valor.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Planejado R$ {item.planejado.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <CircularProgress percentual={item.percentual} size={70} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
