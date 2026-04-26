import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: Truck, title: 'Frete Grátis', desc: 'Em compras acima de R$ 200' },
  { icon: ShieldCheck, title: 'Compra Segura', desc: 'Seus dados protegidos' },
  { icon: CreditCard, title: 'Até 12x Sem Juros', desc: 'No cartão de crédito' },
  { icon: Star, title: 'Garantia Total', desc: '30 dias para devolução' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 flex items-center min-h-[80vh]">
         {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 blur-3xl opacity-30 rounded-full w-[800px] h-[800px] bg-gradient-to-tr from-gray-200 to-gray-400 pointer-events-none" />
        
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="max-w-2xl"
            >
               <span className="inline-block py-1 px-3 rounded-full bg-black/5 text-sm font-medium tracking-wide mb-6">Nova Coleção</span>
               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                 Eleve seu estilo <br /> com Lumina.
               </h1>
               <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                 Descubra uma curadoria exclusiva de produtos que combinam design moderno, qualidade impecável e a melhor experiência de compra online.
               </p>
               <div className="mt-8 flex flex-wrap gap-4">
                 <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-medium text-white hover:bg-gray-900 hover:scale-105 transition-all shadow-xl shadow-black/20">
                   Ver Produtos
                   <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
                 <Link to="/categories" className="inline-flex items-center justify-center rounded-full bg-white border border-gray-200 px-8 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                   Categorias
                 </Link>
               </div>
            </motion.div>
            
            {/* Hero Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1200" 
                    alt="Lifestyle products" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border border-black/10 rounded-3xl pointer-events-none" />
              </div>
               {/* Floating elements */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="absolute -bottom-6 -left-12 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4"
               >
                 <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center text-white">
                   <Star className="h-6 w-6" />
                 </div>
                 <div>
                   <p className="font-bold text-gray-900 leading-none">4.9/5</p>
                   <p className="text-sm font-medium text-gray-500">Avaliações Clientes</p>
                 </div>
               </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <feature.icon className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection snippet placeholder */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Novidades em Destaque</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-12">Confira nossos lançamentos mais recentes com design exclusivo.</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="group text-left cursor-pointer">
                    <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden relative mb-4">
                       <img src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600&sig=${i}`} alt="Produto" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    </div>
                    <h3 className="font-medium text-gray-900">Relógio Minimalista</h3>
                    <p className="text-gray-500 text-sm mt-1">Acessórios</p>
                    <p className="font-semibold text-gray-900 mt-2">R$ 299,90</p>
                 </div>
               ))}
            </div>
            
            <Link to="/products" className="inline-flex items-center text-black font-medium hover:opacity-70 transition-opacity">
              Ver Coleção Completa <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
        </div>
      </section>
    </div>
  );
}
