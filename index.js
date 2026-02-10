const express = require("express");
const axios = require("axios");

require('dotenv').config();                 // ✅ Load .env
const GEMINI_KEY = process.env.GEMINI_KEY;  // ✅ Read key

const app = express();
app.use(express.json());

// ======== CONFIG ========
const PORT = 3000;
const YOUR_EMAIL = "jashanpreet1522.be23@chitkara.edu.in";

// -------- GET /health ----------
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: YOUR_EMAIL
  });
});

// -------- Helper functions ----------
function isInteger(n) {
  return Number.isInteger(n);
}

function isIntegerArray(arr) {
  return Array.isArray(arr) && arr.every(x => Number.isInteger(x));
}

function computeLCM(arr) {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);
  return arr.reduce((acc, num) => lcm(acc, num));
}

function computeHCF(arr) {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  return arr.reduce((acc, num) => gcd(acc, num));
}

function fibonacciSeries(n) {
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib.slice(0, n);
}

// -------- GEMINI CALL ----------
async function askGemini(question) {

  if (!GEMINI_KEY) {
    throw new Error("GEMINI KEY NOT FOUND IN .env");
  }

  const url =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Answer in ONE WORD only: ${question}`
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" }
    });

    const answer =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      throw new Error("Invalid AI response from Gemini");
    }

    return answer.trim().split(/\s+/)[0];

  } catch (err) {
    console.log("GEMINI ERROR FULL:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error?.message || err.message);
  }
}

// -------- POST /bfhl ----------
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        is_success: false,
        error: "Request body cannot be empty"
      });
    }

    // ========== FIBONACCI ==========
    if (body.fibonacci !== undefined) {
      if (!isInteger(body.fibonacci)) {
        return res.status(422).json({
          is_success: false,
          error: "Fibonacci input must be an integer"
        });
      }

      return res.json({
        is_success: true,
        official_email: YOUR_EMAIL,
        data: fibonacciSeries(body.fibonacci)
      });
    }

    // ========== PRIME ==========
    if (body.prime !== undefined) {
      if (!isIntegerArray(body.prime)) {
        return res.status(422).json({
          is_success: false,
          error: "Prime input must be an integer array"
        });
      }

      const primes = body.prime.filter(num => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      });

      return res.json({
        is_success: true,
        official_email: YOUR_EMAIL,
        data: primes
      });
    }

    // ========== LCM ==========
    if (body.lcm !== undefined) {
      if (!isIntegerArray(body.lcm)) {
        return res.status(422).json({
          is_success: false,
          error: "LCM input must be an integer array"
        });
      }

      return res.json({
        is_success: true,
        official_email: YOUR_EMAIL,
        data: computeLCM(body.lcm)
      });
    }

    // ========== HCF ==========
    if (body.hcf !== undefined) {
      if (!isIntegerArray(body.hcf)) {
        return res.status(422).json({
          is_success: false,
          error: "HCF input must be an integer array"
        });
      }

      return res.json({
        is_success: true,
        official_email: YOUR_EMAIL,
        data: computeHCF(body.hcf)
      });
    }

    // ========== AI ==========
    if (body.AI !== undefined) {
      if (typeof body.AI !== "string") {
        return res.status(422).json({
          is_success: false,
          error: "AI input must be a string"
        });
      }

      const answer = await askGemini(body.AI);

      return res.json({
        is_success: true,
        official_email: YOUR_EMAIL,
        data: answer
      });
    }

    return res.status(400).json({
      is_success: false,
      error: "Invalid key. Use one of: fibonacci, prime, lcm, hcf, AI"
    });

  } catch (err) {
    console.error("Error:", err.message);

    return res.status(500).json({
      is_success: false,
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
