import { FaCcMastercard, FaCcVisa, FaXTwitter } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
import { FaFacebook, FaAmazon, FaTiktok } from "react-icons/fa";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:gap-28">
          <div className="flex flex-col gap-2">
            <Logo size="small" />
            <div className="text-4xl font-bold">GENTEL GEN</div>
            <ul className="flex gap-2">
              <li>
                <FaXTwitter />
              </li>
              <li>
                <CiInstagram />
              </li>
              <li>
                <FaTiktok />
              </li>
              <li>
                <FaAmazon />
              </li>
              <li>
                <FaFacebook />
              </li>
            </ul>
            <div className="w-full text-sm md:w-[22rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At
              tempora neque quis repellendus temporibus excepturi aliquam modi.
              Nulla laudantium facilis, natus neque ea dolorem laborum doloribus
              dolores, quae impedit nemo.
            </div>
          </div>
          <div className="jsutify-start flex grow flex-row items-end gap-10 md:flex-col md:justify-end">
            <ul>
              <li>Address</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
            <ul>
              <li>Address</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
            <ul>
              <li>Address</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between md:flex-row">
          <div>&copy; All rights reserved</div>
          <div>
            <ul className="flex gap-2">
              <li>
                <FaCcVisa />
              </li>
              <li>
                <FaCcMastercard />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
