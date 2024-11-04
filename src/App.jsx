import { For } from 'solid-js';

function App() {
  const tools = [
    'قارئ الشاشة المتقدم',
    'تكبير النص والصور',
    'تحكم في تباين الألوان',
    'تحويل النص إلى كلام',
    'اختصارات لوحة المفاتيح المخصصة',
  ];

  return (
    <div
      dir="rtl"
      class="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-4 text-gray-800"
    >
      <main class="max-w-4xl mx-auto h-full flex flex-col justify-center items-center">
        <h1 class="text-5xl font-extrabold text-orange-600 mb-6">
          أدوات الوصول لذوي الإعاقة البصرية
        </h1>
        <p class="text-2xl text-gray-700 mb-8 text-center">
          نقدم لك مجموعة من الأدوات التي تسهل تجربة التصفح وتجعله أكثر سهولة ويسراً.
        </p>
        <ul class="list-disc text-xl text-gray-700 mb-8">
          <For each={tools}>
            {(tool) => (
              <li class="mb-2">{tool}</li>
            )}
          </For>
        </ul>
      </main>
    </div>
  );
}

export default App;