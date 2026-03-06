import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.resolve("templates.json");
const templateDir = path.resolve("public/templates");

// Load templates.json
const loadTemplates = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// ✅ Get all templates
router.get("/", (req, res) => {
  const templates = loadTemplates();
  res.json(templates);
});

// ✅ Get template by ID
router.get("/:id", (req, res) => {
  const templates = loadTemplates();
  const tpl = templates.find((t) => t.id === parseInt(req.params.id));

  if (!tpl) return res.status(404).json({ message: "Template not found" });

  const filePathResolved = path.join(templateDir, tpl.fileName);
  if (!fs.existsSync(filePathResolved)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePathResolved, tpl.fileName);
});

export default router;
