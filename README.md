## ServeMyCustomer

ServeMyCustomer is a SAAS application which helps product companies to serve the customer requests by providing pluggable realtime chat engine between customers and companies.

Companies can register at ServeMyCustomer website and get the Javascript snippet to be placed on their website. When a company places the ServeMyCustomer Javascript snippet on a website, it immediately adds a real time chat feature to the webpage. As a result, a chat bubble will appear on the bottom right corner of the page.

When a customer visits the company's website, clicks on the chat bubble, the chat bubble opens a chat widget after receiving the customer’s name, email and subject of the conversation. 
The chat connects the customer with a person from customer support team. 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Node.js
- NPM
- Firebase CLI
  ```
  npm install -g firebase-tools
  ```

### Installing

Clone the repository 
```
git@github.com:DivyanshBatham/serve-my-customer.git
```


Install Client Dependencies
```
cd serve-my-customer && npm install
```

Install Firebase Functions Dependencies
```
cd functions && npm install
```

Login with Firebase CLI
```
firebase login
```
Select Project 
```
firebase use default
```

Add Firebase Client SDK Config:
```
Go to Firebase console > Project Settings > Download the Config file
Create a new file at src\config\firebaseConfig.json
```

Start Client Dev Server
```
npm start
```


Start Functions Dev Server
```
firebase serve --only functions
```
