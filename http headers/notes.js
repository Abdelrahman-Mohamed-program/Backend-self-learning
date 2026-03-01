/* Notes: 
- HTTP headers are metadata that describe the details of the request or response messages exchanged between the client and the server.

- there are several kinds of http headers : 
 1) request headers : contains information about the requested data or the client who sent it

 2) response headers: contains information about the sent response(like it's location) or the server who sent it

 3) Representation header (ex : content-type):  contains information about the body of the resource(both req and res) Like the MIME type of the sent content


- Headers are only for two things eather telling the client side iformation about the res and how to work with it 
   Or to tell the browser it self how to deal with the response the cors headers so some headers does not even apear to the client side as there are only for the browser to use them lik caching and cors

- the browser specific Headers Like cache and cors does not apear in the client side by defualt,
   But if you want them too you can tell the browser to pass them to the client inside the response headers using (Access-Control-Expose-Headers) header


- these are some of the most important headers : 
  * Accept(mainly for req):  this header typically used by the client side and it tells the server what are the Datatypes that the client want in the response
     Note: response can also use Accept header in rare cases like for telling the client about future Datatypes expected
     Server error handler : if you can't send the requested Datatypes in accept response with 406 Not Acceptable

  * Accept-Encoding(mainly for req) :  this header has the same idea as Accept but it tells the server what is the accepted compression algorithms not the accepted Datatypee


  * Content-Encoding(both) : specifies the compression algorithms of the sent data and if mutliaple data sent with diffrent algorithms then put every one in the order of it's data type in Content-Type
     Note: the browser decode the comporession automatically so the client side get the orignal fil spicfied in the content-type

  * Content-type (both):  specifies the media type (MIME type) of the data being sent in a request or response. It tells the receiving side how to parse and handle the content.
     Server error handler: if the req content type is not acceptable in your server response with 415(Unsupported Media Type) and also add the acceptable types in accept-post header
  
  *  Cache-Control: This header tells the browser (or any cache) whether and how to cache the response, so it doesn’t have to go back to the server for the same request every time.
      Note: there are a lot of atributes to use with  Cache-Control header like age(indecates how much time the res was chached for),max-age(tell the browser the chach the response for specfifc time),no-cache tell the browser not to cache the response at all

  * Age : this header is a browser header thats send the time that the response was caches for in seconds
  
  * Authorization (request header) : this header is used for authintcation (will learn more later)

  * User-Agent : this is a request header that tells the server information about the client data like (used application and os,version...etc)

  * Date (express set it automatically): tells the browser the exact time the response was made 

  *     


  
- when you use express.json() it automatically check the Content-type  header from the request and if it's application/json it parse the req.body for you to use it

- when you make res.json() the Content-type response header is set automatilcally to application/json


- Accept headers from req are normally pared with content-type headers in response
*/



/* Proxis Notes:

- 

*/