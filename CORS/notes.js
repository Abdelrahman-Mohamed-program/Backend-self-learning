/*Notes: 

1) cors (cross origin resource share) is a http header mechanizm that controls what domain,hosts that can access your data and endpoint 
     a header mechanizm is some operations or rules that will happen based on the headers

2) cors are made to ensure secure data transfer between browsers and servers

3) each browser has its own cros to protect data and minimalize risks

4) when you set CORS you do not block things yourslef in the server cors are just headers to tell the browser is it allowed to send the response to the frontend or not
    so the browser itself is the one who blocks not your server and it does not block the request from coming to your server it just blocks the response from going to the client

5) how Cors work : when you set CORS headers in your response and the client send the request to the browser and then the browser send it to your server
    and when the browser gets the response from you, it checks the CORS header to validate if every thing is ok or not and if not and you did not allow this origin to access you response
    then the browser won't send it to the client

6) important thing to keep in mind CORS does not block attacks it just tells the browser who and how should access you response and who's not

7) in requests that uses PUT,DELETE,and for somecases GET and POST the browser sends something called a preflight request with the OPTIONS method
    and this preflight request has headers to check CORS headers in your reaponse and if every thing is ok the browser will send the main request and the normal cycle will contiue

9) so for the methods that require a preflight request , the browser will block the request from coming to the server until everything is ok
    while in methods that doesn't require preflight request the full request comes to the server and the response is sent to the browser
    and then the browser dicides whether or not it should send the response to the client side

10) important note to keep in mind even if the preflight request approved the request to get to your server that does not mean it won't check the CORS again for the Main request
     the preflight request just ask the server wheather or not it want the request to come to it but then CORS tells the browser to send the final response or not    

11) finally to handle preflight requests make sure to put a middleware at the begining that checks if the request.method is options or not and if yes 
     then make sure send simple response with the CORS headers so the request doesn't time out cause even the preflight request expects a response but with the CORS headers

12) you can cache the preflight response in the browser so if the exact same request came again it does not have to send your server the same preflight request again
     it will just use the cached preflight response for it
      to make that use Access-Control-Max-Age header to caches the preflight response for specific seconds

13) normally if the preflight request was ok then the response won't be blocked BUT,
      if I later changed the allowed-origin CORS header after the middleware that sends the preflight response in this case based on the new origin CORS the actual response might be blocked even though the preflight worked normally    

14) if I want to allow diffrent origins for diffrent requests the only way to do it is in every route I have to specify the allowed origin

15) finaly CORS Headers:
	1.	Access-Control-Allow-Origin: "one origin"
→ specifies the allowed URL(s) that can access your response.
	2.	Access-Control-Allow-Methods: "GET, POST, PUT, DELETE"
→ specifies the HTTP methods that are allowed when in preflight requests only
	3.	Access-Control-Allow-Headers: "Content-Type, Authorization"
→ specifies which custom request headers can be used when making the actual request.
	4.	Access-Control-Allow-Credentials: "true"//later for AUTH
→ tells the browser whether the response can be exposed when the credentials flag is true (used for cookies, auth headers, etc).
	5.	Access-Control-Expose-Headers: "X-Custom-Header"
→ lets the client access additional response headers that are not exposed by default.
	6.	Access-Control-Max-Age: "3600"
→ defines how long (in seconds) the results of a preflight request can be cached by the browser.



16) for Post and GET methods the things that trigger the preflight request is the only things that the CORS check for
          in other words if a post request trigired preflight request because of the headers then the preflight request will only check the headers
          (and the origin of course) it won't check the allowed methods but it still safer to include the methods anyway

17) the origin is the only CORS that get checked in the browser for the response to go the the client any other CORS get checked

18) the preflight request does not have the same data and body as the normal request just headers to check the cors

// all the CORS headers are for the preflight requests except the origin is for both and expose headers is for the main request
*/