import ReactDOM from "react-dom";
import App from "../src/components/App";

const isValidValue = element => {
  return !["checkbox", "radio"].includes(element.type) || element.checked;
};

const isValidElement = element => {
  return element.name && element.value;
};

const isCheckbox = element => element.type === "checkbox";

const isMultiSelect = element => element.options && element.multiple;

const getSelectValues = options =>
  [].reduce.call(
    options,
    (values, option) => {
      return option.selected ? values.concat(option.value) : values;
    },
    []
  );

const formToJSON = elements =>
  [].reduce.call(
    elements,
    (data, element) => {
      data[element.name] = element.value;

      // Make sure the element has the required properties.
      if (isValidElement(element)) {
        data[element.name] = element.value;
      }
      // Make sure the element has the required properties and should be added.
      if (isValidElement(element) && isValidValue(element)) {
        data[element.name] = element.value;
      }
      // Make sure the element has the required properties and should be added.
      if (isValidElement(element) && isValidValue(element)) {
        if (isCheckbox(element)) {
          data[element.name] = (data[element.name] || []).concat(element.value);
        } else if (isMultiSelect(element)) {
          data[element.name] = getSelectValues(element);
        } else {
          data[element.name] = element.value;
        }
      }

      return data;
    },
    {}
  );
const handleFormSubmit = event => {
  console.log("executing script");
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();
  // Call our function to get the form data.
  const data = formToJSON(form.elements);
  // Demo only: print the form data onscreen as a formatted JSON object.
  //   const dataContainer = document.getElementsByClassName("results__display")[0];
  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  const dataContainer = JSON.stringify(data, null, "  ");
  console.log(dataContainer.textContent, "     ", dataContainer);
  // ...this is where we’d actually do something with the form data...
};
// const form = document.getElementsByClassName("contact-form")[0];
const form = ReactDOM.findDOMNode(App)
  .document.getElementsByClassName("contact-form")[0]
  .addEventListener("submit", handleFormSubmit);
