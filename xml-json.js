/**
 * Created by Profesor08 on 23.03.2017.
 */

function XmlJson()
{
  /**
   * Iterating through Array or Object like Array.forEach
   * @param collection
   * @param callback
   */
  function foreach(collection, callback)
  {
    if (Array.isArray(collection))
    {
      for (let i = 0; i < collection.length; i++)
      {
        callback(collection[i], i, collection);
      }
    }
    else
    {
      for(let property in collection)
      {
        if (collection.hasOwnProperty(property))
        {
          callback(collection[property], property, collection);
        }
      }
    }
  }

  /**
   * Parsing Node Element into JSON object
   * @param node
   * @returns {{}}
   */
  function toJson(node)
  {
    let json = {};

    foreach(node.children, node =>
    {
      let parsed = {};

      parsed["@attributes"] = attributes(node);

      if (node.children.length)
      {
        parsed["@text"] = "";
      }
      else
      {
        parsed["@text"] = node.textContent;
      }

      /**
       * Just I want to see @attributes and @text on top.
       * If you don't like this, you can remove this and set [let parsed = parse(node)]
       */
      foreach(toJson(node), (obj, property) =>
      {
        parsed[property] = obj;
      });

      if (json.hasOwnProperty(node.nodeName))
      {
        if (!json[node.nodeName].length)
        {
          let tmp = json[node.nodeName];
          json[node.nodeName] = [tmp];
        }

        json[node.nodeName].push(parsed);
      }
      else
      {
        json[node.nodeName] = parsed;
      }
    });

    return json;
  }

  /**
   * Retrieving attributes from Node Element
   * @param node
   * @returns {{}}
   */
  function attributes(node)
  {
    let attributes = {};

    foreach(node.attributes, attribute =>
    {
      attributes[attribute.name] = attribute.value;
    });

    return attributes;
  }

  /**
   * Parsing JSON object to XMLDocument
   * @param json
   * @returns {*}
   */
  function toXml(json)
  {
    let xml = document.implementation.createDocument("", "", null);

    /**
     * Recursive creation of XML tree according to passed json object
     * @param root - parent node
     * @param json
     * @returns {*}
     */
    let parse = (root, json) =>
    {
      let properties = Object.keys(json);

      /**
       * Creating tree
       */
      foreach(properties, property =>
      {
        if (property == "@text") return;
        if (property == "@attributes") return;

        if (Array.isArray(json[property]))
        {
          foreach(json[property], obj =>
          {
            root.appendChild(parse(xml.createElement(property), obj));
          });
        }
        else
        {
          root.appendChild(parse(xml.createElement(property), json[property]));
        }
      });

      /**
       * Assign text
       */
      if (json.hasOwnProperty("@text"))
      {
        root.appendChild(xml.createTextNode(json["@text"]));
      }

      /**
       * Set node attributes
       */
      if (json.hasOwnProperty("@attributes"))
      {
        foreach(json["@attributes"], (value, attribute) =>
        {
          root.setAttribute(attribute, value);
        });
      }

      return root;
    };

    return parse(xml, json);
  }

  /**
   * Parsing an XML string to JSON
   * @param {string} xmlString
   * @param {boolean} returnObject - return XMLDocument object or XML string
   * @returns {*}
   */
  this.xmlStringToJson = function (xmlString, returnObject = true)
  {
    return this.xmlObjectToJson(new DOMParser().parseFromString(xmlString, "text/xml"), returnObject);
  };

  /**
   * Parsing an XMLDocument to JSON
   * @param {object} xmlObject
   * @param {boolean} returnObject - return XMLDocument object or XML string
   * @returns {*}
   */
  this.xmlObjectToJson = function (xmlObject, returnObject = true)
  {
    let json = toJson(xmlObject);

    if (returnObject)
    {
      return json;
    }

    return JSON.stringify(json);
  };

  /**
   * Parsing an JSON string to XML
   * @param {string} jsonString
   * @param {boolean} returnObject - return XMLDocument object or XML string
   * @returns {*}
   */
  this.jsonStringToXml = function (jsonString, returnObject = true)
  {
    return this.jsonObjectToXml(JSON.parse(jsonString), returnObject);
  };

  /**
   * Parsing an JSON object to XML
   * @param {object} jsonObject
   * @param {boolean} returnObject - return XMLDocument object or XML string, default true
   * @returns {*}
   */
  this.jsonObjectToXml = function (jsonObject, returnObject = true)
  {
    let xml = toXml(jsonObject);

    if (returnObject)
    {
      return xml;
    }

    return new XMLSerializer().serializeToString(xml);
  };
}


/**
 * Parsing an XML string to JSON
 * @param {string} xmlString
 * @param {boolean} returnObject - return XMLDocument object or XML string
 * @returns {string|object}
 */
XmlJson.xmlStringToJson = function (xmlString, returnObject = true)
{
  return new XmlJson().xmlStringToJson(xmlString, returnObject);
};

/**
 * Parsing an XMLDocument to JSON
 * @param {object} xmlObject
 * @param {boolean} returnObject - return XMLDocument object or XML string
 * @returns {string|object}
 */
XmlJson.xmlObjectToJson = function (xmlObject, returnObject = true)
{
  return new XmlJson().xmlObjectToJson(xmlObject, returnObject);
};

/**
 * Parsing an JSON string to XML
 * @param {string} jsonString
 * @param {boolean} returnObject - return XMLDocument object or XML string
 * @returns {string|object}
 */
XmlJson.jsonStringToXml = function (jsonString, returnObject = true)
{
  return new XmlJson().jsonStringToXml(jsonString, returnObject);
};

/**
 * Parsing an JSON object to XML
 * @param {object} jsonObject
 * @param {boolean} returnObject - return XMLDocument object or XML string
 * @returns {string|object}
 */
XmlJson.jsonObjectToXml = function (jsonObject, returnObject = true)
{
  return new XmlJson().jsonObjectToXml(jsonObject, returnObject);
};

