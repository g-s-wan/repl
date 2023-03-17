import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import "../styles/App.css";

import {prepareFetchMock} from "./setupMock"

describe("load_file command", () => {
  
    test("load_file with no specied filepath gives error", async () => {
      render(<App />);
  
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "mode verbose" );
      await userEvent.click(screen.getByRole('button'));
  
      const filePath = 'data/testFile';
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "load_file" );
      await userEvent.click(screen.getByRole('button'));
  
      expect(screen.getByRole("history")).toContainHTML("Command: load_file");
      expect(screen.getByRole("history")).toContainHTML("Output: (Error) Please include a filepath when using the load_file command.");
    })
  
    test("successful load_file", async () => {
      render(<App />);
  
      prepareFetchMock({
        result: "success",
        filepath: "data/testFile",
        message: "Successfully loaded data/testFile"
      });
      
      const filePath = 'data/testFile';
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "load_file " + `${filePath}`);
      await userEvent.click(screen.getByRole('button'));
  
      expect(fetch).toHaveBeenCalledWith('http://localhost:3232/loadcsv?filepath=' + `${filePath}`);
      expect(screen.getByRole("history")).toContainHTML(`Successfully loaded ${filePath}`);
    })
  
    test("load_file: file not in ./data subfolder", async () => {
      render(<App />);
  
      const filePath = 'testFile';
      const allowedPath = "./data";
  
      const expectedResponse = {
          result: "error_bad_request",
          filepath: filePath,
          message: "File access denied. You tried to access " + filePath + " but only files in "
          + allowedPath + " are permitted."
       }
  
      prepareFetchMock(expectedResponse);
      
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "load_file " + `${filePath}`);
      await userEvent.click(screen.getByRole('button'));
  
      expect(fetch).toHaveBeenCalledWith('http://localhost:3232/loadcsv?filepath=' + `${filePath}`);
      expect(screen.getByRole("history")).toContainHTML(`An error occurred while loading the file: ${expectedResponse.message}`);
    })
  
    test("load_file: file does not exist", async () => {
      render(<App />);
  
      const filePath = 'data/testFile';
  
      const expectedResponse = {
          result: "error_bad_request",
          filepath: filePath,
          message: "Could not find a file associated with the provided filepath. Did you make a typo?"
       }
  
      prepareFetchMock(expectedResponse);
      
      const inputBox = screen.getByRole('input');
      await userEvent.click(inputBox);
      await userEvent.type(inputBox, "load_file " + `${filePath}`);
      await userEvent.click(screen.getByRole('button'));
  
      expect(fetch).toHaveBeenCalledWith('http://localhost:3232/loadcsv?filepath=' + `${filePath}`);
      expect(screen.getByRole("history")).toContainHTML(`An error occurred while loading the file: ${expectedResponse.message}`);
    })
   })