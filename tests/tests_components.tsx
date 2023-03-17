import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../src/components/Header";
import HistoryBox from "../src/components/HistoryBox";
import InputBox from "../src/components/InputBox";
import App from "../src/App";
import "../styles/App.css";

/** 
 *   SPRINT-2 LIKE TESTS
 */
describe("Page loading works as expected", () => {
  test("Page has required elements", async () => {
    render(<App />);
    
    // Check we have a History box
    expect(screen.getByRole("history")).toBeInTheDocument();

    // Check we have an inout box
    expect(screen.getByRole("input")).toBeInTheDocument();

    // Check we have an inout box
    expect(screen.getByRole("button")).toBeInTheDocument();

    // Check that the History box is empty
    expect(screen.getByRole("history")).toBeEmptyDOMElement();

    // Check that the input box is empty
    expect(screen.getByRole("input")).toBeEmptyDOMElement();

    // Check that the button has the correct label
    expect(screen.getByRole("button")).toContainHTML("button")

    expect(screen.getByText(/REPL/i)).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();

  })

  test("Header has required elements", async () => {
    render(<Header />);
      
    expect(screen.getByText(/REPL/i)).toBeInTheDocument();
  })

  test("HistoryBox has required elements", async () => {
    render(<HistoryBox history={[]}/>);
      
    // Check we have a History box
    expect(screen.getByRole("history")).toBeInTheDocument();

    // Check that the History box is empty
    expect(screen.getByRole("history")).toBeEmptyDOMElement();
    
  })

  test("InputBox has required elements", async () => {
    function handleFunc() {};
    function setTextFunc(txt: string){};

    render(
      <InputBox  
        handle={handleFunc}
        text={""}
        setText={setTextFunc}/>
      );
      
    // Check that the input box is empty
    expect(screen.getByRole("input")).toBeEmptyDOMElement();

    // Check that the button has the correct label
    expect(screen.getByRole("button")).toContainHTML("button")

    expect(screen.getByText("Submit")).toBeInTheDocument();
    
  })

})
