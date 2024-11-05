import { createSignal, Show, onCleanup } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';

function Translator() {
  const [inputText, setInputText] = createSignal('');
  const [translatedText, setTranslatedText] = createSignal('');
  const [targetLang, setTargetLang] = createSignal('en');
  const [isLoading, setIsLoading] = createSignal(false);
  const [isCancelled, setIsCancelled] = createSignal(false);
  const [isAudioPlaying, setIsAudioPlaying] = createSignal(false);

  let audio;

  const handleTranslate = async () => {
    if (!inputText()) return;
    setIsLoading(true);
    setIsCancelled(false);
    setTranslatedText('');

    const prompt = `ترجم النص التالي إلى ${getLanguageName(targetLang())}: ${inputText()}\n\nالترجمة:`;

    try {
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });

      if (!isCancelled()) {
        setTranslatedText(response.trim());
      }
    } catch (error) {
      if (isCancelled()) {
        console.log('تم إلغاء الطلب');
      } else {
        console.error('Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = async () => {
    if (!translatedText()) return;

    if (isAudioPlaying()) {
      if (audio) {
        audio.pause();
        audio = null;
      }
      setIsAudioPlaying(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await createEvent('text_to_speech', {
        text: translatedText(),
        language: targetLang(),
      });
      if (audio) {
        audio.pause();
        audio = null;
      }
      audio = new Audio(response);
      audio.play();
      setIsAudioPlaying(true);

      audio.onended = () => {
        setIsAudioPlaying(false);
      };

      audio.onerror = () => {
        console.error('Error playing audio');
        setIsAudioPlaying(false);
      };
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    setIsCancelled(true);
    setIsLoading(false);
    setTranslatedText('');
    if (audio) {
      audio.pause();
      audio = null;
      setIsAudioPlaying(false);
    }
  };

  const getLanguageName = (code) => {
    const languages = {
      ar: 'العربية',
      en: 'الإنجليزية',
      fr: 'الفرنسية',
      es: 'الإسبانية',
      de: 'الألمانية',
      zh: 'الصينية',
      ru: 'الروسية',
      ja: 'اليابانية',
      pt: 'البرتغالية',
      hi: 'الهندية',
    };
    return languages[code] || code;
  };

  onCleanup(() => {
    if (audio) {
      audio.pause();
      audio = null;
    }
  });

  return (
    <div class="mt-8 w-full">
      <h2 class="text-2xl font-bold text-orange-600 mb-4">المترجم الذكي</h2>
      <div class="space-y-4">
        <textarea
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent box-border text-gray-800"
          rows="4"
          placeholder="اكتب النص الذي ترغب في ترجمته..."
          value={inputText()}
          onInput={(e) => setInputText(e.target.value)}
        />

        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
          <div class="flex-1">
            <label class="font-semibold text-gray-700">لغة الهدف:</label>
            <select
              value={targetLang()}
              onChange={(e) => setTargetLang(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent cursor-pointer mt-1"
            >
              <option value="en">الإنجليزية</option>
              <option value="ar">العربية</option>
              <option value="fr">الفرنسية</option>
              <option value="es">الإسبانية</option>
              <option value="de">الألمانية</option>
              <option value="zh">الصينية</option>
              <option value="ru">الروسية</option>
              <option value="ja">اليابانية</option>
              <option value="pt">البرتغالية</option>
              <option value="hi">الهندية</option>
            </select>
          </div>
        </div>

        <div class="flex space-x-4 rtl:space-x-reverse">
          <button
            onClick={handleTranslate}
            class={`flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              isLoading() || !inputText() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading() || !inputText()}
          >
            <Show when={!isLoading()} fallback="...جاري الترجمة">
              ترجمة
            </Show>
          </button>
          <Show when={isLoading()}>
            <button
              onClick={handleStop}
              class="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              إيقاف
            </button>
          </Show>
        </div>

        <Show when={translatedText()}>
          <div class="mt-4 bg-white p-4 rounded-lg shadow-md">
            <SolidMarkdown class="text-gray-700 leading-relaxed" children={translatedText()} />
          </div>
          <button
            onClick={handleTextToSpeech}
            class={`mt-4 px-6 py-3 ${
              isAudioPlaying() ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              isLoading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading()}
          >
            <Show when={!isLoading()} fallback="...جاري المعالجة">
              {isAudioPlaying() ? 'إيقاف' : 'استمع للترجمة'}
            </Show>
          </button>
        </Show>

        <Show when={isLoading() && !translatedText()}>
          <div class="flex justify-center items-center mt-4">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default Translator;