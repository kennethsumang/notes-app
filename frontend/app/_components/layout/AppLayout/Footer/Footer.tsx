import Link from "next/link";

const Footer: React.FC = function () {
  return (
    <>
      <span>{`© Kenneth Sumang, ${new Date().getFullYear()}`}</span>
      <span>
        Made with ❤️ using{" "}
        <Link href="https://mantine.dev/" target="_blank">
          Mantine
        </Link>
      </span>
    </>
  );
}

export default Footer;