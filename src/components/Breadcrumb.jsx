import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function Breadcrumb({ page }) {
  return (
    <nav className="breadcrumb">
      <ol className="container">
        <li>
          <Link href="/" className="breadcrumb-link">
            <Home size={16} strokeWidth={2} />
            <span>Beranda</span>
          </Link>
        </li>
        <li className="breadcrumb-separator">
          <ChevronRight size={14} strokeWidth={2} />
        </li>
        <li>{page}</li>
      </ol>
    </nav>
  );
}
