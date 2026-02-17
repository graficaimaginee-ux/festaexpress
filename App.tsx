
import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { GeneratorForm } from './components/GeneratorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { GeminiService } from './services/geminiService';
import { PartyAsset } from './types';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

enum ViewState {
  HOME,
  FORM,
  RESULTS
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<PartyAsset[]>([]);
  const [currentTheme, setCurrentTheme] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Modo de teste: Ignora a verificação de API Key e vai direto para o formulário
  const startTesting = () => {
    setView(ViewState.FORM);
    setError(null);
  };

  const handleGenerate = async (photo: string, theme: string, refPhoto?: string) => {
    setIsGenerating(true);
    setError(null);
    setCurrentTheme(theme);
    
    try {
      const gemini = new GeminiService();
      const generatedImages = await gemini.generatePartyKit(photo, theme, refPhoto);
      
      const assetTypes: Array<{ name: string; type: PartyAsset['type'] }> = [
        { name: 'Adesivos do Personagem', type: 'sticker' },
        { name: 'Folha de Expressões', type: 'sticker' },
        { name: 'Arte para Painel', type: 'panel' },
        { name: 'Toppers de Bolo', type: 'topper' }
      ];

      const newAssets: PartyAsset[] = assetTypes.map((t, i) => {
        // Se a IA não retornar imagem (por filtros de segurança), usamos um placeholder colorido
        let imageUrl = `https://picsum.photos/seed/${theme}${i}/1024/1024`;
        if (generatedImages.length > 0) {
          imageUrl = generatedImages[i % generatedImages.length];
        }

        return {
          id: `magic-${i}-${Date.now()}`,
          name: t.name,
          type: t.type,
          description: '',
          imageUrl: imageUrl
        };
      });

      setResults(newAssets);
      setView(ViewState.RESULTS);
    } catch (err: any) {
      setError(err.message || "Erro na geração. Certifique-se de que as imagens são adequadas.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff]">
      <header className="px-8 py-5 flex justify-between items-center bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100/50">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView(ViewState.HOME)}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-gray-900 leading-none">FESTA MÁGICA</span>
            <span className="text-[10px] font-bold text-[#ec4899] tracking-[0.2em]">MODO TESTE FREE</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-6">
          <button onClick={() => setView(ViewState.HOME)} className="text-xs font-bold text-gray-500 hover:text-[#a855f7] transition-colors uppercase tracking-widest">Início</button>
          <button onClick={startTesting} className="bg-gray-900 text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-md">Criar Agora</button>
        </nav>
      </header>

      <main className="flex-grow">
        {view === ViewState.HOME && <Hero onStart={startTesting} />}

        {view === ViewState.FORM && (
          <div className="py-16 px-6 bg-gradient-to-b from-purple-50/30 to-transparent">
            {error && (
              <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4 text-red-600">
                <i className="fa-solid fa-circle-exclamation"></i>
                <p className="font-semibold text-sm">{error}</p>
              </div>
            )}
            <GeneratorForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>
        )}

        {view === ViewState.RESULTS && (
          <ResultsDisplay assets={results} theme={currentTheme} />
        )}
      </main>

      <footer className="bg-white border-t border-purple-50 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">© 2024 Festa Mágica IA - Versão de Testes</p>
          <div className="flex gap-6 text-gray-300">
            <i className="fa-brands fa-instagram hover:text-purple-400 cursor-pointer"></i>
            <i className="fa-brands fa-tiktok hover:text-purple-400 cursor-pointer"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
