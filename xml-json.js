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
  function parseXml(node)
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
      foreach(parseXml(node), (obj, property) =>
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
   * Parsing an XML string to JSON object
   * @param xmlString
   */
  this.parseFromXmlString = function (xmlString)
  {
    return this.parseFromXmlObject(new DOMParser().parseFromString(xmlString, "text/xml"));
  };

  /**
   * Parsing an XMLDocument to JSON object
   * @param xmlObject
   */
  this.parseFromXmlObject = function (xmlObject)
  {
    return parseXml(xmlObject);
  };


  function parseJson(json)
  {
    let properties = Object.keys(json);

    if (properties.length != 1)
    {
      throw "JSON object must have only one root element!";
    }

    let xml = document.implementation.createDocument("", "", null);

    //const root = xml.createElement(properties[0]);

    //xml.appendChild(root);

    let parse = (root, json) =>
    {
      let properties = Object.keys(json);

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

      if (json.hasOwnProperty("@text"))
      {
        root.appendChild(xml.createTextNode(json["@text"]));
      }

      if (json.hasOwnProperty("@attributes"))
      {
        foreach(json["@attributes"], (attribute, value) =>
        {
          root.setAttribute(attribute, value);
        });
      }

      return root;
    };


    console.dir(parse(xml, json));

    return new XMLSerializer().serializeToString(xml);
  }

  this.parseFromJsonString = function (jsonString)
  {
    return parseJson(JSON.parse(jsonString));
  };

  this.parseFromJsonObject = function (jsonObject)
  {
    return parseJson(jsonObject);
  };
}

/**
 * Parsing an XML string to JSON object
 * @param xmlString
 */
XmlJson.parseFromXmlString = function (xmlString)
{
  return new XmlJson().parseFromXmlString(xmlString);
};

/**
 * Parsing an XMLDocument to JSON object
 * @param xmlObject
 */
XmlJson.parseFromXmlObject = function (xmlObject)
{
  return new XmlJson().parseFromXmlObject(xmlObject);
};


XmlJson.parseFromJsonObject = function (xmlObject)
{
  return new XmlJson().parseFromJsonObject(xmlObject);
};

XmlJson.parseFromJsonString = function (xmlObject)
{
  return new XmlJson().parseFromJsonString(xmlObject);
};

