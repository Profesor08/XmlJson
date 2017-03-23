# XmlJson

## Parsing XML into JSON

### Usage:

#### Include into your html page
```html
<script type="text/javascript" src="../xml-json.js"></script>
```

```javascript
const xmlString = "<catalog><book></book><book></book></catalog>";
const json = XmlJson.parseFromXmlString(xmlString);
```

#### Or
```javascript
const xmlString = "<catalog><book></book><book></book></catalog>";
const xmlObject = new DOMParser().parseFromString(xmlString, "text/xml");
const json = XmlJson.parseFromXmlString(xmlString);
```
