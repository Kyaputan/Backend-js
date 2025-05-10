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

app.listen(PORT).on('listening', () => {
  console.info(`[Server] Successfully started 🚀 on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
}).on('error', (err) => {
  console.error('[Server] Failed to start:', err);
  process.exit(1);
});

