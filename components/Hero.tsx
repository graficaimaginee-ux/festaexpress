
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-purple-200/30 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-pink-100/40 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-3/5 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-100">
            <span className="flex h-2 w-2 rounded-full bg-[#a855f7] animate-pulse"></span>
            <span className="text-xs font-bold text-[#a855f7] uppercase tracking-wider">Lançamento: Versão 3.0 Pro</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-[900] text-gray-900 leading-[1.1] tracking-tight">
            A magia da festa, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#f43f5e]">gerada por IA.</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            Imagine transformar a foto do seu filho em um personagem épico. Nossa IA gera um kit completo de papelaria personalizada em segundos. <span className="font-bold text-gray-900">O fim do trabalho manual chegou.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-[#a855f7] hover:bg-[#9333ea] text-white font-black py-6 px-12 rounded-3xl shadow-2xl shadow-purple-200 transition-all transform hover:scale-105 uppercase tracking-widest text-lg flex items-center justify-center gap-3"
            >
              Começar Geração Pro
              <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>
            <div className="flex -space-x-3 items-center">
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-4 border-white object-cover" src={`https://i.pravatar.cc/100?u=${i}`} />
              ))}
              <span className="pl-6 text-sm font-bold text-gray-500">+1.5k mães usando</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
            {[
              { icon: 'fa-gem', label: 'Artes 2K HD' },
              { icon: 'fa-wand-sparkles', label: 'IA Personificada' },
              { icon: 'fa-clock', label: 'Em 2 Minutos' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#a855f7]">
                  <i className={`fa-solid ${feature.icon}`}></i>
                </div>
                <span className="text-sm font-bold text-gray-700">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-2/5 relative">
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-[-3deg] border-8 border-white">
                <img src="https://picsum.photos/seed/child_1/400/500" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-[2deg] border-8 border-white bg-purple-600 p-6 text-white text-center">
                <i className="fa-solid fa-arrow-down text-2xl mb-2 animate-bounce"></i>
                <p className="font-black text-xs uppercase tracking-widest leading-none">Transformação Mágica</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-[4deg] border-8 border-white">
                <img src="https://picsum.photos/seed/gen_1/400/600" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-[-2deg] border-8 border-white">
                <img src="https://picsum.photos/seed/gen_2/400/400" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          {/* Floating Element */}
          <div className="absolute -bottom-8 -left-8 z-20 bg-white p-5 rounded-3xl shadow-2xl flex items-center gap-4 animate-float">
             <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-xl">
               <i className="fa-solid fa-check-double"></i>
             </div>
             <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Status do Kit</p>
               <p className="font-black text-gray-800">Pronto para Imprimir</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
