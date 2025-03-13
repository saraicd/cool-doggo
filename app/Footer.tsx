import BehanceIcon from "./../public/behance.svg";
import LinkedinIcon from "./../public/linkedin.svg";
import GitHubIcon from "./../public/gitHub.svg";

export default function Footer(){

  return (
    <footer className="fixed bottom-0 left-0 w-full shadow-md flex gap-6 flex-wrap items-center justify-center py-4">
      <div className="text-center mt-4">
        <p className="text-xs text-black-600">Created by Sara Domingues</p>
        <p className="text-xs text-gray-600">Web Developer and Illustrator</p>
      </div>
      <a
        href="https://www.behance.net/GuidaSMoranes"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 image"
        aria-label="Behance"
      >
        <BehanceIcon/>
      </a>
      <a
        href="https://www.linkedin.com/in/sara-domingues-b73b8985/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 image"
        aria-label="Linkedin"
      >
        <LinkedinIcon/>
      </a>
      <a
        href="https://github.com/saraicd/cool-doggo/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 image"
        aria-label="GitHub"
      >
        <GitHubIcon/>
      </a>
    </footer>
  )
}