import { createSignal } from 'solid-js';

function App() {
  const [category, setCategory] = createSignal('length');
  const [value, setValue] = createSignal('');
  const [fromUnit, setFromUnit] = createSignal('');
  const [toUnit, setToUnit] = createSignal('');
  const [result, setResult] = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(false);

  const units = {
    length: [
      { value: 'meter', label: 'متر' },
      { value: 'kilometer', label: 'كيلومتر' },
      { value: 'mile', label: 'ميل' },
      { value: 'foot', label: 'قدم' },
    ],
    weight: [
      { value: 'gram', label: 'غرام' },
      { value: 'kilogram', label: 'كيلوغرام' },
      { value: 'pound', label: 'باوند' },
      { value: 'ounce', label: 'أونصة' },
    ],
    temperature: [
      { value: 'celsius', label: 'درجة مئوية' },
      { value: 'fahrenheit', label: 'فهرنهايت' },
      { value: 'kelvin', label: 'كلفن' },
    ],
  };

  const convertValue = () => {
    setIsLoading(true);
    let inputValue = parseFloat(value());
    if (isNaN(inputValue)) {
      setResult('الرجاء إدخال رقم صالح.');
      setIsLoading(false);
      return;
    }
    let outputValue;
    // Simple conversion logic for demonstration
    if (category() === 'length') {
      if (fromUnit() === 'meter' && toUnit() === 'kilometer') {
        outputValue = inputValue / 1000;
      } else if (fromUnit() === 'kilometer' && toUnit() === 'meter') {
        outputValue = inputValue * 1000;
      } else if (fromUnit() === fromUnit() && toUnit() === toUnit()) {
        outputValue = inputValue;
      } else {
        outputValue = 'Conversion not supported.';
      }
    } else if (category() === 'weight') {
      if (fromUnit() === 'gram' && toUnit() === 'kilogram') {
        outputValue = inputValue / 1000;
      } else if (fromUnit() === 'kilogram' && toUnit() === 'gram') {
        outputValue = inputValue * 1000;
      } else if (fromUnit() === fromUnit() && toUnit() === toUnit()) {
        outputValue = inputValue;
      } else {
        outputValue = 'Conversion not supported.';
      }
    } else if (category() === 'temperature') {
      if (fromUnit() === 'celsius' && toUnit() === 'fahrenheit') {
        outputValue = (inputValue * 9) / 5 + 32;
      } else if (fromUnit() === 'fahrenheit' && toUnit() === 'celsius') {
        outputValue = ((inputValue - 32) * 5) / 9;
      } else if (fromUnit() === fromUnit() && toUnit() === toUnit()) {
        outputValue = inputValue;
      } else {
        outputValue = 'Conversion not supported.';
      }
    } else {
      outputValue = 'Conversion not supported.';
    }
    setResult(`النتيجة: ${outputValue}`);
    setIsLoading(false);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <main class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-purple-600 mb-6 text-center">تحويل</h1>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-4">
            <label class="block mb-2 font-semibold text-purple-600">اختر الفئة:</label>
            <select
              class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
              value={category()}
              onChange={(e) => {
                setCategory(e.target.value);
                setFromUnit('');
                setToUnit('');
                setResult(null);
              }}
            >
              <option value="length">الطول</option>
              <option value="weight">الوزن</option>
              <option value="temperature">درجة الحرارة</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block mb-2 font-semibold text-purple-600">القيمة:</label>
            <input
              type="number"
              class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              value={value()}
              onInput={(e) => setValue(e.target.value)}
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 font-semibold text-purple-600">من:</label>
              <select
                class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
                value={fromUnit()}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                <option value="">اختر وحدة</option>
                {units[category()].map((unit) => (
                  <option value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label class="block mb-2 font-semibold text-purple-600">إلى:</label>
              <select
                class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
                value={toUnit()}
                onChange={(e) => setToUnit(e.target.value)}
              >
                <option value="">اختر وحدة</option>
                {units[category()].map((unit) => (
                  <option value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            class={`w-full mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              isLoading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={convertValue}
            disabled={isLoading()}
          >
            {isLoading() ? 'جارٍ التحويل...' : 'تحويل'}
          </button>

          {result() && (
            <div class="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
              {result()}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;