import { NextResponse } from "next/server";

// daftar halaman yang boleh diakses tanpa login
const publicRoutes = ["/login", "/register"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // kalau halaman publik, lewatin aja
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ambil cookie
  const userCookie = req.cookies.get("user")?.value;

  // kalau gak ada cookie, arahkan ke /login
  if (!userCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const parsedUser = JSON.parse(userCookie);
    const userId = parsedUser?.id;

    // validasi ke server dummy (ubah ke server kamu nanti)
    const res = await fetch("http://localhost:5000/anggota");
    const data = await res.json();

    // cek apakah id user valid di database
    const validUser = data.find((u) => u.id === userId);

    if (!validUser) {
      // hapus cookie biar gak dipakai lagi
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("user");
      return response;
    }

    // kalau lolos validasi, izinkan akses
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("user");
    return response;
  }
}

// jalankan middleware di semua route (kecuali asset)
export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
