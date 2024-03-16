import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import Logo from "../assets/LogoSVG1-cropped.svg";

const MyFooter = () => {
  return (
    <Footer container className="myfont">
      <div className="w-full text-center myfont pt-3">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand src={Logo} alt="Logo" className="ms-5" />
          <FooterLinkGroup>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Lavora con noi</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Le Barbier de Rue™" year={2024} />
      </div>
    </Footer>
  );
};
export default MyFooter;
