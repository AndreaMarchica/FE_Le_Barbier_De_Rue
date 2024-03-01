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
    <Footer container>
      <div className="w-full text-center myfont">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand src={Logo} alt="Logo" />
          <FooterLinkGroup>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Flowbite™" year={2022} />
      </div>
    </Footer>
  );
};
export default MyFooter;
