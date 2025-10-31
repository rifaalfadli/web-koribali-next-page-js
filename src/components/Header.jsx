import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  // Update otomatis kalau layar di-resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 960);
    handleResize(); // cek awal setelah komponen ter-mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ================================
  //  Tampilan untuk layar besar
  // ================================
  const DesktopHeader = () => (
    <header>
      <nav className="navbar">
        <input type="checkbox" id="menu" />
        <div className="navbar-logo">
          <div className="logo">
            <Link href="/">
              <img
                src="/images/logo-koribali.png"
                alt="logo koribali"
                width="100px"
                className="logo-koribali"
              />
            </Link>
            <div className="navbar-title">
              <Link href="/">
                <h1>
                  KORI<span>BALI</span>
                </h1>
              </Link>
            </div>
          </div>

          <label htmlFor="menu" className="icon-menu">
            <img src="/images/icon-menu.svg" alt="icon menu" />
          </label>
          <label htmlFor="menu" className="icon-close">
            <img src="/images/icon-close.svg" alt="icon close" />
          </label>
          <label htmlFor="menu" className="overlay"></label>
        </div>

        <div className="navbar-area">
          <div className="navbar-menu">
            <ul>
              <li>
                <Link href="/">Beranda</Link>
              </li>
              <li>
                <Link href="/struktur">Struktur Pegawai</Link>
              </li>
              <li>
                <Link href="/proyek">Proyek</Link>
              </li>
              <li>
                <Link href="/galeri">Galeri</Link>
              </li>
              <li>
                <Link href="/kontak">Kontak</Link>
              </li>
            </ul>
          </div>
          <ProfileMenu />
        </div>
      </nav>
    </header>
  );

  // ================================
  //  Tampilan untuk layar kecil
  // ================================
  const MobileHeader = () => (
    <header>
      <nav className="navbar">
        <input type="checkbox" id="menu" />
        <div className="navbar-logo">
          <div className="logo">
            <Link href="/">
              <img
                src="/images/logo-koribali.png"
                alt="logo koribali"
                width="100px"
                className="logo-koribali"
              />
            </Link>
            <div className="navbar-title">
              <Link href="/">
                <h1>
                  KORI<span>BALI</span>
                </h1>
              </Link>
            </div>
          </div>

          <div className="navbar-area">
            <div className="icon-navbar">
              <label htmlFor="menu" className="icon-menu">
                <img src="/images/icon-menu.svg" alt="icon menu" />
              </label>
              <label htmlFor="menu" className="icon-close">
                <img src="/images/icon-close.svg" alt="icon close" />
              </label>
              <label htmlFor="menu" className="overlay"></label>
            </div>
            <ProfileMenu />
          </div>
        </div>

        <div className="navbar-menu">
          <ul>
            <li>
              <Link href="/">Beranda</Link>
            </li>
            <li>
              <Link href="/struktur">Struktur Pegawai</Link>
            </li>
            <li>
              <Link href="/proyek">Proyek</Link>
            </li>
            <li>
              <Link href="/galeri">Galeri</Link>
            </li>
            <li>
              <Link href="/kontak">Kontak</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );

  // Render salah satu tergantung ukuran layar
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}
