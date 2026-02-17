
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generatePartyKit(base64Image: string, theme: string, referenceBase64?: string): Promise<string[]> {
    // Usamos o process.env.API_KEY diretamente injetado no ambiente
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const parts: any[] = [
      {
        inlineData: {
          data: base64Image.split(',')[1],
          mimeType: 'image/jpeg',
        },
      },
    ];

    if (referenceBase64) {
      parts.push({
        inlineData: {
          data: referenceBase64.split(',')[1],
          mimeType: 'image/jpeg',
        },
      });
    }

    const prompt = `
      ESTILO: Ilustração digital fofa, estilo Disney/Pixar, 3D renderizado com cores vibrantes e iluminação suave.
      TEMA: ${theme}. 
      FORMATO: Gere uma única imagem contendo uma "sticker sheet" (folha de adesivos) com fundo branco sólido.
      PERSONAGEM: Transforme a criança da foto em um personagem fofo integrado ao tema "${theme}". 
      Mantenha traços físicos reconhecíveis da criança como cor de cabelo, formato do rosto e etnia.
      ITENS NA FOLHA:
      1. Vários adesivos apenas do rosto com expressões diferentes (sorrindo, piscando, surpreso).
      2. O personagem de corpo inteiro em uma pose heroica ou festiva.
      3. Pequenos ícones decorativos relacionados ao tema espalhados.
      REQUISITO: Tudo deve estar em uma única imagem organizada como um kit de recortes.
    `;

    parts.push({ text: prompt });

    try {
      // Usando gemini-2.5-flash-image que é o modelo padrão para geração de imagens e possui tier gratuito
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      const images: string[] = [];
      const candidate = response.candidates?.[0];
      
      // Verificação de segurança: Se o modelo bloqueou a resposta
      if (!candidate) {
        throw new Error("A IA não conseguiu processar esta solicitação. Tente outra foto ou tema.");
      }

      if (candidate.finishReason === 'SAFETY') {
        throw new Error("A imagem foi bloqueada pelos filtros de segurança (conteúdo sensível). Tente um tema diferente.");
      }

      if (candidate.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            images.push(`data:image/png;base64,${part.inlineData.data}`);
          }
        }
      }

      // Se não houver partes de imagem, mas houver texto, pode ser um erro retornado pelo modelo como texto
      if (images.length === 0) {
        const textContent = response.text;
        if (textContent) {
          console.warn("IA retornou texto em vez de imagem:", textContent);
          throw new Error("A IA não conseguiu gerar a imagem e retornou uma resposta em texto. Tente simplificar o tema.");
        }
        throw new Error("Nenhuma imagem foi gerada. Verifique se sua foto é nítida.");
      }

      return images;
    } catch (error: any) {
      console.error("Gemini Generation Error Detailed:", error);
      // Tratamento amigável para o usuário
      if (error.message?.includes("parts")) {
        throw new Error("Ocorreu um erro técnico na leitura da imagem. Tente novamente com outra foto.");
      }
      throw new Error(error.message || "Erro inesperado ao gerar seu kit.");
    }
  }
}
