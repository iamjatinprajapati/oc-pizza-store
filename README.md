# oc-pizza-store
1. Implement store-admin
    a. Implement OrderCloud authentication using next-auth
    b. Implement notification provider
2. Implement store-front




Steps to setup the OrderCloud authentication system.
1. Create a new market place
2. Create API Client for Seller App
3. Create API Client for Buyer App
4. Create admin user

`{
  "ID": "ADMIN",
  "Username": "admin01",
  "Password": "Pa$$word12345",
  "FirstName": "Admin",
  "LastName": "User",
  "Email": "admin@pizza-of-your-choice.com",
  "Active": true,
  "TermsAccepted": "2023-04-13"
}`

5. Create buyer organization

`{
	"ID": "KwGTsm_2T06wS4VhE9BdSw",
	"Name": "Default Buyer",
	"DefaultCatalogID": "KwGTsm_2T06wS4VhE9BdSw",
	"Active": false,
	"DateCreated": "2023-04-13T03:55:35.873+00:00",
	"xp": null
}`

6. asd

`{
  "Active": true,
  "Username": "buyer1",
  "Password": "Pa$$word12345",
  "FirstName": "Buyer",
  "LastName": "User",
  "Email": "buyer@email.com",
  "TermsAccepted": "2023-04-13"
}`


7. Admin security profile

`{
  "ID": "ADMIN_PROFILE",
  "Name": "Admin User Profile",
  "Roles": [
    "MeAdmin",
    "PasswordReset",
    "BuyerReader",
    "OrderAdmin",
    "CatalogAdmin",
    "ProductAdmin",
    "ProductAssignmentAdmin",
    "PriceScheduleAdmin",
    "ShipmentAdmin"
  ]
}`

8. Buyer security profile

`{
  "ID": "BUYER_PROFILE",
  "Name": "Buyer User Profile",
  "Roles": [
    "MeAdmin",
    "PasswordReset",
    "Shopper"
  ]
}`

9. Assign admin user profile to seller organization

`{
  "SecurityProfileID": "ADMIN_PROFILE"
}`

10. Assign buyer user profile to buyer organization

`{
  "SecurityProfileID": "BUYER_PROFILE",
  "BuyerID": "BUYER_ORGANIZATION"
}`

