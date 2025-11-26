import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

// Placeholder components for pages that are not yet created
const HomePage = () => <PageLayout>
  <h1 className="text-3xl font-bold">카라반을 예약하고 여행을 떠나보세요!</h1>
</PageLayout>;
const CaravansPage = () => <PageLayout><h1>카라반 목록</h1></PageLayout>;
const LoginPage = () => <PageLayout><h1>로그인</h1></PageLayout>;


const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="p-8">
    {children}
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">Caraban</Link>
            <div className="flex space-x-6 items-center">
              <Link to="/caravans" className="text-gray-600 hover:text-blue-500">카라반 둘러보기</Link>
              <Link to="/register" className="text-gray-600 hover:text-blue-500">회원가입</Link>
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                로그인
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/caravans" element={<CaravansPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;
