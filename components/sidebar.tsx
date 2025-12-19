'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/', icon: '🐨', label: 'Plan a Trip', exact: true, startsNewChat: true },
  { href: '/my-chats', icon: '💬', label: 'My Chats' },
  { href: '/my-trips', icon: '🎒', label: 'My Trips' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleNewChat = () => {
    // Navigate with a timestamp to trigger chat reset
    router.push(`/?new=${Date.now()}`);
  };

  return (
    <aside className="fixed left-0 top-0 w-[260px] h-screen bg-white border-r border-gray-200 p-10 flex flex-col z-50">
      <button
        onClick={handleNewChat}
        className="flex items-center gap-3 mb-12 hover:opacity-80 transition-opacity text-left"
      >
        <span className="text-[32px] animate-wave">🐨</span>
        <span className="font-[family-name:var(--font-family-serif)] text-[26px] font-semibold text-[#4a4a4a]">
          Koatrip
        </span>
      </button>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) =>
          item.startsNewChat ? (
            <button
              key={item.href}
              onClick={handleNewChat}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all text-left ${
                isActive(item.href, item.exact)
                  ? 'bg-[#7c9885] text-white'
                  : 'text-[#4a4a4a] hover:bg-[#faf8f4] hover:text-[#7c9885]'
              }`}
            >
              <span className="text-[20px]">{item.icon}</span>
              {item.label}
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                isActive(item.href, item.exact)
                  ? 'bg-[#7c9885] text-white'
                  : 'text-[#4a4a4a] hover:bg-[#faf8f4] hover:text-[#7c9885]'
              }`}
            >
              <span className="text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
