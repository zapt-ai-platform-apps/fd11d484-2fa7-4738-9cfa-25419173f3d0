import SocialLinks from './components/SocialLinks';

function App() {
  return (
    <div
      dir="rtl"
      class="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-4 text-gray-800"
    >
      <main class="h-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center">
        <h1 class="text-5xl font-extrabold text-orange-600 mb-6">
          تبادل المعلومات التقنية
        </h1>
        <p class="text-xl text-gray-700 leading-relaxed">
          مرحبًا بك في <strong>"تبادل المعلومات التقنية"</strong>! اكتشف عالم التقنية، تواصل، وتعلم معنا. انضم الآن وانطلق نحو مستقبل مشرق!
        </p>
        <SocialLinks />
      </main>
    </div>
  );
}

export default App;