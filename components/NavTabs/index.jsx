import Link from 'next/link';

export function NavTabs() {
  return (
    <nav className="nav-tabs">
      <Link href="/">
        <a className="nav-tabs__link">Home</a>
      </Link>
      <Link href="/covid-testing-sites">
        <a className="nav-tabs__link">Covid Testing Sites</a>
      </Link>
    </nav>
  );
}
