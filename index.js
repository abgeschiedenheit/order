const postcss = require('postcss');

module.exports = {
  languages: [
    {
      name: "CSS",
      parsers: ["css"],
      extensions: [".css"],
      vscodeLanguageIds: ["css"],
    },
  ],
  parsers: {
    css: {
      parse: text => {
        // Use PostCSS to parse the CSS text into an AST
        const ast = postcss.parse(text);
        return ast;
      },
      astFormat: "css-ast",
    },
  },
  printers: {
    "css-ast": {
      print: (path, options, print) => {
        // Implement your custom printing logic here
        return customPrintFunction(path, options, print);
      }
    }
  },
  defaultOptions: {
    tabWidth: 2,
  },
};

function customPrintFunction(path, options, print) {
  console.log("Custom Print Function Called");
  const node = path.getValue();
  console.log("Node Properties:", node.nodes.map(n => n.prop));

  const groups = {
    behavior: ["cursor", "display", "position", "float", "clear", "visibility", "overflow", "white-space", "z-index", "overflow-x", "overflow-y"],
    shape: ["width", "height", "padding", "margin", "border", "border-radius", "border-width", "border-style", "border-color", "box-sizing"],
    font: ["font-family", "font-size", "font-weight", "font-style", "line-height", "text-align", "text-transform", "text-decoration", "color", "letter-spacing"],
    background: ["background", "background-color", "background-image", "background-repeat", "background-position", "background-size"],
    animation: ["transition", "animation", "animation-name", "animation-duration", "animation-timing-function", "animation-delay", "animation-iteration-count", "animation-direction"],
    layout: ["flex", "flex-basis", "flex-direction", "flex-grow", "flex-shrink", "flex-wrap", "justify-content", "align-items", "align-content", "align-self", "grid", "grid-template-columns", "grid-template-rows", "grid-auto-flow", "grid-gap", "grid-row-gap", "grid-column-gap", "grid-area", "grid-row", "grid-column"],
    miscellaneous: ["opacity", "filter", "clip", "clip-path", "mask"]
  };

  const orderedProps = [];
  const groupNames = Object.keys(groups);
  groupNames.forEach(group => {
    orderedProps.push(...groups[group]);
  });

  node.nodes.sort((a, b) => {
    const indexA = orderedProps.indexOf(a.prop) !== -1 ? orderedProps.indexOf(a.prop) : orderedProps.length;
    const indexB = orderedProps.indexOf(b.prop) !== -1 ? orderedProps.indexOf(b.prop) : orderedProps.length;
    return indexA - indexB;
  });

  let currentGroup = null;
  let result = '';
  node.nodes.forEach(prop => {
    const propGroup = groupNames.find(group => groups[group].includes(prop.prop));
    if (currentGroup !== propGroup) {
      if (result !== '') result += '\n';
      currentGroup = propGroup;
    }
    result += `${prop.prop}: ${prop.value};\n`;
  });

  console.log("Formatted Result:", result);
  return result.trim();
}

function testCustomPrintFunction() {
  const mockPath = {
    getValue: () => ({
      nodes: [
        { prop: 'display', value: 'inline-block' },
        { prop: 'padding', value: '12px 16px' },
        { prop: 'font-weight', value: 'bold' },
        { prop: 'white-space', value: 'nowrap' },
        { prop: 'cursor', value: 'pointer' },
        { prop: 'border-radius', value: '2px' },
        { prop: 'font-size', value: '12px' },
        { prop: 'text-align', value: 'center' }
      ]
    })
  };
  const output = customPrintFunction(mockPath, {}, console.log);
  console.log("Output:", output);
}

// Uncomment the following line to run the test function when the file is executed directly
testCustomPrintFunction();