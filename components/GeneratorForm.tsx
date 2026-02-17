
import React, { useState, useRef } from 'react';

interface GeneratorFormProps {
  onGenerate: (photo: string, theme: string, refPhoto?: string) => void;
  isGenerating: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isGenerating }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [refPhoto, setRefPhoto] = useState<string | null>(null);
  const [theme, setTheme] = useState('');
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const refInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photo && theme) {
      onGenerate(photo, theme, refPhoto || undefined);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {/* Card Foto Criança */}
        <div className="relative group">
          <div 
            onClick={() => photoInputRef.current?.click()}
            className="w-64 h-64 bg-gray-100 rounded-3xl overflow-hidden cursor-pointer border-4 border-white shadow-xl hover:scale-105 transition-transform relative"
          >
            {photo ? (
              <img src={photo} alt="Sua Foto" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <i className="fa-solid fa-camera text-4xl mb-2"></i>
                <span className="font-bold text-xs uppercase tracking-widest">Sua Foto</span>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase">Sua Foto</div>
          </div>
          <input type="file" ref={photoInputRef} onChange={(e) => handleFileChange(e, setPhoto)} className="hidden" accept="image/*" />
        </div>

        {/* Sinal de + */}
        <div className="w-12 h-12 bg-[#ec4899] rounded-full flex items-center justify-center text-white text-2xl shadow-lg z-10">
          <i className="fa-solid fa-plus"></i>
        </div>

        {/* Card Foto Referência */}
        <div className="relative group">
          <div 
            onClick={() => refInputRef.current?.click()}
            className="w-64 h-64 bg-gray-100 rounded-3xl overflow-hidden cursor-pointer border-4 border-white shadow-xl hover:scale-105 transition-transform relative"
          >
            {refPhoto ? (
              <img src={refPhoto} alt="Referência" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <i className="fa-solid fa-image text-4xl mb-2"></i>
                <span className="font-bold text-xs uppercase tracking-widest">Tema Referência</span>
              </div>
            )}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase">Tema Referência</div>
          </div>
          <input type="file" ref={refInputRef} onChange={(e) => handleFileChange(e, setRefPhoto)} className="hidden" accept="image/*" />
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <input 
          type="text" 
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Nome do Tema (ex: Minnie)"
          className="w-full p-5 rounded-2xl bg-white shadow-inner border border-purple-100 text-center text-lg font-bold placeholder:text-gray-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
        />
        
        <button 
          onClick={handleSubmit}
          disabled={isGenerating || !photo || !theme}
          className={`w-full py-6 rounded-3xl font-black text-xl uppercase tracking-widest shadow-2xl transition-all
            ${isGenerating 
              ? 'bg-gray-200 text-gray-400' 
              : 'bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white hover:scale-[1.02] active:scale-95 shadow-purple-200'}`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-3">
              <i className="fa-solid fa-wand-sparkles animate-spin"></i>
              Criando Magia...
            </span>
          ) : 'GERAR RESULTADO IA'}
        </button>
      </div>
    </div>
  );
};
