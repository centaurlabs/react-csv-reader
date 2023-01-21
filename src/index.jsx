import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as PapaParse from 'papaparse';

const CSVReader = React.forwardRef(({ accept = '.csv, text/csv', cssClass = 'csv-reader-input', cssInputClass = 'csv-input', cssLabelClass = 'csv-label', fileEncoding = 'UTF-8', inputId = 'react-csv-reader-input', inputName = 'react-csv-reader-input', inputStyle = {}, label, onError = () => { }, onFileLoaded, parserOptions = {}, disabled = false, strict = false, }, inputRef) => {
  const handleChangeFile = (e) => {
    let reader = new FileReader();
    const files = e.target.files;
    if (files.length > 0) {
      const fileInfo = {
        name: files[0].name,
        size: files[0].size,
        type: files[0].type,
      };
      if (strict && accept.indexOf(fileInfo.type) <= 0) {
        onError(new Error(`[strict mode] Accept type not respected: got '${fileInfo.type}' but not in '${accept}'`));
        return;
      }
      reader.onload = (_event) => {
        var _a;
        const csvData = PapaParse.parse(reader.result, Object.assign(parserOptions, {
          error: onError,
          encoding: fileEncoding,
        }));
        onFileLoaded((_a = csvData === null || csvData === void 0 ? void 0 : csvData.data) !== null && _a !== void 0 ? _a : [], fileInfo, files[0]);
      };
      reader.readAsText(files[0], fileEncoding);
    }
  };
  return (React.createElement("div", { className: cssClass },
    label && (React.createElement("label", { className: cssLabelClass, htmlFor: inputId }, label)),
    React.createElement("input", { className: cssInputClass, type: "file", id: inputId, name: inputName, style: inputStyle, accept: accept, onChange: handleChangeFile, disabled: disabled, ref: inputRef })));
});

CSVReader.propTypes = {
  accept: PropTypes.string,
  cssClass: PropTypes.string,
  cssInputClass: PropTypes.string,
  cssLabelClass: PropTypes.string,
  fileEncoding: PropTypes.string,
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  inputStyle: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onError: PropTypes.func,
  onFileLoaded: PropTypes.func.isRequired,
  parserOptions: PropTypes.object,
  disabled: PropTypes.bool,
  strict: PropTypes.bool,
};

export default CSVReader;
