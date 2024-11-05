import { Routes, Route, Link } from '@solidjs/router';
import SocialLinks from './components/SocialLinks';
import Assistant from './components/Assistant';
import RadioPlayer from './components/RadioPlayer';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <div
      dir="rtl"
      class="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-4 text-gray-800"
    >
      <main class="h-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-6">
        <nav class="w-full flex justify-end mb-6">
          <Link href="/" class="text-lg font-semibold text-orange-600 hover:text-orange-700 px-4 cursor-pointer">
            الرئيسية
          </Link>
          <Link href="/about" class="text-lg font-semibold text-orange-600 hover:text-orange-700 px-4 cursor-pointer">
            من نحن
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 class="text-5xl font-extrabold text-orange-600 mb-6">
                  تبادل المعلومات التقنية
                </h1>
                <p class="text-xl text-gray-700 leading-relaxed">
                  مرحبًا بك في <strong>"تبادل المعلومات التقنية"</strong>! اكتشف عالم التقنية، تواصل، وتعلم معنا. انضم الآن وانطلق نحو مستقبل مشرق!
                </p>
                <SocialLinks />
                <RadioPlayer />
                <Assistant />
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;