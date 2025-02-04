import BehanceIcon from "./../public/behance.svg";
import LinkedinIcon from "./../public/linkedin.svg";

export default function Footer(){

  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <div className="text-center mt-4">
        <p className="text-sm text-black-600">Created by Sara Domingues</p>
        <p className="text-sm text-gray-600">Web Developer and Illustrator</p>
      </div>
      <a
        href="https://www.behance.net/GuidaSMoranes"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 image "
      >
        <BehanceIcon/>
      </a>
      <a
        href="https://www.linkedin.com/in/sara-domingues-b73b8985/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 image"
      >
        <LinkedinIcon/>
      </a>
    </footer>
  )
}