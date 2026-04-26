import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { motion } from 'motion/react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  isActive: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem, toggleCart } = useCartStore();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, 'products'), where('isActive', '==', true));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({ ...product, quantity: 1 });
    toggleCart();
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-white">
      {/* Header section */}
      <div className="bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Catálago Completo</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Explore nossa coleção cuidadosamente selecionada de produtos com design premium e qualidade excepcional.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
           
           {/* Sidebar Filters (Simplified for now) */}
           <div className="w-full md:w-64 flex-shrink-0 space-y-8">
             <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Filter className="h-5 w-5"/> Filtros</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input 
                    type="text" 
                    placeholder="Buscar produtos..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
             </div>
             <div>
                <h4 className="font-medium text-gray-900 mb-3">Categorias</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><button className="hover:text-black">Todos os Produtos</button></li>
                  <li><button className="hover:text-black">Acessórios</button></li>
                  <li><button className="hover:text-black">Eletrônicos</button></li>
                  <li><button className="hover:text-black">Casa</button></li>
                </ul>
             </div>
           </div>

           {/* Product Grid */}
           <div className="flex-1">
             {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  ))}
                </div>
             ) : filteredProducts.length === 0 ? (
                <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed">
                   <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                   <h3 className="text-lg font-medium text-gray-900">Nenhum produto encontrado</h3>
                   <p className="text-gray-500 mt-2">Tente ajustar seus filtros ou realizar uma nova busca.</p>
                </div>
             ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                   {filteredProducts.map((product, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={product.id} className="group"
                      >
                         <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden relative mb-4">
                            {product.imageUrl ? (
                               <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                            ) : (
                               <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                 <ShoppingBag className="h-10 w-10 mb-2 opacity-50" />
                                 <span className="text-sm">Sem imagem</span>
                               </div>
                            )}
                            {/* Hover overlay add to cart */}
                            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCart(product);
                                }}
                                className="w-full bg-white/90 backdrop-blur text-black font-medium py-3 rounded-xl shadow-lg hover:bg-white transition-colors"
                              >
                                Adicionar à Sacola
                              </button>
                            </div>
                         </div>
                         <div className="flex justify-between items-start">
                           <div>
                             <h3 className="font-medium text-gray-900">{product.name}</h3>
                             <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                           </div>
                           <p className="font-semibold text-gray-900">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                         </div>
                      </motion.div>
                   ))}
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
