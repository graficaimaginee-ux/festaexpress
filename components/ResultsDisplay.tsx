
import React from 'react';
import { PartyAsset } from '../types';

interface ResultsDisplayProps {
  assets: PartyAsset[];
  theme: string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ assets, theme }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-purple-50 relative overflow-hidden">
        {/* Header do Card de Resultado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold text-[#a855f7]">Tema {theme}</h2>
          <div className="bg-[#22c55e] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
            <i className="fa-solid fa-sparkles"></i>
            Resultado IA
          </div>
        </div>

        {/* Grid de Artes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <div key={asset.id} className="group relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src={asset.imageUrl} 
                  alt={asset.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl backdrop-blur-[2px]">
                <button className="bg-white text-gray-900 px-4 py-2 rounded-xl font-bold text-xs uppercase shadow-lg">
                  Baixar HD
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-between items-center text-[10px] text-gray-400 italic font-medium">
          <p>* Artes geradas por usuários em 5mins</p>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-100"></span>
            <span className="w-2 h-2 rounded-full bg-purple-200"></span>
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <button 
          onClick={() => window.location.reload()}
          className="bg-white text-[#a855f7] px-8 py-3 rounded-2xl font-bold border border-purple-100 hover:bg-purple-50 transition-colors shadow-sm"
        >
          Criar Nova Festa
        </button>
      </div>
    </div>
  );
};
