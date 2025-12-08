import { render, screen } from "@testing-library/react";
import Footer from "../app/Footer";
import "@testing-library/jest-dom";

// Mock the SVG icons
jest.mock("../public/behance.svg", () => () => (
  <svg data-testid="behance-icon" />
));
jest.mock("../public/linkedin.svg", () => () => (
  <svg data-testid="linkedin-icon" />
));
jest.mock("../public/gitHub.svg", () => () => (
  <svg data-testid="github-icon" />
));

describe("Footer Component", () => {
  it("renders the footer element", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders all social media icon links", () => {
    render(<Footer />);

    const behanceLink = screen.getByRole("link", { name: /behance/i });
    expect(behanceLink).toHaveAttribute(
      "href",
      "https://www.behance.net/GuidaSMoranes"
    );
    expect(behanceLink).toHaveAttribute("target", "_blank");
    expect(behanceLink).toHaveAttribute("rel", "noopener noreferrer");

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/sara-domingues-b73b8985/"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/saraicd/cool-doggo/"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders exactly three social media links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });
});
