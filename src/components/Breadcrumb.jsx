import Link from "next/link";

export default function Breadcrumb({ page }) {
  return (
    <nav className="breadcrumb">
      <ol className="container">
        <li>
          <Link href="/">Beranda</Link>
        </li>
        <li>{page}</li>
      </ol>
    </nav>
  );
}
