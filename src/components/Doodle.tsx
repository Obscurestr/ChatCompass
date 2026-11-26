// Hand-drawn doodle icons: felt-tip ink lines, slightly uneven, on a blush circle.
// Decorative only (aria-hidden); meaning always comes from the text next to them.

type DoodleName = "chat" | "heart" | "phone";

const paths: Record<DoodleName, React.ReactNode> = {
  // Speech bubble with three dots, and a small magnifier peeking over its corner.
  chat: (
    <>
      <path d="M13.5 18.2c.1-4.3 3-7.1 7.4-7.2l21.9-.2c4.6 0 7.7 3 7.6 7.4l-.2 13.2c0 4.4-3.1 7.3-7.5 7.3H29.3l-8.1 7.1c-1 .9-2.4.2-2.1-1.1l1.1-6.1h-.9c-3.9-.1-6.1-3.1-6.1-6.9z" />
      <circle cx="24" cy="25" r="1.7" fill="currentColor" />
      <circle cx="32.2" cy="24.8" r="1.7" fill="currentColor" />
      <circle cx="40.3" cy="25.1" r="1.7" fill="currentColor" />
      <circle cx="45" cy="42.5" r="7.4" fill="var(--color-paper)" />
      <path d="M50.4 48.1l5.3 5.6" />
    </>
  ),
  heart: (
    <path d="M32.3 50.5C22 43.6 14.6 36.6 14.4 27.4c-.1-5.6 4-9.9 9.2-9.8 3.8.1 6.6 2.4 8.4 5.6 1.9-3.3 4.9-5.7 8.7-5.6 5.2.2 9 4.6 8.8 10-.4 9.3-7.6 16-17.2 22.9z" />
  ),
  phone: (
    <path d="M21.6 13.8l5.2-.6c1 0 1.8.5 2.1 1.4l2.4 7.3c.3 1-.1 2-.9 2.5l-3.6 2.4c2 4.6 5.6 8.5 10.3 10.8l2.6-3.4c.6-.8 1.7-1.1 2.6-.7l7.2 2.8c.9.4 1.4 1.3 1.3 2.2l-.8 5.2c-.2 1.3-1.3 2.2-2.6 2.2-15.6-.6-27.9-13.4-28.1-29.1 0-1.3.9-2.4 2.3-3z" />
  ),
};

export default function Doodle({
  name,
  size = 88,
  className = "",
}: {
  name: DoodleName;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid place-items-center rounded-full bg-blush text-ink ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size * 0.68}
        height={size * 0.68}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name]}
      </svg>
    </span>
  );
}
