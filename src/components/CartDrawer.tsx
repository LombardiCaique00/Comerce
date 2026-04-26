import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, cartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert("Por favor, faça login para finalizar a compra.");
      return;
    }
    
    setIsCheckingOut(true);
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: cartTotal(),
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      alert('Pedido realizado com sucesso!');
      clearCart();
      toggleCart();
    } catch (err) {
      console.error(err);
      alert('Erro ao processar pedido.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Minha Sacola</h2>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <ShoppingBag className="h-16 w-16 text-gray-300" />
                  <p>Sua sacola está vazia.</p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-24 w-24 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                           <div className="h-full w-full flex items-center justify-center text-gray-400">Sem Foto</div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                             <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                             <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 ml-2">
                               <X className="h-4 w-4" />
                             </button>
                          </div>
                          <p className="mt-1 font-medium text-gray-900">
                             R$ {item.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-full overflow-hidden">
                            <button 
                              disabled={item.quantity <= 1}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-medium text-gray-900">Subtotal</span>
                  <span className="text-xl font-semibold text-gray-900">
                    R$ {cartTotal().toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Frete e impostos calculados no checkout.</p>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/10 disabled:opacity-50"
                >
                  {isCheckingOut ? 'Processando...' : 'Finalizar Compra'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
