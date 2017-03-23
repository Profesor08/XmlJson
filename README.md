# XmlJson

Parsing XML into JSON object

## Installation
```html
<script type="text/javascript" src="../xml-json.js"></script>
```

## Usage

```javascript
const xmlString = "<catalog><book></book><book></book></catalog>";
const json1 = XmlJson.parseFromXmlString(xmlString);
```

```javascript
const xmlString = "<catalog><book></book><book></book></catalog>";
const xmlObject = new DOMParser().parseFromString(xmlString, "text/xml");
const json2 = XmlJson.parseFromXmlObject(xmlObject);
```
