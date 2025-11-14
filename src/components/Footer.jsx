import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="footer-brand-container">
            {/* Logo Kori Bali */}
            <Link href="/" className="logo-koribali-box">
              <img
                src="/images/logo-koribali.png"
                alt="logo koribali"
                className="footer-logo-kb"
              />
            </Link>

            {/* Mitra Utama */}
            <div className="footer-mitra">
              <h3>Mitra Utama:</h3>
              <div className="mitra-logo">
                <Link
                  href="https://www.ypole.co.jp/english/"
                  target="_blank"
                  rel="noreferrer"
                  className="mitra-box"
                >
                  <img src="/images/logo-yp.png" alt="logo yoshimoto pole" />
                </Link>
                <Link
                  href="https://www.yspole.co.jp/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="mitra-box"
                >
                  <img src="/images/logo-ys.png" alt="logo ys pole" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sosial Media */}
          <div className="sosmed-icons">
            <Link href="#" className="icon-box ig">
              <Instagram />
            </Link>
            <Link href="#" className="icon-box">
              <Linkedin />
            </Link>
            <Link href="#" className="icon-box">
              <Twitter />
            </Link>
            <Link href="#" className="icon-box yt">
              <Youtube />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <ul>
            <li>
              <Link href="/">
                <h4>Beranda</h4>
              </Link>
            </li>
            <li>
              <Link href="/struktur">
                <h4>Struktur Pegawai</h4>
              </Link>
            </li>
            <li>
              <Link href="/proyek">
                <h4>Proyek</h4>
              </Link>
              <ol>
                <li>
                  <Link href="/proyek/proyek-2D">Proyek 2D</Link>
                </li>
                <li>
                  <Link href="/proyek/proyek-3D">Proyek 3D</Link>
                </li>
                <li>
                  <Link href="/proyek/proyek-VBA">Proyek VBA</Link>
                </li>
                <li>
                  <Link href="/proyek/proyek-rendering">Proyek Rendering</Link>
                </li>
              </ol>
            </li>
            <li>
              <Link href="/galeri">
                <h4>Galeri</h4>
              </Link>
            </li>
            <li>
              <Link href="/kontak">
                <h4>Kontak</h4>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="footer-email">
          <Mail className="mail-icon" />
          <span>
            Have questions or feedback? Email us at{" "}
            <Link href="mailto:cv.koribali@gmail.com">
              cv.koribali@gmail.com
            </Link>
          </span>
        </p>
        <p>&copy; 2025 CV. KORI BALI. All rights reserved.</p>
      </div>
    </footer>
  );
}
