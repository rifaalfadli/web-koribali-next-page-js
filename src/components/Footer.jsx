import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="footer-brand-container">
            <Link href="/">
              <img
                src="/images/logo-koribali.png"
                alt="logo koribali"
                width="100px"
                className="footer-logo-kb"
              />
            </Link>

            <div className="footer-mitra">
              <h3>Mitra Utama:</h3>
              <div className="mitra-logo">
                <Link
                  href="https://www.ypole.co.jp/english/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/logo-yp.png" alt="logo yoshimoto pole" />
                </Link>
                <Link
                  href="https://www.yspole.co.jp/index.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/logo-ys.png" alt="logo ys pole" />
                </Link>
              </div>
            </div>
          </div>

          <div className="sosmed-icons">
            <Link href="#">
              <img src="/images/instagram-logo.svg" alt="icon ig" />
            </Link>
            <Link href="#">
              <img src="/images/linkedin-logo.svg" alt="icon linkedin" />
            </Link>
            <Link href="#">
              <img src="/images/twitter-logo.svg" alt="icon twitter" />
            </Link>
            <Link href="#">
              <img src="/images/tiktok-logo.svg" alt="icon tiktok" />
            </Link>
            <Link href="#">
              <img src="/images/youtube-logo.svg" alt="icon youtube" />
            </Link>
          </div>
        </div>

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

      <div className="footer-bottom">
        <p>
          Have questions or feedback? Email us at{" "}
          <Link href="mailto:cv.koribali@gmail.com">cv.koribali@gmail.com</Link>
        </p>
        <p>&copy; 2025 CV. KORI BALI. All rights reserved.</p>
      </div>
    </footer>
  );
}
