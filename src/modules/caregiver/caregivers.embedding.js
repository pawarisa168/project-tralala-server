import { Caregiver } from "../../models/caregiver.model.js";
import {
  embedText,
  GEMINI_EMBEDDING_DIMS,
} from "../../services/gemini.client.js";

const buildUserEmbeddingText = (userDoc) => {
  const firstName = userDoc?.firstName ? String(userDoc.firstName).trim() : "";
  const lastName = userDoc?.lastName ? String(userDoc.lastName).trim() : "";
  const gender = userDoc?.gender ? String(userDoc.gender).trim() : "";
  const certifications = userDoc?.certifications ? JSON.stringify(userDoc.certifications).trim() : "";
  const skills = userDoc?.skills ? JSON.stringify(userDoc.skills).trim() : "";
  const introduction = userDoc?.introduction ? String(userDoc.introduction).trim() : "";
  const ratingSummary = userDoc?.ratingSummary ? JSON.stringify(userDoc.ratingSummary).trim() : "";


  return [
    "Caregiver profile:",
    `firstName: ${firstName}`,
    `lastName: ${lastName}`,
    `gender: ${gender}`,
    `certifications: ${certifications}`,
    `skills: ${skills}`,
    `introduction: ${introduction}`,
    `ratingSummary: ${ratingSummary}`,
  ].join("\n");
};

export const embedUserById = async (caregiverID) => {
  if (!caregiverID) {
    const error = new Error("caregiverID is required");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  await Caregiver.findByIdAndUpdate(
    caregiverID,
    {
      $set: {
        "embedding.status": "PROCESSING",
        "embedding.lastAttemptAt": new Date(),
      },
      $inc: { "embedding.attempts": 1 },
    },
    { new: false }
  );

  try {
    const caregiver = await Caregiver.findById(caregiverID).select(
      "firstName lastName gender certifications skills introduction ratingSummary embedding.status"
    );

    if (!caregiver) {
      const error = new Error("Caregiver not found");
      error.name = "NotFoundError";
      error.status = 404;
      throw error;
    }

    const text = buildUserEmbeddingText(caregiver);
    const vector = await embedText({ text });

    await Caregiver.findByIdAndUpdate(
      caregiverID,
      {
        $set: {
          "embedding.status": "READY",
          "embedding.vector": vector,
          "embedding.dims": GEMINI_EMBEDDING_DIMS,
          "embedding.updateAt": new Date(),
          "embedding.lastError": null,
        },
      },
      { new: false }
    );

    return { ok: true };
  } catch (error) {
    const message = String(error?.message || "Embedding failed");

    await Caregiver.findByIdAndUpdate(
      caregiverID,
      {
        $set: {
          "embedding.status": "FAILED",
          "embedding.lastError": message,
        },
      },
      { new: false }
    );
    return { ok: false, error: message };
  }
};

export const queueEmbedUserById = (caregiverID) => {
  setImmediate(() => {
    embedUserById(caregiverID).catch((error) => {
      console.error("Async user embedding failed", {
        caregiverID,
        message: error?.message,
      });
    });
  });
};
