export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">L</span>
               </div>
               <span className="text-xl font-bold tracking-tight">Lumina</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm">
              Sua loja de confiança para produtos de alta qualidade, com entrega garantida e atendimento excepcional.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links Úteis</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-black">Contato</a></li>
              <li><a href="#" className="hover:text-black">Dúvidas Frequentes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Políticas</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-black">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-black">Trocas e Devoluções</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Lumina. Todos os direitos reservados.</p>
          <div className="flex gap-4">
             {/* Social placeholders */}
             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"></div>
             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
