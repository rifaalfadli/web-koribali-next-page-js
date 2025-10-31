import Link from "next/link";

export default function Sidebar() {
  return (
    <aside>
      <h4>Perkenalan Proyek</h4>
      <ul>
        <li>
          <Link href="/proyek/proyek-2d">Proyek 2D</Link>
        </li>
        <li>
          <Link href="/proyek/proyek-3d">Proyek 3D</Link>
        </li>
        <li>
          <Link href="/proyek/proyek-vba">Proyek VBA</Link>
        </li>
        <li>
          <Link href="/proyek/proyek-rendering">Proyek Rendering</Link>
        </li>
      </ul>
    </aside>
  );
}
