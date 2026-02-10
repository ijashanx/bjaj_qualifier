# BFHL Qualifier API 🚀

A REST API built using **Node.js**, **Express**, and **Axios**.

It supports the following operations through a single endpoint:

- Fibonacci Series
- Prime Number Filter
- LCM (Least Common Multiple)
- HCF / GCD (Highest Common Factor)
- AI One-Word Answer (Google Gemini)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Axios
- dotenv
- Google Gemini API

---

## 📁 Project Structure

```
bfhl-project/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── .env   (Not pushed to GitHub)
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Create `.env` file

Create a file named `.env` in root folder:

```
GEMINI_KEY=YOUR_GEMINI_API_KEY
```

⚠️ Do NOT push `.env` to GitHub.

### 3️⃣ Run server

```bash
node index.js
```

Server runs at:

```
http://localhost:3000
```

---

## 📌 API Endpoints

---

### ✅ 1. Health Check

**GET** `/health`

Response:

```json
{
  "is_success": true,
  "official_email": "jashanpreet1522.be23@chitkara.edu.in"
}
```

---

### ✅ 2. Main Endpoint

**POST** `/bfhl`

Send only ONE key at a time from:

```
fibonacci
prime
lcm
hcf
AI
```

---

## 📊 Examples

---

### 🔢 Fibonacci

Request:

```json
{ "fibonacci": 7 }
```

Response:

```json
{
  "is_success": true,
  "official_email": "jashanpreet1522.be23@chitkara.edu.in",
  "data": [0,1,1,2,3,5,8]
}
```

---

### 🔎 Prime Filter

Request:

```json
{ "prime": [1,2,3,4,5,6,7,8,9] }
```

Response:

```json
{
  "is_success": true,
  "official_email": "jashanpreet1522.be23@chitkara.edu.in",
  "data": [2,3,5,7]
}
```

---

### 📐 LCM

Request:

```json
{ "lcm": [4,6,8] }
```

Response:

```json
{
  "is_success": true,
  "official_email": "jashanpreet1522.be23@chitkara.edu.in",
  "data": 24
}
```

---

### 📏 HCF / GCD

Request:

```json
{ "hcf": [12,18,24] }
```

Response:

```json
{
  "is_success": true,
  "official_email": "jashanpreet1522.be23@chitkara.edu.in",
  "data": 6
}
```

---

### 🤖 AI (Gemini One Word Answer)

Request:

```json
{ "AI": "Capital of India?" }
```

Response:

```json
{
  "is_success": true,
  "official_email": "jashanpreet1522.be23@chitkara.edu.in",
  "data": "Delhi"
}
```

---

## ❌ Error Handling

### Empty Body

```json
{}
```

Response:

```json
{
  "is_success": false,
  "error": "Request body cannot be empty"
}
```

---

### Invalid Key

```json
{ "xyz": 123 }
```

Response:

```json
{
  "is_success": false,
  "error": "Invalid key. Use one of: fibonacci, prime, lcm, hcf, AI"
}
```

---

## 🔒 Security Notes

- `.env` file is ignored using `.gitignore`
- API keys are NOT stored in repository
- `node_modules` is NOT pushed to GitHub

---

## 👩‍💻 Author

**Jashanpreet**  
Email: `jashanpreet1522.be23@chitkara.edu.in`
