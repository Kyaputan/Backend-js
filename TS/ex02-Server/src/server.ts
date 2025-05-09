import Express, { Application, Request, Response, NextFunction } from "express";

const PORT: number = 5000;
const app: Application = Express();

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from the /API!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
