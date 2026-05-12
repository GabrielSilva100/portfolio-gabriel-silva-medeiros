import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Eye, 
  Code2, 
  Download, 
  Copy, 
  Check, 
  Maximize2, 
  Github,
  Moon,
  Sun,
  Accessibility,
  LogIn,
  Share2
} from 'lucide-react';
import { MarkdownEditor } from './components/MarkdownEditor';
import { MarkdownPreview } from './components/MarkdownPreview';
import { cn } from './lib/utils';

const INITIAL_MARKDOWN = `# Bem-vindo ao Live Pro 🚀

![Banner Elegante](https://picsum.photos/seed/workspace/1200/400)

Este é um editor de markdown de alta performance construído com **React**, **Tailwind CSS** e **Motion**.

## 📱 Totalmente Responsivo
Acesse de qualquer lugar! O site se adapta automaticamente ao seu celular, tablet ou desktop.

## ✨ Elegância e Performance
A escrita deve ser uma experiência prazerosa. Por isso, focamos em uma interface que desaparece para dar lugar às suas ideias.

![Escrita Focada](https://picsum.photos/seed/writing/800/450)

## Funcionalidades
- **Visualização em Tempo Real**: Veja as mudanças instantaneamente enquanto digita.
- **Suporte GFM**: Tabelas, listas de tarefas e muito mais.
- **Design Responsivo**: Funciona perfeitamente em qualquer tamanho de tela.
- **Interface Limpa**: Focada no seu conteúdo.

### Exemplo de Código
\`\`\`javascript
function olaMundo() {
  console.log("Olá, Markdown!");
}
\`\`\`

---
*Feito com ❤️ para desenvolvedores que apreciam o design.*
`;

export default function App() {
  const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN);
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLibrasModal, setShowLibrasModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile && viewMode === 'split') {
        setViewMode('editor');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [viewMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGoogleLogin = () => {
    alert("O login com Google está sendo configurado. Por favor, aguarde a finalização do Firebase.");
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden",
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px]",
            isDarkMode ? "bg-indigo-900/20" : "bg-indigo-200/40"
          )}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px]",
            isDarkMode ? "bg-purple-900/20" : "bg-purple-200/40"
          )}
        />
      </div>

      {/* Header */}
      <header className={cn(
        "h-auto lg:h-16 border-b flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-0 sticky top-0 z-20 backdrop-blur-xl gap-4",
        isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"
      )}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 w-full lg:w-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 cursor-pointer shrink-0"
          >
            <FileText size={22} />
          </motion.div>
          <div className="overflow-hidden">
            <h1 className="font-bold text-lg tracking-tight truncate">Live Pro</h1>
            <p className="text-xs text-slate-500 font-medium italic truncate">Editor em Tempo Real</p>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          {/* View Controls */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "flex p-1 rounded-lg w-full sm:w-auto justify-center",
              isDarkMode ? "bg-slate-800" : "bg-slate-100"
            )}
          >
            <button
              onClick={() => setViewMode('editor')}
              className={cn(
                "flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 relative",
                viewMode === 'editor' 
                  ? (isDarkMode ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm")
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Code2 size={16} />
              <span>Editor</span>
              {viewMode === 'editor' && <motion.div layoutId="active-tab" className="absolute inset-0 bg-white/10 rounded-md" />}
            </button>
            
            {!isMobile && (
              <button
                onClick={() => setViewMode('split')}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 relative",
                  viewMode === 'split' 
                    ? (isDarkMode ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm")
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Maximize2 size={16} />
                <span>Dividir</span>
                {viewMode === 'split' && <motion.div layoutId="active-tab" className="absolute inset-0 bg-white/10 rounded-md" />}
              </button>
            )}

            <button
              onClick={() => setViewMode('preview')}
              className={cn(
                "flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 relative",
                viewMode === 'preview' 
                  ? (isDarkMode ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-900 shadow-sm")
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Eye size={16} />
              <span>Visualizar</span>
              {viewMode === 'preview' && <motion.div layoutId="active-tab" className="absolute inset-0 bg-white/10 rounded-md" />}
            </button>
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm shrink-0"
            >
              <LogIn size={18} className="text-indigo-600" />
              <span className="hidden sm:inline">Entrar</span>
            </motion.button>

            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isDarkMode ? "hover:bg-slate-800 text-indigo-400" : "hover:bg-slate-100 text-indigo-600"
                )}
                title="Compartilhar Site"
              >
                {shared ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowLibrasModal(true)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isDarkMode ? "hover:bg-slate-800 text-indigo-400" : "hover:bg-slate-100 text-indigo-600"
                )}
                title="Acessibilidade LIBRAS"
              >
                <Accessibility size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isDarkMode ? "hover:bg-slate-800 text-yellow-400" : "hover:bg-slate-100 text-slate-600"
                )}
                title="Alternar Tema"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isDarkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600"
                )}
                title="Baixar Arquivo"
              >
                <Download size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
        <AnimatePresence mode="wait">
          {(viewMode === 'split' || viewMode === 'editor') && (
            <motion.div
              key="editor-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex-1 flex flex-col border-r backdrop-blur-sm",
                isDarkMode ? "border-slate-800 bg-slate-950/30" : "border-slate-200 bg-white/30",
                viewMode === 'editor' ? "w-full" : "w-full lg:w-1/2"
              )}
            >
              <MarkdownEditor
                value={markdown}
                onChange={setMarkdown}
                className={cn(
                  "flex-1 p-6 lg:p-8 font-mono text-sm resize-none outline-none bg-transparent leading-relaxed",
                  isDarkMode ? "text-slate-300 placeholder-slate-600" : "text-slate-700 placeholder-slate-400"
                )}
              />
            </motion.div>
          )}

          {(viewMode === 'split' || viewMode === 'preview') && (
            <motion.div
              key="preview-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex-1 overflow-y-auto p-6 sm:p-12 backdrop-blur-sm",
                viewMode === 'preview' ? "w-full" : "w-full lg:w-1/2",
                isDarkMode ? "bg-slate-950/40" : "bg-white/40"
              )}
            >
              <MarkdownPreview 
                content={markdown} 
                className={isDarkMode ? "dark" : ""}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* LIBRAS Modal */}
      <AnimatePresence>
        {showLibrasModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={cn(
                "max-w-lg w-full rounded-2xl p-6 lg:p-8 shadow-2xl relative",
                isDarkMode ? "bg-slate-900 border border-slate-800" : "bg-white"
              )}
            >
              <button 
                onClick={() => setShowLibrasModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <Maximize2 size={20} className="rotate-45" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Accessibility size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Acessibilidade em LIBRAS</h2>
                  <p className="text-sm text-slate-500">Tradução para a Língua Brasileira de Sinais</p>
                </div>
              </div>

              <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="text-center p-6">
                  <p className="text-slate-500 mb-2">O VLibras está ativo no canto inferior direito da tela.</p>
                  <p className="text-xs text-slate-400">Clique no ícone azul para ativar o intérprete 3D que traduzirá todo o conteúdo do site para você.</p>
                </div>
              </div>

              <button 
                onClick={() => setShowLibrasModal(false)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20"
              >
                Entendi
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer / Status Bar */}
      <footer className={cn(
        "h-auto py-2 lg:h-8 border-t flex flex-col sm:flex-row items-center justify-between px-4 text-[10px] font-medium tracking-wider uppercase relative z-20 gap-2",
        isDarkMode ? "bg-slate-950 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-400"
      )}>
        <div className="flex items-center gap-4">
          <span>Palavras: {markdown.trim() ? markdown.trim().split(/\s+/).length : 0}</span>
          <span>Caracteres: {markdown.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-green-500" 
            />
            Sincronização Ativa
          </span>
          <span>UTF-8</span>
        </div>
      </footer>
    </div>
  );
}
