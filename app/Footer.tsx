import BehanceIcon from "./../public/behance.svg";
import LinkedinIcon from "./../public/linkedin.svg";
import GitHubIcon from "./../public/gitHub.svg";

export default function Footer() {
  return (
    <footer className=" bottom-0 left-0 w-full flex gap-6 flex-wrap items-center justify-center py-4">
      <a
        href="https://www.behance.net/GuidaSMoranes"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 image"
        aria-label="Behance"
      >
        <BehanceIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/sara-domingues-b73b8985/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 image"
        aria-label="Linkedin"
      >
        <LinkedinIcon />
      </a>
      <a
        href="https://github.com/saraicd/cool-doggo/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 image"
        aria-label="GitHub"
      >
        <GitHubIcon />
      </a>
    </footer>
  );
}
