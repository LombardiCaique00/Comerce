import { ShoppingBag, User, LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { signInWithGoogle, signOut } from '../lib/firebase';
import { useState } from 'react';

export default function Header() {
  const { user } = useAuthStore();
  const { items, toggleCart } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">Lumina</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 ml-8 text-sm font-medium text-gray-600">
            <Link to="/products" className="hover:text-black transition-colors">Produtos</Link>
            <Link to="/categories" className="hover:text-black transition-colors">Categorias</Link>
            <Link to="/about" className="hover:text-black transition-colors">Sobre Nós</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
             <div className="flex items-center gap-4">
               <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-black hidden sm:block">
                 Minha Conta
               </Link>
               <button onClick={signOut} className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
                 <LogOut className="h-5 w-5" />
               </button>
             </div>
          ) : (
             <button 
               onClick={signInWithGoogle} 
               className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
             >
               <User className="h-5 w-5" />
               <span className="hidden sm:inline">Entrar</span>
             </button>
          )}

          <button 
            onClick={toggleCart} 
            className="relative p-2 text-gray-600 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t py-4 px-4 space-y-4 bg-white/95 backdrop-blur-md shadow-lg absolute w-full">
          <Link to="/products" className="block text-base font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Produtos</Link>
          <Link to="/categories" className="block text-base font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Categorias</Link>
          <Link to="/about" className="block text-base font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Sobre Nós</Link>
          {user && (
             <Link to="/dashboard" className="block text-base font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Minha Conta</Link>
          )}
        </div>
      )}
    </header>
  );
}
