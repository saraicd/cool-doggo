import { render, screen } from "@testing-library/react";
import Footer from "../app/Footer";
import "@testing-library/jest-dom";

// Mock the SVG icons
jest.mock("../public/behance.svg", () => () => <svg data-testid="behance-icon" />);
jest.mock("../public/linkedin.svg", () => () => <svg data-testid="linkedin-icon" />);

describe("Footer Component", () => {
  it("renders the creator's name", () => {
    render(<Footer />);
    expect(screen.getByText("Created by Sara Domingues")).toBeInTheDocument();
  });

  it("renders the Web Developer and Illustrator text", () => {
    render(<Footer />);
    expect(screen.getByText("Web Developer and Illustrator")).toBeInTheDocument();
  });

  it("renders the Behance and LinkedIn links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /behance/i })).toHaveAttribute(
      "href",
      "https://www.behance.net/GuidaSMoranes"
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/sara-domingues-b73b8985/"
    );
  });

});
