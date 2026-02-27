/* General Auth Notes:
- Authentication is the process of verifying a user’s identity — confirming that they are who they claim to be
   by checking their information Like email and password and make sure it exactly matches the data in the server

- Authorization on the other hand is the process after the Authentication when we finish it and know who the user is
   Authorization tells the user what he is allowed and not allowed to do based on his data that confirmed from the Authentication service

- there are two Main types of Auth. tokens and (session/cookies)

- tokens are like a access card that the user has during his time in the web app it gets generated from the server at the Authentication stage
   , and then the front end send this access card to the server on every request the client makes and the server checks based on the data in the token if the user allowed to do the requested things or not
  
- we will use Tokens as our main authuntication way using JWT(json web token)

- json web token contains three main parts Header,Payload (encoded in url64) and signutre : 
   - the header contains the type of the token and the a signing algorithm
   - payload contains data about the user 
   - Signature is the part that ensures the data is secure and did not change, it is made using the encoded header + encoded payload + seceret or private key
      so if any thing changes the encoding of it will change and when the server gets the token and check the new encoded header or payload with the secret key using the algorithm it won't be the same sign and that's how we detect data change


- put in mind that the data inside the header and payload is accessable by anyone and even if they encoded they can be decoded easily so do not put secret information inside them   


- also important thing to know is to always put the data you will need in Authorization inside the payload at the first time you make the token 

- another important thing that the server does not “decode” the signature or “reverse” it
   it recalculates the sign fresh from the received header+payload and compares it with the one inisde the token.


- the tokens often times contains information about the user and if anyone access it he can make changes to the server as he pretending to be the user
   so that's why security steps must be taken like making a refresh token to generate new token after certain amount of time 
   and also saving the token in the cookies not the local storage to prevent js atacks

- to genearate token use jwt.sign() and give it the payload and the secret key (expiry time and header are optional)

- to check the token validation just use jwt.verfy() and give it the token and the secret key and the error or the decoded token are in the options function
   syntax : jwt.verfy(token,secret,(err,payload))

- the client side should send the token in every request in the authurization header 

- after token valdiatoin authurization is made manually in middlewares using conditions on the data returned from token  

- access token must have low expiry time (15 to 30 min) so even if an attacker found a way to get the access token and pretend he is the user
  we do not give him enogh time to do what he want cause after the expiry time the token won't be valid anymore
*/ 

/*Refresh token Notes:

- access token must have a low expiry time for securty reseaons but after it expires the user will need to log in again to get a new one
   and that is bad for UX, so we use refresh token with the access token and to prevent that and make a new access token on expiry without making the user login again

- refresh token has a long expiry date (weeks or months) because it does not have any data it's only used to make new access tokens when they expire

- important note:
  access token alone is not enogh to prevent attacks,
  yeah sure if the attacker changed it to pretend to be someone else we will block it and detect the change but in most cases attackers already know that
  so they won't try to change it and also yeah we made short expiry time which does not prevent attacks but it minimlize the damage of them
  and we use RT to genearate new access tokens on expiry...BUT is refresh token secure on there own?
  first of all refresh token is usually just some long strings and they still can be stolen in some ways , and unlike access token attacks if the RT get stolen this is way more dangoures cause using them the attacker can get AT as many as he want
  and that's why far more securty operations must be taken when dealing with RT and you can say that RT token is the real securty part as it has the same level of passwords authentication

- Access tokens = short-lived keys for accessing resources with minimal damage if stolen.
  Refresh tokens = long-lived keys for getting new access tokens, so they must be protected much more carefully cause if stolen that will be very dangorues.

- technically we can make the security steps on the AT in every request instead of making it expire and make the security steps in the RT
   but this will require extra steps and validations and DB checking on every single request which is very bad for preformance and also conflicts with the whole token idea of being statless and does not require extra operations

- also refresh token has less probablitiy of being attacked than AT because it is used fewer times than AT while AT are almost used in every request 
   which gives them high risk of being attacked that's why we give AT short access time and rely on the RT to give use new ones
   cause RT are has less chances to get stolen because they are only used when AT gets expired. 
   and that's why we it is bad practice to make the advanced security checkings on the AT itself after it gets expired so only make those checkings on the RT
   so “The higher the chance of AT being stolen, the higher the chance our security checks eventually fail.” and that's why we use RT for these security checks

- so in conclusion RT makes new AT instead of re login every time they expire, but since RT replace re-Authentication steps
  they has to be heavy security checks that are close of the ones in the Authentication fase

*- Finally that we know what is RT what are the security checks we need to make sure it gets close to the Authentication fase security?
 */

/*Notes :


- hashing is like encoding a string in a way it cannot be decoded

- when you save the password in the database you have to hash it so if the database gets leaked the attacker cannot get the real  users  passwords

- in hashing there is something calld salt rounds which represents the number of times the hashing algorithm will repeat for more complexity

- to hash a password use the bcrypt module in node.js and give it the password and number of salt rounds
  syntax : bcrypt.hash(password,10)

- to check if the password in the request is the same in the database or not use   bcrypt.compare
*/