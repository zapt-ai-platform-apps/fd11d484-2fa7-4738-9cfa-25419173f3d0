import { createSignal, onMount, Show, For } from 'solid-js';

function RadioPlayer() {
  const [countries, setCountries] = createSignal([]);
  const [stations, setStations] = createSignal([]);
  const [selectedCountry, setSelectedCountry] = createSignal('');
  const [selectedStation, setSelectedStation] = createSignal(null);
  const [isLoadingCountries, setIsLoadingCountries] = createSignal(false);
  const [isLoadingStations, setIsLoadingStations] = createSignal(false);
  const [isPlaying, setIsPlaying] = createSignal(false);

  let audio;

  onMount(async () => {
    fetchCountries();
  });

  const fetchCountries = async () => {
    setIsLoadingCountries(true);
    try {
      const response = await fetch('https://de1.api.radio-browser.info/json/countries');
      const data = await response.json();
      const arabicCountries = data.filter(country => isArabicCountry(country.name));
      setCountries(arabicCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setIsLoadingCountries(false);
    }
  };

  const isArabicCountry = (countryName) => {
    const arabicCountriesList = [
      'Algeria',
      'Bahrain',
      'Comoros',
      'Djibouti',
      'Egypt',
      'Iraq',
      'Jordan',
      'Kuwait',
      'Lebanon',
      'Libya',
      'Mauritania',
      'Morocco',
      'Oman',
      'Palestine',
      'Qatar',
      'Saudi Arabia',
      'Somalia',
      'Sudan',
      'Syria',
      'Tunisia',
      'United Arab Emirates',
      'Yemen',
    ];
    return arabicCountriesList.includes(countryName);
  };

  const fetchStations = async (country) => {
    setIsLoadingStations(true);
    setStations([]);
    setSelectedStation(null);
    setIsPlaying(false);
    try {
      const response = await fetch(
        `https://de1.api.radio-browser.info/json/stations/bycountry/${encodeURIComponent(country)}`
      );
      const data = await response.json();
      const filteredStations = data.filter(station => station.language.includes('arabic'));
      setStations(filteredStations);
    } catch (error) {
      console.error('Error fetching stations:', error);
    } finally {
      setIsLoadingStations(false);
    }
  };

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    fetchStations(country);
  };

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if (audio) {
      audio.pause();
      audio = null;
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (!selectedStation()) return;
    if (isPlaying()) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio = new Audio(selectedStation().url_resolved);
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div class="mt-8 w-full">
      <h2 class="text-2xl font-bold text-orange-600 mb-4">الراديو العربي</h2>
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse">
          <label class="font-semibold text-gray-700">اختر الدولة:</label>
          <select
            value={selectedCountry()}
            onChange={handleCountryChange}
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent cursor-pointer"
          >
            <option value="">-- يرجى الاختيار --</option>
            <For each={countries()}>
              {(country) => <option value={country.name}>{country.name}</option>}
            </For>
          </select>
        </div>

        <Show when={isLoadingCountries()}>
          <div class="flex justify-center items-center mt-4">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </Show>

        <Show when={stations().length > 0}>
          <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse">
            <label class="font-semibold text-gray-700">اختر المحطة:</label>
            <select
              value={selectedStation()?.stationuuid || ''}
              onChange={(e) =>
                handleStationSelect(stations().find((s) => s.stationuuid === e.target.value))
              }
              class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent cursor-pointer"
            >
              <option value="">-- يرجى الاختيار --</option>
              <For each={stations()}>
                {(station) => (
                  <option value={station.stationuuid}>{station.name}</option>
                )}
              </For>
            </select>
          </div>
        </Show>

        <Show when={isLoadingStations()}>
          <div class="flex justify-center items-center mt-4">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </Show>

        <Show when={selectedStation()}>
          <div class="mt-4 flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={handlePlayPause}
              class={`px-6 py-3 ${
                isPlaying() ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer`}
            >
              {isPlaying() ? 'إيقاف' : 'تشغيل'}
            </button>
            <p class="font-semibold text-gray-700">{selectedStation().name}</p>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default RadioPlayer;