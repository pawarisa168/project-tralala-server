import axios from "axios";

const DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
const EMBEDDING_MODEL = "gemini-embedding-001";
const GENERATION_MODEL = "gemini-2.5-flash";
const EXPECTED_EMBEDDING_DIMS = 3072;

export const embedText = async ({
  apiKey1 = process.env.GEMINI_API_KEY1,
  apiKey2 = process.env.GEMINI_API_KEY2,
  apiKey3 = process.env.GEMINI_API_KEY3,
  apiKey4 = process.env.GEMINI_API_KEY4,
  apiKey5 = process.env.GEMINI_API_KEY5,
  apiKey6 = process.env.GEMINI_API_KEY6,
  apiKey7 = process.env.GEMINI_API_KEY7,
  apiKey8 = process.env.GEMINI_API_KEY8,
  apiKey9 = process.env.GEMINI_API_KEY9,
  apiKey10 = process.env.GEMINI_API_KEY10,
  text,
  baseUrl = process.env.GEMINI_API_BASE_URL || DEFAULT_BASE_URL,
  model = process.env.GEMINI_EMBEDDING_MODEL || EMBEDDING_MODEL,
  timeoutMs = Number(process.env.GEMINI_HTTP_TIMEOUT_MS || 25000), // 15 seconds
} = {}) => {
const apiKeys = [
  apiKey1,
  apiKey2,
  apiKey3,
  apiKey4,
  apiKey5,
  apiKey6,
  apiKey7,
  apiKey8,
  apiKey9,
  apiKey10,
].filter(Boolean); // remove undefined keys
  const trimmed = String(text || "").trim();

  if (!trimmed) {
    const error = new Error("embedText requires non-empty text");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  if (!Array.isArray(apiKeys) || apiKeys.length === 0) {
    const error = new Error("At least one GEMINI_API_KEY must be set to compute embeddings");
    error.name = "ConfigurationError";
    error.status = 500;
    throw error;
  }

  const buildUrl = (key) =>
    `${baseUrl}/v1beta/models/${encodeURIComponent(model)}:embedContent?key=${encodeURIComponent(key)}`;

  const requestEmbedding = async (key) => {
    const { data } = await axios.post(
      buildUrl(key),
      {
        content: {
          parts: [{ text: trimmed }],
        },
      },
      {
        timeout: timeoutMs,
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  };

  let data;
  let lastError;

  for (let i = 0; i < apiKeys.length; i++) {
    try {
      // 🔁 retry same key once on network error
      try {
        data = await requestEmbedding(apiKeys[i]);
      } catch (err) {
        if (isRetryableNetworkError(err)) {
          console.warn(`Network error on key #${i + 1}, retrying once...`);
          data = await requestEmbedding(apiKeys[i]);
        } else {
          throw err;
        }
      }
      break; // ✅ success
    } catch (err) {
      lastError = err;
      console.warn(`Gemini API key #${i + 1} failed`);
    }
  }

  if (!data) {
    const error = new Error("All Gemini API keys failed");
    error.name = "UpstreamError";
    error.status = 502;
    error.details = {
      attempts: apiKeys.length,
      lastStatus: lastError?.response?.status,
    };
    throw error;
  }

  const vector =
    data?.embedding?.values ||
    data?.embedding?.value ||
    data?.embeddings?.[0]?.values ||
    data?.embeddings?.[0]?.value;

  if (!Array.isArray(vector)) {
    const error = new Error("Unexpected Gemini embeddings response shape");
    error.name = "UpstreamError";
    error.status = 502;
    error.details = { receivedKeys: data ? Object.keys(data) : null };
    throw error;
  }

  if (vector.length !== EXPECTED_EMBEDDING_DIMS) {
    const error = new Error(
      `Embedding dimension mismatch: expected ${EXPECTED_EMBEDDING_DIMS}, got ${vector.length}`
    );
    error.name = "UpstreamError";
    error.status = 502;
    throw error;
  }

  return vector;
};

export const GEMINI_EMBEDDING_DIMS = EXPECTED_EMBEDDING_DIMS;

export const generateText = async ({
  apiKey1 = process.env.GEMINI_API_KEY1,
  apiKey2 = process.env.GEMINI_API_KEY2,
  apiKey3 = process.env.GEMINI_API_KEY3,
  apiKey4 = process.env.GEMINI_API_KEY4,
  apiKey5 = process.env.GEMINI_API_KEY5,
  apiKey6 = process.env.GEMINI_API_KEY6,
  apiKey7 = process.env.GEMINI_API_KEY7,
  apiKey8 = process.env.GEMINI_API_KEY8,
  apiKey9 = process.env.GEMINI_API_KEY9,
  apiKey10 = process.env.GEMINI_API_KEY10,
  prompt,
  baseUrl = process.env.GEMINI_API_BASE_URL || DEFAULT_BASE_URL,
  model = process.env.GEMINI_GENERATION_MODEL || GENERATION_MODEL,
  timeoutMs = Number(process.env.GEMINI_HTTP_TIMEOUT_MS || 20000), // 20 seconds
  temperature = Number(process.env.GEMINI_TEMPERATURE || 0.2),
} = {}) => {
  const apiKeys = [
    apiKey1,
    apiKey2,
    apiKey3,
    apiKey4,
    apiKey5,
    apiKey6,
    apiKey7,
    apiKey8,
    apiKey9,
    apiKey10,
  ].filter(Boolean); // remove undefined keys
  const trimmed = String(prompt || "").trim();

  if (!trimmed) {
    const error = new Error("generateText requires non-empty prompt");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  if (!Array.isArray(apiKeys) || apiKeys.length === 0) {
    const error = new Error("At least one GEMINI_API_KEY must be set to generate response");
    error.name = "ConfigurationError";
    error.status = 500;
    throw error;
  }

  const buildUrl = (key) =>
    `${baseUrl}/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;

  const requestGenerating = async (key) => {
    const { data } = await axios.post(
      buildUrl(key),
      {
        contents: [
          {
            role: "user",
            parts: [{ text: trimmed }],
          },
        ],
        generationConfig: {
          temperature,
        },
      },
      {
        timeout: timeoutMs,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  let data;
  let lastError;

  for (let i = 0; i < apiKeys.length; i++) {
    try {
      data = await requestGenerating(apiKeys[i]);
      break; // ✅ success
    } catch (err) {
      lastError = err;
      console.warn(`Gemini API key #${i + 1} failed`);
    }
  }

  const parts = data?.candidates?.[0]?.content?.parts;
  const text = Array.isArray(parts)
    ? parts
        .map((p) => p?.text)
        .filter(Boolean)
        .join("")
    : null;

  if (!text) {
    const error = new Error("Unexpected Gemini generateContent response shape");
    error.name = "UpstreamError";
    error.status = 502;
    error.details = { receivedKeys: data ? Object.keys(data) : null };

    throw error;
  }

  return String(text).trim();
};
