# XmlJson

XML to JSON, JSON to XML converter/parser

## Installation
```html
<script type="text/javascript" src="../xml-json.js"></script>
```

## Usage

```javascript
/**
 * Parsing an XML string to JSON
 * @param {string} xmlString
 * @param {boolean} returnObject - return XMLDocument object or XML string
 * @returns {string|object}
 */
XmlJson.xmlStringToJson(xmlString); // object
XmlJson.xmlStringToJson(xmlString, false); // string
```
```javascript
/**
 * Parsing an XMLDocument to JSON
 * @param {object} xmlObject
 * @param {boolean} returnObject - return XMLDocument object or XML string
 * @returns {string|object}
 */
XmlJson.xmlObjectToJson(xmlObject); // object
XmlJson.xmlObjectToJson(xmlObject, false); // string
```
```javascript
/**
 * Parsing an JSON string to XML
 * @param {string} jsonString
 * @param {boolean} returnObject - return XMLDocument object or XML string
 * @returns {string|object}
 */
XmlJson.jsonStringToXml(jsonString); // object
XmlJson.jsonStringToXml(jsonString, false); // string
```
```javascript
/**
 * Parsing an JSON object to XML
 * @param {object} jsonObject
 * @param {boolean} returnObject - return XMLDocument object or XML string
 * @returns {string|object}
 */
XmlJson.jsonObjectToXml(jsonObject); // object
XmlJson.jsonObjectToXml(jsonObject, false); // string
```

## Example
Parsing an XML string to JSON
```javascript
const xmlString = "<catalog><book></book><book></book></catalog>";
// Parsing into json object
const jsonObject = XmlJson.xmlStringToJson(xmlString);
// Parsing into json string
const jsonString = XmlJson.xmlStringToJson(xmlString, false);
```

Parsing an JSON object to XML
```javascript
const jsonObject = 
{
  catalog: {
    book: [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ]
  }
};

// Parsing into xml object
const xmlObject = XmlJson.jsonObjectToXml(jsonObject);
// Parsing into xml string
const xmlString = XmlJson.jsonObjectToXml(jsonObject, false);
```




































