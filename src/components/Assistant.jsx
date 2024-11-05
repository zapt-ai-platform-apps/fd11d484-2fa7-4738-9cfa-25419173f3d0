import { createSignal, onCleanup } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { Show } from 'solid-js/web';

function Assistant() {
  const [inputValue, setInputValue] = createSignal('');
  const [assistantResponse, setAssistantResponse] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [isRecording, setIsRecording] = createSignal(false);

  let recognition;
  let audio;

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('متصفحك لا يدعم ميزة التعرف على الصوت');
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInputValue(speechResult);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (inputValue()) {
        handleSendQuery();
      }
    };

    recognition.start();
  };

  const handleSendQuery = async () => {
    if (!inputValue()) return;
    setIsLoading(true);
    setAssistantResponse('');
    try {
      const response = await createEvent('chatgpt_request', {
        prompt: inputValue(),
        response_type: 'text',
      });

      setAssistantResponse(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = async () => {
    if (!assistantResponse()) return;
    setIsLoading(true);
    try {
      const response = await createEvent('text_to_speech', {
        text: assistantResponse(),
      });
      if (audio) {
        audio.pause();
        audio = null;
      }
      audio = new Audio(response);
      audio.play();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  onCleanup(() => {
    if (recognition) {
      recognition.stop();
    }
    if (audio) {
      audio.pause();
      audio = null;
    }
  });

  return (
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-orange-600 mb-4">مساعد الذكاء الاصطناعي</h2>
      <div class="space-y-4">
        <div class="flex items-center">
          <input
            type="text"
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent box-border text-gray-800"
            placeholder="اكتب سؤالك هنا..."
            value={inputValue()}
            onInput={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleVoiceInput}
            class={`ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              isRecording() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isRecording()}
          >
            🎤
          </button>
        </div>
        <div class="flex space-x-4 rtl:space-x-reverse">
          <button
            onClick={handleSendQuery}
            class={`flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              isLoading() || !inputValue() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading() || !inputValue()}
          >
            <Show when={!isLoading()} fallback="...جاري الإرسال">
              إرسال
            </Show>
          </button>
        </div>
        <Show when={assistantResponse()}>
          <div class="mt-4 bg-white p-4 rounded-lg shadow-md">
            <p class="text-gray-700 leading-relaxed">{assistantResponse()}</p>
          </div>
          <button
            onClick={handleTextToSpeech}
            class={`mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              isLoading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading()}
          >
            <Show when={!isLoading()} fallback="...جاري التحويل">
              استمع للإجابة
            </Show>
          </button>
        </Show>
      </div>
    </div>
  );
}

export default Assistant;