import { AiFillYoutube, AiFillFacebook } from 'solid-icons/ai';
import { SiTelegram } from 'solid-icons/si';

function SocialLinks() {
  return (
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-orange-600 mb-4">تواصل معنا</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="https://t.me/echangetec"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        >
          <SiTelegram size={24} class="ml-2" />
          قناة تبادل المعلومات التقنية
        </a>
        <a
          href="https://t.me/Youness_be"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        >
          <SiTelegram size={24} class="ml-2" />
          مجموعتنا على Telegram
        </a>
        <a
          href="https://www.youtube.com/@echangetec"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        >
          <AiFillYoutube size={24} class="ml-2" />
          قناتنا على YouTube
        </a>
        <a
          href="https://www.facebook.com/groups/1802881706649541/?ref=share"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        >
          <AiFillFacebook size={24} class="ml-2" />
          مجموعتنا على Facebook
        </a>
      </div>
    </div>
  );
}

export default SocialLinks;