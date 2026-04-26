import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { collection, getDocs, addDoc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Package, Plus, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'admin'>('orders');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Admin form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: '10'
  });
  const [savingProduct, setSavingProduct] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function fetchOrders() {
      try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setOrders(snap.docs.map(d => ({id: d.id, ...d.data()})));
      } catch(err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    }
    fetchOrders();
  }, [user]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);
    try {
      await addDoc(collection(db, 'products'), {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        imageUrl: newProduct.imageUrl || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600`,
        category: newProduct.category || 'Geral',
        stock: parseInt(newProduct.stock, 10),
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      alert('Produto adicionado com sucesso!');
      setNewProduct({ name: '', description: '', price: '', imageUrl: '', category: '', stock: '10' });
    } catch(err) {
      console.error(err);
      alert('Erro ao adicionar produto. Verifique o console.');
    } finally {
      setSavingProduct(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">Faça login para acessar o painel.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Olá, {user.displayName}</h1>
           <p className="text-gray-500 mt-1">Bem-vindo ao seu painel de controle.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
             onClick={() => setActiveTab('orders')}
             className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-white text-black shadow' : 'text-gray-500 hover:text-black'}`}
          >
            Meus Pedidos
          </button>
          <button 
             onClick={() => setActiveTab('admin')}
             className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'admin' ? 'bg-white text-black shadow' : 'text-gray-500 hover:text-black'}`}
          >
            Administração
          </button>
        </div>
      </div>

      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}}>
           <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-gray-50 flex items-center gap-2">
                 <Package className="h-5 w-5 text-gray-400" />
                 <h2 className="text-lg font-semibold text-gray-900">Histórico de Pedidos</h2>
              </div>
              <div className="p-6">
                {loadingOrders ? (
                   <p className="text-gray-500 text-center py-8">Carregando...</p>
                ) : orders.length === 0 ? (
                   <div className="text-center py-12">
                      <Clock className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">Nenhum pedido encontrado.</h3>
                      <p className="text-gray-500 mt-1">Você ainda não realizou compras conosco.</p>
                   </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-300 transition-colors">
                         <div>
                            <div className="flex items-center gap-3 mb-2">
                               <span className="font-semibold text-gray-900">Pedido #{order.id.slice(0, 8)}</span>
                               <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium capitalize">
                                 {order.status}
                               </span>
                            </div>
                            <p className="text-sm text-gray-500">
                               {order.items.length} itens • Total: R$ {order.totalAmount.toFixed(2).replace('.', ',')}
                            </p>
                         </div>
                         <button className="text-sm font-medium text-black border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                            Ver Detalhes
                         </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
           </div>
        </motion.div>
      )}

      {activeTab === 'admin' && (
         <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
               <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4 text-white/80">
                     <TrendingUp className="h-5 w-5" />
                     <h3 className="font-medium">Resumo (Demo)</h3>
                  </div>
                  <p className="text-3xl font-bold">R$ 0,00</p>
                  <p className="text-sm text-white/60 mt-1">Vendas este mês</p>
               </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-gray-50 flex items-center gap-2">
                   <Plus className="h-5 w-5 text-gray-400" />
                   <h2 className="text-lg font-semibold text-gray-900">Adicionar Novo Produto</h2>
                </div>
                <form onSubmit={handleAddProduct} className="p-6 space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                        <input required value={newProduct.name} onChange={e=>setNewProduct({...newProduct, name: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-black/5 outline-none" />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                        <input required type="number" step="0.01" value={newProduct.price} onChange={e=>setNewProduct({...newProduct, price: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-black/5 outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea required rows={3} value={newProduct.description} onChange={e=>setNewProduct({...newProduct, description: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-black/5 outline-none" />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem (Opcional)</label>
                        <input value={newProduct.imageUrl} onChange={e=>setNewProduct({...newProduct, imageUrl: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-black/5 outline-none" placeholder="https://..." />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                        <input required value={newProduct.category} onChange={e=>setNewProduct({...newProduct, category: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-black/5 outline-none" />
                      </div>
                   </div>
                   <button 
                     type="submit" 
                     disabled={savingProduct}
                     className="w-full py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50"
                   >
                     {savingProduct ? 'Salvando...' : 'Criar Produto'}
                   </button>
                </form>
              </div>
            </div>
         </motion.div>
      )}
    </div>
  );
}
