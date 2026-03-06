import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.resolve("rights.json");

// Load rights.json
const loadRights = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Save to rights.json
const saveRights = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ✅ Get all rights
router.get("/", (req, res) => {
  const rights = loadRights();
  res.json(rights);
});

// ✅ Get by Section
router.get("/:section", (req, res) => {
  const section = req.params.section.toUpperCase();
  const rights = loadRights();
  console.log(section,rights);
  const result = rights.find((r) => r.section.toUpperCase() === section);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Section not found" });
  }
});

// ✅ Add new Section
router.post("/", (req, res) => {
  const rights = loadRights();
  const newRight = { id: rights.length + 1, ...req.body };
  rights.push(newRight);
  saveRights(rights);
  res.status(201).json(newRight);
});

// ✅ Update Section
router.put("/:id", (req, res) => {
  const rights = loadRights();
  const index = rights.findIndex((r) => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Section not found" });

  rights[index] = { ...rights[index], ...req.body };
  saveRights(rights);
  res.json(rights[index]);
});

// ✅ Delete Section
router.delete("/:id", (req, res) => {
  let rights = loadRights();
  const index = rights.findIndex((r) => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Section not found" });

  const deleted = rights[index];
  rights = rights.filter((r) => r.id !== parseInt(req.params.id));
  saveRights(rights);
  res.json(deleted);
});

export default router;
