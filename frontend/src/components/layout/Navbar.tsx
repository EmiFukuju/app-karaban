import Link from 'next/link';
import { Search, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="border-b border-gray-700 sticky top-0 bg-gray-900 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-red-500">
              CaravanShare
            </Link>
          </div>



          {/* Right side */}
          <div className="flex items-center space-x-6">
            <Link href="/host/register" className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white">
              호스트 되기
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white bg-gray-700 px-4 py-2 rounded-full">
              로그인
            </Link>
            <Link href="/profile">
              <UserCircle size={32} className="text-gray-400 hover:text-white" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
