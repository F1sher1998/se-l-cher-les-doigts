import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("List of restaurants");
});

export default router;