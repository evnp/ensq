"use strict";
exports.__esModule = true;
var config = {
  elementSeparator: "-",
  conditionalSeparator: "--",
};
function ensq(nameEnum, elementEnum, conditionalEnum) {
  return function () {
    return {
      nameEnum: nameEnum,
      elementEnum: elementEnum,
      conditionalEnum: conditionalEnum,
    };
  };
}
exports["default"] = ensq;
function omitEnumReverseMappings(enumObj) {
  return !enumObj
    ? enumObj
    : Object.fromEntries(
        Object.entries(enumObj)
          .filter(function (_a) {
            var key = _a[0];
            return !Number.isInteger(Number(key));
          })
          .map(function (_a) {
            var key = _a[0],
              val = _a[1];
            return [key, Number.isInteger(Number(val)) ? null : val];
          })
      );
}
ensq.configure = function (configUpdate) {
  Object.assign(config, configUpdate);
};
