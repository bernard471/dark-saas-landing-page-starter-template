import InstagramIcon from "../assets/icons/insta.svg";
import XSocial from "../assets/icons/x-social.svg";
import TikTokIcon from "../assets/icons/tiktok.svg";
import YoutubeIcon from "../assets/icons/youtube.svg";
import Link from "next/link";



export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-center text-sm">© 2024 CyberPolice, Inc. All rights reserved.</div>
          <ul className="text-sm flex sm:flex-row justify-center gap-3">
            <li>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </Link>
            </li>
            <li>
              <Link href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                <XSocial />
              </Link>
            </li>
            <li>
              <Link href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                <TikTokIcon />
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <YoutubeIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
