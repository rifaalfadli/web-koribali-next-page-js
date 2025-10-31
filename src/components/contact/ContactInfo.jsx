import Link from "next/link";

export const ContactInfo = () => {
  const infoList = [
    {
      icon: "/images/icon-office.svg",
      title: "Kantor Pusat",
      text: "Jl. Gunung Kerinci No. 22, Denpasar, Bali",
    },
    {
      icon: "/images/icon-address.svg",
      title: "Kantor Cabang",
      text: "Jl. Haur Jaya 2 No. 16, Kel. Tanah Sareal, Kota Bogor",
    },
    {
      icon: "/images/icon-mail.svg",
      title: "Email",
      text: (
        <Link href="mailto:cv.koribali@gmail.com">cv.koribali@gmail.com</Link>
      ),
    },
    {
      icon: "/images/icon-telephone.svg",
      title: "Telepon",
      text: <Link href="#">0853 3359 6000</Link>,
    },
  ];

  return (
    <>
      {infoList.map((item, i) => (
        <article key={i}>
          <img src={item.icon} alt={`icon ${item.title}`} />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </>
  );
};
