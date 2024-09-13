import { toHTML } from '../../utils/to-html';
import { getComponentSpec } from '../../component-specs.js';
import { checkboxAttribute } from './checkbox-attribute';
import { selectAttribute } from './select-attribute';
import { textAttribute } from './text-attribute';

export const createAttributeGroup = (parent, astNode, renderCallback) => {
  const elementName = astNode.nodeName;
  const element = toHTML(`
        <div class="attribute-group">
            <div class="title">${elementName}</div>
        </div>`);

  parent.appendChild(element);

  const attributes = getComponentSpec(elementName).attributes || [];
  Object.entries(attributes).forEach(([name, type]) => {
    const handler = handlerFor(type);
    if (handler) {
      handler(name, astNode, element, renderCallback);
    } else {
      console.error('Found attribute type with no implemented renderer: ', {
        elementName,
        attributeName: name,
        attributeType: type
      });
    }
  });
};

function handlerFor(type) {
  if (type instanceof Array) {
    return selectAttribute.bind(null, type);
  } else if (type == 'text') {
    return textAttribute;
  } else if (type == 'checkbox') {
    return checkboxAttribute;
  }
}
